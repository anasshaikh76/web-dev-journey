// Problem 1 — Backtracking

// Generate all valid IP addresses from digit string.

// Input: "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]

{
    function restoreIpAddresses(s) {
        const result = [];

        function backtrack(start, parts) {
            if (parts.length === 4 && start === s.length) {
                result.push(parts.join('.'));
                return;
            }
            if (parts.length === 4 || start === s.length) return;

            for (let len = 1; len <= 3; len++) {
                if (start + len > s.length) break;
                const segment = s.slice(start, start + len);
                if (segment.length > 1 && segment[0] === '0') break;
                if (Number(segment) > 255) break;

                parts.push(segment);
                backtrack(start + len, parts);
                parts.pop();
            }
        }
        backtrack(0, []);
        return result;
    }

    console.log(restoreIpAddresses("25525511135"));
    // ["255.255.11.135","255.255.111.35"]
}
// Pattern: Backtracking with pruning!

// Problem 2 — Union Find

// Given equations like "a==b", "b!=c",
// determine if all equations are satisfiable.

// Input: ["a==b","b!=a"] → false
// Input: ["b==a","a==b"] → true
// Input: ["a==b","b==c","a!=c"] → false

{
    function equationsPossible(equations) {
        const parent = Array.from({length: 26}, (_,i) => i);

        function find(x) {
            if (parent[x] !== x) parent[x] = find(parent[x]);
            return parent[x];
        }

        for (let eq of equations) {
            if (eq[1] === '=') {
                const a = eq.charCodeAt(0) - 97;
                const b = eq.charCodeAt(3) - 97;
                parent[find(a)] = find(b);
            }
        }
        for (let eq of equations) {
            if (eq[1] === '!') {
                const a = eq.charCodeAt(0) - 97;
                const b = eq.charCodeAt(3) - 97;
                if (find(a) === find(b)) return false;
            }
        }
        return true;
    }

    console.log(equationsPossible(["a==b","b!=a"]));      // false
    console.log(equationsPossible(["b==a","a==b"]));       // true
    console.log(equationsPossible(["a==b","b==c","a!=c"])); // false
}
// Pattern: Union Find (two pass)!

// Problem 3 — Hard Problem

// Find length of longest valid parentheses substring.

// Input: "(()"    → 2
// Input: ")()())" → 4
// Input: ""       → 0

{
    function longestValidParentheses(s) {
        const stack = [-1];
        let maxlen = 0;

        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(') {
                stack.push(i);
            } else {
                stack.pop();
                if (stack.length === 0) {
                    stack.push(i);
                } else {
                    maxlen= Math.max(maxlen, i - stack[stack.length - 1]);
                }
            }
        }
        return maxlen;
    }

    console.log(longestValidParentheses("(()"));   // 2
    console.log(longestValidParentheses(")()())")); // 4
    console.log(longestValidParentheses(""));        // 0
}
// Pattern: Stack — track indices, calculate length from last unmatched!

// Problem 4 — Greedy

// Given array of meeting intervals,
// find minimum number of meeting rooms needed.

// Input: [[0,30],[5,10],[15,20]] → 2
// Input: [[7,10],[2,4]]          → 1

{
    function minMeetingRooms(intervals) {
        const starts = intervals.map(i => i[0]).sort((a, b) => a-b);
        const ends = intervals.map(i => i[1]).sort((a, b) => a-b);

        let rooms = 0, maxRooms = 0, endPtr = 0;

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
}
// Pattern: Greedy + Sort starts/ends separately!

// Problem 5 — Interval

// Insert new interval into sorted list.

// Input: [[1,3],[6,9]], newInterval=[2,5]
// Output: [[1,5],[6,9]]

{
    function insert(intervals, newInterval) {
        const result = [];
        let i = 0;
        const n = intervals.length;

        while (i < n && intervals[i][1] < newInterval[0]) {
            result.push(intervals[i++]);
        }
        while (i <n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push(newInterval);

        while(i < n) result.push(intervals[i++]);

        return result;
    }

    console.log(insert([[1,3],[6,9]], [2,5]));
    // [[1,5],[6,9]]
}
// Pattern: Interval insertion (3 phases)!

// Problem 6 — DP

// Minimum cost to cut a stick of length n.
// cuts array gives positions to cut.
// Cost of each cut = current stick length.

// Input: n=7, cuts=[1,3,4,5] → 16

{
    function minCost(n, cuts) {
        cuts.sort((a, b) => a - b);
        cuts = [0, ...cuts, n];
        const m = cuts.length;

        const dp = Array.from({length: m},
                   () => new Array(m).fill(0));

        for (let len = 2; len < m; len++) {
            for (let i = 0; i < m-len; i++) {
                const j = i + len;
                dp[i][j] = Infinity;

                for (let k = i+1; k < j; k++) {
                    dp[i][j] = Math.min(dp[i][j],
                        cuts[j]-cuts[i] + dp[i][k] + dp[k][j]);
                }
            }
        }
        return dp[0][m - 1];
    }

    console.log(minCost(7, [1,3,4,5])); // 16
    console.log(minCost(9, [5,6,1,4,2])); // 22
}
// Pattern: Interval DP! Cost = current length + best way to cut both halves!

// Problem 7 — Combined Patterns

// Given string s and list of words,
// find all starting indices of substring(s)
// that is a concatenation of all words.

// Input: s="barfoothefoobarman", words=["foo","bar"]
// Output: [0,9]

{
    function findSubstring(s, words) {
        if (!s || !words.length) return [];

        const wordlen = words[0].length;
        const totalLen = wordlen * words.length;
        const result = [];

        const wordCount = new Map();
        for (let word of words) {
            wordCount.set(word, (wordCount.get(word) || 0) + 1);
        }
        for (let i = 0; i <= s.length - totalLen; i++) {
            const seen = new Map();
            let j = 0;

            while (j < words.length) {
                const word = s.slice(i + j * wordlen, i + (j + 1) * wordlen);
                if (!wordCount.has(word)) break;

                seen.set(word, (seen.get(word) || 0) + 1);
                if (seen.get(word) > wordCount.get(word)) break;
                j++;
            }
            if (j === words.length) result.push(i);
        }
        return result;
    }

    console.log(findSubstring("barfoothefoobarman",
        ["foo","bar"])); // [0,9]
    console.log(findSubstring("wordgoodgoodgoodbestword",
        ["word","good","best","word"])); // []
}