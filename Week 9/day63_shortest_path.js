// Problem 1 — Dijkstra Implementation

{
    function dijkstra(graph, start) {
        const dist = {};
        const visited = new Set();

        for (let node in graph) dist[node] = Infinity;
        dist[start] = 0;

        let pq = [[0, start]];

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [d, node] = pq.shift();

            if (visited.has(node)) continue;
            visited.add(node);

            for (let [neighbor, weight] of graph[node]) {
                const newDist = d + weight;
                if (newDist < dist[neighbor]) {
                    dist[neighbor] = newDist;
                    pq.push([newDist, neighbor]);
                }
            }
        }
        return dist;
    }

    const graph = {
        'A': [['B',4],['C',2]],
        'B': [['D',3],['C',1]],
        'C': [['B',1],['D',5]],
        'D': []
    };

    console.log(dijkstra(graph, 'A'));
}
// Note: Always process minimum distance node first. Once visited, distance is final — never update again!

// Problem 2 — Network Delay Time

{
    function networkDelayTime(times, n, k) {
        const adj = Array.from({length : n + 1}, () => []);
        for (let [u, v, w] of times) adj[u].push([v, w]);

        const dist = new Array(n + 1).fill(Infinity);
        dist[k] = 0;

        let pq = [[0, k]];

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [d, u] = pq.shift();

            if (d > d[u]) continue;

            for (let [v, w] of adj[u]) {
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push([dist[v], v]);
                }
            }
        }
        const maxDist = Math.max(...dist.slice(1));
        return maxDist === Infinity ? -1 : maxDist;
    }

    console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // 2
    console.log(networkDelayTime([[1,2,1]], 2, 1));                  // 1
}
// Note: LeetCode #743 — Dijkstra from source k to ALL nodes. Answer = max of all shortest distances!

// Problem 3 — Path With Minimum Effort

{
    function minimumEffortPath(heights) {
        const rows = heights.length, cols = heights[0].length;
        const effort = Array.from({length : rows}, () => new Array(cols).fill(Infinity));
        effort[0][0] = 0;

        let pq = [[0, 0, 0]];
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [e, r, c] = pq.shift();

            if (r === rows - 1 && c === cols - 1) return e;
            if (e > effort[r][c]) continue;

            for (let [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;

                const newEffort = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));

                if (newEffort < effort[nr][nc]) {
                    effort[nr][nc] = newEffort;
                    pq.push([newEffort, nr, nc]);
                }
            }
        }
        return 0;
    }

    console.log(minimumEffortPath([
        [1,2,2],
        [3,8,2],
        [5,3,5]
    ])); // 2
}
// Note: LeetCode #1631 — Dijkstra on grid! Instead of summing weights, take MAX difference along path. Minimize this maximum!

// Problem 4 — Cheapest Flights Within K Stops (Bellman-Ford)

{
    function findCheapestPrice(n, flights, src, dst, k) {
        let prices = new Array(n).fill(Infinity);
        prices[src] = 0;

        for (let i = 0; i <= k; i++) {
            const temp = [...prices];

            for (let [u, v, w] of flights) {
                if (prices[u] !== Infinity && prices[u] + w < temp[v]) {
                    temp[v] = prices[u] + w;
                }
            }
            prices = temp;
        }
        return prices[dst] === Infinity ? -1 : prices[dst];
    }

    console.log(findCheapestPrice(4,
        [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],
        0, 3, 1)); // 700
    console.log(findCheapestPrice(3,
        [[0,1,100],[1,2,100],[0,2,500]],
        0, 2, 1)); // 200
}
// Note: LeetCode #787 — k stops constraint means run Bellman-Ford exactly k+1 times. Copy array each iteration to prevent using updated values in same round!

// Problem 5 — Path With Maximum Probability

{
    function maxProbability(n, edges, succProb, start, end) {
        const adj = Array.from({length : n}, () => []);

        for (let i = 0; i < edges.length; i++) {
            const [u, v] = edges[i];
            adj[u].push([v, succProb[i]]);
            adj[v].push([u, succProb[i]]);
        }

        const prob = new Array(n).fill(0);
        prob[start] = 1.0;

        const pq = [[1.0, start]];

        while (pq.length > 0) {
            pq.sort((a, b) => b[0] - a[0]);
            const [p, node] = pq.shift();

            if (node === end) return p;
            if (p < prob[node]) continue;

            for (let [neighbor, edgeProb] of adj[node]) {
                const newPron = p * edgeProb;
                if (newPron > prob[neighbor]) {
                    prob[neighbor] = newPron;
                    pq.push([newPron, neighbor]);
                }
            }
        }
        return 0;
    }

    console.log(maxProbability(3,
        [[0,1],[1,2],[0,2]],
        [0.5,0.5,0.2],
        0, 2)); // 0.25
}
// Note: LeetCode #1514 — Dijkstra but maximize probability instead of minimize distance! Use MAX heap, multiply probabilities instead of adding weights!

// Problem 6 — Bellman-Ford Implementation

{
    function bellmanFord(n, edges, src) {
        const dist = new Array(n).fill(Infinity);
        dist[src] = 0;

        for (let i = 0; i < n - 1; i++) {
            for (let [u, v, w] of edges) {
                if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        for (let [u, v, w] of edges) {
            if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
                console.log("Negative Cycle Detected");
                return null;
            }
        }
        return dist;
    }

    const edges = [[0,1,4],[0,2,5],[1,3,2],[2,1,-3],[3,4,1]];
    console.log(bellmanFord(5, edges, 0));
    // [0, 2, 5, 4, 5]
}