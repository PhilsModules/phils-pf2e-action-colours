/**
 * Lightweight A* Pathfinding for Foundry VTT
 * Optimized for grid movement.
 */
export class SmartFinder {
    constructor(token) {
        this.token = token;
        // Cache canvas reference
        this.grid = canvas.grid;
        // Limit iterations to prevent freezing on impossible paths.
        this.MAX_ITERATIONS = 5000;

        // ----------------------------------------------------
        // Cache grid methods to ensure V12/V13 compatibility
        // ----------------------------------------------------

        // 1. Grid Interface
        if (typeof this.grid.getCenterPoint === "function") {
            // V13 Standard
            this._getCenter = (r, c) => this.grid.getCenterPoint({ i: r, j: c });
            this._getTopLeft = (r, c) => this.grid.getTopLeftPoint({ i: r, j: c });
            this._getGridPosFromPixels = (x, y) => {
                const o = this.grid.getOffset({ x, y });
                return { i: o.i, j: o.j };
            };
        } else if (typeof this.grid.getPixelsFromGridPosition === "function") {
            // V12 Legacy
            this._getCenter = (r, c) => {
                const p = this.grid.getPixelsFromGridPosition(r, c);
                // V12 returns top-left, need to add half-size
                const half = (this.grid.size || 100) / 2;
                return { x: p.x + half, y: p.y + half };
            };
            this._getTopLeft = (r, c) => this.grid.getPixelsFromGridPosition(r, c);
            this._getGridPosFromPixels = (x, y) => {
                const [i, j] = this.grid.getGridPositionFromPixels(x, y);
                return { i, j };
            };
        } else {
            // Fallback
            this._getCenter = (r, c) => ({ x: c * 100, y: r * 100 });
            this._getTopLeft = (r, c) => ({ x: c * 100, y: r * 100 });
            this._getGridPosFromPixels = (x, y) => ({ i: 0, j: 0 });
        }

        // 2. Collision Strategy
        const v13Poly = foundry?.canvas?.geometry?.ClockwiseSweepPolygon;

        if (CONFIG.Canvas?.polygonClass?.testCollision) {
            this._testCollision = (p1, p2, type, mode) => {
                return CONFIG.Canvas.polygonClass.testCollision(p1, p2, { type, mode });
            };
        } else if (v13Poly && v13Poly.testCollision) {
            this._testCollision = (p1, p2, type, mode) => {
                return v13Poly.testCollision(p1, p2, { type, mode });
            };
        } else if (typeof ClockwiseSweepPolygon !== "undefined" && ClockwiseSweepPolygon.testCollision) {
            this._testCollision = (p1, p2, type, mode) => {
                return ClockwiseSweepPolygon.testCollision(p1, p2, { type, mode });
            };
        } else if (canvas.walls && canvas.walls.checkCollision) {
            this._testCollision = (p1, p2, type, mode) => canvas.walls.checkCollision(new Ray(p1, p2), { type, mode });
        } else {
            this._testCollision = () => false;
        }
    }

