// Problem 1 — Longest Palindromic Substring

{
    function longestPalindrome(s) {
        let start = 0, maxLen = 1;

        function expandAroundCenter(left, right) {
            while (left >= 0 && right < s.length && s[left] === s[right]) {
                if (right - left + 1 > maxLen) {
                    maxLen = right - left + 1;
                    start = left;
                }   
                left--;
                right++;
            }
        }

        for (let i = 0; i < s.length; i++) {
            expandAroundCenter(i, i);
            expandAroundCenter(i, i + 1);
        }
        return s.slice(start, start + maxLen);
    }

    console.log(longestPalindrome("babad"));   // "bab"
    console.log(longestPalindrome("cbbd"));    // "bb"
    console.log(longestPalindrome("racecar")); // "racecar"
}
// Note: LeetCode #5 — expand from every center! Two cases: odd length (single center) and even length (two center chars). O(n²) time, O(1) space!

// Problem 2 — Palindromic Substrings Count

{
    function countSubstrings(s) {
        let count = 0;

        function expand(left, right) {
            while (left >= 0 && right < s.length && s[left] === s[right]) {
                count++;
                left--;
                right++;
            }
        }
        for (let i = 0; i < s.length; i++) {
            expand(i, i);
            expand(i, i + 1);
        }
        return count;
    }

    console.log(countSubstrings("abc"));    // 3 (a,b,c)
    console.log(countSubstrings("aaa"));    // 6 (a,a,a,aa,aa,aaa)
}
// Note: LeetCode #647 — same expand pattern as Problem 1, just count every valid palindrome!

// Problem 3 — Longest Palindromic Subsequence

{
    function longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = Array.from({length: n}, () => new Array(n).fill(0));

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

    console.log(longestPalindromeSubseq("bbbab")); // 4 (bbbb)
    console.log(longestPalindromeSubseq("cbbd"));  // 2 (bb)
}
// Note: LeetCode #516 — Interval DP! dp[i][j] = longest palindromic subsequence in s[i..j]. If chars match, add 2. If not, skip one end and take max!

// Problem 4 — Minimum Insertions to Make Palindrome

{
    function minInsertions(s) {
        const n = s.length;

        const lps = longestPalindromeSubseq(s);
        return n - lps;
    }

    function longestPalindromeSubseq(s) {
        const n = s.length;
        const dp = Array.from({length: n}, () => new Array(n).fill(0));

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

    console.log(minInsertions("zzazz")); // 0 (already palindrome)
    console.log(minInsertions("mbadm")); // 2
    console.log(minInsertions("leetcode")); // 5
}
// Note: LeetCode #1312 — brilliant insight! Characters already in LPS don't need insertion. Only non-LPS characters need to be inserted. Answer = n - LPS length!

// Problem 5 — Distinct Subsequences

{
    function numDistinct(s, t) {
        const m = s.length, n = t.length;
        const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) dp[i][0] = 1;

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                dp[i][j] = dp[i - 1][j];

                if (s[i - 1] === t[j - 1]) {
                    dp[i][j] += dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }

    console.log(numDistinct("rabbbit", "rabbit")); // 3
    console.log(numDistinct("babgbag", "bag"));    // 5
}
// Note: LeetCode #115 — Hard! dp[i][j] = ways to form t[0..j] using s[0..i]. Either skip s[i] or use it (if chars match)!

// Problem 6 — Interleaving String

{
    function isInterleave(s1, s2, s3) {
        const m = s1.length, n = s2.length;
        if (m + n !== s3.length) return false;

        const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(false));
        dp[0][0] = true;

        for (let i = 1; i <= m; i++) {
            dp[i][0] = dp[i - 1][0] && s1[i - 1] === s3[i - 1];
        }
        for (let j = 1; j <= n; j++) {
            dp[0][j] = dp[0][j - 1] && s2[j - 1] === s3[j - 1];
        }

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                dp[i][j] = (dp[i - 1][j] && s1[i - 1] === s3[i + j - 1]) || (dp[i][j - 1] && s2[j - 1] === s3[i + j - 1]);
            }
        }
        return dp[m][n];
    }

    console.log(isInterleave("aabcc", "dbbca", "aadbbcbcac")); // true
    console.log(isInterleave("aabcc", "dbbca", "aadbbbaccc")); // false
}
// Note: LeetCode #97 — dp[i][j] = can s3[0..i+j] be formed by interleaving s1[0..i] and s2[0..j]!

