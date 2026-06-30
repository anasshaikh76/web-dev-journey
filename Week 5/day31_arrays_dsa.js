// Problem 1 — Reverse an Array

{
    function reverseArray(arr) {
        return arr.reverse();
    }

    function reverseManual(arr) {
        let left = 0;
        let right = arr.length - 1;

        while (left < right) {
            let temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            left++;
            right--;
        }
        return arr;
    }
    console.log(reverseArray([1, 2, 3, 4, 5]));
    console.log(reverseManual([1, 2, 3, 4, 5]));
}
// Note: The two-pointer approach (left/right) is a classic DSA pattern you'll use constantly!

// Problem 2 — Find Maximum

{
    function findMax(arr) {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    console.log(findMax([3, 1, 7, 2, 9, 4]));
    console.log(findMax([-5, -1, -8, -2]));
}

// Problem 3 — Two Sum (Classic LeetCode #1)

{
    function twoSum(nums, target) {
        for (let i = 0; i < nums.length; i++) {
            for (let j = i + 1; j < nums.length; j++) {
                if (nums[i] + nums[j] === target) {
                    return [i , j];
                }
            }
        }
        return[];
    }
    console.log(twoSum([2, 7, 11, 15], 9));
    console.log(twoSum([3, 2, 4], 6));
}
// Note: This is LeetCode problem #1 — the most famous coding interview question ever!

// Problem 4 — Two Sum Optimized (Hash Map)

{
    function twoSumFast(nums, target) {
        const seen = {};

        for (let i = 0; i < nums.length; i++){
            const compliment = target - nums[i];

            if (seen[compliment] !== undefined) {
                return [seen[compliment], i];
            }
            seen[nums[i]] = i;
        }
        return [];
    }

    console.log(twoSumFast([2, 7, 11, 15], 9)); // [0, 1]
    console.log(twoSumFast([3, 2, 4], 6)); 
}
// Why this is better: First solution checks every pair (slow). This one uses an object to remember what we've seen — finds answer in one pass! This is called O(n) vs O(n²) — you'll learn this properly in DSA.

// Problem 5 — Contains Duplicate

{
    function containsDuplicate(nums) {
        const seen = new Set();
        for (let num of nums) {
            if (seen.has(num)) return true;
            seen.add(num);
        }
        return false;
    }

    console.log(containsDuplicate([1, 2, 3, 1]));    // true
    console.log(containsDuplicate([1, 2, 3, 4]));    // false
    console.log(containsDuplicate([1, 1, 1, 3, 3])); // true
}

// Problem 6 — Maximum Subarray (Kadane's Algorithm)

{
    function maxSubArray(nums) {
        let maxSum = nums[0];
        let currentSum = nums[0];

        for ( i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }

    console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
    console.log(maxSubArray([1]));                                // 1
    console.log(maxSubArray([5, 4, -1, 7, 8])); 
}
// Note: This is Kadane's Algorithm — a famous DSA algorithm. The key insight: at each position, decide whether to extend the previous subarray or start fresh!

// Problem 7 — Move Zeros to End

{
    function moveZeroes(nums) {
        let insertPos = 0;

        // Move all non-zero elements to front
        for (let num of nums) {
            if (num !== 0) {
                nums[insertPos] = num;
                insertPos++;
            }
        }

        // Fill remaining positions with zeros
        while (insertPos < nums.length) {
            nums[insertPos] = 0;
            insertPos++;
        }
        return nums;
    }

    console.log([0, 1, 0, 3, 12]);
    console.log(moveZeroes([0, 0, 1]));
}

// Problem 8 — Best Time to Buy and Sell Stock

{
    function maxProfit(prices) {
        let minPrice = Infinity;
        let maxProfit = 0;

        for (let price of prices) {
            if (price < minPrice) {
                minPrice = price; // best day to buy
            } else if (price - minPrice > maxProfit) {
                maxProfit = price - minPrice;
            }
        }
        return maxProfit;
    }

    console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5 (buy at 1, sell at 6)
    console.log(maxProfit([7, 6, 4, 3, 1]));     // 0 (prices only fall)
}

// Problem 9 — Rotate Array

{
    function rotate(nums, k) {
        k = k % nums.length;
        const rotated = [...nums.slice(-k), ...nums.slice(0, -k)];
        for (let i = 0; i < nums.length; i++) {
            nums[i] = rotated[i];
        }
        return nums;
    }
    
    console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3)); // [5,6,7,1,2,3,4]
    console.log(rotate([-1, -100, 3, 99], 2)); 
}

// Problem 10 — Single Number

{
    function singleNumber(nums) {
        let result = 0;
        for (let num of nums) {
            result ^= num;
        }
        return result;
    }

    console.log(singleNumber([2, 2, 1]));       // 1
    console.log(singleNumber([4, 1, 2, 1, 2])); // 4
}
// Note: ^ is XOR (exclusive OR) — same numbers cancel each other out. This is a clever bit manipulation trick interviewers love!