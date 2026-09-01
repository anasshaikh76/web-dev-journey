// Problem 1 — Easy (10 mins)

// Given binary tree, check if it is symmetric.

// Input:     1        → true
//           / \
//          2   2
//         / \ / \
//        3  4 4  3

// Input:     1        → false
//           / \
//          2   2
//           \   \
//            3   3

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function isSymmetric(root) {
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
// Pattern: Tree DFS — compare mirror positions!
// Complexity: Time O(n), Space O(h) where h = height!

// Problem 2 — Easy/Medium (15 mins)

// Find all duplicates in array where
// 1 ≤ nums[i] ≤ n (n = array length).

// Input: [4,3,2,7,8,2,3,1] → [2,3]
// Input: [1,1,2]            → [1]

{
    function findDuplicates(nums) {
        const result = [];

        for (let i = 0; i < nums.length; i++) {
            const idx = Math.abs(nums[i]) - 1;

            if (nums[idx] < 0) {
                result.push(idx + 1);
            } else {
                nums[idx] = -nums[idx];
            }
        }
        return result;
    }

    console.log(findDuplicates([4,3,2,7,8,2,3,1])); // [2,3]
    console.log(findDuplicates([1,1,2]));             // [1]
}
// Pattern: Array index as hash map! Negate value at index to mark visited!
// Complexity: Time O(n), Space O(1)!

// Problem 3 — Medium (20 mins)

// Given n x n matrix, rotate it 90 degrees clockwise IN-PLACE.

// Input:                Output:
// [[1,2,3],            [[7,4,1],
//  [4,5,6],             [8,5,2],
//  [7,8,9]]             [9,6,3]]

{
    function rotate(matrix) {
        const n = matrix.length;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }

        for (let i = 0; i < n; i++) {
            matrix[i].reverse();
        }
    }

    const matrix = [[1,2,3],[4,5,6],[7,8,9]];
    rotate(matrix);
    console.log(matrix);
    // [[7,4,1],[8,5,2],[9,6,3]]

}
// Pattern: Matrix manipulation — transpose then reverse rows!
// Complexity: Time O(n²), Space O(1)!

// Problem 4 — Medium (20 mins)

// Find minimum in rotated sorted array.

// Input: [3,4,5,1,2]     → 1
// Input: [4,5,6,7,0,1,2] → 0
// Input: [11,13,15,17]   → 11

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

    console.log(findMin([3,4,5,1,2]));     // 1
    console.log(findMin([4,5,6,7,0,1,2])); // 0
    console.log(findMin([11,13,15,17]));    // 11
}
// Pattern: Binary Search on rotated array!
// Complexity: Time O(log n), Space O(1)!

// Problem 5 — Medium (20 mins)

// Given array nums, return array of products
// of all elements except nums[i].
// Cannot use division!

// Input: [1,2,3,4] → [24,12,8,6]
// Input: [-1,1,0,-3,3] → [0,0,9,0,0]

{
    function productExceptSelf(nums) {
        const n = nums.length;
        const result = new Array(n).fill(1);

        let leftProduct = 1;
        for (let i = 0; i < n; i++) {
            result[i] = leftProduct;
            leftProduct *= nums[i];
        }
        let rightProduct = 1;
        for (let i = n - 1; i >= 0; i--) {
            result[i] *= rightProduct;
            rightProduct *= nums[i];
        }
        return result;
    }

    console.log(productExceptSelf([1,2,3,4]));      // [24,12,8,6]
    console.log(productExceptSelf([-1,1,0,-3,3]));  // [0,0,9,0,0]
}
// Pattern: Prefix + Suffix product! Two pass without division!
// Complexity: Time O(n), Space O(1) excluding output!

// Problem 6 — Medium (20 mins)

// Given n x n grid of 0s and 1s,
// find largest rectangle containing only 1s.

// Input: [["1","0","1","0","0"],
//         ["1","0","1","1","1"],
//         ["1","1","1","1","1"],
//         ["1","0","0","1","0"]]
// Output: 6

{
    function maximalRectangle(matrix) {
        if (!matrix.length) return 0;

        const n = matrix[0].length;
        const heights = new Array(n).fill(0);
        let maxArea = 0;

        for (let row of matrix) {
            for (i = 0; i < n; i++) {
                heights[i] = row[i] === '1' ? heights[i] + 1 : 0;
            }

            const stack = [];
            const h = [...heights, 0];

            for (let i = 0; i < h.length; i++) {
                while (stack.length > 0 && h[i] < h[stack[stack.length - 1]]) {
                    const height = h[stack.pop()];
                    const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                    maxArea = Math.max(maxArea, height * width);
                }
                stack.push(i);
            }
        }
        return maxArea;
    }

    console.log(maximalRectangle([
        ["1","0","1","0","0"],
        ["1","0","1","1","1"],
        ["1","1","1","1","1"],
        ["1","0","0","1","0"]
    ])); // 6
}
// Pattern: Monotonic Stack + Histogram per row!
// Complexity: Time O(m×n), Space O(n)!

// Problem 7 — Hard (25 mins)

// Find kth largest element in a stream.
// Design class that processes stream of integers.

// KthLargest(3, [4,5,8,2])
// add(3) → 4
// add(5) → 5
// add(10) → 8
// add(9) → 8
// add(4) → 8

{
    class KthLargest {
        constructor(k, nums) {
            this.k = k;
            this.heap = [];

            for (let num of nums) this.add(num);
        }
        add(val) {
            this.heap.push(val);
            this.heap.sort((a, b) => a - b);

            while (this.heap.length > this.k) {
                this.heap.shift();
            }
            return this.heap[0];
        }
    }

    const kth = new KthLargest(3, [4,5,8,2]);
    console.log(kth.add(3));  // 4
    console.log(kth.add(5));  // 5
    console.log(kth.add(10)); // 8
    console.log(kth.add(9));  // 8
    console.log(kth.add(4));  // 8
}