// Problem 7 — Regular Expression Matching

{
    function isMatch(s, p) {
        const m = s.length, n = p.length;
        const dp = Array.from({length: m + 1}, () => new Array(n + 1).fill(false));
        dp[0][0] = true;

        for (let j = 1; j <= n; j++) {
            if (p[j - 1] === '*') dp[0][j] = dp[0][j - 2];
        }

        for (let i = 1; i <= m; i++) {
            for (let j = 1; j <= n; j++) {
                if (p[j - 1] === '*') {
                    dp[i][j] = dp[i][j - 2];
                    if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                        dp[i][j] = dp[i][j] || dp[i - 1][j];
                    }
                } else if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }

    console.log(isMatch("aa", "a*"));   // true
    console.log(isMatch("ab", ".*"));   // true
    console.log(isMatch("aab", "c*a*b")); // true
}
// Note: LeetCode #10 — Hard! * means 0 or more of previous char. Either use it as 0 (skip 2 pattern chars) or 1+ (if current chars match)!

// Problem 8 — Scramble String

{
    function isScramble(s1, s2) {
        if (s1 === s2) return true;
        if (s1.length !== s2.length) return false;

        const memo = new Map();

        function dp(a, b) {
            if (a === b) return true;
            const key = `${a},${b}`;
            if (memo.has(key)) return memo.get(key);

            const n = a.length;
            let result = false;

            for (let i = 1; i < n && !result; i++) {

                result = dp(a.slice(0, i), b.slice(0, i)) && dp(a.slice(i), b.slice(i));

                if (!result) {
                    result = dp(a.slice(0, i), b.slice(n - 1)) && dp(a.slice(0), b.slice(0, n - 1));
                }
            }

            memo.set(key, result);
            return result;
        }
        return dp(s1, s2);
    }

    console.log(isScramble("great", "rgeat")); // true
    console.log(isScramble("abcde", "caebd")); // false
}
// Note: LeetCode #87 — Hard! Try every split point, check both swapped and non-swapped versions with memoization!

// Problem 9 — Stone Game (Interval DP)

{
    function stoneGame(piles) {
        return true;
    }

    function stoneGameDP(piles) {
        const n = piles.length;
        const dp = Array.from({length: n}, () => new Array(n).fill(0));

        for (let i = 0; i < n; i++) dp[i][i] = piles[i];

        for (let len = 2; len <= n; len++) {
            for (let i = 0; i <= n - len; i++) {
                const j = i + len - 1;
                dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1]);
            }
        }
        return dp[0][n - 1] > 0
    }

    console.log(stoneGame([5,3,4,5]));      // true
    console.log(stoneGameDP([5,3,4,5]));    // true
    console.log(stoneGameDP([3,7,2,3]));    // true
}
// Note: LeetCode #877 — Interval DP! dp[i][j] = score advantage for current player in range [i,j]. Take left or right pile, subtract opponent's best play!

// Problem 10 — Minimum Cost Tree from Leaf Values

{
    function mctFromLeafValues(arr) {
        const n = arr.length;
        const dp = Array.from({length: n}, () => new Array(n).fill(0));
        const maxVal = Array.from({length: n}, () => new Array(n).fill(0));

        for (let i = 0; i < n; i++) {
            maxVal[i][i] = arr[i];
            for (let j = i + 1; j < n; j++) {
                maxVal[i][j] = Math.max(maxVal[i][j - 1], arr[j]);
            }
        }

        for (let len = 2; len <= n; len++) {
            for (let i = 0; i <= n - len; i++) {
                const j = i + len - 1;
                dp[i][j] = Infinity;

                for (let k = i; k < j; k++) {
                    dp[i][j] = Math.min(
                        dp[i][j],
                        dp[i][k] + dp[k+1][j] +
                        maxVal[i][k] * maxVal[k+1][j]
                    )
                }
            }
        }
        return dp[0][n - 1];
    }

    console.log(mctFromLeafValues([6,2,4])); // 32
    console.log(mctFromLeafValues([4,11]));  // 44
}