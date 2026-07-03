// Problem 1 — Reverse a String

{
    function reverseString1(s) {
        return s.split("").reverse().join("");
    }

    function reverseString2(s) {
        const arr = s.split("");
        let left = 0, right = arr.length - 1;

        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
        return arr.join("");
    }
    console.log(reverseString1("hello"));   // "olleh"
    console.log(reverseString2("Anas"));
}
// Note: In interviews always mention BOTH approaches — built-in shows you know the language, two-pointer shows you understand the algorithm!

// Problem 2 — Check Anagram

{
    function isAnagram(s, t) {
        if (s.length !== t.length) return false;

        const count = {};

        for (let char of s) {
            count[char] = (count[char] || 0) + 1;
        }
        for (let char of t) {
            if (!count[char]) return false;
            count[char]--;
        }
        return true;
    }
    console.log(isAnagram("anagram", "nagaram")); // true
    console.log(isAnagram("rat", "car"));          // false
    console.log(isAnagram("listen", "silent"));
}
// Note: This is LeetCode #242 — frequency counter pattern using a hash map!

// Problem 3 — First Non-Repeating Character

{
    function firstUniqueChar(s) {
        const count = {};

        for (let char of s) {
            count[char] = (count[char] || 0) + 1;
        }
        for (let i = 0; i < s.length; i++) {
            if (count[s[i]] === 1) return i;
        }
        return -1;
    }
    console.log(firstUniqueChar("leetcode")); // 0 (l)
    console.log(firstUniqueChar("loveleet")); // 3 (v)
    console.log(firstUniqueChar("aabb"));
}

// Problem 4 — Reverse Words in a String

{
    function reverseWords(s) {
        return s.trim().split(/\s+/).reverse().join(" ");
    }
    console.log(reverseWords("the sky is blue"));   // "blue is sky the"
    console.log(reverseWords("  hello world  "));   // "world hello"
    console.log(reverseWords("a good  example"));
}
// Note: /\s+/ is a regex that splits on one or more spaces — handles multiple spaces between words!

// Problem 5 — Count Vowels

{
    function countVowels(s) {
        const vowels = new Set(["a", "e", "i", "o", "u"]);
        let count = 0;

        for (let char of s.toLowerCase()) {
            if (vowels.has(char)) count++;
        }
        return count;
    }

    // Bonus: get the actual vowels
    function getVowels(s) {
        const vowels = new Set(["a", "e", "i", "o", "u"]);
        return s.toLowerCase().split("").filter(c => vowels.has(c));
    }
    console.log(countVowels("Hello World")); // 3
    console.log(getVowels("Anas Shaikh"));
}

// Problem 6 — Longest Common Prefix

{
    function longestCommonPrefix(strs) {
        if (strs.length === 0) return "";

        let prefix = strs[0];

        for (let i = 0; i < strs.length; i++) {
            while (!strs[i].startsWith(prefix)) {
                prefix = prefix.slice(0, -1);
                if (prefix === "") return "";
            }
        }
        return prefix;
    }
    console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
    console.log(longestCommonPrefix(["dog", "racecar", "car"]));    // ""
    console.log(longestCommonPrefix(["interview", "inter", "internal"]));
}
// Note: This is LeetCode #14 — start with the first word as prefix, then shrink it until all words start with it!

// Problem 7 — Roman to Integer

{
    function romanToInt(s) {
        const values = {
            'I': 1, 'V': 5, 'X': 10, 'L': 50,
            'C': 100, 'D': 500, 'M': 1000
        };

        let result = 0;

        for (let i = 0; i < s.length; i++) {
            let current = values[s[i]];
            let next = values[s[i + 1]];

            if (next && current < next) {
                result -= current;
            } else {
                result += current;
            }
        }
        return result;
    }
    console.log(romanToInt("III"));    // 3
    console.log(romanToInt("IV"));     // 4
    console.log(romanToInt("LVIII"));  // 58
    console.log(romanToInt("MCMXCIV"));
}
// Note: LeetCode #13 — classic hash map problem. The trick is when a smaller value appears BEFORE a larger one, you subtract instead of add!

// Problem 8 — Valid Parentheses

{
    function isValid(s) {
        const stack = [];
        const pairs = { ')': '(', '}': '{', ']': '[' };

        for (let char of s) {
            if ('({['.includes(char)) {
                stack.push(char);
            } else {
                if (stack.pop() !== pairs[char]) return false;
            }
        }
        return stack.length === 0;
    }
    console.log(isValid("()"));     // true
    console.log(isValid("()[]{}")); // true
    console.log(isValid("(]"));     // false
    console.log(isValid("([)]"));
}
// Note: LeetCode #20 — uses a Stack (array as stack). This is a preview of tomorrow's Stack topic!

// Problem 9 — String Compression

{
    function compress(s) {
        let result = "";
        let i = 0;

        while (i < s.length) {
            let char = s[i];
            let count = 0;

            while (i < s.length && s[i] === char) {
                count++;
                i++;
            }
            result += count > 1 ? char + count : char;
        }
        return result;
    }
    console.log(compress("aabcccdddd")); // "a2bc3d4"
    console.log(compress("abcd"));       // "abcd" (no compression)
    console.log(compress("aaabbb"));
}

// Problem 10 — Group Anagrams

{
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
// Note: LeetCode #49 — brilliant insight: anagrams become identical when sorted! "eat" → "aet", "tea" → "aet", "ate" → "aet" all become the same key!

// After this 10 problems Do These:
// 🎯 LeetCode Practice
// ✅ #242 - Valid Anagram (Easy)
// ✅ #387 - First Unique Character (Easy)
// ✅ #14  - Longest Common Prefix (Easy)
// ✅ #13  - Roman to Integer (Easy)
// ✅ #20  - Valid Parentheses (Easy)
// ✅ #49  - Group Anagrams (Medium)