export function testCollision(p1, p2, type = "move", mode = "any") {
    if (typeof canvas === "undefined" || !canvas.ready) return false;

    const backend = CONFIG.Canvas?.polygonBackends?.move
        || foundry?.canvas?.geometry?.ClockwiseSweepPolygon
        || globalThis.ClockwiseSweepPolygon;

    if (backend?.testCollision) {
        return backend.testCollision(p1, p2, { type, mode });
    }
    if (canvas.walls?.checkCollision) {
        return canvas.walls.checkCollision(new Ray(p1, p2), { type, mode });
    }
    return false;
}

export class SmartFinder {
    constructor(token) {
        this.token = token;
        this.grid = canvas.grid;
        this.MAX_ITERATIONS = 5000;

        if (typeof this.grid.getCenterPoint === "function") {
            this._getCenter = (r, c) => this.grid.getCenterPoint({ i: r, j: c });
            this._getTopLeft = (r, c) => this.grid.getTopLeftPoint({ i: r, j: c });
            this._getGridPosFromPixels = (x, y) => {
                const o = this.grid.getOffset({ x, y });
                return { i: o.i, j: o.j };
            };
        } else if (typeof this.grid.getPixelsFromGridPosition === "function") {
            this._getCenter = (r, c) => {
                const p = this.grid.getPixelsFromGridPosition(r, c);
                const half = (this.grid.size || 100) / 2;
                return { x: p.x + half, y: p.y + half };
            };
            this._getTopLeft = (r, c) => this.grid.getPixelsFromGridPosition(r, c);
            this._getGridPosFromPixels = (x, y) => {
                const [i, j] = this.grid.getGridPositionFromPixels(x, y);
                return { i, j };
            };
        } else {
            this._getCenter = (r, c) => ({ x: c * 100, y: r * 100 });
            this._getTopLeft = (r, c) => ({ x: c * 100, y: r * 100 });
            this._getGridPosFromPixels = () => ({ i: 0, j: 0 });
        }
    }

    findPath(start, end) {
        const tW = this.token?.w ?? (this.grid.size || 100);
        const tH = this.token?.h ?? (this.grid.size || 100);

        const sPos = this._getGridPosFromPixels(start.x + (tW / 2), start.y + (tH / 2));
        const ePos = this._getGridPosFromPixels(end.x + (tW / 2), end.y + (tH / 2));

        const startKey = `${sPos.i},${sPos.j}`;
        const endKey = `${ePos.i},${ePos.j}`;

        if (startKey === endKey) return null;

        const D = 1;
        const D2 = Math.SQRT2;

        const heuristic = (dx, dy) => D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
        const getH = (node) => heuristic(Math.abs(node.i - ePos.i), Math.abs(node.j - ePos.j));

        const openSet = new BinaryHeap((node) => node.f);
        const nodeData = new Map();

        const startNode = {
            i: sPos.i,
            j: sPos.j,
            key: startKey,
            g: 0,
            f: getH(sPos)
        };

        openSet.push(startNode);
        nodeData.set(startKey, { parent: null, g: 0 });

        let iterations = 0;
        const directions = [
            { i: 0, j: 1 }, { i: 1, j: 0 }, { i: 0, j: -1 }, { i: -1, j: 0 },
            { i: 1, j: 1 }, { i: 1, j: -1 }, { i: -1, j: 1 }, { i: -1, j: -1 }
        ];

        while (openSet.size() > 0) {
            if (++iterations > this.MAX_ITERATIONS) return null;

            const current = openSet.pop();
            if (current.key === endKey) {
                return this.reconstructPath(nodeData, current.key, start, end);
            }

            const currentData = nodeData.get(current.key);
            if (currentData && currentData.g < current.g) continue;

            const currentCenter = this._getCenter(current.i, current.j);

            for (const dir of directions) {
                const nextI = current.i + dir.i;
                const nextJ = current.j + dir.j;
                const nextKey = `${nextI},${nextJ}`;

                const stepCost = (dir.i !== 0 && dir.j !== 0) ? D2 : D;
                const tentativeG = current.g + stepCost;

                const neighborData = nodeData.get(nextKey);
                if (neighborData && tentativeG >= neighborData.g) continue;

                const neighborCenter = this._getCenter(nextI, nextJ);
                if (testCollision(currentCenter, neighborCenter, "move", "any")) continue;

                nodeData.set(nextKey, { parent: current.key, g: tentativeG });

                const h = heuristic(Math.abs(nextI - ePos.i), Math.abs(nextJ - ePos.j));
                openSet.push({
                    i: nextI,
                    j: nextJ,
                    key: nextKey,
                    g: tentativeG,
                    f: tentativeG + h
                });
            }
        }

        return null;
    }

    reconstructPath(nodeData, currentKey, startPixel, endPixel) {
        const path = [];
        let curr = currentKey;
        const goalKey = currentKey;

        const tW = this.token?.w ?? (this.grid.size || 100);
        const tH = this.token?.h ?? (this.grid.size || 100);
        const gridSize = this.grid.size || 100;
        const offsetX = (gridSize - tW) / 2;
        const offsetY = (gridSize - tH) / 2;

        while (curr) {
            const data = nodeData.get(curr);
            let pt;

            if (curr === goalKey) {
                pt = { x: endPixel.x, y: endPixel.y };
            } else if (!data.parent) {
                pt = { x: startPixel.x, y: startPixel.y };
            } else {
                const [i, j] = curr.split(",").map(Number);
                const cellTL = this._getTopLeft(i, j);
                pt = { x: cellTL.x + offsetX, y: cellTL.y + offsetY };
            }

            path.push(pt);
            curr = data?.parent;
        }

        return path.reverse();
    }
}

class BinaryHeap {
    constructor(scoreFunction) {
        this.content = [];
        this.scoreFunction = scoreFunction;
    }

    push(element) {
        this.content.push(element);
        this.bubbleUp(this.content.length - 1);
    }

    pop() {
        const result = this.content[0];
        const end = this.content.pop();
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
        const element = this.content[n];
        const score = this.scoreFunction(element);
        while (n > 0) {
            const parentN = Math.floor((n + 1) / 2) - 1;
            const parent = this.content[parentN];
            if (score >= this.scoreFunction(parent)) break;
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        }
    }

    sinkDown(n) {
        const length = this.content.length;
        const element = this.content[n];
        const elemScore = this.scoreFunction(element);

        while (true) {
            const child2N = (n + 1) * 2;
            const child1N = child2N - 1;
            let swap = null;
            let child1Score;

            if (child1N < length) {
                const child1 = this.content[child1N];
                child1Score = this.scoreFunction(child1);
                if (child1Score < elemScore) swap = child1N;
            }

            if (child2N < length) {
                const child2 = this.content[child2N];
                const child2Score = this.scoreFunction(child2);
                if (child2Score < (swap === null ? elemScore : child1Score)) swap = child2N;
            }

            if (swap === null) break;
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
    }
}
