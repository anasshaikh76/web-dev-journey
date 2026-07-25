// Problem 1 — Basic Bitwise Operations

{
    const a = 5;
    const b = 3;

    console.log(a & b);
    console.log(a | b);
    console.log(a ^ b);
    console.log(~a);
    console.log(a << 1);
    console.log(a >> 1);

    console.log(4 & 1);
    console.log(5 & 1);
}
// Note: n & 1 checks the last bit — 0 means even, 1 means odd. Faster than n % 2!

// Problem 2 — Single Number (XOR trick)

{
    function singleNumber(nums) {
        let result = 0;
        for (let num of nums) {
            result ^= num;
        }
        return result;
    }

    console.log(singleNumber([2,2,1]));       // 1
    console.log(singleNumber([4,1,2,1,2]));   // 4
    console.log(singleNumber([1]));            // 1
}
// Note: LeetCode #136 — XOR magic! a ^ a = 0 and a ^ 0 = a. All pairs cancel out, leaving the single number!

// Problem 3 — Count Set Bits (Hamming Weight)

{
    function hammingWeight(n) {
        let count = 0;
        while (n !== 0) {
            count += n & 1;
            n = n >>> 1;
        }
        return count;
    }

    function hammingWeightFast(n) {
        let count = 0;
        while(n !== 0) {
            n= n & (n - 1);
            count++;
        }
        return count;
    }

    console.log(hammingWeight(11));      // 3 (1011 has three 1s)
    console.log(hammingWeightFast(128)); // 1 (10000000)
}
// Note: LeetCode #191 — n & (n-1) removes the rightmost set bit. Count how many times until n = 0!

// Problem 4 — Power of Two

{
    function isPowerOfTwo(n) {
        if (n <= 0) return false;
        return (n & (n - 1)) === 0;
    }

    console.log(isPowerOfTwo(1));  // true  (2⁰)
    console.log(isPowerOfTwo(16)); // true  (2⁴)
    console.log(isPowerOfTwo(3));  // false
    console.log(isPowerOfTwo(6));  // false
}
// Note: LeetCode #231 — powers of 2 have exactly ONE set bit! n & (n-1) removes it → result is 0 only for powers of 2!

// Problem 5 — Reverse Bits

{
    function reverseBits(n) {
        let result = 0;
        for (let i = 0; i < 32; i++) {
            result = (result << 1) | (n & 1);
            n = n >>> 1;
        }
        return result >>> 0;
    }

    console.log(reverseBits(43261596));
    // Input:  00000010100101000001111010011100
    // Output: 00111001011110000010100101000000
    // = 964176192
}
// Note: LeetCode #190 — build result bit by bit from right to left of input!

// Problem 6 — Missing Number

{
    function missingNumber(nums) {
        let result = nums.length;
        for (let i = 0; i < nums.length; i++) {
            result ^= i ^ nums[i];
        }
        return result;
    }

    function missingNumberMath(nums) {
        const n = nums.length;
        const expectedSum = (n * (n + 1)) / 2;
        const actualSum = nums.reduce((a, b) => a + b, 0);
        return expectedSum - actualSum;
    }

    console.log(missingNumber([3,0,1]));      // 2
    console.log(missingNumber([0,1]));         // 2
    console.log(missingNumber([9,6,4,2,3,5,7,0,1])); // 8
}
// Note: LeetCode #268 — XOR all indices AND all values. Everything cancels except missing number!

// Problem 7 — Sum of Two Integers Without + operator

{
    function getSum(a, b) {
        while (b !== 0) {
            const carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }

    console.log(getSum(1, 2));   // 3
    console.log(getSum(2, 3));   // 5
    console.log(getSum(-1, 1));  // 0
}
// Note: LeetCode #371 — XOR gives sum without carry, AND gives carry positions, shift left to add carry in next position. Repeat until no carry!

// Problem 8 — Counting Bits

{
    function countBits(n) {
        const dp = new Array(n + 1).fill(0);

        for (let i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }

    console.log(countBits(5));
    // [0,1,1,2,1,2]
    // 0→0, 1→1, 2→10, 3→11, 4→100, 5→101
}
// Note: LeetCode #338 — DP with bit manipulation! dp[i] = dp[i/2] + last bit. Half of i always processed before i!

// Problem 9 — XOR Queries of a Subarray

{
    function xorQueries(arr, queries) {
        const prefix = new Array(arr.length + 1).fill(0);
        for (let i = 0; i < arr.length; i++) {
            prefix[i + 1] = prefix[i] ^ arr[i];
        }

        return queries.map(([l, r]) => prefix[r + 1] ^ prefix[l]);
    }

    console.log(xorQueries(
        [1,3,4,8],
        [[0,1],[1,2],[0,3],[3,3]]
    ));
    // [2,7,14,8]
}
// Note: LeetCode #1310 — prefix XOR! Same idea as prefix sum but with XOR. Range XOR = prefix[r+1] ^ prefix[l]!

// Problem 10 — Single Number III (Two unique numbers)

{
    // Two numbers appear once, all others twice
    // Find both unique numbers

    function singleNumberIII(nums) {
        let xor = 0;
        for (let num of nums) xor ^= num;

        const diffBit = xor & (-xor);

        let a = 0, b = 0;
        for (let num of nums) {
            if (num & diffBit) {
                a ^= num;
            } else {
                b ^= num;
            }
        }
        return [a, b];
    }

    console.log(singleNumberIII([1,2,1,3,2,5])); // [3,5]
    console.log(singleNumberIII([1,1,2,3]));       // [2,3]
}