    findPath(start, end) {
        // Convert pixels to grid coordinates
        const half = (this.grid.size || 100) / 2;
        const sPos = this._getGridPosFromPixels(start.x + half, start.y + half);
        const ePos = this._getGridPosFromPixels(end.x + half, end.y + half);

        // Use packed integers for keys only if coordinates fit in 16 bits (standard for maps < 65k size)
        // Key format: (x << 16) | y.  Note: JavaScript bitwise ops are 32-bit signed.
        // Ensure positive coordinates for bitwise or use string keys for safety if negative coords are possible.
        // Foundry grid coords can be negative. String keys are safer and reasonably fast in modern JS.
        // Let's stick to string keys for robustness but optimize the map usage.

        const startKey = `${sPos.i},${sPos.j}`;
        const endKey = `${ePos.i},${ePos.j}`;

        if (startKey === endKey) return null;

        // Octile distance weights
        const D = 1;
        const D2 = Math.SQRT2; // ~1.414

        // Heuristic: Octile Distance
        const heuristic = (dx, dy) => {
            // Octile distance is better for 8-way movement than Manhattan
            return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
        };

        const getH = (node) => {
            const dx = Math.abs(node.i - ePos.i);
            const dy = Math.abs(node.j - ePos.j);
            return heuristic(dx, dy);
        };

        // A* Data Structures
        // OpenSet: Binary Heap for O(log N) operations
        const openSet = new BinaryHeap((node) => node.f);

        // Track path and costs
        // Key -> { parentKey, g }
        // We combine cameFrom and gScore into one Map to reduce lookups/allocations
        const nodeData = new Map();

        // Initialize start node
        const startH = getH(sPos);
        const startNode = {
            i: sPos.i,
            j: sPos.j,
            key: startKey,
            g: 0,
            f: startH
        };

        openSet.push(startNode);
        nodeData.set(startKey, { parent: null, g: 0 });

        let iterations = 0;
        const directions = [
            { i: 0, j: 1 }, { i: 1, j: 0 }, { i: 0, j: -1 }, { i: -1, j: 0 }, // Cardinals
            { i: 1, j: 1 }, { i: 1, j: -1 }, { i: -1, j: 1 }, { i: -1, j: -1 } // Diagonals
        ];

        while (openSet.size() > 0) {
            iterations++;
            if (iterations > this.MAX_ITERATIONS) return null;

            // Pop node with lowest f
            const current = openSet.pop();

            // Check if we reached the goal (or strict adjacency? standard A* goes to goal)
            if (current.key === endKey) {
                return this.reconstructPath(nodeData, current.key, start);
            }

            // If we found a shorter path to this node already in a future iteration (lazy deletion), skip
            // But with this implementation, we only push better paths, so it's fine.
            // However, duplicates can exist in the heap.
            const currentData = nodeData.get(current.key);
            if (currentData.g < current.g) continue;

            const currentCenter = this._getCenter(current.i, current.j);

            for (const dir of directions) {
                const nextI = current.i + dir.i;
                const nextJ = current.j + dir.j;
                const nextKey = `${nextI},${nextJ}`;

                // Calculate cost
                const isDiag = dir.i !== 0 && dir.j !== 0;
                const stepCost = isDiag ? D2 : D;
                const tentativeG = current.g + stepCost;

                // Check against existing best g
                const neighborData = nodeData.get(nextKey);
                if (neighborData && tentativeG >= neighborData.g) {
                    continue; // Not a better path
                }

                // Collision Check (Deferred until needed)
                const neighborCenter = this._getCenter(nextI, nextJ);
                const hasHit = this._testCollision(currentCenter, neighborCenter, "move", "any");
                if (hasHit) continue;

                // New best path found
                nodeData.set(nextKey, { parent: current.key, g: tentativeG });

                const h = heuristic(Math.abs(nextI - ePos.i), Math.abs(nextJ - ePos.j));
                const neighborNode = {
                    i: nextI,
                    j: nextJ,
                    key: nextKey,
                    g: tentativeG,
                    f: tentativeG + h
                };

                openSet.push(neighborNode);
            }
        }

        return null;
    }

    reconstructPath(nodeData, currentKey, startPixel) {
        const path = [];
        let curr = currentKey;

        while (curr) {
            // Parse key back to coords (slower, but only done once per path)
            const [i, j] = curr.split(',').map(Number);

            // We return TopLeft for token placement, matching original logic
            path.push(this._getTopLeft(i, j));

            const data = nodeData.get(curr);
            curr = data ? data.parent : null;
        }

        // Path includes start node, which we usually want to replace with exact start pixel or omit
        // Original code included it.

        // Reverse to get Start -> End
        return path.reverse();
    }
}

/**
 * Min-Heap Implementation
 * Higher performance than array sorting for Priority Queue
 */
class BinaryHeap {
    constructor(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    push(element) {
        // Add the new element to the end of the array.
        this.content.push(element);
        // Allow it to bubble up.
        this.bubbleUp(this.content.length - 1);
    }

    pop() {
        // Store the first element so we can return it later.
        const result = this.content[0];
        // Get the element at the end of the array.
        const end = this.content.pop();
        // If there are any elements left, put the end element at the
        // start, and let it sink down.
        if (this.content.length > 0) {
            this.content[0] = end;
            this.sinkDown(0);
        }
        return result;
    }

    size() {
        return this.content.length;
    }

    bubbleUp(n) {
        // Fetch the element that has to be moved.
        const element = this.content[n];
        const score = this.scoreFunction(element);
        while (n > 0) {
            // Compute the parent element's index, and fetch it.
            const parentN = Math.floor((n + 1) / 2) - 1;
            const parent = this.content[parentN];
            // If the parent has a lesser score, things are in order and we
            // are done.
            if (score >= this.scoreFunction(parent))
                break;

            // Otherwise, swap the parent with the current element and
            // continue.
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        }
    }

    sinkDown(n) {
        // Look up the target element and its score.
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = this.scoreFunction(element);

        while (true) {
            // Compute the indices of the child elements.
            const child2N = (n + 1) * 2;
            const child1N = child2N - 1;
            // This is used to store the new position of the element,
            // if any.
            let swap = null;
            let child1Score;
            // If the first child exists (is inside the array)...
            if (child1N < length) {
                const child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);
                // If the score is less than our element's, we need to swap.
                if (child1Score < elemScore)
                    swap = child1N;
            }
            // Do the same checks for the other child.
            if (child2N < length) {
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score))
                    swap = child2N;
            }

            // If the element needs to be moved, swap it, and continue.
            if (swap !== null) {
                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }
            // Otherwise, we are done.
            else {
                break;
            }
        }
    }
}
