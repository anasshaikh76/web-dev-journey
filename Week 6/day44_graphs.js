// Problem 1 — Build a Graph (Adjacency List)

{
    class Graph {
        constructor() {
            this.adjacentlist = {};
        }
        addVertex(vertex) {
            if (!this.adjacentlist[vertex]) {
                this.adjacentlist[vertex] = [];
            }
        }
        addEdge(v1, v2) {
            this.adjacentlist[v1].push(v2);
            this.adjacentlist[v2].push(v1);
        }
        print() {
            for (let vertex in this.adjacentlist) {
                console.log(`${vertex} → [${this.adjacentlist[vertex]}]`);
            }
        }
    }
    const graph = new Graph();
    graph.addVertex("A");
    graph.addVertex("B");
    graph.addVertex("C");
    graph.addVertex("D");
    graph.addEdge("A", "B");
    graph.addEdge("A", "C");
    graph.addEdge("B", "D");
    graph.addEdge("C", "D");
    graph.print();
}

// Problem 2 — DFS on Graph (Recursive)

{
    const graph = {
        0: [1, 2],
        1: [0, 3],
        2: [0, 4],
        3: [1],
        4: [2]
    };

    function dfs(graph, start, visited = new Set()) {
        if (visited.has(start)) return [];

        visited.add(start);
        const result = [start];

        for (let neighbor of graph[start]) {
            result.push(...dfs(graph, neighbor, visited));
        }
        return result;
    }
    console.log(dfs(graph, 0));
}
// Note: DFS goes as DEEP as possible before backtracking. Uses recursion (or Stack). Visited Set prevents infinite loops in cyclic graphs!

// Problem 3 — BFS on Graph

{
    const graph = {
        0: [1, 2],
        1: [0, 3],
        2: [0, 4],
        3: [1],
        4: [2]
    };
    function bfs(graph, start) {
        const visited = new Set([start]);
        const queue = [start];
        const result = [];

        while (queue.length > 0) {
            const node = queue.shift();
            result.push(node);

            for (let neighbor of graph[node]) {
                if (!visited.has(neighbor)) {
                    visited.add(neighbor);
                    queue.push(neighbor);
                }
            }
        }
        return result;
    }
    console.log(bfs(graph, 0));
}
// Note: BFS explores level by level — finds SHORTEST path in unweighted graphs! Uses Queue instead of recursion!

// Problem 4 — Number of Connected Components

{
    function countComponents(n, edges) {
        // Build adjacency list
        const adj = {};
        for (let i = 0; i < n; i++) adj[i] = [];

        for (let [a, b] of edges) {
            adj[a].push(b);
            adj[b].push(a);
        }

        const visited = new Set();
        let components = 0;

        function dfs(node) {
            if (visited.has(node)) return;
            visited.add(node);
            for (let neighbor of adj[node]) {
                dfs(neighbor);
            }
        }

        for (let i = 0; i < n; i++) {
            if (!visited.has(i)) {
                dfs(i);
                components++; // new component found!
            }
        }
        return components;
    }

    console.log(countComponents(5, [[0,1],[1,2],[3,4]])); // 2
    console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // 1
}
// Note: LeetCode #323 — run DFS from every unvisited node. Each DFS call covers one connected component!

// Problem 5 — Number of Islands

{
    function numIslands(grid) {
        if (!grid || grid.length === 0) return 0;

        let isLands = 0;
        const rows = grid.length;
        const cols = grid[0].length;

        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] !== '1') return;

            grid[r][c] = '0';

            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === '1') {
                    isLands++;
                    dfs(r,c);
                }
            }
        }
        return isLands;
    }
    const grid1 = [
        ['1','1','0','0'],
        ['1','1','0','0'],
        ['0','0','1','0'],
        ['0','0','0','1']
    ];
    console.log(numIslands(grid1)); // 3
}
// Note: LeetCode #200 — most famous graph problem! Treat grid as graph, each cell connected to 4 neighbors. DFS sinks each island by marking visited cells as '0'!

// Problem 6 — Clone Graph

