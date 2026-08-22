// Problem 1

// Given grid of integers, find path from top-left
// to bottom-right that minimizes the maximum value
// seen along the path.

// Input: [[5,4,5],[1,2,6],[7,4,6]]  → 4

{
    function minimumEffortPath(heights) {
        const rows = heights.length, cols = heights[0].length;
        const efforts = Array.from({length : rows}, () => new Array(cols).fill(Infinity));

        efforts[0][0] = 0;
        const pq = [[0, 0, 0]];
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

        while(pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [e, r, c] = pq.shift();

            if (r === rows - 1 && c === cols - 1) return e;
            if (e > efforts[r][c]) continue;

            for (let [dr, dc] of dirs) {
                const nr = r  + dc, nc = c + dc;
                if (nr < 0 || nc  < 0 || nr >= rows || nc >= cols) continue;
                
                const newEffort = Math.max(e, Math.abs(heights[nr][nc] - heights[r][c]));

                if (newEffort < efforts[nr][nc]) {
                    efforts[nr][nc] = newEffort;
                    pq.push([newEffort, nr, nc]);
                }
            }
        }
        return 0;
    }

    console.log(minimumEffortPath([[5,4,5],[1,2,6],[7,4,6]])); // 4
}
// Pattern: Dijkstra on Grid — minimize maximum!

// Problem 2

// Given string s and dictionary of words,
// return true if s can be segmented into
// space-separated dictionary words.

// Input: s="leetcode", wordDict=["leet","code"]  → true
// Input: s="catsandog", wordDict=["cats","dog"]  → false

{
    function wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const dp = new Array(s.length + 1).fill(false);
        dp[0] = true;

        for (let i = 1; i <= s.length; i++) {
            for (let j = 0; j < i; j++) {
                if (dp[j] && wordSet.has(s.slice(j , i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length];
    }

    console.log(wordBreak("leetcode", ["leet","code"]));    // true
    console.log(wordBreak("catsandog", ["cats","dog"]));    // false
}
// Pattern: 1D Dynamic Programming!

// Problem 3

// Given n courses and prerequisites,
// return ordering to finish all courses.
// Return [] if impossible.

// Input: n=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]
// Output: [0,1,2,3] or [0,2,1,3]

{
    function findOrder(numCourses, prerequisites) {
        const adj = Array.from({length : numCourses}, () => []);
        const inDegree = new Array(numCourses).fill(0);

        for (let [course, pre] of prerequisites) {
            adj[pre].push(course);
            inDegree[course]++
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
                if (--inDegree[next] === 0) queue.push(next);
            }
        }
        return order.length === numCourses ? order : [];
    }

    console.log(findOrder(4, [[1,0],[2,0],[3,1],[3,2]]));
    // [0,1,2,3] or [0,2,1,3]
}
// Pattern: Topological Sort (Kahn's Algorithm)!

// Problem 4

// Stock prices array. Can buy and sell unlimited times
// but must pay fee=2 for each transaction.
// Find maximum profit.

// Input: prices=[1,3,2,8,4,9], fee=2  → 8

{
    function maxProfit(prices, fee) {
        let holding = -prices[0];
        let notHolding = 0;

        for (let i = 1; i < prices.length; i++) {
            holding = Math.max(holding, notHolding - prices[i]);
            notHolding = Math.max(notHolding, holding + prices[i] - fee);
        }
        return notHolding;
    }

    console.log(maxProfit([1,3,2,8,4,9], 2)); // 8
}
// Pattern: State Machine DP!

// Problem 5

// Given array of strings, group anagrams together.

// Input: ["eat","tea","tan","ate","nat","bat"]
// Output: [["eat","tea","ate"],["tan","nat"],["bat"]]

{
    function groupAnagrams(strs) {
        const map = new Map();

        for (let str of strs) {
            const key = str.split("").sort().join("");
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(str);
        }
        return [...map.values()];
    }

    console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
}

// Problem 6

// Given binary tree, find maximum path sum.
// Path can start and end at any node.

// Input:    -10
//           /  \
//          9   20
//             /  \
//            15   7
// Output: 42 (15+20+7)

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    function maxPathSum(root) {
        let maxSum = -Infinity;


        function dfs(node) {
            if (!node) return 0;
            const left = Math.max(0, dfs(node.left));
            const right = Math.max(0, dfs(node.right));
            maxSum = Math.max(maxSum, node.val + left + right);
            return node.val + Math.max(left, right);
        }
        dfs(root);
        return maxSum;
    }

    const root = new TreeNode(-10);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);

    console.log(maxPathSum(root)); // 42
}
// Pattern: Tree DFS with global maximum!

// Problem 7

// Given array nums and k, find maximum sum of
// k non-overlapping subarrays.

// Input: nums=[1,2,1,2,6,7,5,1], k=2  → 23 (6+7+5+2+1+2 = nope)
// Actually: find 2 non-overlapping subarrays with max sum
// Output: 23 (subarray [2,6,7,5] + [1,2] or similar)

// Simpler version: just find max sum subarray of size k
// Input: [2,1,5,1,3,2], k=3  → 9

{
    function maxSumSubarray(nums, k) {
        let windowSum = 0, maxSum = 0;

        for (let i = 0; i < k; i++) windowSum += nums[i];
        maxSum = windowSum;

        for (let i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }

    console.log(maxSumSubarray([2,1,5,1,3,2], 3)); // 9
}
// Pattern: Sliding Window (fixed size)!