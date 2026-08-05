// Problem 1 — Number of Islands (Write from memory first!)

{
    function numIslands(grid) {
        let count = 0;
        const rows = grid.length;
        const cols = grid[0].length;

        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;

            grid[r][c] = '0';
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === '1'){
                    count++;
                    dfs(r, c);
                }
            }
        }
        return count;
    }

    console.log(numIslands([
        ['1','1','0','0'],
        ['1','0','0','1'],
        ['0','0','1','1']
    ])); // 3
}

// Problem 2 — Max Area of Island

{
    function maxAreaOfIsland(grid) {
        let maxArea = 0;
        const rows = grid.length;
        const cols = grid[0].length;

        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === 0) return 0;

            grid[r][c] = 0;
            return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
        }

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 1) {
                    maxArea = Math.max(maxArea, dfs(r, c));
                }
            }
        }
        return maxArea;
    }

    console.log(maxAreaOfIsland([
        [0,0,1,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,1,1,0,1,0,0,0,0,0,0,0,0],
        [0,1,0,0,1,1,0,0,1,0,1,0,0],
        [0,1,0,0,1,1,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0],
        [0,0,0,0,0,0,0,1,1,1,0,0,0],
        [0,0,0,0,0,0,0,1,1,0,0,0,0]
    ])); // 6
}
// Note: LeetCode #695 — same as Islands but return SIZE instead of count. DFS returns 1 + area of all neighbors!

// Problem 3 — Surrounded Regions

{
    function solve(board) {
        const rows = board.length;
        const cols = board[0].length;

        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;

            board[r][c] = 'S';
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }

        for (let r = 0; r < rows; r++) {
            if (board[r][0] === '0') dfs(r, 0);
            if (board[r][cols - 1] === '0') dfs(r, cols - 1);
        }
        for (let c = 0; c < cols; c++) {
            if (board[0][c] === 'O') dfs(0, c);
            if (board[rows-1][c] === 'O') dfs(rows-1, c);
        }
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (board[r][c] === 'O') board[r][c] = 'X';
                else if (board[r][c] === 'S') board[r][c] = 'O';
            }
        }
    }

    const board = [
        ['X', 'X', 'X', 'X'],
        ['X', 'O', 'O', 'X'],
        ['X', 'X', 'O', 'X'],
        ['X', 'O', 'X', 'X']
    ];
    solve(board);
    console.log(board);
}

// Problem 4 — Rotting Oranges (Multi-source BFS)

{
    function orangesRotting(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const queue = [];
        let fresh = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 2) queue.push([r, c]);
                if (grid[r][c] === 1) fresh++;
            }
        }

        if (fresh.length === 0) return 0;

        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
        let minutes = 0;

        while (queue.length > 0 && fresh > 0) {
            const size = queue.length;
            minutes++;

            for (let i = 0; i < size; i++) {
                const [r, c] = queue.shift();

                for (let [dr, dc] of dirs) {
                    const nr = r + dr, nc = c + dc;
                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.push([nr, nc]);
                    }
                }
            }
        }
        return fresh === 0 ? minutes : -1;
    }

    console.log(orangesRotting([
        [2, 1, 1],
        [1, 1, 0],
        [0, 1, 1]
    ])); // 4
}
// Note: LeetCode #994 — KEY insight: add ALL rotten oranges to queue BEFORE starting BFS. This is multi-source BFS — all sources spread simultaneously!

// Problem 5 — Clone Graph

{
    class Node {
        constructor(val, neighbors = []) {
            this.val = val;
            this.neighbors = neighbors;
        }
    }

    function cloneGraph(node) {
        if (!node) return null;
        const cloned = new Map();

        function dfs(node) {
            if (cloned.has(node)) return cloned.get(node);
            const clone = new Node(node.val);
            cloned.set(node, clone);
            for (let neighbor of node.neighbors) {
                clone.neighbors.push(dfs(neighbor));
            }
            return clone;
        }
        return dfs(node);
    }

    const n1 = new Node(1);
    const n2 = new Node(2);
    const n3 = new Node(3);
    n1.neighbors = [n2, n3];
    n2.neighbors = [n1];
    n3.neighbors = [n1];

    const cloned = cloneGraph(n1);
    console.log(cloned.val);                // 1
    console.log(cloned !== n1);             // true (different object!)
    console.log(cloned.neighbors[0].val);   // 2
}
// Note: LeetCode #133 — Map stores original→clone. Check map before creating new clone to handle cycles!

// Problem 6 — Is Graph Bipartite?

