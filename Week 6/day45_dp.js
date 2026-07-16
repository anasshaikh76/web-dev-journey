// Problem 1 — Fibonacci (3 ways)

{
    // Way 1: Pure recursion (slow - O(2ⁿ))
    function fibRecursive(n) {
        if ( n <= 1) return n;
        return fibRecursive(n - 1) + fibRecursive(n - 2);
    }

    // Way 2: Top-Down DP (Memoization)
    function finMemo(n , memo = {}) {
        if (n <= 1) return n;
        if (memo[n]) return memo[n];
        memo[n] = finMemo(n - 1, memo) + finMemo(n - 2, memo);
        return memo[n];
    }

    // Way 3: Bottom-Up DP (Tabulation)
    function fibDP(n) {
        if (n <= 1) return n;
        const dp = [0, 1];
        for (let i = 2; i <= n; i++) {
            dp[i] = dp[i-1] + dp[i-2];
        }
        return dp[n];
    }

    // // Way 4: Space optimized (only need last 2!)
    function fibOptimal(n) {
        if (n <= 1) return n;
        let prev2 = 0, prev1 = 1;
        for (let i = 2; i <= n; i++) {
            let curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }

    console.log(fibRecursive(10));
    console.log(finMemo(50));
    console.log(fibDP(50));
    console.log(fibOptimal(50));
}
// Note: This shows the evolution of DP thinking — from slow recursion to optimized DP. You already saw memoization in Day 39!

// Problem 2 — Climbing Stairs

{
    function climbStairs(n) {
        if (n <= 2) return n;

        const dp = new Array(n + 1);
        dp[1] = 1;
        dp[2] = 2;

        for (let i = 3; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        return dp[n];
    }

    console.log(climbStairs(2)); // 2
    console.log(climbStairs(3)); // 3
    console.log(climbStairs(5)); // 8
}
// Note: LeetCode #70 — it's just Fibonacci in disguise! Ways to reach stair n = ways from n-1 (take 1 step) + ways from n-2 (take 2 steps)!

// Problem 3 — House Robber

{
    // Can't rob adjacent houses
    // Find max money you can rob

    function rob(nums) {
        if (nums.length === 1) return nums[0];

        const dp = new Array(nums.length);
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for ( let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }
        return dp[dp.length - 1];
    }

    console.log(rob([1, 2, 3, 1]));       // 4 (rob 1 and 3)
    console.log(rob([2, 7, 9, 3, 1]));    // 12 (rob 2, 9, 1)
    console.log(rob([2, 1, 1, 2]));       // 4 (rob 2 and 2)
}
// Note: LeetCode #198 — at each house, decide: rob it (+ best from 2 back) or skip it (best from 1 back). Classic DP decision problem!

// Problem 4 — Coin Change

{
    // Find minimum coins needed to make amount
    // coins = [1, 5, 10, 25], amount = 36

    function coinChange(coins, amount) {
        const dp = new Array(amount + 1).fill(Infinity);
        dp[0] = 0;

        for (let i = 1; i <= amount; i++) {
            for (let coin of coins) {
                if (coin <= i) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                } 
            }
        }
        return dp[amount] === Infinity ? -1 : dp[amount];
    }
    console.log(coinChange([1,5,10,25], 36)); // 3 (25+10+1)
    console.log(coinChange([1,2,5], 11));      // 3 (5+5+1)
    console.log(coinChange([2], 3));            // -1 (impossible)
}
// Note: LeetCode #322 — classic DP! Build up from amount 0 to target. For each amount, try every coin and pick the minimum!

// Problem 5 — Longest Common Subsequence

{
    function lcs(text1, text2) {
        const m = text1.length;
        const n = text2.length;

        const dp = Array.from({length: m+1}, () => new Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i-1] === text2[j-1]) {
                    dp[i][j] = dp[i-1][j-1] + 1; 
                } else {
                    dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
                }
            }
        }
        return dp[m][n];
    }

    console.log(lcs("abcde", "ace"));   // 3 (ace)
    console.log(lcs("abc", "abc"));     // 3
    console.log(lcs("abc", "def"));     // 0
}
// Note: LeetCode #1143 — 2D DP table! Each cell dp[i][j] = LCS of first i chars of text1 and first j chars of text2. If chars match, extend previous LCS. If not, take best of excluding either char!

// Problem 6 — 0/1 Knapsack

{
    function knapsack(weights, values, capacity) {
        const n = weights.length;
        const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));

        for (let i = 1; i <= n; i++) {
            for(let w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w];

                if (weights[i-1] <= w) {
                    dp[i][w] = Math.max(dp[i][w], values[i - 1] + dp[i - 1][w - weights[i - 1]]);
                }
            }
        }
        return dp[n][capacity];
    }

    const weights = [2, 3, 4, 5];
    const values  = [3, 4, 5, 6];
    const capacity = 8;
    console.log(knapsack(weights, values, capacity)); // 10
}
// Note: Classic DP! For each item, decide: include it (value + best with remaining capacity) or exclude it (best without this item). 2D table tracks all combinations!

// Problem 7 — Unique Paths
{
    // Robot moves right or down only
    // How many unique paths from top-left to bottom-right?

    function uniquePaths(m,n) {
        const dp = Array.from({length: m},() => new Array(n).fill(1));

        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }
        return dp[m-1][n-1];
    }
    console.log(uniquePaths(3, 7)); // 28
    console.log(uniquePaths(3, 2)); // 3
}
// Note: LeetCode #62 — each cell = paths from above + paths from left. Fill the table bottom-up!

// Problem 8 — Jump Game

{
    // Can you reach the last index?
    // Each element = max jump length from that position

    function canJump(nums) {
        let maxReach = 0;

        for (let i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
        }
        return true;
    }

    console.log(canJump([2,3,1,1,4])); // true
    console.log(canJump([3,2,1,0,4])); // false (stuck at index 3)
}
// Note: LeetCode #55 — Greedy approach (simpler than full DP)! Track the furthest index we can reach. If current index > maxReach, we're stuck!

// Problem 9 — Longest Increasing Subsequence

{
    function lengthOfLIS(nums) {
        const dp = new Array(nums.length).fill(1);

        for (let i = 1; i < nums.length; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[i] + 1);
                }
            }
        }
        return Math.max(...dp);
    }

    console.log(lengthOfLIS([10,9,2,5,3,7,101,18])); // 4 (2,3,7,101)
    console.log(lengthOfLIS([0,1,0,3,2,3]));           // 4
    console.log(lengthOfLIS([7,7,7,7]));               // 1
}
// Note: LeetCode #300 — for each element, look back at all previous elements. If smaller, we can extend that subsequence!

// Problem 10 — Word Break

{
    function wordBreak(s, wordDict) {
        const wordSet = new Set(wordDict);
        const dp = new Array(s.length + 1).fill(false);
        dp[0] = true;
        
        for (let i = 1; i <= s.length; i++) {
            for (let j = 0; j < i; j++) {
                if (dp[j] && wordSet.has(s.slice(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length];
    }

    console.log(wordBreak("leetcode", ["leet","code"]));         // true
    console.log(wordBreak("applepenapple", ["apple","pen"]));    // true
    console.log(wordBreak("catsandog", ["cats","dog","sand"]));  // false
}