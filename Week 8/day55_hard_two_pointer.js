// Problem 1 — 3Sum

{
    function threeSum(nums) {
        nums.sort((a, b) => a - b);
        const result = [];

        for (let i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            let left = i + 1;
            let right = nums.length - 1;

            while (left < right) {
                const sum = nums[i] + nums[left] + nums[right];

                if (sum === 0) {
                    result.push([nums[i], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }

    console.log(threeSum([-1, 0, 1, 2, -1, -4]));
    // [[-1,-1,2],[-1,0,1]]
    console.log(threeSum([0, 0, 0]));
    // [[0,0,0]]
}
// Note: LeetCode #15 — fix one number, use two pointers for the other two. Skip duplicates at each level to avoid duplicate triplets!

// Problem 2 — 4Sum

{
    function fourSum(nums, target) {
        nums.sort((a, b) => a - b);
        const result = [];

        for (let i = 0; i < nums.length - 3; i++) {
            if (i > 0 && nums[i] === nums[i - 1]) continue;

            for (let j = i + 1; j < nums.length - 2; j++) {
                if (j > j + 1 && nums[j] === nums[j - 1]) continue;

                let left = j + 1;
                let right = nums.length - 1;

                while (left < right) {
                    const sum = nums[i] + nums[j] + nums[left] + nums[right];

                    if (sum === target) {
                        result.push([nums[i], nums[j], nums[left], nums[right]]);
                        while (left < right && nums[left] === nums[left + 1]) left++;
                        while (left < right && nums[right] === nums[right - 1]) right--;
                        left++;
                        right--;
                    } else if (sum < target) {
                        left++;
                    } else {
                        right--;
                    }
                }
            }
        }
        return result;
    }

    console.log(fourSum([1, 0, -1, 0, -2, 2], 0));
    // [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
}
// Note: LeetCode #18 — extend 3Sum with one more outer loop! Same duplicate skipping pattern!

// Problem 3 — Trapping Rain Water

{
    function trap(height) {
        let left = 0, right = height.length - 1;
        let leftmax = 0, rightMax = 0;
        let water = 0;

        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftmax) {
                    leftmax = height[left];
                } else {
                    water += leftmax - height[left];
                }
                left++;
            } else {
                if (height[right] >= rightMax) {
                    rightMax = height[right];
                } else {
                    water += rightMax - height[right];
                }
                right--;
            }
        }
        return water;
    }

    console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
    console.log(trap([4, 2, 0, 3, 2, 5]));               // 9
}
// Note: LeetCode #42 — classic hard problem! Water at any position = min(leftMax, rightMax) - height. Two pointer eliminates need for extra arrays!

// Problem 4 — Minimum Window Substring

{
    function minWindow(s, t) {
        if (!s || !t || s.length < t.length) return "";

        const need = new Map();
        for (let char of t) need.set(char, (need.get(char) || 0) + 1);

        let left = 0, matched = 0;
        let minLen = Infinity, minStart = 0;
        const window = new Map();

        for (let right = 0; right < s.length; right++) {
            const char = s[right];
            window.set(char, (window.get(char) || 0) + 1);

            if (need.has(char) && window.get(char) === need.get(char)) {
                matched++;
            }
            while (matched === need.size) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                const leftChar = s[left];
                window.set(leftChar, window.get(leftChar) - 1);
                if (need.has(leftChar) &&
                    window.get(leftChar) < need.get(leftChar)) {
                    matched--;
                }
                left++;
            }
        }
        return minLen === Infinity ? "" : s.slice(minStart, minStart+minLen);
    }

    console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
    console.log(minWindow("a", "a"));                // "a"
}
// Note: LeetCode #76 — hardest sliding window! Track how many characters are fully matched. Shrink window when all matched!

// Problem 5 — Longest Substring with At Most K Distinct

{
    function lengthOfLongestSubstringKDistinct(s, k) {
        let left = 0; maxLen = 0;
        const window = new Map();

        for (let right = 0; right < s.length; right++) {
            window.set(s[right], (window.get(s[right])|| 0) + 1);

            while (window.size > k) {
                window.set(s[left], window.get(s[left]) - 1);
                if (window.get(s[left]) === 0) window.delete(s[left]);
                left++;
            }
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }

    console.log(lengthOfLongestSubstringKDistinct("eceba", 2)); // 3
    console.log(lengthOfLongestSubstringKDistinct("aa", 1));    // 2
}
// Note: LeetCode #340 — dynamic sliding window with Map tracking distinct chars. Shrink when distinct count exceeds k!

// Problem 6 — Subarray Product Less Than K

{
    function numSubarrayProductLessThanK(nums, k) {
        if (k <= 1) return 0;

        let left = 0, product = 1, count = 0;

        for (let right = 0; right < nums.length; right++) {
            product *= nums[right];

            while (product >= k) {
                product /= nums[left];
                left++;
            }
            count += right - left + 1;
        }
        return count;
    }

    console.log(numSubarrayProductLessThanK([10,5,2,6], 100)); // 8
    console.log(numSubarrayProductLessThanK([1,2,3], 0));       // 0
}
// Note: LeetCode #713 — sliding window with product! Each valid window of size (right-left+1) contributes that many subarrays!

// Problem 7 — 3Sum Closest

{
    function threeSumClosest(nums, target) {
        nums.sort((a, b) => a - b);
        let closest = nums[0] + nums[1] + nums[2];

        for (let i = 0; i < nums.length - 2; i++) {
            let left = i + 1, right = nums.length - 1;

            while (left < right) {
                const sum = nums[i] + nums[left] + nums[right];

                if (Math.abs(sum - target) < Math.abs(closest - target)) {
                    closest = sum;
                }

                if (sum < target) left++;
                else if (sum > target) right--;
                else return sum;
            }
        }
        return closest;
    }

    console.log(threeSumClosest([-1,2,1,-4], 1)); // 2
    console.log(threeSumClosest([0,0,0], 1));       // 0
}
// Note: LeetCode #16 — variation of 3Sum! Track closest sum instead of exact match. Update closest when difference is smaller!

// Problem 8 — Minimum Size Subarray Sum

{
    function minSubArrayLen(target, nums) {
        let left = 0, sum = 0;
        let minLen = Infinity;

        for (let right = 0; right < nums.length; right++) {
            sum += nums[right];

            while (sum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= nums[left];
                left++;
            }
        }
        return minLen === Infinity ? 0 : minLen;
    }

    console.log(minSubArrayLen(7, [2,3,1,2,4,3])); // 2 (4+3)
    console.log(minSubArrayLen(4, [1,4,4]));         // 1
    console.log(minSubArrayLen(11, [1,1,1,1,1,1])); // 0
}
// Note: LeetCode #209 — dynamic sliding window! Expand right, shrink left when sum >= target. Track minimum valid window!

// Problem 9 — Longest Mountain in Array

{
    function longestMountain(arr) {
        let maxLen = 0;
        let i = 1;
        
        while (i < arr.length - 1) {
            const isPeak = arr[i - 1] < arr[i] && arr[i] > arr[i + 1];

            if (isPeak) {
                let left = i - 1, right = i+ 1;

                while (left > 0 && arr[left - 1] < arr[left]) left--;
                while (right < arr.length - 1 && arr[right] > arr[right + 1]) right++;

                maxLen = Math.max(maxLen, right - left +1);
                i = right;
            } else {
                i++;
            }
        }
        return maxLen;
    }

    console.log(longestMountain([2,1,4,7,3,2,5])); // 5 (1,4,7,3,2)
    console.log(longestMountain([2,2,2]));           // 0
}
// Note: LeetCode #845 — find peaks, expand outward from each peak using two pointers!

// Problem 10 — Maximum Points You Can Obtain from Cards

{
    function maxScore(cardPoints, k) {
        const n = cardPoints.length;
        let windowSum = 0;

        for (let i = k; i < n; i++) {
            windowSum += cardPoints[i];
        }

        let minWindow = windowSum;

        for (let i = k-1; i >= 0; i--) {
            windowSum += cardPoints[i] - cardPoints[i + (n-k)];
            minWindow = Math.min(minWindow, windowSum);
        }

        totalSum = cardPoints.reduce((a, b) => a + b, 0);
        return totalSum - windowSum;
    }

    console.log(maxScore([1,2,3,4,5,6,1], 3)); // 12
    console.log(maxScore([2,2,2], 2));           // 4
}
// Note: LeetCode #1423 — reverse thinking! Instead of maximizing cards taken from ends, minimize the middle window of (n-k) cards NOT taken!

