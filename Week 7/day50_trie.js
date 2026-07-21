// Problem 1 — Trie Implementation

{
    class TrieNode {
        constructor() {
            this.children = {};
            this.isEnd = false;
        }
    }
    class Trie {
        constructor() {
            this.root = new TrieNode();
        }
        insert(word) {
            let node = this.root;
            for (let char of word) {
                if (!node.children[char]) {
                    node.children[char] = new TrieNode();
                }
                node = node.children[char];
            }
            node.isEnd = true;
        }
        search(word) {
            let node = this.root;
            for (let char of word) {
                if (!node.children[char]) return false;
                node = node.children[char];
            }
            return node.isEnd;
        }
        startsWith(prefix) {
            let node = this.root;
            for (let char of prefix) {
                if (!node.children[char]) return false;
                node = node.children[char];
            }
            return true;
        }
    }

    const trie = new Trie();
    trie.insert ("apple");
    trie.insert ("app");
    trie.insert ("application");

    console.log(trie.search("apple"));      // true
    console.log(trie.search("app"));        // true
    console.log(trie.search("ap"));         // false (not a word!)
    console.log(trie.startsWith("ap"));     // true (prefix exists)
    console.log(trie.startsWith("xyz"));
}
// Note: LeetCode #208 — key difference: search checks isEnd, startsWith doesn't!

// Note: LeetCode #208 — key difference: search checks isEnd, startsWith doesn't!

{
    class TrieNode {
        constructor() { this.children = {}; this.word = null; }
    }
    function findWords(board, words) {
        const root = new TrieNode();
        for (let word of words) {
            let node = root;
            for (let char of word) {
                if (!node.children[char]) node.children[char] = new TrieNode();
                node = node.children[char];
            }
            node.word = word;
        }
        const result = new Set();
        const rows = board.length;
        const cols = board[0].length;

        function dfs(r, c, node) {
            if (r <0 || r >= rows || c < 0 || c >= cols) return;
            const char = board[r][c];
            if (char === '#' || !node.children[char]) return;

            const nextNode = node.children[char];
            if (nextNode.word) result.add(nextNode.word);

            board[r][c] = '#';
            dfs(r+1, c, nextNode);
            dfs(r-1, c, nextNode);
            dfs(r, c+1, nextNode);
            dfs(r, c-1, nextNode);
            board[r][c] = char; // restore
        }
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                dfs(r, c, root);
            }
        }
        return [...result];
    }

    console.log(findWords([
        ['o','a','a','n'],
        ['e','t','a','e'],
        ['i','h','k','r'],
        ['i','f','l','v']
    ], ["oath","pea","eat","rain"]));
    // ["eat","oath"]
}
// Note: LeetCode #212 — Trie + Backtracking combined! Build trie from words, then DFS on board following trie paths. Much faster than searching each word separately!

// Problem 3 — Design Add and Search Words

{
    class TrieNode {
        constructor() { this.children = {}; this.isEnd = false; }
    }
    class WordDictionary {
        constructor() { this.root = new TrieNode(); }

        addWord(word) {
            let node = this.root;
            for (let char of word) {
                if (!node.children[char]) node.children[char] = new TrieNode();
                node = node.children[char];
            }
            node.isEnd = true;
        }
        search(word) {
            function dfs(node, i) {
                if (i === word.length) return node.isEnd;

                const char = word[i];

                if (char === '.') {
                    for (let child of Object.values(node.children)) {
                        if (dfs(child, i + 1)) return true;
                    }
                    return false;
                }else {
                    if (!node.children[char]) return false;
                    return dfs(node.children[char], i + 1);
                }
            }
            return dfs(this.root, 0);
        }
    }

    const dict = new WordDictionary();
    dict.addWord("bad");
    dict.addWord("dad");
    dict.addWord("mad");

    console.log(dict.search("pad")); // false
    console.log(dict.search("bad")); // true
    console.log(dict.search(".ad")); // true (matches bad/dad/mad)
    console.log(dict.search("b..")); // true (matches bad)
}
// Note: LeetCode #211 — '.' is wildcard, must try ALL children! DFS through trie for wildcard matching!

// Problem 4 — Autocomplete System

{
    class TrieNode {
        constructor() {
            this.children = {};
            this.isEnd = false;
            this.word = null;
        }
    }
    class AutoComplete {
        constructor(words) {
            this.root = new TrieNode();
            for (let word of words) this.insert(word);
        }
        insert(word) {
            let node = this.root;
            for (let char of word) {
                if (!node.children[char]) node.children[char] = new TrieNode();
                node = node.children[char];
            }
            node.isEnd = true;
            node.word = word;
        }
        getSuggestions(prefix) {
            let node = this.root;
            for (let char of prefix) {
                if (!node.children[char]) return [];
                node = node.children[char];
            }
            const result = [];
            function dfs(node) {
                if (node.isEnd) result.push(node.word);
                for (let child of Object.values(node.children)) {
                    dfs(child);
                }
            }
            dfs(node);
            return result;
        }
    }

    const ac = new AutoComplete([
        "anime", "animation", "android", "anas",
        "javascript", "java", "react", "red Dragon"
    ]);

    console.log(ac.getSuggestions("an")); // ["anime","animation","android"]
    console.log(ac.getSuggestions("ja")); // ["javascript","java"]
    console.log(ac.getSuggestions("re")); // ["react"]
}
// Note: This is literally how search bar autocomplete works! Build trie from dictionary, find node for prefix, DFS to collect all words!

// Problem 5 — Longest Word in Dictionary

