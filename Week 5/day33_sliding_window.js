// Problem 1 — Max Sum Subarray of Size K (Fixed Window)

{
    function maxSubArray(arr, k) {
        let windowSum = 0;
        maxSum = 0;

        for (let i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        maxSum = windowSum;

        for (let i = k; i < arr.length; i++) {
            windowSum += arr[i];
            windowSum -= arr[i - k];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
    console.log(maxSubArray([2, 1, 5, 1, 3, 2], 3));
    console.log(maxSubArray([2, 3, 4, 1, 5], 2));
}
// Key insight: Instead of recalculating the whole window sum each time, just ADD the new element and REMOVE the oldest one. That's what makes sliding window O(n) instead of O(n²)!

// Problem 2 — Average of Subarrays of Size K

{
    function findAverage(arr, k) {
        const result = [];
        let windowSum = 0;

        for (let i = 0; i < arr.length; i++) {
            windowSum += arr[i];

            if (i >= k - 1){
                result.push((windowSum/k).toFixed(2));
                windowSum -= arr[i - (k - 1)];
            }
        }
        return result;
    } 
    console.log(findAverage([1, 3, 2, 6, -1, 4, 1, 8, 2], 5));
}

// Problem 3 — Smallest Subarray with Sum >= Target (Dynamic Window)

{
    function smallestSubArray(arr, target) {
        let left = 0;
        let currentWindowSum = 0;
        let minLength = Infinity;

        for (let right = 0; right < arr.length; right++) {
            currentWindowSum += arr[right];

            while (currentWindowSum >= target) {
                minLength = Math.min(minLength, right - left + 1);
                currentWindowSum -= arr[left];
                left++;
            }   
        }
        return minLength === Infinity ? 0 : minLength;
    }
    console.log(smallestSubArray([2, 1, 5, 2, 3, 2], 7)); // 2 (5+2=7)
    console.log(smallestSubArray([2, 1, 5, 2, 8], 7));
}
// Note: This is the DYNAMIC window — it grows by moving right, and shrinks by moving left when the condition is met. This pattern is the key to most sliding window problems!

// Problem 4 — Maximum Sum of Distinct Subarray (Dynamic Window)

{
    function maximumSubarraySum(nums, k) {
        let left = 0;
        let windowSum = 0;
        let maxSum = 0;
        const seen = new Set();

        for (let right = 0; right < nums.length; right++) {
            while (seen.has(nums[right])) {
                seen.delete(nums[left]);
                windowSum -= nums[left];
                left++;
            }
            seen.add(nums[right]);
            windowSum += nums[right];

            if (right - left + 1 === k) {
                maxSum = Math.max(maxSum, windowSum);
                seen.delete(nums[left]);
                windowSum -= nums[left];
                left++;
            }
        }
        return maxSum;
    }
    console.log(maximumSubarraySum([1, 5, 4, 2, 9, 9, 9], 3)); // 15 (4+2+9)
    console.log(maximumSubarraySum([4, 4, 4], 3)); 
}

// Problem 5 — Longest Substring Without Repeating Characters

{
    function lengthOfLongestSubstring(s) {
        let left = 0;
        maxLength = 0;
        const seen = new Set();

        for (let right = 0; right < s.length; right++) {
            while (seen.has(s[right])) {
                seen.delete(s[left]);
                left++;
            }
            seen.add(s[right]);
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
    console.log(lengthOfLongestSubstring("abcabcbb")); // 3 (abc)
    console.log(lengthOfLongestSubstring("bbbbb"));    // 1 (b)
    console.log(lengthOfLongestSubstring("pwwkew"));
}
//Note: This is LeetCode #3 — one of the most famous sliding window problems! The Set tracks what's currently in the window.

// Problem 6 — Max Consecutive Ones III

{
    function longestOnes(nums, k) {
        let left = 0;
        let zeros = 0;
        let maxLength = 0;

        for (let right = 0; right < nums.length; right++) {
            if (nums[right] === 0) zeros++;

            while (zeros > k) {
                if (nums[left] === 0) zeros--;
                left++;
            }
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
    console.log(longestOnes([1,1,1,0,0,0,1,1,1,1,0], 2)); // 6
    console.log(longestOnes([0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], 3));
}

// Problem 7 — Count Occurrences of Anagrams

{
    function countAnagrams(text, pattern) {
        let count = 0;
        let patternCount = {};
        let windowCount = {};
        let k = pattern.length;

        for (let char of pattern) {
            patternCount[char] = (patternCount[char] || 0) + 1;
        }
        for (let right = 0; right < text.length; right++) {
            let char = text[right];
            windowCount[char] = (windowCount[char] || 0) + 1;

            if (right >= k) {
                let leftChar = text[right - k];
                if(windowCount[leftChar] === 1) {
                    delete windowCount[leftChar];
                } else {
                    windowCount[leftChar]--;
                }
            }
            if (JSON.stringify(windowCount) === JSON.stringify(patternCount)) {
                count++;
            }
        }
        return count;
    }
    console.log(countAnagrams("aabaabaa", "aab"));
}

// Problem 8 — Minimum Window Substring (Hard but important!)

{
    function minWindow(s, t) {
        if (!s || !t || s.length < t.length) return "";

        const need = {};
        for (let char of t) {
            need[char] = (need[char] || 0) + 1;
        }

        let left = 0;
        let match = 0;
        let minLen = Infinity;
        let minStart = 0;
        const required = Object.keys(need).length;
        const window = {};

        for (let right = 0; right < s.length; right++) {
            let char = s[right];
            window[char] = (window[char] || 0) + 1;

            if (need[char] && window[char] === need[char]) {
                match++;
            }
            while (match === required) {
                if (right - left + 1 < minLen) {
                    minLen = right - left + 1;
                    minStart = left;
                }
                let leftChar = s[left];
                window[leftChar]--;
                if (need[leftChar] && window[leftChar] < need[leftChar]) {
                    match--;
                }
                left++;
            }
        }
        return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
    }
    console.log(minWindow("ADOBECODEBANC", "ABC"));
}
// Note: This is LeetCode #76 — a Hard problem. Don't stress if it's confusing — read through it and understand the concept. The pattern is the same dynamic window, just tracking multiple characters!

// Problem 9 — Permutation in String

{
    function checkInclusion(s1, s2) {
        if (s1.length > s2.length) return false;

        const s1Count = new Array(26).fill(0);
        const windowCount = new Array(26).fill(0);
        const a = "a".charCodeAt(0);

        for (let i = 0; i < s1.length; i++) {
            s1Count[s1.charCodeAt(i) - a]++;
            windowCount[s2.charCodeAt(i) - a]++;
        }
        if (s1Count.join(",") === windowCount.join(",")) return true;

        for (let i = s1.length; i < s2.length; i++) {
            windowCount[s2.charCodeAt(i) - a]++;
            windowCount[s2.charCodeAt(i - s1.length) - a]--;

            if (s1Count.join(",") === windowCount.join(",")) return true;
        }
        return false;
    }
    console.log(checkInclusion("ab", "eidbaooo")); // true ("ba" is in there)
    console.log(checkInclusion("ab", "eidboaoo"));
}

// Problem 10 — Longest Repeating Character Replacement

{
    function characterReplacement(s, k) {
        let left = 0;
        let maxCount = 0;
        let maxLength = 0;
        let count = {};

        for (let right = 0; right < s.length; right++) {
            count[s[right]] = (count[s[right]] || 0) + 1;
            maxCount = Math.max(maxCount, count[s[right]]);

            while ((right - left + 1) - maxCount > k) {
                count[s[left]]--;
                left++;
            }
            maxLength = Math.max(maxLength, right - left + 1);
        }
        return maxLength;
    }
    console.log(characterReplacement("ABAB", 2)); // 4
    console.log(characterReplacement("AABABBA", 1));
}

// After This 10 Problems:
// 🎯 LeetCode (do these on the website!)
// ✅ #3   - Longest Substring Without Repeating Characters (Medium)
// ✅ #121 - Best Time to Buy and Sell Stock (Easy) — sliding window approach
// ✅ #209 - Minimum Size Subarray Sum (Medium)
// ✅ #567 - Permutation in String (Medium)
function checkInclusion(s1, s2) {
    if (s1.length > s2.length) return false;

    const s1Count = new Array(26).fill(0);
    const windowCount = new Array(26).fill(0);
    const a = "a".charCodeAt(0);

    // Count characters in s1 and first window
    for (let i = 0; i < s1.length; i++) {
        s1Count[s1.charCodeAt(i) - a]++;
        windowCount[s2.charCodeAt(i) - a]++;
    }

    // Count how many characters match
    let matches = 0;
    for (let i = 0; i < 26; i++) {
        if (s1Count[i] === windowCount[i]) matches++;
    }

    // If all 26 characters match, found permutation!
    if (matches === 26) return true;

    // Slide the window
    for (let i = s1.length; i < s2.length; i++) {
        // Add new character
        const newCharIndex = s2.charCodeAt(i) - a;
        windowCount[newCharIndex]++;
        if (windowCount[newCharIndex] === s1Count[newCharIndex]) {
            matches++;
        } else if (windowCount[newCharIndex] - 1 === s1Count[newCharIndex]) {
            // It was a match before, now it's not
            matches--;
        }

        // Remove old character
        const oldCharIndex = s2.charCodeAt(i - s1.length) - a;
        windowCount[oldCharIndex]--;
        if (windowCount[oldCharIndex] === s1Count[oldCharIndex]) {
            matches++;
        } else if (windowCount[oldCharIndex] + 1 === s1Count[oldCharIndex]) {
            // It was a match before, now it's not
            matches--;
        }

        if (matches === 26) return true;
    }

    return false;
}