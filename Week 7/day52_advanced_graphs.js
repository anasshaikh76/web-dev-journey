// Problem 1 — Topological Sort (Kahn's Algorithm - BFS)

{
    function topologicalSort(numNodes, edges) {
        const adj = Array.from({length: numNodes}, () => []);
        const inDegree = new Array(numNodes).fill(0);

        for (let [u, v] of edges) {
            adj[u].push(v);
            inDegree[v]++;
        }
        const queue =[];
        for (let i = 0; i < numNodes; i++) {
            if (inDegree[i] === 0) queue.push(i);
        }

        const result = [];
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);

            for (let neighbor of adj[node]) {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) {
                    queue.push(neighbor);
                }
            }
        }
        return result.length === numNodes ? result : [];
    }

    console.log(topologicalSort(6, [
        [5,2],[5,0],[4,0],[4,1],[2,3],[3,1]
    ]));
    // [4,5,0,2,3,1] or similar valid ordering
}
// Note: Kahn's Algorithm — start from nodes with no incoming edges, remove them and reduce neighbors' in-degrees. If all nodes processed = valid topological order!

// Problem 2 — Topological Sort (DFS approach)

{
    function topoSortDFS(numNodes, edges) {
        const adj = Array.from({length: numNodes}, () => []);
        for (let [u, v] of edges) adj[u].push(v);

        const visited = new Set();
        const stack = [];

        function dfs(node) {
            visited.add(node);
            for (let neighbor of adj[node]) {
                if (!visited.has(neighbor)) dfs(neighbor);
            }
            stack.push(node);
        }
        for (let i = 0; i < numNodes; i++) {
            if (!visited.has(i)) dfs(i);
        }
        return stack.reverse();
    }

    console.log(topoSortDFS(4, [[0,1],[0,2],[1,3],[2,3]]));
    // [0,1,2,3] or [0,2,1,3]
}
// Note: DFS approach — push node to stack AFTER all its descendants are processed. Reverse stack = topological order!

// Problem 3 — Course Schedule (Topo Sort)

{
    function canFinish(numCourses, prerequisites) {
        const adj = Array.from({length: numCourses}, () => []);
        const inDegree = new Array(numCourses).fill(0);

        for (let [course, pre] of prerequisites) {
            adj[pre].push(course);
            inDegree[course]++;
        }

        const queue = [];
        for (let i = 0; i < numCourses; i++) {
            if (inDegree[i] === 0) queue.push(i);
        }

        let completed = 0;
        while (queue.length > 0) {
            const course = queue.shift();
            completed++;

            for (let next of adj[course]) {
                inDegree[next]--;
                if (inDegree[next] === 0) queue.push(next);
            }
        }
        return completed === numCourses;
    }

    console.log(canFinish(2, [[1,0]]));       // true
    console.log(canFinish(2, [[1,0],[0,1]])); // false (cycle!)
}
// Note: LeetCode #207 — you solved this with DFS on Day 44! Now solved with Topological Sort (Kahn's). Two approaches same problem!

// Problem 4 — Course Schedule II (Return Order)

{
    function findOrder(numCourses, prerequisites) {
        const adj = Array.from({length: numCourses}, () => []);
        const inDegree = new Array(numCourses).fill(0);

        for (let [course, pre] of prerequisites) {
            adj[pre].push(course);
            inDegree[course]++;
        }
        const queue = [];
        for (let i = 0; i < numCourses; i++) {
            if (inDegree[i]=== 0) queue.push(i);
        }

        const order = [];
        while (queue.length > 0) {
            const course = queue.shift();
            order.push(course);

            for (let next of adj[course]) {
                inDegree[next]--;
                if (inDegree[next] === 0) queue.push(next);
            }
        }
        return order.length === numCourses ? order : [];
    }

    console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));
    // [0,1,2,3] or [0,2,1,3]
    console.log(findOrder(2, [[1,0],[0,1]]));
    // [] (cycle!)
}
// Note: LeetCode #210 — same as canFinish but return the actual order!

// Problem 5 — Dijkstra's Algorithm

{
    function dijkstra(graph, start) {
        const distance = {};
        const visited = new Set();

        for (let node in graph) {
            distance[node] = Infinity;
        }
        distance[start] = 0;

        let pq = [[0, start]];

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [dist, node] = pq.shift();

            if (visited.has(node)) continue;
            visited.add(node);

            for (let [neighbor, weight] of graph[node]) {
                const newDist = dist + weight;
                if (newDist < distance[neighbor]) {
                    distance[neighbor] = newDist;
                    pq.push([newDist, neighbor]);
                }
            }
        }
        return distance;
    }

    const graph = {
        'A': [['B', 4], ['C', 2]],
        'B': [['D', 3], ['C', 1]],
        'C': [['B', 1], ['D', 5]],
        'D': []
    };

    console.log(dijkstra(graph, 'A'));
    // {A:0, B:3, C:2, D:6}
    // Shortest: A→C→B→D = 2+1+3 = 6
}
// Note: Greedy algorithm — always process the closest unvisited node first. With proper Min Heap this is O((V+E) log V)!

// Problem 6 — Network Delay Time (Dijkstra)