{
    class Node {
        constructor(val, neighbors = []) {
            this.val = val;
            this.neighbors = neighbors;
        }
    }

    function cloneGraph(node) {
        if (!node) return null;

        const cloned = new Map(); // original → clone

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

    // Build: 1 -- 2
    //        |    |
    //        4 -- 3
    const n1 = new Node(1);
    const n2 = new Node(2);
    const n3 = new Node(3);
    const n4 = new Node(4);
    n1.neighbors = [n2, n4];
    n2.neighbors = [n1, n3];
    n3.neighbors = [n2, n4];
    n4.neighbors = [n1, n3];

    const cloned = cloneGraph(n1);
    console.log(cloned.val);                    // 1
    console.log(cloned.neighbors[0].val);       // 2
    console.log(cloned !== n1);                 // true (different object!)
}
// Note: LeetCode #133 — use hash map to track original→clone mapping. Prevents infinite loops AND maps original nodes to their clones!

// Problem 7 — Course Schedule (Cycle Detection)

{
    function canFinish(numCourses, prerequisities) {
        const adj = Array.from({length: numCourses}, () => []);

        for (let [course, pre] of prerequisities) {
            adj[course].push(pre);
        }
        const state = new Array(numCourses).fill(0);

        function hasCycle(node) {
            if (state[node] === 1) return true;
            if (state[node] === 2) return false;

            state[node] = 1;

            for (let neighbor of adj[node]) {
                if (hasCycle(neighbor)) return true;
            }
            state[node] = 2;
            return false;
        }
        for (let i = 0; i < numCourses; i++) {
            if (hasCycle(i)) return false;
        }
        return true;
    }
    console.log(canFinish(2, [[1,0]]));        // true (0→1)
    console.log(canFinish(2, [[1,0],[0,1]]));
}
// Note: LeetCode #207 — detect cycle in directed graph! Three states: unvisited(0), currently visiting(1), fully processed(2). If we visit a node that's currently being visited = cycle!

// Problem 8 — Rotting Oranges (Multi-source BFS)

{
    function orangesRotting(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const queue = [];
        let fresh = 0;

        // Find all rotten oranges and count fresh
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 2) queue.push([r, c]);
                if (grid[r][c] === 1) fresh++;
            }
        }

        if (fresh === 0) return 0;

        const directions = [[1,0],[-1,0],[0,1],[0,-1]];
        let minutes = 0;

        while (queue.length > 0 && fresh > 0) {
            const size = queue.length;
            minutes++;

            for (let i = 0; i < size; i++) {
                const [r, c] = queue.shift();

                for (let [dr, dc] of directions) {
                    const nr = r + dr;
                    const nc = c + dc;

                    if (nr >= 0 && nr < rows && nc >= 0 &&
                        nc < cols && grid[nr][nc] === 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.push([nr, nc]);
                    }
                }
            }
        }
        return fresh === 0 ? minutes : -1;
    }

    console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4
    console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // -1
}
// Note: LeetCode #994 — Multi-source BFS! Start BFS from ALL rotten oranges simultaneously. Each BFS level = 1 minute. Classic interview problem!

// Problem 9 — Pacific Atlantic Water Flow

{
    function pacificAtlantic(heights) {
        const rows = heights.length;
        const cols = heights[0].length;
        const pacific = new Set();
        const atlantic = new Set();
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        function dfs(r, c, visited, prevHeight) {
            const key = `${r}, ${c}`;
            if (r < 0 || r >= rows || c < 0 || c >= cols || visited.has(key) || heights[r][c] < prevHeight) return;

            visited.add(key);
            for (let [dr, dc] of dirs) {
                dfs(r + dr, c + dc, visited, heights[r][c]);
            }
        }

        for (let r= 0; r < rows; r++) {
            dfs(r, 0, pacific, heights[r][0]);
            dfs(r, cols - 1, atlantic, heights[r][cols - 1]);
        }
        for (let c = 0; c < cols; c++) {
            dfs(0, c, pacific, heights[0][c]);
            dfs(rows - 1, c, atlantic, heights[rows - 1][c]);
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
}
// Note: LeetCode #417 — reverse thinking! Instead of water flowing down, work backwards from oceans upward. Cell reaches both oceans = valid answer!

// Problem 10 — Word Ladder (BFS Shortest Path)

{
    function ladderLength(beginWord, endWord, wordList) {
        const wordSet = new Set(wordList);
        if (!wordSet.has(endWord)) return 0;

        const queue = [[beginWord, 1]];
        const visited = new Set([beginWord]);

        while (queue.length > 0) {
            const [word, length] = queue.shift();

            for (let i = 0; i < word.length; i++) {
                for (let c = 97; c <= 122; c++) {
                    const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

                    if (newWord === endWord) return length + 1;

                    if (wordSet.has(newWord) && !visited.has(newWord)) {
                        visited.add(newWord);
                        queue.push([newWord, length + 1]);
                    }
                }
            }
        }
        return 0;
    }
    console.log(ladderLength("hit", "cog",
        ["hot","dot","dog","lot","log","cog"])); // 5
}
// Note: LeetCode #127 — classic BFS shortest path! Each word = a graph node, edges between words differing by 1 letter. BFS finds shortest transformation sequence!
