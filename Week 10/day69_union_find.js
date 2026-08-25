// Problem 1 — Union Find Implementation (Write from scratch!)

{
    class UnionFind {
        constructor(n) {
            this.parent = Array.from({length : n}, (_, i) => i);
            this.rank = new Array(n).fill(0);
            this.component = n;
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
                this.parent[px] = py;
            } else if (this.rank[px] > this.rank[py]) {
                this.parent[py] = px;
            } else {
                this.parent[py] = px;
                this.rank[px]++;
            }

            this.component--;
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
// Note: Path compression flattens tree so future finds are O(1). Union by rank prevents tall trees!

// Problem 2 — Number of Connected Components

{
    function countComponents(n, edges) {
        const uf = new UnionFind(n);

        for (let [a, b] of edges) {
            uf.union(a, b);
        }

        return uf.components;
    }

    class UnionFind {
        constructor(n) {
            this.parent = Array.from({length: n}, (_, i) => i);
            this.rank = new Array(n).fill(0);
            this.components = n;
        }
        find(x) {
            if (this.parent[x] !== x)
                this.parent[x] = this.find(this.parent[x]);
            return this.parent[x];
        }

        union(x, y) {
            const px = this.find(x), py = this.find(y);
            if (px === py) return;
            if (this.rank[px] >= this.rank[py]) {
                this.parent[py] = px;
                if (this.rank[px] === this.rank[py]) this.rank[px]++;
            } else {
                this.parent[px] = py;
            }
            this.components--;
        }
    }

    console.log(countComponents(5, [[0,1],[1,2],[3,4]]));       // 2
    console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])); // 1
}
// Note: LeetCode #323 — each union merges two components. Final component count = answer!

// Problem 3 — Redundant Connection

{
    function findRedundantConnection(edges) {
        const n = edges.length;
        const parent = Array.from({length: n+1}, (_, i) => i);
        const rank = new Array(n+1).fill(0);

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

        for (let [u, v] of edges) {
            if (!union(u, v)) return [u, v];
        }
        return [];
    }

    console.log(findRedundantConnection([[1,2],[1,3],[2,3]])); // [2,3]
    console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])); // [1,4]
}
// Note: LeetCode #684 — if union returns false (already connected), this edge creates a cycle = redundant!

// Problem 4 — Number of Islands with Union Find

{
    function numIslands(grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        let count = 0;
        const parent = [];
        const rank = [];

        // Initialize
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                parent[idx] = idx;
                rank[idx] = 0;
                if (grid[r][c] === '1') count++;
            }
        }

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }

        function union(x, y) {
            const px = find(x), py = find(y);
            if (px === py) return;
            if (rank[px] >= rank[py]) {
                parent[py] = px;
                if (rank[px] === rank[py]) rank[px]++;
            } else {
                parent[px] = py;
            }
            count--; // merging two islands!
        }

        const dirs = [[1,0],[0,1]]; // only right and down
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === '1') {
                    for (let [dr,dc] of dirs) {
                        const nr = r+dr, nc = c+dc;
                        if (nr < rows && nc < cols &&
                            grid[nr][nc] === '1') {
                            union(r*cols+c, nr*cols+nc);
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
// Note: Same islands problem from Day 44 but solved with Union Find! Start with count = number of '1's, reduce on each union!

// Problem 5 — Accounts Merge

{
    function accountsMerge(accounts) {
        const parent = new Map();
        const emailToName = new Map();

        function find(x) {
            if (!parent.has(x)) parent.set(x, x);
            if (parent.get(x) !== x) {
                parent.set(x, find(parent.get(x)));
            }
            return parent.get(x);
        }
        function union(x, y) {
            const px = find(x), py = find(y);
            if (px !== py) parent.set(px, py);
        }
        for (let [name, ...emails] of accounts) {
            for (let email of emails) {
                emailToName.set(email, name);
                union(emails[0], email);
            }
        }
        const groups = new Map();
        for (let email of emailToName.keys()) {
            const root = find(email);
            if (!groups.has(root)) groups.set(root, []);
            groups.get(root).push(email);
        }
        const result = [];
        for (let [root, emails] of groups) {
            emails.sort();
            result.push([emailToName.get(root), ...emails]);
        }
        return result;
    }

    console.log(accountsMerge([
        ["John","john@m.com","john_newyork@m.com"],
        ["John","johnnybravo@m.com"],
        ["John","john@m.com","john00@m.com"],
        ["Mary","mary@m.com"]
    ]));
}
// Note: LeetCode #721 — Union Find with strings as keys! Connect all emails of same account, then group by root email!

// Problem 6 — Smallest String With Swaps

{
    function smallestStringWithSwaps(s, pairs) {
        const n = s.length;
        const parent = Array.from({length: n}, (_, i) => i);

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }

        function union(x, y) {
            const px = find(x), py = find(y);
            if (px !== py) parent[px] = py;
        }
        for (let [a, b] of pairs) union(a, b);

        const groups = new Map();
        for (let i = 0; i < n; i++) {
            const root = find(i);
            if (!groups.has(root)) groups.set(root, []);
            groups.get(root).push(i);
        }
        const result = s.split('');
        for (let [root, indices] of groups) {
            const chars = indices.map(i => s[i]).sort();
            indices.sort((a,b) => a-b);
            for (let i = 0; i < indices.length; i++) {
                result[indices[i]] = chars[i];
            }
        }

        return result.join('');
    }

    console.log(smallestStringWithSwaps("dcab", [[0,3],[1,2]]));
    // "bacd"
    console.log(smallestStringWithSwaps("dcab", [[0,3],[1,2],[0,2]]));
    // "abcd"
}
// Note: LeetCode #1202 — connected indices can be freely rearranged! Union all swappable pairs, then sort characters within each group!

// Problem 7 — Satisfiability of Equality Equations

{
    function equationsPossible(equations) {
        const parent = Array.from({length: 26}, (_, i) => i);

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }

        function union(x, y) {
            parent[find(x)] = find(y);
        }

        for (let eq of equations) {
            if (eq[1] === '=') {
                union(eq.charCodeAt(0)-97, eq.charCodeAt(3)-97);
            }
        }
        for (let eq of equations) {
            if (eq[1] === '!') {
                const a = eq.charCodeAt(0) - 97;
                const b = eq.charCodeAt(3) - 97;
                if (find(a) === find(b)) return false;
            }
        }
        return true;
    }

    console.log(equationsPossible(["a==b","b!=a"])); // false
    console.log(equationsPossible(["b==a","a==b"])); // true
    console.log(equationsPossible(["a==b","b==c","a!=c"])); // false
}
// Note: LeetCode #990 — two passes! First union all equalities, then check if any inequality connects same component. Contradiction = impossible!