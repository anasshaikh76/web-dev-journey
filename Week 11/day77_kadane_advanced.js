// Problem 1 — Maximum Subarray (Classic Kadane's)

// Attempt first (10 mins):

// Input: [-2,1,-3,4,-1,2,1,-5,4] → 6 ([4,-1,2,1])
// Input: [1]                     → 1
// Input: [5,4,-1,7,8]            → 23

{
    function maxSubArray(nums) {
        let maxSum = nums[0];
        let currentSum = nums[0];
        
        for (let i = 1; i < nums.length; i++) {
            currentSum = Math.max(nums[i], currentSum + nums[i]);
            maxSum = Math.max(maxSum, currentSum);
        }
        return maxSum;
    }

    console.log(maxSubArray([-2,1,-3,4,-1,2,1,-5,4])); // 6
    console.log(maxSubArray([1]));                       // 1
    console.log(maxSubArray([5,4,-1,7,8]));              // 23
}
// Note: LeetCode #53 — the foundational Kadane's! At each position, decide: extend previous subarray OR start fresh here!

// Problem 2 — Maximum Product Subarray

// Attempt first (10 mins):

// Find max PRODUCT of contiguous subarray.

// Input: [2,3,-2,4]  → 6
// Input: [-2,0,-1]   → 0
// Input: [-2,3,-4]   → 24

{
    function maxProduct(nums) {
        let maxProd = nums[0];
        let minProd = nums[0];
        let result = nums[0];

        for (let i = 1; i < nums.length; i++) {
            const candidiate = [nums[i], maxProd * nums[i], minProd * nums[i]];
            maxProd = Math.max(...candidiate);
            minProd = Math.min(...candidiate);
            result = Math.max(result, maxProd);
        }
        return result;
    }

    console.log(maxProduct([2,3,-2,4])); // 6
    console.log(maxProduct([-2,0,-1]));   // 0
    console.log(maxProduct([-2,3,-4]));   // 24
}
// Note: LeetCode #152 — track BOTH max and min because negative × negative = positive! Three candidates at each step!

// Problem 3 — Maximum Sum Circular Subarray

// Attempt first (10 mins):

// Array is circular (wraps around).
// Find max sum subarray.

// Input: [1,-2,3,-2]  → 3
// Input: [5,-3,5]     → 10 (wraps: 5+5)
// Input: [-3,-2,-3]   → -2

{
    function maxSubarraySumCircular(nums) {
        let totalSum = 0;
        let maxSum = nums[0], currMax = 0;
        let minSum = nums[0], currMin = 0;

        for (let num of nums) {
            currMax = Math.max(num, currMax + num);
            maxSum = Math.max(maxSum, currMax);

            currMin = Math.min(num, currMin + num);
            minSum = Math.min(minSum, currMin);

            totalSum += num;
        }
        if (maxSum < 0) return maxSum;

        return Math.max(maxSum, totalSum - minSum);
    }

    console.log(maxSubarraySumCircular([1,-2,3,-2])); // 3
    console.log(maxSubarraySumCircular([5,-3,5]));      // 10
    console.log(maxSubarraySumCircular([-3,-2,-3]));   // -2
}
// Note: LeetCode #918 — TWO cases! Either max subarray is normal (regular Kadane's) OR it wraps around (totalSum - minSubarray). Take the larger!

// Problem 4 — Best Time to Buy and Sell Stock (Kadane's variant)

// Attempt first (10 mins):

// Input: [7,1,5,3,6,4] → 5
// Think of it as Kadane's on price DIFFERENCES!

{
    function maxProfit(prices) {
        let maxProfit = 0;
        let currentProfit = 0;

        for (let i = 1; i < prices.length; i++) {
            const diff = prices[i] - prices[i - 1];
            currentProfit = Math.max(0, currentProfit + diff);
            maxProfit = Math.max(maxProfit, currentProfit);
        }
        return maxProfit;
    }

    console.log(maxProfit([7,1,5,3,6,4])); // 5
    console.log(maxProfit([7,6,4,3,1]));   // 0
}
// Note: Same Kadane's pattern! Think of daily price changes as an array — find max sum of consecutive positive changes!

// Problem 5 — Maximum Sum of 3 Non-Overlapping Subarrays

// Attempt first (10 mins):

// Find 3 non-overlapping subarrays of length k
// with maximum total sum.

// Input: nums=[1,2,1,2,6,7,5,1], k=2
// Output: [0,3,5] (indices where subarrays start)

{
    function maxSumOfThreeSubarrays(nums, k) {
        const n = nums.length;
        const sums = new Array(n - k + 1).fill(0);

        let windowSum = 0;
        for (let i = 0; i < k; i++) windowSum += nums[i];
        sums[0] = windowSum;

        for (let i = 1; i < sums.length; i++) {
            windowSum += nums[i + k - 1] - nums[i - 1];
            sums[i] = windowSum;
        }

        const left = new Array(sums.length).fill(0);
        let best = 0;
        for (let i = 0; i < sums.length; i++) {
            if (sums[i] > sums[best]) best = i;
            left[i] = best;
        }

        const right = new Array(sums.length).fill(0);
        best = sums.length - 1;
        for (let i = sums.length-1; i >= 0; i--) {
            if (sums[i] >= sums[best]) best = i;
            right[i] = best;
        }

        let maxSum = -1;
        let result = [];

        for (let mid = k; mid < sums.length - k; mid++) {
            const l = left[mid - k], r = right[mid + k];
            const total = sums[l] + sums[mid] + sums[r];

            if (total > maxSum) {
                maxSum = total;
                result = [l, mid, r];
            }
        }
        return result;
    }

    console.log(maxSumOfThreeSubarrays([1,2,1,2,6,7,5,1], 2));
    // [0,3,5]
}
// Note: LeetCode #689 — Hard! Precompute window sums, then find best left, middle, right using precomputed arrays!

// Problem 6 — Subarray Sums Divisible by K

// Attempt first (10 mins):

// Count subarrays with sum divisible by k.

// Input: nums=[4,5,0,-2,-3,1], k=5  → 7

{
    function subarraysDivByK(nums, k) {
        const remainderCount = new Map();
        remainderCount.set(0, 1);

        let prefixSum = 0, count = 0;

        for (let num of nums) {
            prefixSum += num;
            let remainder = ((prefixSum % k) + k) % k;

            if (remainderCount.has(remainder)) {
                count += remainderCount.get(remainder);
            }
            remainderCount.set(remainder, (remainderCount.get(remainder) || 0) + 1);
        }
        return count;
    }

    console.log(subarraysDivByK([4,5,0,-2,-3,1], 5)); // 7
}
// Note: LeetCode #974 — Prefix Sum + Hash Map! Same remainder appearing twice means the subarray between them is divisible by k. Handle negative modulo in JavaScript!

// Problem 7 — Monotonic Array

// Attempt first (10 mins):

// Check if array is monotonic (entirely
// non-increasing OR non-decreasing).

// Input: [1,2,2,3] → true
// Input: [6,5,4,4] → true
// Input: [1,3,2]   → false

{
    function isMonotonic(nums) {
        let increasing = true;
        let decreasing = true;

        for (let i = 1; i < nums.length; i++) {
            if (nums[i] > nums[i - 1]) decreasing = false;
            if (nums[i] < nums[i - 1]) increasing = false;
        }
        return increasing || decreasing;
    }

    console.log(isMonotonic([1,2,2,3])); // true
    console.log(isMonotonic([6,5,4,4])); // true
    console.log(isMonotonic([1,3,2]));   // false
}