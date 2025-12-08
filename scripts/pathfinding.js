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
                return [o.i, o.j];
            };
        }
        else if (typeof this.grid.getPixelsFromGridPosition === "function") {
            // V12 Legacy
            this._getCenter = (r, c) => {
                const p = this.grid.getPixelsFromGridPosition(r, c);
                // V12 returns top-left, need to add half-size
                const half = (this.grid.size || 100) / 2;
                return { x: p.x + half, y: p.y + half };
            };
            this._getTopLeft = (r, c) => this.grid.getPixelsFromGridPosition(r, c);
            this._getGridPosFromPixels = (x, y) => this.grid.getGridPositionFromPixels(x, y);
        } else {
            // Fallback
            this._getCenter = (r, c) => ({ x: c * 100, y: r * 100 });
            this._getTopLeft = (r, c) => ({ x: c * 100, y: r * 100 });
            this._getGridPosFromPixels = (x, y) => [0, 0];
        }

        // 2. Collision Strategy
        // V13 moves ClockwiseSweepPolygon into geometry namespace
        const v13Poly = foundry?.canvas?.geometry?.ClockwiseSweepPolygon;

        if (CONFIG.Canvas?.polygonClass?.testCollision) {
            this._testCollision = (p1, p2, type, mode) => {
                return CONFIG.Canvas.polygonClass.testCollision(p1, p2, { type, mode });
            };
        }
        else if (v13Poly && v13Poly.testCollision) {
            this._testCollision = (p1, p2, type, mode) => {
                return v13Poly.testCollision(p1, p2, { type, mode });
            };
        }
        else if (typeof ClockwiseSweepPolygon !== "undefined" && ClockwiseSweepPolygon.testCollision) {
            this._testCollision = (p1, p2, type, mode) => {
                return ClockwiseSweepPolygon.testCollision(p1, p2, { type, mode });
            };
        }
        else if (canvas.walls && canvas.walls.checkCollision) {
            this._testCollision = (p1, p2, type, mode) => canvas.walls.checkCollision(new Ray(p1, p2), { type, mode });
        }
        else {
            this._testCollision = () => false;
        }
    }

    findPath(start, end) {
        // Convert pixels to grid coordinates
        // Use center point to avoid boundary rounding errors
        const half = (this.grid.size || 100) / 2;
        const startGrid = this._getGridPosFromPixels(start.x + half, start.y + half);
        const endGrid = this._getGridPosFromPixels(end.x + half, end.y + half);

        if (this.isSame(startGrid, endGrid)) return null;

        // Setup A*
        const openSet = new PriorityQueue();
        const cameFrom = new Map();
        const gScore = new Map();
        const fScore = new Map();

        const startKey = this.key(startGrid);
        gScore.set(startKey, 0);
        fScore.set(startKey, this.heuristic(startGrid, endGrid));
        openSet.enqueue(startGrid, fScore.get(startKey));

        let iterations = 0;

        while (!openSet.isEmpty()) {
            iterations++;
            if (iterations > this.MAX_ITERATIONS) {
                // Return straight line or null if too complex
                return null;
            }

            const current = openSet.dequeue();
            if (this.isSame(current, endGrid)) {
                return this.reconstructPath(cameFrom, current, start);
            }

            const currentKey = this.key(current);
            const neighbors = this.getNeighbors(current);

            for (const neighbor of neighbors) {
                const neighborKey = this.key(neighbor);
                const isDiag = (current[0] !== neighbor[0] && current[1] !== neighbor[1]);
                const weight = isDiag ? 1.414 : 1;
                const tentativeGScore = gScore.get(currentKey) + weight;

                if (!gScore.has(neighborKey) || tentativeGScore < gScore.get(neighborKey)) {
                    cameFrom.set(neighborKey, current);
                    gScore.set(neighborKey, tentativeGScore);
                    fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, endGrid));

                    if (!openSet.contains(neighbor, fScore.get(neighborKey))) {
                        openSet.enqueue(neighbor, fScore.get(neighborKey));
                    }
                }
            }
        }
        return null;
    }

    getPixels(gridPos) {
        // Center for collision
        return this._getCenter(gridPos[0], gridPos[1]);
    }

    getNeighbors(node) {
        const [row, col] = node;
        const directions = [
            [0, 1], [1, 0], [0, -1], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];

        const neighbors = [];
        const currentCenter = this.getPixels(node);

        for (const [dr, dc] of directions) {
            const nextNode = [row + dr, col + dc];
            const neighborCenter = this.getPixels(nextNode);

            // Check collision (center-to-center)
            const hasHit = this._testCollision(currentCenter, neighborCenter, "move", "any");

            if (!hasHit) {
                neighbors.push(nextNode);
            }
        }
        return neighbors;
    }

    heuristic(a, b) {
        return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
    }

    key(n) { return `${n[0]},${n[1]}`; }
    isSame(a, b) { return a[0] === b[0] && a[1] === b[1]; }

    reconstructPath(cameFrom, current, start) {
        const path = [];
        let curr = current;
        while (true) {
            const k = this.key(curr);
            const parent = cameFrom.get(k);
            if (!parent) break;
            // Return Top-Left for token placement
            const p = this._getTopLeft(curr[0], curr[1]);
            path.push(p);
            curr = parent;
        }
        return path.reverse();
    }
}

class PriorityQueue {
    constructor() {
        this.elements = [];
    }
    enqueue(element, priority) {
        this.elements.push({ element, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }
    dequeue() {
        return this.elements.shift().element;
    }
    isEmpty() {
        return this.elements.length === 0;
    }
    contains(element, priority) {
        return this.elements.some(i => i.element[0] === element[0] && i.element[1] === element[1]);
    }
}
