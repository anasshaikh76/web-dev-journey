// Problem 1 — Recursion

{
    // Generate all subsets of an array
    // Input: [1,2,3]
    // Output: [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]

    function subsets(nums) {
        const result = [];

        function backtrack(start, current) {
            result.push([...current]);

            for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                backtrack(i + 1, current);
                current.pop();
            }
        }
        backtrack(0, []);
        return result;
    }
    console.log(subsets([1, 2, 3]));
}
// Pattern: Recursion + Backtracking!

// Problem 2 — Stack

{
    // Implement a browser history system
    // visit(url) → visit new page
    // back(steps) → go back
    // forward(steps) → go forward

    class browserHistory {
        constructor(homepage) {
            this.history = [homepage];
            this.current = 0;
        }
        visit(url) {
            this.history = this.history.slice(0, this.current + 1);
            this.history.push(url);
            this.current++;
        }
        back(steps) {
            this.current = Math.max(0, this.current - steps);
            return this.history[this.current];
        }
        forward(steps) {
            this.current = Math.min(
                this.history.length - 1,
                this.current + steps
            );
            return this.history[this.current];
        }
    }
    const browser = new browserHistory("google.com");
    browser.visit("youtube.com");
    browser.visit("github.com");
    console.log(browser.back(1));
    console.log(browser.back(1));
    console.log(browser.forward(1));
    browser.visit("leetcode.com");
    console.log(browser.forward(2));
}
// Pattern: Stack (array with index pointer)!

{
    class Node {
        constructor(val) { this.val = val; this.next = null }
    }
    function reorderList(head) {
        let slow = head, fast = head;
        while (fast.next && fast.next.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        let prev = null, curr = slow.next;
        slow.next = null;
        while (curr) {
            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        let first = head, second = prev;
        while (second) {
            let next1 = first.next;
            let next2 = second.next;
            first.next = second;
            second.next = next1;
            first = next1;
            second = next2;
        }
    }
    let head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = new Node(5);

    reorderList(head);

    let curr = head;
    while (curr) {
        process.stdout.write(curr.val + " → ");
        curr = curr.next;
    }
    console.log("null"); // 1→5→2→4→3→null
}
// Pattern: Linked List — Find Middle + Reverse + Merge!

// Problem 4 — Binary Tree

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }
    function serialize(root) {
        if (!root) return "null";
        return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
    }
    function deserialize(data) {
        const nodes = data.split(",");
        let index = 0;

        function build() {
            if (nodes[index] === "null") {
                index++;
                return null;
            }
            const node = new TreeNode(Number(nodes[index++]));
            node.left = build();
            node.right = build();
            return node;
        }
        return build();
    }

    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(5);

    const serialized = serialize(root);
    console.log(serialized); // "1,2,null,null,3,4,null,null,5,null,null"

    const deserialized = deserialize(serialized);
    console.log(deserialized.val);             // 1
    console.log(deserialized.right.left.val);  // 4
}
// Pattern: Tree DFS (Preorder) + Recursion!

// Problem 5 — BST

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }
    function treeToDoublyList(root) {
        if (!root) return null;

        let head = null;
        let prev = null;

        function inorder(node) {
            if (!node) return;

            inorder(node.left);

            if (prev) {
                prev.right = node;
                node.left = prev;
            } else {
                head = node;
            }
            prev = node;

            inorder(node.right);
        }
        inorder(root);

        prev.right = head;
        head.left = prev;

        return head;
    }

    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);

    const head = treeToDoublyList(root);
    console.log(head.val);             // 1 (smallest)
    console.log(head.right.val);       // 2
    console.log(head.right.right.val); // 3
}
// Pattern: BST Inorder (gives sorted order) + Linked List!

// Problem 6 — Graph DFS

{
    function allPathsSourceTarget(graph) {
        const result = [];
        const target = graph.length - 1;

        function dfs(node, path) {
            if (node === target) {
                result.push([...path]);
                return;
            }
            for (let neighbor of graph[node]) {
                path.push(neighbor);
                dfs(neighbor, path);
                path.pop();
            }
        }
        dfs(0, [0]);
        return result;
    }
    console.log(allPathsSourceTarget([[1, 2], [3], [3], []]));
    // [[0,1,3],[0,2,3]]

    console.log(allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []]));
    // [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
}
// Pattern: Graph DFS + Backtracking!

