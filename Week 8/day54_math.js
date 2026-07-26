// Problem 1 — FizzBuzz (Classic)

{
    function FizzBuzz(n) {
        const result = [];
        for (let i = 1; i <= n; i++) {
            if (i % 15 === 0) result.push("FizzBuzz");
            else if (i % 3 === 0) result.push("Fizz");
            else if (i % 5 === 0) result.push("Buzz");
            else result.push(String(i));
        }
        return result;
    }

    console.log(FizzBuzz(15));
}
// Note: LeetCode #412 — check 15 first (divisible by both 3 AND 5), then 3, then 5!

// Problem 2 — Palindrome Number

{
    function isPalindrome(x) {
        if (x < 0) return false;
        if (x !== 0 && x % 10 === 0) return false;

        let reversed = 0;
        while (x > reversed) {
            reversed = reversed * 10 + x % 10;
            x = Math.floor(x / 10);
        }
        return x === reversed || x === Math.floor(reversed / 10);
    }

    console.log(isPalindrome(121));  // true
    console.log(isPalindrome(-121)); // false
    console.log(isPalindrome(10));   // false
}
// Note: LeetCode #9 — reverse only HALF the number! Stop when reversed >= x. Works without converting to string!

// Problem 3 — GCD & LCM

{
    function gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);
    }

    console.log(gcd(48, 18)); // 6
    console.log(gcd(100, 75)); // 25
    console.log(lcm(4, 6));   // 12
    console.log(lcm(12, 18)); // 36
}
// Note: Euclidean algorithm — gcd(a,b) = gcd(b, a%b) until b=0. Elegant and O(log n)!

// Problem 4 — Sieve of Eratosthenes (Count Primes)

{
    function countPrimes(n) {
        if (n < 2) return 0;

        const isPrime = new Array(n).fill(true);
        isPrime[0] = false;
        isPrime[1] = false;

        for (let i = 2; i * i < n; i++) {
            if (isPrime[i]) {
                for (let j = i * i; j < n; j += i) {
                    isPrime[j] = false;
                }
            }
        }
        return isPrime.filter(Boolean).length;
    }

    console.log(countPrimes(10));  // 4 (2,3,5,7)
    console.log(countPrimes(20));  // 8
    console.log(countPrimes(100)); // 25
}
// Note: LeetCode #204 — Sieve of Eratosthenes! Mark multiples of each prime as composite. Start marking from i² (smaller multiples already marked)!

// Problem 5 — Power Function (Fast Exponentiation)

{
    function myPow(x, n) {
        if (n === 0) return 1;
        if(n < 0) {
            x = 1/ x;
            n = -n;
        }

        if (n % 2 === 0) {
            return myPow(x * x, n / 2);
        } else {
            return x * myPow(x * x, Math.floor(n / 2));
        }
    }

    console.log(myPow(2, 10));   // 1024
    console.log(myPow(2, -2));   // 0.25
    console.log(myPow(2.1, 3));  // 9.261
}
// Note: LeetCode #50 — fast exponentiation! x^n = (x²)^(n/2). Halves the exponent each time → O(log n) instead of O(n)!

// Problem 6 — Excel Sheet Column Number

{
    function titleToNumber(columnTitle) {
        let result = 0;
        for (let char of columnTitle) {
            result = result * 26 + (char.charCodeAt(0) - 64);
        }
        return result;
    }

    function numberToTitle(columnNumber) {
        let result = "";
        while (columnNumber > 0) {
            columnNumber--;
            result = String.fromCharCode(65 + columnNumber % 26) + result;
            columnNumber = Math.floor(columnNumber / 26);
        }
        return result;
    }

    console.log(titleToNumber("A"));   // 1
    console.log(titleToNumber("AB"));  // 28
    console.log(titleToNumber("ZY"));  // 701
    console.log(numberToTitle(1));     // "A"
    console.log(numberToTitle(28));    // "AB"
}
// Note: LeetCode #171 & #168 — base 26 number system! Like converting binary to decimal but with 26 instead of 2!

// Problem 7 — Reverse Integer

{
    function reverse(x) {
        const MAX = Math.pow(2, 31) - 1;
        const MIN = -Math.pow(2, 31);

        let result = 0;
        while (x !== 0) {
            const digit = x % 10;
            x = Math.trunc(x / 10);
            result = result * 10 + digit;

            if (result > MAX || result < MIN) return 0;
        }
        return result;
    }

    console.log(reverse(123));   // 321
    console.log(reverse(-123));  // -321
    console.log(reverse(120));   // 21
}
// Note: LeetCode #7 — pop last digit with % 10, push to result with * 10 + digit. Check overflow!

// Problem 8 — Happy Number

{
    function isHappy(n) {
        function sumOfSquares(num) {
            let sum = 0;
            while (num > 0) {
                const digit = num % 10;
                sum += digit * digit;
                num = Math.floor(num / 10);
            }
            return sum;
        }

        let slow = n;
        let fast = sumOfSquares(n);

        while (fast !== 1 && slow !== fast) {
            slow = sumOfSquares(slow);
            fast = sumOfSquares(sumOfSquares(fast));
        }
        return fast === 1;
    }

    console.log(isHappy(19)); // true
    console.log(isHappy(2));  // false
}
// Note: LeetCode #202 — you solved this before with Set! Now with fast/slow pointer cycle detection — two approaches same problem!

// Problem 9 — Ugly Number II

{
    function nthUglyNumber(n) {
        const ugly = [1];
        let i2 = 0, i3 = 0, i5 = 0;

        while (ugly.length < n) {
            const next2 = ugly[i2] * 2;
            const next3 = ugly[i3] * 3;
            const next5 = ugly[i5] * 5;

            const nextUgly = Math.min(next2, next3, next5);
            ugly.push(nextUgly);

            if (nextUgly === next2) i2++;
            if (nextUgly === next3) i3++;
            if (nextUgly === next5) i5++;
        }
        return ugly[n - 1];
    }

    console.log(nthUglyNumber(10)); // 12
    console.log(nthUglyNumber(1));  // 1
}
// Note: LeetCode #264 — three pointer DP! Track next multiple of 2, 3, 5 separately. Pick minimum, advance that pointer!

// Problem 10 — Fraction to Recurring Decimal

{
    function fractionToDecimal(numerator, denominator) {
        if (numerator === 0) return "0";

        let result = "";

        if ((numerator < 0) !== (denominator < 0)) result += "-";

        numerator = Math.abs(numerator);
        denominator = Math.abs(denominator);

        result += Math.floor(numerator / denominator);
        let remainder = numerator % denominator;

        if (remainder === 0) return result;

        result += ".";
        const remainderMap = new Map();

        while (remainder !== 0) {
            if (remainderMap.has(remainder)) {
                const pos = remainderMap.get(remainder);
                result = result.slice(0, pos) + "(" +
                         result.slice(pos) + ")";
                return result;
            }

            remainderMap.set(remainder, result.length);
            remainder *= 10;
            result += Math.floor(remainder / denominator);
            remainder %= denominator;
        }
        return result;
    }

    console.log(fractionToDecimal(1, 2));   // "0.5"
    console.log(fractionToDecimal(2, 3));   // "0.(6)"
    console.log(fractionToDecimal(4, 333)); // "0.(012)"
}