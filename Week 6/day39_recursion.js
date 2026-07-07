// Problem 1 — Countdown (Simplest Recursion)

{
    function countdown(n) {
        if (n <= 0) {
            console.log("Done");
            return;
        }
        console.log(n);
        countdown(n - 1);
    }

    countdown(5);
}
// Note: Every recursion has these exact two parts — base case stops it, recursive case makes it smaller each time!

// Problem 2 — Factorial

{
    function factorial(n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    console.log(factorial(5));
    console.log(factorial(0));
    console.log(factorial(6));

    // Visualize what happens:
    // factorial(5)
    // = 5 * factorial(4)
    // = 5 * 4 * factorial(3)
    // = 5 * 4 * 3 * factorial(2)
    // = 5 * 4 * 3 * 2 * factorial(1)
    // = 5 * 4 * 3 * 2 * 1 = 120
}

// Problem 3 — Fibonacci

{
    function fibonacci(n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    function fibMemo(n, memo = {}) {
        if (n <= 1) return n;
        if (memo[n]) return memo[n];
        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        return memo[n];
    }

    console.log(fibonacci(10));
    console.log(fibMemo(50));
}
// Note: Without memoization, fibonacci(50) would take billions of calculations! Memoization caches results so each value only calculated once — this is Dynamic Programming basics!

// Problem 4 — Sum of Array

{
    function sumArray(arr) {
        if (arr.length === 0) return 0;
        return arr[0] + sumArray(arr.slice(1));
    }

    console.log(sumArray([1, 2, 3, 4, 5]));

    // Visualize:
    // sumArray([1,2,3,4,5])
    // = 1 + sumArray([2,3,4,5])
    // = 1 + 2 + sumArray([3,4,5])
    // = 1 + 2 + 3 + sumArray([4,5])
    // = 1 + 2 + 3 + 4 + sumArray([5])
    // = 1 + 2 + 3 + 4 + 5 + sumArray([])
    // = 1 + 2 + 3 + 4 + 5 + 0 = 15
}

// Problem 5 — Reverse String Recursively

{
    function reverseString(s) {
        if (s.length <= 1) return s;
        return reverseString(s.slice(1)) + s[0];
    }

    console.log(reverseString("hello"));
    console.log(reverseString("Anas"));

    // Visualize:
    // reverse("hello")
    // = reverse("ello") + "h"
    // = reverse("llo") + "e" + "h"
    // = reverse("lo") + "l" + "e" + "h"
    // = reverse("o") + "l" + "l" + "e" + "h"
    // = "o" + "l" + "l" + "e" + "h"
    // = "olleh"
}

// Problem 6 — Power Function

{
    function power(base, exp) {
        if (exp === 0) return 1;
        return base * power(base, exp - 1);
    }

    function fastPower(base, exp) {
        if (exp === 0) return 1;
        if (exp % 2 === 0) {
            const half = fastPower(base, exp / 2);
            return half * half;
        }
        return base * fastPower(base, exp - 1);
    }

    console.log(power(2, 10));
    console.log(fastPower(2, 10));
}

// Problem 7 — Flatten Nested Array

{
    function flattenArray(arr) {
        let result = [];

        for (let item of arr) {
            if (Array.isArray(item)) {
                result = result.concat(flattenArray(item));
            } else {
                result.push(item);
            }
        }
        return result;
    }

    console.log(flattenArray([1, [2, 3], [4, [5, 6]]]));
    // [1, 2, 3, 4, 5, 6]
    console.log(flattenArray([1, [2, [3, [4, [5]]]]]));
    // [1, 2, 3, 4, 5]
}
// Note: Recursion is PERFECT for nested structures — each level calls itself on the inner level!

// Problem 8 — Check Palindrome Recursively

{
    function isPalindrome(s, left = 0, right = s.length - 1) {
        if (left >= right) return true;
        if (s[left] !== s[right]) return false;
        return isPalindrome(s, left + 1, right - 1);
    }

    console.log(isPalindrome("racecar")); // true
    console.log(isPalindrome("hello"));   // false
    console.log(isPalindrome("madam"));   // true
}

// Problem 9 — Binary Search Recursively

{
    function binarySearch(arr, target, left = 0, right = arr.length - 1) {
        if (left > right) return -1;

        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) return mid;
        if (arr[mid] < target) {
            return binarySearch(arr, target, mid + 1, right);
        } else {
            return binarySearch(arr, target, left, mid - 1);
        }
    }

    console.log(binarySearch([1, 3, 5, 7, 9, 11], 7));  // 3
    console.log(binarySearch([1, 3, 5, 7, 9, 11], 6));  // -1
}
// Note: Binary Search you already know — now written recursively. Same logic, different style!

// Problem 10 — Tower of Hanoi (Classic!)

{
    function hanoi(n, from, to, aux) {
        if (n === 1) {
            console.log(`Move disk 1 from ${from} to ${to}`);
            return;
        }
        hanoi(n - 1, from, aux, to);
        console.log(`Move disk ${n} from ${from} to ${to}`);
        hanoi(n - 1, aux, to, from);
    }

    hanoi(3, "A", "B", "C");
}