// Problem 1 — Arrays (Easy)

// Given array of integers, find if any two numbers
// sum to zero.

// Input: [-3, -1, 0, 2, 3]  → true (-3+3=0)
// Input: [-3, -1, 2, 4]     → false

{
    function hasPairWithZeroSum(arr) {
        const seen = new Set();
        for (let num of arr) {
            if (seen.has(-num)) return true;
            seen.add(num);
        }
        return false;
    }

    console.log(hasPairWithZeroSum([-3, -1, 0, 2, 3])); // true
    console.log(hasPairWithZeroSum([-3, -1, 2, 4]));   // false
}
// Pattern: Hash Set — complement lookup!

// Problem 2 — Two Pointers (Easy)

// Given sorted array, remove duplicates in-place.
// Return length of unique elements.

// Input: [1,1,2,3,3,4]  → 4
// Array becomes: [1,2,3,4,...]

{
    function removeDuplicates(nums) {
        let slow = 0;

        for (let fast = 1; fast < nums.length; fast++) {
            if (nums[fast] !== nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }

    console.log(removeDuplicates([1, 1, 2, 3, 3, 4])); // 4
}
// Pattern: Two Pointers (slow/fast)!

// Problem 3 — Sliding Window (Medium)

// Find longest substring where sum of digits equals k.
// String contains only digits 0-9.

// Input: "23514", k=8  → 3 ("351" → 3+5+1=9... try "235"=10... "514"=10... "351"=9... hmm try "23"=5... "235"=10... )
// Actually: find longest where each char as digit ≤ k

// Simplify: find length of longest subarray
// where all elements ≤ k

// Input: [1,2,3,1,2], k=3  → 3 ([1,2,... wait)
// Input: nums=[2,1,2], k=2  → 2

{
    function longestSubarrayMaxK(nums, k) {
        let left = 0, maxLen = 0;

        for (let right = 0; right < nums.length; right++) {
            if (nums[right] > k) {
                left = right + 1;
                break;
            }
            if (nums[right] <= k) {
                maxLen = Math.max(maxLen, right - left + 1);
            } else {
                left = right + 1;
            }
        }
        return maxLen;
    }

    console.log(longestSubarrayMaxK([2, 1, 2], 2)); // 3
    console.log(longestSubarrayMaxK([1, 2, 3], 2)); // 2
}
// Pattern: Sliding Window!

// Problem 4 — Hash Map (Easy)

// Given two strings, check if one is anagram of other.

// Input: "anagram", "nagaram"  → true
// Input: "rat", "car"          → false

{
    function isAnagram(s, t) {
        if (s.length !== t.length) return false;
        const count = {};
        for (let char of s) count[char] = (count[char] || 0) + 1;
        for (let char of t) {
            if (!count[char]) return false;
            count[char]--;
        }
        return true;
    }

    console.log(isAnagram("anagram", "nagaram")); // true
    console.log(isAnagram("rat", "car"));          // false
}
// Pattern: Frequency Counter (Hash Map)!

// Problem 5 — Binary Search (Medium)

// Given sorted rotated array, find minimum element.

// Input: [3,4,5,1,2]   → 1
// Input: [4,5,6,7,0,1,2] → 0
// Input: [11,13,15,17]  → 11

{
    function findMin(nums) {
        let left = 0, right = nums.length - 1;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }

    console.log(findMin([3, 4, 5, 1, 2]));     // 1
    console.log(findMin([4, 5, 6, 7, 0, 1, 2])); // 0
    console.log(findMin([11, 13, 15, 17]));    // 11
}
// Pattern: Binary Search (rotated array)!

// Given linked list, reverse it in groups of k.
// If remaining nodes < k, leave them as is.

// Input: 1→2→3→4→5, k=2  → 2→1→4→3→5
// Input: 1→2→3→4→5, k=3  → 3→2→1→4→5

{
    class Node {
        constructor(val) {
            this.val = val;
            this.next = null;
        }
    }

    function reverseKGroup(head, k) {
        let curr = head;
        let count = 0;

        while (curr && count < k) {
            curr = curr.next;
            count++;
        }
        if (count < k) return head;

        let prev = null;
        curr = head;
        for (let i = 0; i < k; i++) {
            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        head.next = reverseKGroup(curr, k);
        return prev;
    }

    let head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = new Node(5);

    let result = reverseKGroup(head, 2);
    let curr = result;
    while (curr) { process.stdout.write(curr.val + " → "); curr = curr.next; }
    console.log("null");
}
// Pattern: Linked List + Recursion!

// Problem 7 — Tree (Medium)

// Given binary tree, find sum of all left leaves.

// Input:      3
//            / \
//           9  20
//             /  \
//            15   7
// Output: 24 (9 + 15)

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    function sumOfLeftLeaves(root) {
        if (!root) return 0;

        let sum = 0;

        if (root.left && !root.left.left && !root.left.right) {
            sum += root.left.val;
        } else {
            sum += sumOfLeftLeaves(root.left);
        }
        sum += sumOfLeftLeaves(root.right);
        return sum;
    }

    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);

    console.log(sumOfLeftLeaves(root)); // 24 (9+15)
}
// Pattern: Tree DFS!

// Problem 8 — Graph (Medium)

// Given grid of 0s and 1s, count number of islands.
// Islands are groups of 1s connected horizontally
// or vertically.

// Input:
// [1,1,0,0]
// [1,0,0,1]
// [0,0,1,1]
// Output: 3

{
    function numIslands(grid) {
        let count = 0;
        const rows = grid.length;
        const cols = grid[0].length;

        function dfs(r, c) {
            if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
            grid[r][c] = '0';
            dfs(r + 1, c);
            dfs(r - 1, c);
            dfs(r, c + 1);
            dfs(r, c - 1);
        }

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (grid[r][c] === '1') {
                    count++;
                    dfs(r, c);
                }
            }
        }
        return count;
    }

    console.log(numIslands([
        ['1', '1', '0', '0'],
        ['1', '0', '0', '1'],
        ['0', '0', '1', '1']
    ])); // ✅ 3
}
// Pattern: Graph DFS (grid)!

// Problem 9 — DP (Medium)

// You have n steps. You can climb 1, 2 or 3 steps
// at a time. How many ways to reach the top?

// Input: n=3  → 4
// Ways: (1+1+1), (1+2), (2+1), (3)

// Input: n=4  → 7

{
    function climbStairs3(n) {
        if (n <= 2) return n;
        if (n === 3) return 4;

        const dp = [0, 1, 2, 4];
        for (let i = 4; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
        }
        return dp[n];
    }

    console.log(climbStairs3(3)); // 4
    console.log(climbStairs3(4)); // 7
    console.log(climbStairs3(5)); // 13
}
// Pattern: 1D Dynamic Programming!

// Problem 10 — Backtracking (Medium)

// Given array of distinct integers, return all
// possible subsets (power set).

// Input: [1,2,3]
// Output: [[],[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]]

{
    function subsets(nums) {
        let result = [];

        function bactracking(start, current) {
            result.push([...current]);
            for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                bactracking(i + 1, current);
                current.pop();
            }
        }
        bactracking(0, []);
        return result;
    }

    console.log(subsets([1,2,3]));
}