// Problem 7 — Graph BFS

{
    // Shortest path in binary matrix
    // 0 = open, 1 = blocked
    // Move in 8 directions

    function shortestPathBinaryMatrix(grid) {
        const n = grid.length;

        if (grid[0][0] === 1 || grid[n - 1][n - 1] === 1) return -1;
        if (n === 1) return 1;

        const queue = [[0, 0, 1]];
        grid[0][0] = 1;

        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, -1],
        [0, 1], [1, -1], [1, 0], [1, 1]];

        while (queue.length > 0) {
            const [r, c, dist] = queue.shift();

            for (let [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;

                if (nr < 0 || nr >= n || nc < 0 || nc >= n || grid[nr][nc] === 1) continue;

                if (nr === n - 1 && nc === n - 1) return dist + 1;

                grid[nr][nc] = 1;
                queue.push([nr, nc, dist + 1]);
            }
        }
        return -1;
    }

    console.log(shortestPathBinaryMatrix([
        [0, 1], [1, 0]
    ])); // 2

    console.log(shortestPathBinaryMatrix([
        [0, 0, 0], [1, 1, 0], [1, 1, 0]
    ])); // 4
}
// Pattern: Graph BFS (shortest path)!

// Problem 8 — Dynamic Programming

{
    function minCut(s) {
        const n = s.length;
        if (n <= 1) return 0;

        const isPalin = Array.from({ length: n }, () => new Array(n).fill(false));

        // Build palindrome table correctly
        for (let i = n - 1; i >= 0; i--) {
            for (let j = i; j < n; j++) {
                if (s[i] === s[j] && (j - i < 3 || isPalin[i + 1][j - 1])) {
                    isPalin[i][j] = true;
                }
            }
        }

        const dp = new Array(n).fill(0);

        for (let i = 1; i < n; i++) {
            if (isPalin[0][i]) {
                dp[i] = 0;
                continue;
            }
            dp[i] = i; // Worst case: cut after every character
            for (let j = 1; j <= i; j++) {
                if (isPalin[j][i]) {
                    dp[i] = Math.min(dp[i], dp[j - 1] + 1);
                }
            }
        }
        return dp[n - 1];
    }

    console.log(minCut("aab"));    // 1 (aa | b)
    console.log(minCut("a"));      // 0
    console.log(minCut("abcbc")); // 1 (a | bcbc... wait, abcb | c = 1)
}
// Pattern: 2D DP (palindrome check) + 1D DP (min cuts)!

// Problem 9 — Greedy

{
    // Meeting Rooms II
    // Minimum number of rooms needed

    function minMeetingRooms(intervals) {
        const starts = intervals.map(i => i[0]).sort((a,b) => a-b);
        const ends = intervals.map(i => i[1]).sort((a,b) => a-b);

        let rooms = 0;
        let maxRooms = 0;
        let endPtr = 0;

        for (let i = 0; i < starts.length; i++) {
            if (starts[i] < ends[endPtr]) {
                rooms++;
            } else {
                endPtr++;
            }
            maxRooms = Math.max(maxRooms, rooms);
        }
        return maxRooms;
    }
    console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
    console.log(minMeetingRooms([[7,10],[2,4]]));           // 1
    console.log(minMeetingRooms([[1,5],[2,6],[3,7]]));      // 3
}
// Pattern: Greedy + Sorting!

// Problem 10 — Combining Everything

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }

    function pathSumStrings(root, targetSum) {
        const result = [];

        function dfs(node, remaining, path) {
            if (!node) return;

            path.push(node.val);
            remaining -= node.val;

            if (!node.left && !node.right && remaining === 0) {
                result.push(path.join(" → "));
            }

            dfs(node.left, remaining, path);
            dfs(node.right, remaining, path);

            path.pop();
        }
        dfs(root, targetSum, []);
        return result;
    }

    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.right.right.right = new TreeNode(1);

    console.log(pathSumStrings(root, 22));
    // ["5 → 4 → 11 → 2"]
    console.log(pathSumStrings(root, 26));
    // ["5 → 8 → 13"]

}