{
    function networkDelayTime(times, n, k) {
        const adj = Array.from({length: n+1}, () => []);
        for (let [u,v,w] of times) {
            adj[u].push([v, w]);
        }

        const dist = new Array(n + 1).fill(Infinity);
        dist[k] = 0;

        let pq = [[0, k]];

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [d, u] = pq.shift();

            if (d > dist[u]) continue;

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
// Note: LeetCode #743 — find shortest path from source k to ALL nodes. Answer = max of all shortest paths (slowest signal)!

// Problem 7 — Cheapest Flights Within K Stops

{
    function findCheapestPrice(n, flights, src, dst, k) {
        let price = new Array(n).fill(Infinity);
        price[src] = 0;

        for (let i = 0; i <= k; i++) {
            let temp = [...price];

            for (let [u, v, w] of flights) {
                if (price[u] !== Infinity && price[u] + w < temp[v]) {
                    temp[v] = price[u] + w;
                }
            }
            price = temp;
        }
        return price[dst] === Infinity ? -1 : price[dst];
    }

    console.log(findCheapestPrice(4,
        [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]],
        0, 3, 1)); // 700
    console.log(findCheapestPrice(3,
        [[0,1,100],[1,2,100],[0,2,500]],
        0, 2, 1)); // 200
}
// Note: LeetCode #787 — modified Bellman-Ford! Regular Dijkstra won't work because we have constraint on stops. Run relaxation k+1 times!

// Problem 8 — Minimum Spanning Tree (Kruskal's)

{
    function minimumSpanningTree(n, edges) {
        edges.sort((a, b) => a[2] - b[2]);

        const parent = Array.from({length: n}, (_,i) => i);
        const rank = new Array(n).fill(0);

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }

        function union(x, y) {
            const px = find(x), py = find(y);
            if (px === py) return false;
            if (rank[px] < rank[py]) parent[px] = py;
            else if (rank[px] > rank[py]) parent[py] = px;
            else { parent[py] = px; rank[px]++; }
            return true;
        }

        let totalWeight = 0;
        let edgesUsed = 0;
        const mstEdges = [];

        for (let [u, v, w] of edges) {
            if (union(u, v)) {
                totalWeight +=w;
                edgesUsed++;
                mstEdges.push([u, v, w]);
                if (edgesUsed === n - 1) break;
            }
        }
        return { totalWeight, mstEdges };
    }

    const result = minimumSpanningTree(4, [
        [0,1,10],[0,2,6],[0,3,5],[1,3,15],[2,3,4]
    ]);
    console.log(result.totalWeight); // 19
    console.log(result.mstEdges);    // [[2,3,4],[0,3,5],[0,1,10]]
}
// Note: Kruskal's = sort edges by weight, add edge if it doesn't create cycle (Union Find). Result = minimum cost to connect all nodes!

// Problem 9 — Alien Dictionary (Topo Sort)

{
    function alienOrder(words) {
        const adj = new Map();
        const inDegree = new Map();

        for (let word of words) {
            for (let char of word) {
                if (!adj.has(char)) adj.set(char, new Set());
                if (!inDegree.has(char)) inDegree.set(char, 0);
            }
        }

        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i], w2 = words[i + 1];
            const minLen = Math.min(w1.length, w2.length);

            if (w1.length > w2.length && w1.startsWith(w2)) return "";

            for (let j = 0; j < minLen; j++) {
                if (w1[j] !== w2[j]) {
                    if (!adj.get(w1[j]).has(w2[j])) {
                        adj.get(w1[j]).add(w2[j]);
                        inDegree.set(w2[j], inDegree.get(w2[j])+1);
                    }
                    break;
                }
            }
        }

        const queue = [];
        for (let [char, degree] of inDegree) {
            if (degree === 0) queue.push(char);
        }

        let result = "";
        while (queue.length > 0) {
            queue.sort(); // for consistent ordering
            const char = queue.shift();
            result += char;

            for (let neighbor of adj.get(char)) {
                inDegree.set(neighbor, inDegree.get(neighbor)-1);
                if (inDegree.get(neighbor) === 0) queue.push(neighbor);
            }
        }

        return result.length === inDegree.size ? result : "";
    }

    console.log(alienOrder(["wrt","wrf","er","ett","rftt"]));
}
// Note: LeetCode #269 — compare adjacent words to find character ordering, then topological sort to find alien alphabet order!

// Problem 10 — Swim in Rising Water

{
    function swimInWater(grid) {
        const n = grid.length;
        const visited = new Set();
        let pq = [[grid[0][0], 0, 0]]; // [time, row, col]
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [t, r,c] = pq.shift();

            if (r === n-1 && c === n-1) return t;

            const key = `${r},${c}`;
            if (visited.has(key)) continue;
            visited.add(key);

            for (let [dr, dc] of dirs) {
                const nr = r+dr, nc = c+dc;
                if (nr>=0 && nr<n && nc>=0 && nc<n &&
                    !visited.has(`${nr},${nc}`)) {
                    pq.push([Math.max(t, grid[nr][nc]), nr, nc]);
                }
            }
        }
        return -1;
    }

    console.log(swimInWater([
        [0,2],
        [1,3]
    ])); // 3

    console.log(swimInWater([
        [0,1,2,3,4],
        [24,23,22,21,5],
        [12,13,14,15,16],
        [11,17,18,19,20],
        [10,9,8,7,6]
    ])); // 16
}