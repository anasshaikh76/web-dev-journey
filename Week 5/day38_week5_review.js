// Problem 1

{
    // Pattern? → think before reading solution!
    // Given array of integers, return true if any value appears
    // at least twice, false if all elements are distinct

    function hasDuplicate(nums) {
        return new Set(nums).size !== nums.length;
    }
    console.log(hasDuplicate([1,2,3,1]));
    console.log(hasDuplicate([1,2,3,4]));
}
// Pattern: Set — checking existence!

// Problem 2

{
    // Pattern? → think before reading!
    // Given sorted array, remove duplicates in-place
    // Return length of array with unique elements

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
    let arr = [1,1,2,3,3,4];
    console.log(removeDuplicates(arr));
}
// Pattern: Two Pointers (slow/fast)!

// Problem 3

{
    // Pattern? → think before reading!
    // Find maximum sum of any subarray of size k

    function maxSumSubarray(arr, k) {
        let windowSum = 0;
        let maxSum = 0;

        for (let i = 0; i < k; i++) windowSum += arr[i];
        maxSum = windowSum;
        
        for (let i = k; i < arr.length; i++) {
            windowSum += arr[i] - arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
    console.log(maxSumSubarray([2,1,5,1,3,2], 3));
}
// Pattern: Sliding Window (fixed)!

// Problem 4

{
    // Pattern? → think before reading!
    // Given sorted array and target,
    // return indices of two numbers that add up to target

    function twoSum(numbers, target) {
        let left = 0;
        let right = numbers.length - 1;

        while (left < right) {
            const sum = numbers[left] + numbers[right];
            if (sum === target) return [left, right];
            else if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
        return [];
    }
    console.log(twoSum([2,7,11,15], 9));
}
// Pattern: Two Pointers (opposite ends) — array is SORTED!

// Problem 5

{
    // Pattern? → think before reading!
    // Find if target exists in sorted rotated array

    function searchRotated(nums, target) {
        let left = 0, right = nums.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) return mid;

            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid])  right = mid - 1;
                else left = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[right]) left = mid + 1;
                else right = mid - 1;
            }
        }
        return - 1;
    }
    console.log(searchRotated([4,5,6,7,0,1,2], 0));
}
// Pattern: Binary Search (rotated)!

// Problem 6

{
    // Pattern? → think before reading!
    // Given string, find length of longest substring
    // without repeating characters

    function lengthOfLongest(s) {
        let left = 0;
        let maxLen = 0;
        const seen = new Set();

        for (let right = 0; right < s.length; right++) {
            while (seen.has(s[right])) {
                seen.delete(s[left]);
                left++;
            }
            seen.add(s[right]);
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
    console.log(lengthOfLongest("abcabcbb"));
}
// Pattern: Sliding Window (dynamic) + Set!

// Problem 7

{
    // Pattern? → think before reading!
    // Given array of strings, group anagrams together

    function groupAnagrams(strs) {
        const map = {};

        for (let str of strs) {
            const key = str.split("").sort().join("");
            if (!map[key]) map[key] = [];
            map[key].push(str);
        }
        return Object.values(map);
    }
    console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));
}
// Pattern: Hash Map (group by sorted key)!

// Problem 8

{
    // Pattern? → think before reading!
    // Given array of meeting intervals,
    // find minimum number of conference rooms needed

    function minMeetingRooms(intervals) {
        const starts = intervals.map(i => i[0]).sort((a, b) => a - b);
        const ends = intervals.map(i => i[1]).sort((a, b) => a - b);

        let rooms = 0;
        let endPtr = 0;

        for (let i = 0; i < starts.length; i++) {
            if (starts[i] < ends[endPtr]) {
                rooms++;
            } else {
                endPtr++;
            }
        }
        return rooms;
    }
     console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
    console.log(minMeetingRooms([[7,10],[2,4]])); 
}
// Pattern: Sorting + Two Pointers!

// Problem 9

{
    // Pattern? → think before reading!
    // Given UNSORTED array, find two numbers that sum to target
    // Return their indices (original positions)

    function twoSumUnsorted(nums, target) {
        const seen = new Map();

        for (let i = 0; i < nums.length; i++) {
            const compliment = target - nums[i];
            if (seen.has(compliment)) {
                return [seen.get(compliment), i];
            }
            seen.set(nums[i], i);
        }
        return [];
    }
    console.log(twoSumUnsorted([2,7,11,15], 9)); // [0, 1]
    console.log(twoSumUnsorted([3,2,4], 6)); 
}
// Pattern: Hash Map — array is UNSORTED so two pointers won't work!

// Problem 10 — The Ultimate Mix

{
    // Given array, find top 2 most frequent elements
    // If tie, return them sorted

    function top2Frequent(nums) {
        const freq = new Map();
        for (let num of nums) {
            freq.set(num, (freq.get(num) || 0) + 1);
        }

        const sorted = [...freq.entries()]
            .sort((a, b) => b[1] - a[1]);

        return sorted.slice(0, 2).map(e => e[0]);
    }
    console.log(top2Frequent([1,1,1,2,2,3,4,4,4,4])); // [4, 1]
    console.log(top2Frequent([1,2]));
}