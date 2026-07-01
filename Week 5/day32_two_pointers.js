// Problem 1 — Reverse Array (Opposite Ends) — Review from yesterday

{
    function reverseArray(arr) {
        let left = 0;
        let right = arr.length - 1;

        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
        return arr;
    }
    console.log(reverseArray([1, 2, 3, 4, 5]));
}
// Note: [a, b] = [b, a] is a clean swap trick using array destructuring!

// Problem 2 — Check Palindrome

{
    function isPalindrome(str) {
        let left = 0;
        let right = str.length - 1;

        while (left < right) {
            if (str[left] !== str[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    console.log(isPalindrome("racecar"));
    console.log(isPalindrome("hello"));
}
// Why two pointers works here: A palindrome reads the same forwards and backwards — so comparing from both ends and moving inward is the natural fit!

// Problem 3 — Two Sum on SORTED Array (different from Day 31!)

{
    function twoSum(arr, target) {
        let left = 0;
        let right = arr.length - 1;

        while (left , right) {
            const sum = arr[left] + arr[right];

            if (sum === target) {
                return [left, right];
            } else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return [];
    }
    console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
    console.log(twoSum([1, 2, 4, 6, 8, 9], 13));
}
// Key difference from Day 31's Two Sum: That array wasn't sorted so we needed a hash map. THIS array is sorted, so two pointers is the better/cleaner approach. Recognizing "is it sorted?" is how you pick the right pattern!

// Problem 4 — Remove Duplicates from Sorted Array (Same Direction)

{
    function removeDuplicates(nums) {
        if (nums.length === 0) return 0;

        let n = nums.length;
        let slow = 0;

        for (let fast = 1; fast < n; fast++) {
            if (nums[fast] !== nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }
    let arr = [1, 1, 2, 2, 3, 4, 4, 5];
    let newLength = removeDuplicates(arr);
    console.log(newLength);
    console.log(arr.slice(0, newLength));
}
// Note: This is the SAME DIRECTION pattern — slow pointer "remembers" the last good position, fast pointer scans ahead looking for new values.

// Problem 5 — Move Zeroes (Same Direction, review with clearer pattern name)

{
    function moveZeroes(nums) {
        let n = nums.length;
        let slow = 0;

        for (let fast = 0; fast < n; fast++) {
            if (nums[fast] !== 0) {
                [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
                slow++;
            }
        }
        return nums;
    }
    console.log(moveZeroes([0, 1, 0, 3, 12]));
}
// Note: Same slow/fast pattern as Problem 4! Once you see this pattern once, you'll recognize it everywhere.

// Problem 6 — Squares of Sorted Array

{
    // Given sorted array (can have negatives), return sorted array of squares
    function sortedSquares(nums) {
        let left = 0;
        let right = nums.length - 1;
        const result = new Array(nums.length);
        let position = nums.length - 1; // fill from the end

        while (left <= right) {
            const leftSquare = nums[left] ** 2;
            const rightSquare = nums[right] ** 2;

            if (leftSquare > rightSquare) {
                result[position] = leftSquare;
                left++;
            } else {
                result[position] = rightSquare;
                right--;
            }
            position--;
        }
        return result;
    }

    console.log(sortedSquares([-4, -1, 0, 3, 10])); // [0,1,9,16,100]
}
// Why two pointers: The biggest square is always at one of the two ends (most negative or most positive) — so comparing ends and filling result backwards is brilliant!

// Problem 7 — Valid Palindrome (ignoring non-alphanumeric)

{
    function isValidPalindrome(s) {
        s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
        let left = 0;
        let right = s.length - 1;

        while (left < right) {
            if (s[left] !== s[right]) return false;
            left++;
            right--;
        }
        return true;
    }
    console.log(isValidPalindrome("A man, a plan, a canal: Panama"));
    console.log(isValidPalindrome("race a car"));
}
// Note: Real LeetCode problem #125! The regex cleans the string first, then it's the same palindrome pattern from Problem 2.

// Problem 8 — Container With Most Water (Famous interview problem!)

{
    function maxArea(heights) {
        let left = 0;
        let right = heights.length - 1;
        let maxWater = 0;
        
        while (left < right) {
            const width = right - left;
            const height = Math.min(heights[left], heights[right]);
            const water = width * height;

            maxWater = Math.max(maxWater, water);

            if (heights[left] < heights[right]) {
                left++;
            } else {
                right--;
            }
        }
        return maxWater;
    }
    console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
}
// Why move the shorter wall: Moving the taller wall can only make things worse (width shrinks, height stays capped by the shorter wall). Moving the shorter wall gives a CHANCE at finding something taller. This is LeetCode #11 — very common interview question!

// Problem 9 — Merge Two Sorted Arrays

{
    function mergeSorted(arr1, arr2) {
        let i = 0, j = 0;
        const result = [];

        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] <= arr2[j]) {
                result.push(arr1[i]);
                i++;
            } else {
                result.push(arr2[j]);
                j++;
            }
        }

        while (i < arr1.length) { result.push(arr1[i]); i++; }
        while (j < arr2.length) { result.push(arr2[j]); j++; }

        return result;
    }

    console.log(mergeSorted([1, 3, 5], [2, 4, 6])); // [1,2,3,4,5,6]
    console.log(mergeSorted([1, 2, 3], [4, 5, 6]));
}
// Note: Two pointers but on TWO different arrays instead of one! This is the core idea behind Merge Sort, which you'll learn properly later.

// Problem 10 — Mini Project: Pattern Recognition Quiz

{
    // Test yourself! For each problem, decide which two-pointer pattern fits

    function identifyPattern(problemDescription) {
        const patterns = {
            "reverse array or string": "Opposite Ends (converging)",
            "check palindrome": "Opposite Ends (converging)",
            "two sum on sorted array": "Opposite Ends (converging)",
            "remove duplicates": "Same Direction (slow/fast)",
            "move zeroes/elements": "Same Direction (slow/fast)",
            "merge two sorted arrays": "Two pointers on TWO arrays"
        };
        return patterns[problemDescription] || "Think about it!";
    }

    console.log(identifyPattern("reverse array or string"));
    console.log(identifyPattern("remove duplicates"));
    console.log(identifyPattern("two sum on sorted array"));
}
// Your actual task: Before solving any future two-pointer problem, ask yourself: "Is this opposite-ends or same-direction?" That question alone solves half the problem!

// Next 4 Leetcode Problems

// No:125 Problem (leetcode problem number 125) : Valid Palindrome:

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.toLowerCase().replace(/[^a-z0-9]/g, "");
    let left = 0;
    let right = s.length - 1;

    while (left < right) {
        if (s[left] !== s[right]) return false;
        left++;
        right--;
    }
    return true;
};

//No: 283 Problem : Move Zeroes

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    let n = nums.length;
    let slow = 0;

    for (let fast = 0; fast < n; fast++) {
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
    return nums;
};

// No: 11 Problem : Container With Most Water

/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(heights) {
    let left = 0;
    let right = heights.length - 1;
    let maxWater = 0;

    while(left < right) {
        const width = right - left;
        const height = Math.min(heights[left], heights[right]);
        const water = width * height;

        maxWater = Math.max(maxWater, water);

        if (heights[left] < heights[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxWater;
};

// No: 88(leetcode number problem): Merge Sorted Arrays:

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    let p1 = m - 1;
    let p2 = n - 1;
    let p = m + n - 1;

    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }

    while (p2 >= 0) {
        nums1[p] = nums2[p2];
        p2--;
        p--;
    }

    console.log(merge([1,2,3,0,0,0], 3, [2,5,6], 3));
};