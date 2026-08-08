// Problem 1 — Unique Paths

{
    function uniquePaths(m, n) {
        const dp = Array.from({length: m}, () => new Array(n).fill(1));

        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
            }
        }
        return dp[m - 1][n - 1];
    }

    console.log(uniquePaths(3, 7)); // 28
    console.log(uniquePaths(3, 2)); // 3
}
// Note: LeetCode #62 — each cell = paths from above + paths from left. First row and column always = 1 (only one way to reach)!

// Problem 2 — Unique Paths II (With Obstacles)

{
    function uniquePathsWithObstacles(grid) {
        const m = grid.length, n = grid[0].length;
        if (grid[0][0] === 1) return 0;

        const dp = Array.from({length: m}, () => new Array(n).fill(0));
        dp[0][0] = 1;

        for (let i = 1; i < m; i++) {
            dp[i][0] = grid[i][0] === 1 ? 0 : dp[i - 1][0];
        }

        for (let j = 1; j < n; j++) {
            dp[0][j] = grid[0][j] === 1 ? 0 :dp[0][j - 1];
        }

        for (let i = 1; i < m; i++) {
            for (let j = 1; j < m; j++) {
                if (grid[i][j] === 1) {
                    dp[i][j] = 0;
                } else {
                    dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
                }
            }
        }
        return dp[m -1][n - 1];
    }

    console.log(uniquePathsWithObstacles([
        [0,0,0],
        [0,1,0],
        [0,0,0]
    ])); // 2
}
// Note: LeetCode #63 — same as Unique Paths but obstacle cells = 0 paths!

{
    function minPathSum(grid) {
        const m = grid.length, n = grid[0].length;

        for (let i = 1; i < m; i++) {
            grid[i][0] += grid[i - 1][0];
        }
        for (let j = 1; j < n; j++) {
            grid[0][j] += grid[0][j - 1];
        }

        for (let i = 1; i < m; i++) {
            for (let j = 1; j < n; j++) {
                grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
            }
        }
        return grid[m -1][n - 1];
    }

    console.log(minPathSum([
        [1,3,1],
        [1,5,1],
        [4,2,1]
    ])); // 7 (1→3→1→1→1)
}
// Note: LeetCode #64 — modify grid in place! Each cell = current value + min(from above, from left)!

// Problem 4 — Longest Common Subsequence

{
    function longestCommonSubsequence(text1, text2) {
        const m = text1.length, n = text2.length;
        const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (text1[i - 1] === text2[j - 1]) {
                    dp[i][j] = 1 + dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
                }
            }
        }
        return dp[m][n];
    }

    console.log(longestCommonSubsequence("abcde", "ace")); // 3
    console.log(longestCommonSubsequence("abc", "abc"));   // 3
    console.log(longestCommonSubsequence("abc", "def"));   // 0
}
// Note: LeetCode #1143 — if chars match extend diagonal. If not take best of skipping either char!

// Problem 5 — Edit Distance

{
    function minDistance(word1, word2) {
        const m = word1.length, n = word2.length;
        const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = i;
        for (let j = 0; j <= n; j++) dp[0][j] = j;

        for (let i = 1; i <= m; i++) {
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

    console.log(minDistance("horse", "ros"));       // 3
    console.log(minDistance("intention", "execution")); // 5
}
// Note: LeetCode #72 — Hard but important! Three operations: delete, insert, replace. Take minimum of all three!

// Problem 6 — Maximal Square

{
    function maximalSquare(matrix) {
        const m = matrix.length, n = matrix[0].length;
        const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));
        let maxSize = 0;

        for (let i = 1; i <= m; i++) {
            for(let j = 1; j <= n; j++) {
                if (matrix[i- 1][j - 1] === '1') {
                    dp[i][j] = 1 + Math.min(
                        dp[i - 1][j],
                        dp[i][j - 1],
                        dp[i - 1][j - 1]
                    );
                    maxSize = Math.max(maxSize, dp[i][j]);
                }
            }
        }
        return maxSize * maxSize;
    }

    console.log(maximalSquare([
        ['1','0','1','0','0'],
        ['1','0','1','1','1'],
        ['1','1','1','1','1'],
        ['1','0','0','1','0']
    ])); // 4
}
// Note: LeetCode #221 — dp[i][j] = side length of largest square ending at (i,j). Limited by minimum of three neighbors!

// Problem 7 — Coin Change 2 (Number of Ways)

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

    console.log(change(5, [1,2,5]));  // 4
    console.log(change(3, [2]));       // 0
    console.log(change(10, [10]));     // 1
}
// Note: LeetCode #518 — count WAYS not minimum coins! Iterate coins in outer loop to avoid counting same combination twice!

// Problem 8 — Triangle

{
    function minimumTotal(triangle) {
        const n = triangle.length;
        const dp = [...triangle[n - 1]];

        for (let i = n - 2; i >= 0; i--) {
            for (let j = 0; j <= i; j++) {
                dp[j] = triangle[i][j] + Math.min(dp[j], dp[j + 1]);
            }
        }
        return dp[0];
    }

    console.log(minimumTotal([
        [2],
        [3,4],
        [6,5,7],
        [4,1,8,3]
    ])); // 11 (2+3+5+1)
}
// Note: LeetCode #120 — work bottom-up! Each cell = current value + min of two cells below. Space optimized using 1D array!

// Problem 9 — Dungeon Game

{
    function calculateMinimumHP(dungeon) {
        const m = dungeon.length, n = dungeon[0].length;
        const dp = Array.from({length : m + 1}, () => new Array(n + 1).fill(Infinity));

        dp[m][n -1] = dp[m - 1][n] = 1;

        for (let i = m - 1; i >= 0; i--) {
            for (let j = n - 1; j >= 0; j--) {
                const minNext = Math.min(dp[i + 1][j], dp[i][j + 1]);
                dp[i][j] = Math.max(minNext - dungeon[i][j], 1);
            }
        }
        return dp[0][0];
    }

    console.log(calculateMinimumHP([
        [-2,-3,3],
        [-5,-10,1],
        [10,30,-5]
    ])); // 7
}
// Note: LeetCode #174 — Hard! Work backwards from destination. Minimum HP needed = max(1, nextMin - dungeon[i][j])!

// Problem 10 — Cherry Pickup

{
    function cherryPickup(grid) {
        const n = grid.length;
        const memo = new Map();

        function dp(r1, c1, r2) {
            const c2 = r1 + c1 - r2;

            if (r1 >= n || r2 >= n || c1 >= n || c2 >= n || grid[r1][c1] === -1 || grid[r2][c2] === -1) return -Infinity;

            if (r1 === n - 1 && c1 === n - 1) return grid[r1][c1];

            const key = `${r1},${c1},${r2}`;
            if (memo.has(key)) return memo.get(key);

            let cherries = grid[r1][c1];
            if (r1 !== r2 || c1 !== c2) cherries += grid[r2][c2];

            const best = Math.max(
                dp(r1 + 1, c1, r2 + 1),
                dp(r1, c1 + 1, r2),
                dp(r1 + 1,c1, r2),
                dp(r1, c1 + 1, r2 + 1)
            );

            if (best === -Infinity) {
                memo.set(key, -Infinity);
                return -Infinity;
            }

            const result = cherries + best;
            memo.set(key, result);
            return result;
        }
        return Math.max(0, dp(0, 0, 0));
    }

    console.log(cherryPickup([
        [0,1,-1],
        [1,0,-1],
        [1,1,1]
    ])); // 5
}