{
    function longestWord(words) {
        const wordSet = new Set(words);
        let longest = "";

        words.sort();

        for (let word of words) {
            if (word.length === 1 || wordSet.has(word.slice(0, -1))) {
                if (word.length > longest.length) {
                    longest = word;
                }
            }
        }
        return longest;
    }

    console.log(longestWord(["w","wo","wor","worl","world"]));
    // "world"
    console.log(longestWord(["a","banana","app","appl","ap","apply","apple"]));
    // "apple"
}
// Note: LeetCode #720 — a word is valid only if all its prefixes exist in the dictionary!

// Problem 6 — Union Find Implementation

{
    class UnionFind {
        constructor(n) {
            this.parent = Array.from({length: n}, (_, i) => i);
            this.rank = new Array(n).fill(0);
            this.components = n;
        }
        find(x) {
            if (this.parent[x] !== x) {
                this.parent[x] = this.find(this.parent[x]);
            }
            return this.parent[x];
        }
        union(x, y) {
            const px = this.find(x);
            const py = this.find(y);

            if (px === py) return false;

            if (this.rank[px] < this.rank[py]) {
                this.rank[px] = py;
            } else if (this.rank[px] > this.rank[py]) {
                this.rank[py] = px;
            } else {
                this.rank[py] = px;
                this.rank[px]++;
            }

            this.components--;
            return true;
        }

        connected(x, y) {
            return this.find(x) === this.find(y);
        }
    }

     const uf = new UnionFind(5);
    uf.union(0, 1);
    uf.union(1, 2);
    uf.union(3, 4);

    console.log(uf.connected(0, 2)); // true
    console.log(uf.connected(0, 3)); // false
    console.log(uf.components);      // 2
}
// Note: Union Find = track which elements are in the same group. Path compression + union by rank makes operations nearly O(1)!

// Problem 7 — Number of Islands with Union Find

{
    function numIslands(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;
        const parent = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === '1') {
                    parent[r * cols + c] = r * cols + c;
                    count++;
                } else {
                    parent[r * cols + 1] = -1;
                }
            }
        }
        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }
        function union(x, y) {
            const px = find(x), py = find(y);
            if (px === py) return;
            parent[px] = py;
            count--;
        }

        const dirs = [[1,0],[0,1]]; // only right and down
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === '1') {
                    for (let [dr, dc] of dirs) {
                        const nr = r + dr, nc = c + dc;
                        if (nr < rows && nc < cols && grid[nr][nc] === '1') {
                            union(r * cols + c, nr * cols + nc);
                        }
                    }
                }
            }
        }
        return count;
    }

    console.log(numIslands([
        ['1','1','0'],
        ['1','0','0'],
        ['0','0','1']
    ])); // 2
}
// Note: Same problem from Day 44 but solved with Union Find instead of DFS! Two approaches to same problem — shows how versatile these patterns are!

// Problem 8 — Redundant Connection

{
    function findRedundantConnection(edges) {
        const n = edges.length;
        const parent = Array.from({length: n+1}, (_, i) => i);

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }
        function union(x, y) {
            const px = find(x), py = find(y);
            if (px === py) return false;
            parent[px] = py;
            return true;
        }
        for (let [u, v] of edges) {
            if (!union(u, v)) return [u, v];
        }
        return [];
    }

    console.log(findRedundantConnection([[1,2],[1,3],[2,3]])); // [2,3]
    console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]
}
// Note: LeetCode #684 — if union returns false, the two nodes are already connected, meaning this edge creates a cycle = redundant!

// Problem 9 — Implement Prefix Sum

{
    class PrefixSum {
        constructor(nums) {
            this.prefix = [0];
            for (let num of nums) {
                this.prefix.push(this.prefix[this.prefix.length-1] + num);
            }
        }
        rangeSum(l, r) {
            return this.prefix[r+1] - this.prefix[l];
        }
    }

    const ps = new PrefixSum([1, 2, 3, 4, 5]);
    console.log(ps.rangeSum(0, 2)); // 6  (1+2+3)
    console.log(ps.rangeSum(1, 3)); // 9  (2+3+4)
    console.log(ps.rangeSum(0, 4)); // 15 (all)
}
// Note: Prefix Sum lets you answer range sum queries in O(1) after O(n) preprocessing. Without it, each query would be O(n)!

// Problem 10 — 2D Prefix Sum

{
    class Matrix2DSum {
        constructor(matrix) {
            const m = matrix.length;
            const n = matrix[0].length;
            this.prefix = Array.from({length: m+1},
                          () => new Array(n+1).fill(0));
            
            for (let i = 1; i <= m; i++) {
                for (let j = 1; j <= n; j++) {
                    this.prefix[i][j] = matrix[i-1][j-1]
                        + this.prefix[i-1][j]
                        + this.prefix[i][j-1]
                        - this.prefix[i-1][j-1]; 
                }
            }
        }
        sumRegion(r1, c1, r2, c2) {
            return this.prefix[r2+1][c2+1]
                 - this.prefix[r1][c2+1]
                 - this.prefix[r2+1][c1]
                 + this.prefix[r1][c1];
        }
    }

     const matrix = new Matrix2DSum([
        [3, 0, 1, 4],
        [5, 6, 3, 2],
        [1, 2, 0, 1],
        [4, 1, 0, 1]
    ]);

    console.log(matrix.sumRegion(2, 1, 3, 2)); // 3  (2+0+1+0)
    console.log(matrix.sumRegion(1, 1, 2, 2)); // 11 (6+3+2+0)
}