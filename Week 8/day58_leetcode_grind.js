//1st.   #70  - Climbing Stairs (Easy) — warmup

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
    };
}

// 2nd.  #198 - House Robber (Medium) — do from memory!

{
    function rob(nums) {
        if (nums.length === 1) return nums[0];

        const dp = new Array(nums.length);
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for (let i = 2; i < nums.length; i++) {
            dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2]);
        }
        return dp[dp.length - 1];
    };
}

// 3rd.  #213 - House Robber II (Medium)

{
    var rob = function (nums) {
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
    };
}

// 4th.  #91  - Decode Ways (Medium)

{
    var numDecodings = function (s) {
        if (s.length === 0 || s[0] === '0') return 0;

        const n = s.length;
        const dp = new Array(n + 1).fill(0);
        dp[0] = 1;  // empty string
        dp[1] = 1;  // first character (already checked not '0')

        for (let i = 2; i <= n; i++) {
            // 1-digit decoding
            const oneDigit = s[i - 1];
            if (oneDigit !== '0') {
                dp[i] += dp[i - 1];
            }

            // 2-digit decoding
            const twoDigits = s.slice(i - 2, i);
            const num = parseInt(twoDigits, 10);
            if (num >= 10 && num <= 26) {
                dp[i] += dp[i - 2];
            }
        }
        return dp[n];
    }
}

// 5th.  #300 - Longest Increasing Subsequence (Medium)

{
    var lengthOfLIS = function (nums) {
        const dp = new Array(nums.length).fill(1);

        for (let i = 1; i < nums.length; i++) {
            for (let j = 0; j < i; j++) {
                if (nums[j] < nums[i]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
        }
        return Math.max(...dp)
    };
}

// 6th.  #200 - Number of Islands (Medium) — do from memory!

{
    var numIslands = function (grid) {
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
                    dfs(r, c);
                }
            }
        }
        return isLands;
    };
}

// 7th.  #207 - Course Schedule (Medium)

{
    var canFinish = function (numCourses, prerequisites) {
        const adj = Array.from({ length: numCourses }, () => []);
        const inDegree = new Array(numCourses).fill(0);

        for (let [course, pre] of prerequisites) {
            adj[pre].push(course);
            inDegree[course]++;
        }

        const queue = [];
        for (let i = 0; i < numCourses; i++) {
            if (inDegree[i] === 0) queue.push(i);
        }

        let completed = 0;
        while (queue.length > 0) {
            const course = queue.shift();
            completed++;

            for (let next of adj[course]) {
                inDegree[next]--;
                if (inDegree[next] === 0) queue.push(next);
            }
        }
        return completed === numCourses;
    };
}

// 8th.  #417 - Pacific Atlantic Water Flow (Medium)

{
    var pacificAtlantic = function (heights) {
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
        for (let r = 0; r < rows; r++) {
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
    };
}

// 9th.   #994 - Rotting Oranges (Medium)

{
    var orangesRotting = function (grid) {
        const rows = grid.length;
        const cols = grid[0].length;
        const queue = [];
        let fresh = 0;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === 2) queue.push([r, c]);
                if (grid[r][c] === 1) fresh++;
            }
        }
        if (fresh === 0) return 0;

        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        let minutes = 0;

        while (queue.length > 0 && fresh > 0) {
            const size = queue.length;
            minutes++;

            for (let i = 0; i < size; i++) {
                const [r, c] = queue.shift();

                for (let [dr, dc] of directions) {
                    const nr = r + dr;
                    const nc = c + dc;

                    if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.push([nr, nc]);
                    }
                }
            }
        }
        return fresh === 0 ? minutes : -1;
    };
}

// 10th.  #127 - Word Ladder (Hard) — attempt, don't stress if stuck

{
    var ladderLength = function (beginWord, endWord, wordList) {
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
    };
}