// Problem 1 — Easy (10 mins)

// Given binary tree, find minimum depth.
// Minimum depth = shortest path from root to leaf.

// Input:      3        Output: 2
//            / \
//           9  20
//             /  \
//            15   7

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    function minDepth(root) {
        if (!root) return 0;

        const queue = [[root, 1]];

        while (queue.length > 0) {
            const [node, depth] = queue.shift();

            if (!node.left && !node.right) return depth;

            if (node.left) queue.push([node.left, depth + 1]);
            if (node.right) queue.push([node.right, depth + 1]);
        }
        return 0;
    }

    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);

    console.log(minDepth(root)); // 2
}
// Pattern: Tree BFS — first leaf found = minimum depth!

// Problem 2 — Easy/Medium (15 mins)

// Given array of integers, find if there is a
// triplet (i,j,k) such that nums[i] < nums[j] < nums[k]

// Input: [1,2,3,4,5]   → true
// Input: [5,4,3,2,1]   → false
// Input: [2,1,5,0,4,6] → true

{
    function increasingTriplet(nums) {
        let first = Infinity;
        let second = Infinity;

        for (let num of nums) {
            if (num <= first) {
                first = num;
            } else if (num <= second) {
                second = num;
            } else {
                return true;
            }
        }
        return false;
    }

    console.log(increasingTriplet([1, 2, 3, 4, 5]));
    console.log(increasingTriplet([5, 4, 3, 2, 1]));   // false
    console.log(increasingTriplet([2, 1, 5, 0, 4, 6])); // true
}
// Pattern: Greedy — track smallest first and second!

// Problem 3 — Medium (20 mins)

// Given array of integers, find length of
// longest subarray with equal number of 0s and 1s.

// Input: [0,1]       → 2
// Input: [0,1,0]     → 2
// Input: [0,0,1,0,0,0,1,1] → 6

{
    function findMaxLength(nums) {
        const map = new Map();
        map.set(0, -1);

        let maxLen = 0, count = 0;

        for (let i = 0; i < nums.length; i++) {
            count += nums[i] === 1 ? 1 : -1;

            if (map.has(count)) {
                maxLen = Math.max(maxLen, i - map.get(count));
            } else {
                map.set(count, i);
            }
        }
        return maxLen;
    }

    console.log(findMaxLength([0, 1]));            // 2
    console.log(findMaxLength([0, 1, 0]));           // 2
    console.log(findMaxLength([0, 0, 1, 0, 0, 0, 1, 1])); // 6
}
// Pattern: Hash Map + Prefix Sum! Treat 0 as -1, find longest subarray with sum 0!

// Problem 4 — Medium (20 mins)

// Given n nodes labeled 0 to n-1 and list of edges,
// find if valid tree (connected + no cycle).

// Input: n=5, edges=[[0,1],[0,2],[0,3],[1,4]]  → true
// Input: n=5, edges=[[0,1],[1,2],[2,3],[1,3],[1,4]] → false

{
    function validTree(n, edges) {
        if (edges.length !== n - 1) return false;

        const parent = Array.from({length: n}, (_,i) => i);
        const rank = new Array(n).fill(0);

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }
        function union(x, y) {
            const px = find(x), py = find(y);
            if (px === py) return false;

            if (rank[px] >= rank[py]) {
                parent[py] = px;
                if (rank[px] === rank[py]) rank[px]++;
            } else {
                parent[px] = py;
            }
            return true;
        }
        for (let [u, v] of edges) {
            if (!union(u, v)) return false;
        }
        return true;
    }

    console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]]));        // true
    console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]]));  // false
}
// Pattern: Union Find — valid tree = n-1 edges + no cycle!

// Problem 5 — Medium (20 mins)

// Given coins and amount, count number of
// DIFFERENT ways to make the amount.

// Input: coins=[1,2,5], amount=5  → 4
// Ways: [1,1,1,1,1],[1,1,1,2],[1,2,2],[5]

{
    function change(amount, coins) {
        const dp = new Array(amount + 1).fill(0);
        dp[0] = 1;

        for (let coin of coins) {
            for (let i = coin; i <= amount; i++) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }

    console.log(change(5, [1,2,5])); // 4
    console.log(change(3, [2]));      // 0
}
// Pattern: Unbounded Knapsack (count ways)!

// Problem 6 — Medium (20 mins)

// Given string, find length of longest
// palindromic subsequence.

// Input: "bbbab"  → 4 (bbbb)
// Input: "cbbd"   → 2 (bb)

{
    function longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = Array.from({length : n}, () => new Array(n).fill(0));

        for (let i = 0; i < n; i++) dp[i][i] = 1;

        for (let len = 2; len <= n; len++) {
            for (let i = 0; i <= n - len; i++) {
                const j = i + len - 1;
                if (s[i] === s[j]) {
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[0][n - 1];
    }

    console.log(longestPalindromeSubseq("bbbab")); // 4
    console.log(longestPalindromeSubseq("cbbd"));  // 2
}
// Pattern: Interval DP!

// Problem 7 — Hard (25 mins)

// Given list of words, find shortest path from
// beginWord to endWord changing one letter at a time.
// Each intermediate word must exist in wordList.

// Input: beginWord="hit", endWord="cog"
// wordList=["hot","dot","dog","lot","log","cog"]
// Output: 5 (hit→hot→dot→dog→cog)

{
    function ladderLength(beginWord, endWord, wordList) {
        const wordSet = new Set(wordList);
        if (!wordSet.has(endWord)) return 0;

        const queue = [[beginWord, 1]];
        const visited = new Set([beginWord]);

        while(queue.length > 0) {
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