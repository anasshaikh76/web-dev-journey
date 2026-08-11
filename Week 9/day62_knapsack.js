// Problem 1 — Classic 0/1 Knapsack

{
    function knapsack(weights, values, capacity) {
        const n = weights.length;
        const dp = Array.from({length: n + 1}, () => new Array(capacity + 1).fill(0));

        for (let i = 1; i <= n; i++) {
            for (let w = 0; w <= capacity; w++) {
                dp[i][w] = dp[i - 1][w];

                if (weights[ i - 1] <= w) {
                    dp[i][w] = Math.max(
                        dp[i][w],
                        values[i - 1] + dp[i - 1][w - weights[i - 1]]
                    );
                }
            }
        }
        return dp[n][capacity];
    }

    console.log(knapsack([2,3,4,5], [3,4,5,6], 8)); // 10
    console.log(knapsack([1,2,3], [6,10,12], 5));    // 22
}
// Note: For each item decide: skip it (dp[i-1][w]) or take it (value + dp[i-1][remaining capacity]). Take maximum!

// Problem 2 — 0/1 Knapsack Space Optimized

{
    function knapsackOptimized(weights, values, capacity) {
        const dp = new Array(capacity + 1).fill(0);

        for (let i = 0; i < weights.length; i++) {
            for (let w = capacity; w >= weights[i]; w--) {
                dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
            }
        }
        return dp[capacity];
    }

    console.log(knapsackOptimized([2,3,4,5], [3,4,5,6], 8)); // 10
}
// Note: 1D optimization! Traverse right to left so we don't use the same item twice in one pass. This is the key difference from unbounded knapsack!

// Problem 3 — Subset Sum

{
    function canPartition(nums, target) {
        const dp = new Array(target +1).fill(false);
        dp[0] = true;

        for (let num of nums) {
            for (let j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }

    console.log(canPartition([1,5,11,5], 11)); // true (1+5+5)
    console.log(canPartition([1,2,3,5], 11));  // false
}
// Note: 0/1 Knapsack variant! Instead of maximizing value, check if exact sum is reachable. Right to left traversal prevents reuse!

// Problem 4 — Partition Equal Subset Sum

{
    function canPartitionEqualSum(nums) {
        const total = nums.reduce((a, b) => a + b, 0);

        if (total % 2 !== 0) return false;

        const target = total / 2;
        const dp = new Array(target + 1).fill(false);
        dp[0] = true;

        for (let num of nums) {
            for (let j = target; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        return dp[target];
    }

    console.log(canPartitionEqualSum([1,5,11,5])); // true
    console.log(canPartitionEqualSum([1,2,3,5]));  // false
}
// Note: LeetCode #416 — partition into two equal halves = find subset summing to total/2. Classic 0/1 Knapsack!

// Problem 5 — Target Sum

{
    function findTargetSumWays(nums, target) {
        const total = nums.reduce((a, b) => a + b, 0);

        const sum = target + total;
        if (sum % 2 !== 0 || Math.abs(target) > total) return 0;

        const s = sum / 2;
        const dp = new Array(s + 1).fill(0);
        dp[0] = 1;

        for (let num of nums) {
            for (let j = s; j >= num; j--) {
                dp[j] += dp[j - num];
            }
        }
        return dp[s];
    }

    console.log(findTargetSumWays([1,1,1,1,1], 3)); // 5
    console.log(findTargetSumWays([1], 1));           // 1
}
// Note: LeetCode #494 — brilliant math conversion! Transform to "count subsets with sum = (target+total)/2". Counting ways instead of true/false!

// Problem 6 — Last Stone Weight II

{
    function lastStoneWeightII(stones) {
        const total = stones.reduce((a, b) => a + b, 0);
        const target = Math.floor(total / 2);

        const dp = new Array(target +1).fill(0);

        for (let stone of stones) {
            for (let j = target; j >= stone; j--) {
                dp[j] = Math.max(dp[j], dp[j - stone] + stone);
            }
        }
        return total - 2 * dp[target];
    }

    console.log(lastStoneWeightII([2,7,4,1,8,1])); // 1
    console.log(lastStoneWeightII([31,26,33,21,40])); // 5
}
// Note: LeetCode #1049 — minimize difference = maximize one group's sum while keeping it ≤ total/2. Classic knapsack trick!

// Problem 7 — Unbounded Knapsack

{
    function unboundedKnapsack(weights, values, capacity) {
        const n = weights.length;
        const dp = new Array(capacity + 1).fill(0);

        for (let w = 0; w <= capacity; w++) {
            for (let i = 0; i < n; i++) {
                if (weights[i] <= w) {
                    dp[w] = Math.max(dp[w], values[i] + dp[w - weights[i]]);
                }
            }
        }
        return dp[capacity];
    }

    console.log(unboundedKnapsack([2,3,4,5], [3,4,5,6], 8));
    // 12 (use weight-2 item 4 times = 12 value)
}
// Note: Key difference from 0/1: traverse LEFT TO RIGHT (allows reuse!) or iterate capacity in outer loop!

// Problem 8 — Coin Change (Minimum)

{
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

    console.log(coinChange([1,5,10,25], 36)); // 3
    console.log(coinChange([2], 3));           // -1
}
// Note: LeetCode #322 — this is your morning warmup problem! Unbounded knapsack variant (coins reusable). Minimize count instead of maximize value!

// Problem 9 — Perfect Squares

{
    function numSquares(n) {
        const dp = new Array(n + 1).fill(Infinity);
        dp[0] = 0;

        for (let i= 1; i<= n; i++) {
            for (let j = 1; j * j <= i; j++) {
                dp[i] = Math.min(dp[i], dp[i - j * j] +1);
            }
        }
        return dp[n];
    }

    console.log(numSquares(12)); // 3 (4+4+4)
    console.log(numSquares(13)); // 2 (4+9)
}
// Note: LeetCode #279 — same pattern as Coin Change! "Coins" are perfect squares (1,4,9,16...). Find minimum count!

// Problem 10 — Ones and Zeroes

{
    function findMaxForm(strs, m, n) {
        const dp = Array.from({length : m + 1}, () => new Array(n + 1).fill(0));

        for (let str of strs) {
            let zeroes = 0, ones = 0;
            for (let char of str) {
                if (char === '0') zeroes++;
                else ones++;
            }

            for (let i = m; i >= zeroes; i--) {
                for (let j = n; j >= ones; j--) {
                    dp[i][j] = Math.max(dp[i][j], dp[i - zeroes][j - ones] + 1);
                }
            }
        }
        return dp[m][n];
    }

    console.log(findMaxForm(["10","0001","111001","1","0"], 5, 3)); // 4
    console.log(findMaxForm(["10","0","1"], 1, 1)); // 2
}
// Note: LeetCode #474 — 2D Knapsack with TWO capacities (m zeros, n ones)! dp[i][j] = max strings using at most i zeros and j ones!