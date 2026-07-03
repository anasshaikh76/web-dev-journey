// Problem 1 — Frequency Counter

{
    function frequencyCounter(arr) {
        let freq = {};

        for (let item of arr) {
            freq[item] = (freq[item] || 0) + 1;
        }
        return freq;
    }

    console.log(frequencyCounter([1,2,2,3,3,3,4]));
    // {1:1, 2:2, 3:3, 4:1}

    console.log(frequencyCounter("hello".split("")));
}
// Note: This is the most fundamental hash map pattern — you used it in Day 34's anagram problem and Day 33's sliding window. Now you know its real name: frequency counter!

// Problem 2 — Two Sum with Hash Map (revisit with full understanding)

{
    function twoSum(nums, target) {
        const seen = new Map();

        for (let i = 0; i < nums.length; i++) {
            let compliment = target - nums[i];

            if (seen.has(compliment)) {
                return [seen.get(compliment), i];
            }
            seen.set(nums[i], i);
        }
        return [];
    }
    console.log(twoSum([2, 7, 11, 15], 9));  // [0, 1]
    console.log(twoSum([3, 2, 4], 6));
}
// Note: Now you fully understand WHY this works — for each number, check if its complement exists in the map. If yes, we found our pair!

// Problem 3 — Contains Duplicate with Set

{
    function containsDuplicate(nums) {
        const seen = new Set();

        for (let num of nums) {
            if (seen.has(num)) return true;
            seen.add(num);
        }
        return false;
    }

    function containsDuplicateShort(nums) {
        return new Set(nums).size !== nums.length;
    }
    console.log(containsDuplicate([1, 2, 3, 1]));       // true
    console.log(containsDuplicateShort([1, 2, 3, 4]));
}

// Problem 4 — Intersection of Two Arrays

{
    function intersection(nums1, nums2) {
        const set1 = new Set(nums1);
        const result = new Set();

        for (let num of nums2) {
            if (set1.has(num)) {
                result.add(num);
            }
        }
        return [...result];
    }
    console.log(intersection([1,2,2,1], [2,2]));       // [2]
    console.log(intersection([4,9,5], [9,4,9,8,4]));
}
// Note: Using Set for result automatically handles duplicates — no need to check manually!

// Problem 5 — Longest Consecutive Sequence

{
    function longestConsecutive(nums) {
        const numSet = new Set(nums);
        let longest = 0;

        for (let num of numSet) {
            if (!numSet.has(num - 1)) {
                let current = num;
                let length = 1;

                while (numSet.has(current + 1)) {
                    current++;
                    length++;
                }
                longest = Math.max(longest, length);
            }
        }
        return longest;
    }
    console.log(longestConsecutive([100,4,200,1,3,2])); // 4 (1,2,3,4)
    console.log(longestConsecutive([0,3,7,2,5,8,4,6,0,1])); 
}
// Note: LeetCode #128 — the Set trick here is key: only start counting from the beginning of a sequence (when num-1 doesn't exist). This turns an O(n²) problem into O(n)!

// Problem 6 — Word Frequency Counter

{
    function wordFrequency(sentence) {
        let words = sentence.toLowerCase().split(" ");
        let freq = new Map();

        for (let word of words) {
            freq.set(word, (freq.get(word) || 0) + 1);
        }

        const sorted = [...freq.entries()].sort((a,b) => b[1] - a[1]);

        console.log("Word frequencies:");
        for (let [word, count] of sorted) {
            console.log(`  ${word}: ${count}`);
        }
        return freq;
    }
    wordFrequency("the cat sat on the mat the cat");
}

// Problem 7 — Subarray Sum Equals K

{
    function subarraySum(nums, k) {
        const prefixSumCount = new Map();
        prefixSumCount.set(0, 1);
        let count = 0;
        let prefixSum = 0;

        for (let num of nums) {
            prefixSum += num;

            if (prefixSumCount.has(prefixSum - k)) {
                count += prefixSumCount.get(prefixSum - k);
            }
            prefixSumCount.set(prefixSum, (prefixSumCount.get(prefixSum) || 0) + 1);
        }
        return count;
    }
    console.log(subarraySum([1, 1, 1], 2));      // 2
    console.log(subarraySum([1, 2, 3], 3)); 
}
// Note: LeetCode #560 — combines prefix sum with hash map. Prefix sum is a pattern where you track the running total to answer "sum of subarray from i to j" questions efficiently!

// Problem 8 — Top K Frequent Elements

{
    function topKFrequent(nums, k) {
        const freq = new Map();

        for (let num of nums) {
            freq.set(num, (freq.get(num) || 0) + 1);
        }

        return [...freq.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(entry => entry[0]);
    }
    console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1, 2]
    console.log(topKFrequent([1], 1));
}
// Note: LeetCode #347 — frequency counter + sorting pattern combined!

// Problem 9 — Happy Number

{
    function isHappy(n) {
        const seen = new Set();

        while (n !== 1) {
            if (seen.has(n)) return false;
            seen.add(n);

            n = String(n)
                .split("")
                .reduce((sum, digit) => sum + Number(digit) ** 2, 0);
        }
        return true;
    }
    console.log(isHappy(19)); // true  (1² + 9² = 82 → ... → 1)
    console.log(isHappy(2)); 
}
// Note: LeetCode #202 — using Set to detect cycles. If we see the same number twice, we're in a loop!

// Problem 10 — Four Sum Count

{
    function fourSumCount(nums1, nums2, nums3, nums4) {
        const pairSums = new Map();
        let count = 0;

        for (let a of nums1) {
            for (let b of nums2) {
                const sum = a + b;
                pairSums.set(sum, (pairSums.get(sum) || 0) + 1);
            }
        }
        for (let c of nums3) {
            for (let d of nums4) {
                const compliment = -(c + d);
                if (pairSums.has(compliment)) {
                    count += pairSums.get(compliment);
                }
            }
        }
        return count;
    }
    console.log(fourSumCount([1,2], [-2,-1], [-1,2], [0,2]));
}