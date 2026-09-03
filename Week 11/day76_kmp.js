// Problem 1 — Build LPS Array (Foundation!)

// Attempt first (10 mins):

// Build the LPS (Longest Prefix Suffix) array for a pattern.

// Input: "abab"  → [0,0,1,2]
// Input: "aaaa"  → [0,1,2,3]
// Input: "abcde" → [0,0,0,0,0]

{
    function buildLPS(pattern) {
        const n = pattern.length;
        const lps = new Array(n).fill(0);
        let len = 0;
        let i = 1;

        while (i < n) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }
        return lps;
    }

    console.log(buildLPS("abab"));  // [0,0,1,2]
    console.log(buildLPS("aaaa"));  // [0,1,2,3]
    console.log(buildLPS("abcde")); // [0,0,0,0,0]
}
// Note: This is the foundation of KMP! lps[i] = length of longest prefix that's also suffix for pattern[0..i]!

// Problem 2 — KMP String Search

// Attempt first (10 mins):

// Find all occurrences of pattern in text.

// Input: text="ababcababcabc", pattern="abc"
// Output: [2, 7, 10]
{
    function buildLPS(pattern) {
        const n = pattern.length;
        const lps = new Array(n).fill(0);
        let len = 0, i = 1;

        while (i < n) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) { len = lps[len - 1]; }
                else { lps[i] = 0; i++; }
            }
        }
        return lps;
    }

    function kmpSearch(text, pattern) {
        const lps = buildLPS(pattern);
        const result = [];
        let i = 0, j = 0;

        while (i < text.length) {
            if (text[i] === pattern[j]) {
                i++; j++;
            }
            if (j === pattern.length) {
                result.push(i - j);
                j = lps[j - 1];
            } else if (i < text.length && text[i] !== pattern[j]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
        }
        return result;
    }

    console.log(kmpSearch("ababcababcabc", "abc")); // [2,7,10]
    console.log(kmpSearch("aaaa", "aa"));             // [0,1,2]
}
// Note: When mismatch occurs, use lps[j-1] to skip characters we already know match — never move i backward!

// Problem 3 — Find the Index of First Occurrence

// Attempt first (10 mins):

// Return index of first occurrence of needle in haystack.

// Input: haystack="sadbutsad", needle="sad" → 0
// Input: haystack="leetcode", needle="leeto" → -1

{
    function strStr(haystack, needle) {
        if (needle === "") return 0;

        function buildLPS(pattern) {
            const n = pattern.length;
            const lps = new Array(n).fill(0);
            let len = 0, i = 1;
            while (i < n) {
                if (pattern[i] === pattern[len]) {
                    lps[i] = ++len; i++; 
                } else if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0; i++;
                }
            }
            return lps;
        }

        const lps = buildLPS(needle);
        let i = 0, j = 0;

        while (i < haystack.length) {
            if (haystack[i] === needle[j]) { i++; j++; }

            if (j === needle.length) return i - j;

            if (i < haystack.length && haystack[i] !== needle[j]) {
                if (j !== 0) j = lps[j - 1];
                else i++;
            }
        }
        return -1;
    }

    console.log(strStr("sadbutsad", "sad"));  // 0
    console.log(strStr("leetcode", "leeto")); // -1
}
// Note: LeetCode #28 — direct KMP application! Return first match position or -1!

{
    function longestPrefix(s) {
        function buildLPS(pattern) {
            const n = pattern.length;
            const lps = new Array(n).fill(0);
            let len = 0, i = 1;

            while (i < n) {
                if (pattern[i] === pattern[len]) {
                    lps[i] = ++len; i++;
                } else if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0; i++;
                }
            }
            return lps;
        }

        const lps = buildLPS(s);
        const len = lps[lps.length - 1];
        return s.slice(0, len);
    }

    console.log(longestPrefix("level"));         // "l"
    console.log(longestPrefix("ababab"));         // "abab"
    console.log(longestPrefix("leetcodeleet"));   // "leet"
}
// Note: LeetCode #1392 — the LAST value in LPS array directly gives us the answer! lps[n-1] = longest happy prefix length!

// Problem 5 — Repeated Substring Pattern

// Attempt first (10 mins):

// Check if string can be constructed by repeating
// a substring multiple times.

// Input: "abab"       → true ("ab" × 2)
// Input: "aba"        → false
// Input: "abcabcabcabc" → true ("abc" × 4)
{
    function repeatedSubstringPattern(s) {
        function buildLPS(pattern) {
            const lps = new Array(pattern.length).fill(0);
            let len = 0, i = 1;

            while(i < pattern.length) {
                if (pattern[i] === pattern[len]) {
                    lps[i] = ++len; i++;
                } else if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0; i++;
                }
            }
            return lps;
        }
        const n = s.length;
        const lps = buildLPS(s);
        const len = lps[n - 1];

        return len > 0 && n % (n - len) === 0;
    }

    console.log(repeatedSubstringPattern("abab"));         // true
    console.log(repeatedSubstringPattern("aba"));          // false
    console.log(repeatedSubstringPattern("abcabcabcabc")); // true
}
// Note: LeetCode #459 — clever LPS trick! If n - lps[n-1] divides n evenly, the string is made of repeating substrings!

// Problem 6 — Shortest Palindrome

// Attempt first (10 mins):

// Add minimum characters to FRONT to make palindrome.

// Input: "aacecaaa" → "aaacecaaa"
// Input: "abcd"     → "dcbabcd"

{
    function shortestPalindrome(s) {
        function buildLPS(pattern) {
            const n = pattern.length;
            const lps = new Array(n).fill(0);
            let len = 0; i = 1;

            while(i < n) {
                if (pattern[i] === pattern[len]) {
                    lps[i] = ++len; i++;
                } else if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0; i++;
                }
            }
            return lps;
        }

        const rev = s.split("").reverse().join("");
        const combined = s + '#' + rev;

        const lps = buildLPS(combined);
        const palindromeLen = lps[lps.length - 1];

        const toAdd = rev.slice(0, s.length - palindromeLen);
        return toAdd + s;
    }

    console.log(shortestPalindrome("aacecaaa")); // "aaacecaaa"
    console.log(shortestPalindrome("abcd"));      // "dcbabcd"
}
// Note: LeetCode #214 — Hard! Clever trick: combine s + "#" + reverse(s). The LPS of this combined string tells us the longest palindromic prefix!

// Problem 7 — String Matching in an Array

// Attempt first (10 mins):

// Return all words that are substrings of another word.

// Input: ["mass","as","hero","superhero"]
// Output: ["as","hero"]

{
    function stringMatching(words) {
        words.sort((a, b) => a.length - b.length);
        const result = [];

        for (let i = 0; i < words.length; i++) {
            for (let j = 0; j < words.length; j++) {
                if (i !== j && words[j].includes(words[i])) {
                    result.push(words[i]);
                    break;
                }
            }
        }
        return result;
    }

    console.log(stringMatching(["mass","as","hero","superhero"]));
    // ["as","hero"]
    console.log(stringMatching(["leetcode","et","code"]));
    // ["et","code"]

}