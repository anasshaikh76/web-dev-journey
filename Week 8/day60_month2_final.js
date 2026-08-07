// Problem 1 — Arrays

// Find the maximum product of two integers in array.

// Input: [3, 1, 6, 2, 5]  → 30 (5×6)
// Input: [-1, -3, 4, 2]   → 3 (−1×−3)

{
    function maxProduct(nums) {
        nums.sort((a, b) => b - a);

        const option1 = nums[0] * nums[1];
        const option2 = nums[nums.length - 1] * nums[nums.length - 2];
        return Math.max(option1, option2);
    }

    console.log(maxProduct([3, 1, 6, 2, 5]));
    console.log(maxProduct([-1, -3, 4, 2]));
}
// Math + Sorting

// Problem 2 — Two Pointers

// Given sorted array, find all pairs that sum to target.
// Return all unique pairs.

// Input: [1,2,3,4,5,6], target=7
// Output: [[1,6],[2,5],[3,4]]

{
    function findPairs(arr, target) {
        let left = 0, right = arr.length - 1;
        const result = [];

        while (left < right) {
            const sum = arr[left] + arr[right];
            if (sum === target) {
                result.push([arr[left], arr[right]]);
                left++, right--;
            } else if (sum < target) {
                left++;
            } else {
                right++;
            }
        }
        return result;
    }

    console.log(findPairs([1, 2, 3, 4, 5, 6], 7));
}

// Problem 3 — Sliding Window

// Find max sum of subarray of size k.

// Input: [2,1,5,1,3,2], k=3  → 9
// Input: [1,9,−1,−2,7,3], k=2 → 10

{
    function maxSumSubarray(nums, k) {
        let windowSum = 0, maxSum = 0;

        for (let i = 0; i < k; i++) windowSum += nums[i];
        maxSum = windowSum;

        for (let i = k; i < nums.length; i++) {
            windowSum += nums[i] - nums[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }

    console.log(maxSumSubarray([2,1,5,1,3,2], 3)); // 9
    console.log(maxSumSubarray([1,9,-1,-2,7,3], 2)); // 10
}

// Problem 4 — Hash Set

// Given array, find first duplicate element.
// Return -1 if none.

// Input: [3,1,4,1,5,9]  → 1
// Input: [1,2,3,4,5]    → -1

{
    function firstDuplicate(nums) {
        const seen = new Set();
        for (let num of nums) {
            if (seen.has(num)) return num;
            seen.add(num);
        }
        return -1;
    }

    console.log(firstDuplicate([3, 1, 4, 1, 5, 9]));
    console.log(firstDuplicate([1, 2, 3, 4, 5]));
}
// Pattern: Hash Set!

// Problem 5 — Binary Search

// Search for target in 2D matrix.
// Each row is sorted, first element of each row
// is greater than last element of previous row.

// Input: matrix = [[1,3,5],[7,9,11],[13,15,17]]
//        target = 9   → true
//        target = 10  → false

{
    function searchMatrix(matrix, target) {
        const rows = matrix.length, cols = matrix[0].length;
        let left = 0, right = rows * cols - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const val = matrix[Math.floor(mid / cols)][mid % cols];

            if (val === target) return true;
            else if (val < target) left = mid + 1;
            else right = mid - 1;
        }
        return false;
    }

    console.log(searchMatrix([[1, 3, 5], [7, 9, 11], [13, 15, 17]], 9))
    console.log(searchMatrix([[1, 3, 5], [7, 9, 11], [13, 15, 17]], 10))
}

// Problem 6 — Stack

// Implement a queue using two stacks.
// Support: enqueue, dequeue, peek, isEmpty.

// enqueue(1), enqueue(2), enqueue(3)
// dequeue()  → 1 (FIFO!)
// peek()     → 2

{
    class MyQueue {
        constructor() {
            this.stack1 = [];
            this.stack2 = [];
        }

        enqueue(x) {
            this.stack1.push(x);
        }

        transfer() {
            if (this.stack2.length === 0) {
                while (this.stack1.length > 0) {
                    this.stack2.push(this.stack1.pop());
                }
            }
        }

        dequeue() {
            this.transfer();
            return this.stack2.pop();
        }

        peek() {
            this.transfer();
            return this.stack2[this.stack2.length - 1];
        }

        isEmpty() {
            return this.stack1.length === 0 && this.stack2.length === 0;
        }
    }

    const q = new MyQueue();
    q.enqueue(1); q.enqueue(2); q.enqueue(3);
    console.log(q.dequeue());
    console.log(q.peek());
}

// Problem 7 — Tree

// Given binary tree, check if it is symmetric
// (mirror of itself around center).

//     1          → true
//    / \
//   2   2
//  / \ / \
// 3  4 4  3

//     1          → false
//    / \
//   2   2
//    \   \
//    3    3

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    function isSymmetric(root) {
        if (!root) return true;
        function isMirror(left, right) {
            if (!left && !right) return true;
            if (!left || !right) return false;
            return left.val === right.val && isMirror(left.left, right.right) && isMirror(left.right, right.left);
        }
        return isMirror(root.left, root.right);
    }

    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(3);

    console.log(isSymmetric(root)); // true
}
// Pattern: Tree DFS (compare mirror positions)!

// Problem 8 — Graph

// Given rooms with keys, starting from room 0,
// can you visit all rooms?
// rooms[i] = list of keys in room i

// Input: [[1],[2],[3],[]]  → true
// Input: [[1,3],[3,0,1],[2],[0]]  → false

{
    function canVisitAllRooms(rooms) {
        const visited = new Set([0]);
        const queue = [0];

        while (queue.length > 0) {
            const room = queue.shift();

            for (let key of rooms[room]) {
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push(key);
                }
            }
        }
        return visited.size === rooms.length;
    }

    console.log(canVisitAllRooms([[1], [2], [3], []]));       // true
    console.log(canVisitAllRooms([[1, 3], [3, 0, 1], [2], [0]])); // false
}
// Pattern: Graph BFS!

// Problem 9 — Dynamic Programming

// Given coins array and amount,
// find minimum coins to make that amount.
// Return -1 if impossible.

// Input: coins=[1,5,10,25], amount=36  → 3 (25+10+1)
// Input: coins=[2], amount=3           → -1

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

    console.log(coinChange([1, 5, 10, 25], 36)); // 3
    console.log(coinChange([2], 3));           // -1
}
// Pattern: Dynamic Programming (1D)!

// Problem 10 — Backtracking

// Generate all valid combinations of n pairs
// of parentheses.

// Input: n=2  → ["(())", "()()"]
// Input: n=3  → ["((()))","(()())","(())()","()(())","()()()"]

{
    function generateParenthesis(n) {
        const result = [];

        function Backtracking(current, open, close) {
            if (current.length === 2 * n) {
                result.push(current);
                return;
            }

            if (open < n) Backtracking(current+ "(", open + 1, close);
            if (close < open) Backtracking(current + ")", open, close+1);
        }
        Backtracking("", 0, 0);
        return result;
    }

    console.log(generateParenthesis(2)); // ["(())", "()()"]
    console.log(generateParenthesis(3).length); // 5
}
// Pattern: Backtracking!