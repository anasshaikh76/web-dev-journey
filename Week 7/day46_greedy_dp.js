// Problem 1 — Jump Game II (Minimum Jumps)

{
    function jump(nums) {
        let jumps = 0;
        let currentEnd = 0;
        let fartest = 0;

        for (let i = 0; i < nums.length - 1; i++) {
            fartest = Math.max(fartest, i + nums[i]);

            if (i === currentEnd) {
                jumps++;
                currentEnd = fartest;
            }
        }
        return jumps;
    }

    console.log(jump([2,3,1,1,4])); // 2
    console.log(jump([2,3,0,1,4])); // 2
}
// Note: LeetCode #45 — Greedy! At each position track farthest reachable. When we exhaust current jump range, we MUST jump → increment counter!

// Problem 2 — Gas Station

{
    function canCompleteCircuit(gas, cost) {
        let totalGas = 0;
        let currentGas = 0;
        let startStation = 0;

        for (let i = 0; i < gas.length; i++) {
            totalGas += gas[i] - cost[i];
            currentGas += gas[i] - cost[i];

            if (currentGas < 0) {
                startStation = i + 1;
                currentGas = 0;
            }
        }
        return totalGas >= 0 ? startStation : -1;
    }

    console.log(canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])); // 3
    console.log(canCompleteCircuit([2,3,4], [3,4,3]));           // -1

}
// Note: LeetCode #134 — Greedy! If total gas >= total cost, solution exists. The valid starting point is always after the point where we run out of gas!

// Problem 3 — Partition Labels

{
    function partitionLabels(s) {
        const lastIndex = {};

        for (let i = 0; i < s.length; i++) {
            lastIndex[s[i]] = i;
            
        }

        const result = [];
        let start = 0;
        let end = 0;

        for (let i = 0; i < s.length; i++) {
            end = Math.max(end, lastIndex[s[i]]);

            if (i === end) {
                result.push(end - start + 1);
                start = i + 1;
            }
        }
        return result;
    }

    console.log(partitionLabels("ababcbacadefegdehijhklij"));
}
// Note: LeetCode #763 — Greedy! Track last occurrence of each character. Extend current partition until we've included all occurrences of every character seen so far!

// Problem 4 — House Robber II (Circle)

{
    function rob(nums) {
        if (nums.length === 1) return nums[0];

        function robLine(houses) {
            if (houses.length === 1) return houses[0];
            const dp = [houses[0], Math.max(houses[0], houses[1])];
            for (let i = 2; i < houses.length; i++) {
                dp[i] = Math.max(dp[i - 1], houses[i] + dp[i - 2]);
            }
            return dp[dp.length - 1];
        }
        return Math.max(
            robLine(nums.slice(0, -1)),
            robLine(nums.slice(1))
        );
    }

    console.log(rob([2,3,2]));     // 3
    console.log(rob([1,2,3,1]));   // 4
    console.log(rob([1,2,3]));
}
// Note: LeetCode #213 — run House Robber twice! Once excluding last house, once excluding first. Take maximum of both!

// Problem 5 — Decode Ways

{
    function numDecodings(s) {
        if (s[0] === '0') return 0;

        const dp = new Array(s.length + 1).fill(0);
        dp[0] = 1;
        dp[1] = 1;

        for (let i = 2; i <= s.length; i++) {
            const oneDigit = Number(s[i - 1]);  // ✅ Current character
            const twoDigit = Number(s.slice(i - 2, i));

            if (oneDigit >= 1) {
                dp[i] += dp[i - 1];
            }
            if (twoDigit >= 10 && twoDigit <= 26) {
                dp[i] += dp[i - 2];
            }
        }
        return dp[s.length];
    }

    console.log(numDecodings("12"));   // 2 (AB or L)
    console.log(numDecodings("226"));  // 3 (BZ, VF, BBF)
    console.log(numDecodings("06"));   // 0 (invalid)
}
// Note: LeetCode #91 — at each position, try decoding 1 digit or 2 digits. Add both possibilities if valid!