{
    function isBipartite(graph) {
        const color = new Array(graph.length).fill(-1);

        function bfs(start) {
            const queue = [start];
            color[start] = 0;

            while (queue.length > 0) {
                const node = queue.shift();

                for (let neighbor of graph[node]) {
                    if (color[neighbor] === -1) {
                        color[neighbor] = 1 - color[node];
                        queue.push(neighbor);
                    } else if (color[neighbor] === color[node]) {
                        return false;
                    }
                }
            }
            return true;
        }
        for (let i = 0; i < graph.length; i++) {
            if (color[i] === -1){
                if (!bfs(i)) return false;
            }
        }
        return true;
    }

    console.log(isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]]));
    // false
    console.log(isBipartite([[1,3],[0,2],[1,3],[0,2]]));
    // true
}
// Note: LeetCode #785 — try to color graph with 2 colors. If neighbors have same color = not bipartite. BFS with color flipping!

// Problem 7 — Find if Path Exists in Graph

{
    function validPath(n, edges, source, destination) {
        if (source === destination) return true;

        const adj = Array.from({length: n}, () => []);
        for (let [u, v] of edges) {
            adj[u].push(v);
            adj[v].push(u);
        }

        const visited = new Set([source]);
        const queue = [source];

        while (queue.length > 0) {
            const node = queue.shift();

            for (let neighbor of adj[node]) {
                if (neighbor === destination) return true;
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return false;
    }

    console.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2)); // true
    console.log(validPath(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5)); // false
}
// Note: LeetCode #1971 — simplest graph problem! BFS from source, check if we reach destination. Good warmup problem!

// Problem 8 — Pacific Atlantic Water Flow

{
    function pacificAtlantic(heights) {
        const rows = heights.length;
        const cols = heights[0].length;
        const pacific = new Set();
        const atlantic = new Set();
        const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

        function dfs(r, c, visited, prevHeight) {
            const key = `${r}, ${c}`;
            if (r < 0 || r >= rows || c < 0 || c >= cols || visited.has(key) || heights[r][c] < prevHeight) return;

            visited.add(key);
            for (let [dr, dc] of dirs) {
                dfs(r + dr, c + dc, visited, heights[r][c]);
            }
        }

        for (let r = 0; r < rows; r++) {
            dfs(r, 0, pacific, heights[r][0]);
            dfs(r, cols - 1, atlantic, heights[r][cols - 1]);
        }

        for (let c = 0; c < cols; c++) {
            dfs(0, c, pacific, heights[0][c]);
            dfs(rows - 1, c, atlantic, heights[rows - 1][c])
        }

        const result = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (pacific.has(`${r}, ${c}`) && atlantic.has(`${r}, ${c}`)) {
                    result.push([r, c]);
                }
            }
        }
        return result;
    }

    console.log(pacificAtlantic([
        [1,2,2,3,5],
        [3,2,3,4,4],
        [2,4,5,3,1],
        [6,7,1,4,5],
        [5,1,1,2,4]
    ]));
    // [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
}
// Note: LeetCode #417 — reverse thinking! Work backwards from oceans. DFS going UPHILL from each ocean border!

// Problem 9 — Course Schedule II (Topological Sort)

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
            if (inDegree[i] === 0) queue.push(i);
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
    // [0,2,1,3] or [0,1,2,3]
    console.log(findOrder(2, [[1,0],[0,1]]));
    // [] (cycle!)
}
// Note: LeetCode #210 — Kahn's topological sort. Start from nodes with no incoming edges, remove them and process neighbors!

// Problem 10 — Mini Challenge: Graph Template Writer

// Don't run this — just READ and memorize these templates:

{
    // TEMPLATE 1: Grid DFS
    function gridDFS(graph, r, c) {
        const rows = grid.length, cols = grid[0].length;
        if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
        grid[r][c] = '0';
        gridDFS(grid, r + 1, c);
        gridDFS(grid, r - 1, c);
        gridDFS(grid, r, c + 1);
        gridDFS(grid, r, c - 1);
    }

    // TEMPLATE 2: Graph BFS
    function graphDFS(adj, start) {
        const visited = new Set([start]);
        const queue = [start];
        while (queue.length > 0) {
            const node = queue.shift();
            for (let neighbor of adj[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
    }

    // // TEMPLATE 3: Multi-source BFS
    function multiSource(grid, source) {
        const queue = [...source];
        while (queue.length > 0) {
            const [r, c] = queue.shift();
        }
    }

    // // TEMPLATE 4: Topological Sort
    function topoSort(n, edges) {
        const adj = Array.from({length: n}, () => []);
        const inDegree = new Array(n).fill(0);
        for (let [u, v] of edges) {
            adj[u].push(v);
            inDegree[v]++;
        }
        const queue = [];
        for (let i = 0; i < n; i++) {
            if (inDegree[i] === 0) {
                queue.push(i);
            }
        }
        const result = [];
        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);

            for (let next of adj[node]) {
                if (--inDegree[next] === 0) {
                    queue.push(next);
                }
            }
        }
        return result.length === n ? result : [];
    }

    console.log("Templates memorized! ✅");
}
// Your actual task: Copy these 4 templates into your notes. These cover 90% of all graph problems!