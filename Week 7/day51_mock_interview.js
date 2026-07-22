// Problem 1 — Easy (10 mins)

// Given a string s, find the first non-repeating character
// and return its index. If none exists return -1.

// Input: s = "leetcode"  → Output: 0
// Input: s = "loveleet"  → Output: 3
// Input: s = "aabb"      → Output: -1

{
    function firstUniqChar(s) {
        const freq = new Map();
        for (let char of s) freq.set(char, (freq.get(char) || 0) + 1);
        for (let i = 0; i < s.length; i++) {
            if (freq.get(s[i]) === 1) return i;
        }
        return -1;
    }

    console.log(firstUniqChar("leetcode")); // 0
    console.log(firstUniqChar("aabb"));
}
// Pattern: Hash Map frequency counter!

// Problem 2 — Easy/Medium (15 mins)

// Given array of integers, return true if there exists
// a triple i, j, k such that nums[i] < nums[j] < nums[k]

// Input: [1,2,3,4,5] → true
// Input: [5,4,3,2,1] → false
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

    console.log(increasingTriplet([1,2,3,4,5]));   // true
    console.log(increasingTriplet([5,4,3,2,1]));   // false
    console.log(increasingTriplet([2,1,5,0,4,6])); // true
}
// Pattern: Greedy — track smallest first and second seen so far!

// Problem 3 — Medium (20 mins)

// Given a string, find the length of longest substring
// that contains at most 2 distinct characters.

// Input: "eceba" → 3 ("ece")
// Input: "ccaabbb" → 5 ("aabbb")

{
    function lengthOfLongestSubstringTwoDistinct(s) {
        let left = 0;
        let maxLen = 0;
        let window = new Map();

        for (let right = 0; right < s.length; right++) {
            window.set(s[right], (window.get(s[right]) || 0) + 1);

            while(window.size > 2) {
                window.set(s[left], window.get(s[left]) - 1);
                if (window.get(s[left]) === 0) window.delete(s[left]);
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    console.log(lengthOfLongestSubstringTwoDistinct("eceba"));   // 3
    console.log(lengthOfLongestSubstringTwoDistinct("ccaabbb")); // 5
}
// Pattern: Sliding Window (dynamic) + Hash Map!

// Problem 4 — Medium (25 mins)

// Given binary tree, find the maximum path sum.
// Path can start and end at any node.

// Input:      1          Output: 6
//            / \
//           2   3

// Input:    -10          Output: 42
//           /  \
//          9   20
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
    function maxPathSum(root) {
        let maxSum = -Infinity;

        function dfs(node) {
            if(!node) return 0;

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
// Pattern: Tree DFS — at each node, calculate path through it. Track global max!

// Problem 5 — Medium (25 mins)

// Given n pairs of parentheses, generate all combinations
// of well-formed parentheses.

// Input: n = 3
// Output: ["((()))","(()())","(())()","()(())","()()()"]

{
    function generateParentheses(n) {
        const result = [];

        function backtrack(current, open, close) {
            if (current.length === 2 * n) {
                result.push(current);
                return;
            }
            if (open < n) {
                backtrack(current + '(', open + 1, close);
            }
            if (close < open) {
                backtrack(current + ')', open, close + 1);
            }
        }
        backtrack("", 0, 0);
        return result;
    }

    console.log(generateParentheses(3));
}