// Problem 6 — Maximum Product Subarray

{
    function maxProduct(nums) {
        let maxProd = nums[0];
        let minProd = nums[0];
        let result = nums[0];

        for (let i = 1; i < nums.length; i++) {
            const candidates = [
                nums[i],
                maxProd * nums[i],
                minProd * nums[i]
            ];
            maxProd = Math.max(...candidates);
            minProd = Math.min(...candidates);
            result = Math.max(result, maxProd);
        }
        return result;
    }

    console.log(maxProduct([2,3,-2,4]));    // 6
    console.log(maxProduct([-2,0,-1]));      // 0
    console.log(maxProduct([-2,3,-4]));      // 24
}
// Note: LeetCode #152 — track BOTH max and min products because negative × negative = positive! Three candidates at each step: current alone, extend max, extend min!

// Problem 7 — Target Sum

{
    function findTargetSumWays(nums, target) {
        const memo = new Map();

        function dp(index, currentSum) {
            if (index === nums.length) {
                return currentSum === target ? 1: 0;
            }
            const key = `${index},${currentSum}`;
            if (memo.has(key)) return memo.get(key);

            const ways = dp(index+1, currentSum + nums[index]) + dp(index+1, currentSum - nums[index]);

            memo.set(key, ways);
            return ways;
        }
        return dp(0,0);
    }

    console.log(findTargetSumWays([1,1,1,1,1], 3)); // 5
    console.log(findTargetSumWays([1], 1));           // 1
}
// Note: LeetCode #494 — Top-Down DP with memoization! Key = index + currentSum combination. At each step, try adding or subtracting current number!

// Problem 8 — Minimum Path Sum

{
    function minPathSum(grid) {
        const m = grid.length;
        const n = grid[0].length;

        for (let j = 1; j < n; j++) {
            grid[0][j] += grid[0][j - 1];
        }
        for (let i = 1; i < m; i++) {
            grid[i][0] += grid[i - 1][0];
        }
        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[m - 1][ n - 1];
    }
    console.log(minPathSum([
        [1,3,1],
        [1,5,1],
        [4,2,1]
    ]));
}
// Note: LeetCode #64 — 2D DP! Each cell = current value + min(from above, from left). Modify grid in place to save space!

// Problem 9 — Edit Distance

{
    function minDistance(word1, word2) {
        const m = word1.length;
        const n = word2.length;
        const dp = Array.from({length: m+1}, () => new Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <=m; i++) {
            for (let j = 1; j <= n; j++) {
                if (word1[i - 1] === word2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],
                        dp[i][j - 1],
                        dp[i - 1][j - 1]
                    );
                }
            }
        }
        return dp[m][n];
    }

    console.log(minDistance("horse", "ros"));   // 3
    console.log(minDistance("intention", "execution")); // 5
}
// Note: LeetCode #72 — Hard but important! Classic 2D DP. If chars match, no operation needed. If not, try all 3 operations and pick minimum!


// Problem 10 — Burst Balloons

{
    function maxCoins(nums) {
        // Add boundary balloons with value 1
        nums = [1, ...nums, 1];
        const n = nums.length;
        const dp = Array.from({length: n},
                   () => new Array(n).fill(0));

        // Try all window sizes
        for (let len = 2; len < n; len++) {
            for (let left = 0; left < n - len; left++) {
                const right = left + len;

                for (let k = left + 1; k < right; k++) {
                    dp[left][right] = Math.max(
                        dp[left][right],
                        nums[left] * nums[k] * nums[right] +
                        dp[left][k] + dp[k][right]
                    );
                }
            }
        }
        return dp[0][n-1];
    }

    console.log(maxCoins([3,1,5,8])); // 167
    console.log(maxCoins([1,5]));      // 10
}