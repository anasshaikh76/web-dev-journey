// Problem 1 — Subsets II (with duplicates)

// Attempt first (10 mins):

// Input: [1,2,2]
// Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
// No duplicate subsets!

{
    function subsetsWithDup(nums) {
        nums.sort((a, b) => a - b);
        const result = [];

        function backtrack(start, current) {
            result.push([...current]);

            for (let i = start; i < nums.length; i++) {
                if (i > start && nums[i] === nums[i - 1]) continue;

                current.push(nums[i]);
                backtrack(i + 1, current);
                current.pop();
            }
        }
        backtrack(0, []);
        return result;
    }

    console.log(subsetsWithDup([1, 2, 2]));
    // [[],[1],[1,2],[1,2,2],[2],[2,2]]
}
// Key insight: Sort first! Skip nums[i] === nums[i-1] at same recursion level to avoid duplicate subsets!

// Problem 2 — Permutations II (with duplicates)

// Attempt first (10 mins):

// Input: [1,1,2]
// Output: [[1,1,2],[1,2,1],[2,1,1]]
// No duplicate permutations!

{
    function permuteUnique(nums) {
        nums.sort((a, b) => a - b);
        const result = [];
        const used = new Array(nums.length).fill(false);

        function backtrack(current) {
            if (current.length === nums.length) {
                result.push([...current]);
                return;
            }
            for (let i = 0; i < nums.length; i++) {
                if (used[i]) continue;

                if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

                used[i] = true;
                current.push(nums[i]);
                backtrack(current);
                current.pop();
                used[i] = false;
            }
        }
        backtrack([]);
        return result;
    }

    console.log(permuteUnique([1, 1, 2]));
    // [[1,1,2],[1,2,1],[2,1,1]]
}
// Note: LeetCode #47 — used array tracks which elements are currently in path. Skip if same value and previous element not used (key pruning condition)!

// Problem 3 — Combination Sum III

// Attempt first (10 mins):

// Find all combinations of k numbers (1-9)
// that sum to n. Each number used at most once.

// Input: k=3, n=7  → [[1,2,4]]
// Input: k=3, n=9  → [[1,2,6],[1,3,5],[2,3,4]]

{
    function combinationSum3(k, n) {
        const result = [];

        function backtrack(start, current, remaining) {
            if (current.length === k && remaining === 0) {
                result.push([...current]);
                return;
            }
            if (current.length === k || remaining < 0) return;

            for (let i = start; i <= 9; i++) {
                if (i > remaining) break;

                current.push(i);
                backtrack(i + 1, current, remaining - i);
                current.pop();
            }
        }
        backtrack(1, [], n);
        return result;
    }

    console.log(combinationSum3(3, 7)); // [[1,2,4]]
    console.log(combinationSum3(3, 9)); // [[1,2,6],[1,3,5],[2,3,4]]
}
// Note: LeetCode #216 — numbers 1-9, no reuse. Key pruning: if (i > remaining) break — if current number exceeds remaining sum, larger numbers won't work either!

// Find if word exists in grid
// (adjacent cells horizontally or vertically)

// board = [["A","B","C","E"],
//          ["S","F","C","S"],
//          ["A","D","E","E"]]
// word = "ABCCED"  → true
// word = "ABCB"    → false (can't reuse B)

{
    function exist(board, word) {
        const rows = board.length;
        const cols = board[0].length;

        function backtrack(r, c, index) {
            if (index === word.length) return true;
            if (r < 0 || c < 0 || r >= rows || c >= cols || board[r][c] !== word[index]) return false;

            board[r][c] = '#';
            const temp = board[r][c];

            const found = backtrack(r + 1, c, index + 1) ||
                backtrack(r - 1, c, index + 1) ||
                backtrack(r, c + 1, index + 1) ||
                backtrack(r, c - 1, index + 1);

            board[r][c] = temp;
            return found;
        }

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (backtrack(r, c, 0)) return true;
            }
        }
        return false;
    }

    console.log(exist([
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ], "ABCCED")); // true
    console.log(exist([
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
    ], "ABCB")); // false
}
// Note: LeetCode #79 — mark cell '#' to prevent reuse, explore 4 directions, restore after backtracking!

// Problem 5 — Restore IP Addresses

// Attempt first (10 mins):

// Given string of digits, return all valid IP addresses.

// Input: "25525511135"
// Output: ["255.255.11.135","255.255.111.35"]

// Valid IP: 4 parts, each 0-255, no leading zeros

{
    function restoreIpAddresses(s) {
        const result = [];

        function backtrack(start, parts) {
            if (parts.length === 4 && start === s.length) {
                result.push(parts.join("."));
                return;
            }
            if (parts.length === 4 || start === s.length) return;

            for (let len = 1; len <= 3; len++) {
                if (start + len > s.length) break;

                const segment = s.slice(start, start + len);

                if (segment.length > 1 && segment[0] === 0) break;

                if (Number(segment) > 255) break;

                parts.push(segment);
                backtrack(start + len, parts);
                parts.pop();
            }
        }
        backtrack(0, []);
        return result;
    }

    console.log(restoreIpAddresses("25525511135"));
    // ["255.255.11.135","255.255.111.35"]
    console.log(restoreIpAddresses("0000"));
    // ["0.0.0.0"]
}
// Note: LeetCode #93 — try segments of length 1, 2, 3. Prune if leading zeros or > 255. Stop when 4 valid parts found!

// Problem 6 — Expression Add Operators

// Attempt first (10 mins):

// Given string of digits and target,
// add +, -, * operators to reach target.

// Input: num="123", target=6  → ["1+2+3","1*2*3"]
// Input: num="232", target=8  → ["2*3+2","2+3*2"]

{
    function addOperators(num, target) {
        const result = [];

        function backtrack(index, path, value, prev,) {
            if (index === num.length) {
                if (value === target) result.push(path);
                return;
            }

            for (let len = 1; len <= num.length - index; len++) {
                const str = num.slice(index, index + len);

                if (str.length > 1 && str[0] === 0) break;

                const curr = Number(str);

                if (index === 0) {
                    backtrack(len, str, curr, curr);
                } else {
                    backtrack(index +len, path + '+' + str, value + curr, curr);
                    backtrack(index + len, path + '-' + str, value - curr, -curr);
                    backtrack(index + len, path + '*' + str, value - prev + prev * curr, prev * curr);
                }
            }
        }
        backtrack(0, "", 0, 0);
        return result;
    }

    console.log(addOperators("123", 6));
    // ["1+2+3","1*2*3"]
    console.log(addOperators("232", 8));
    // ["2*3+2","2+3*2"]
}
// Note: LeetCode #282 — Hard! Track previous value for multiplication (need to undo previous add/subtract). The prev variable handles operator precedence!

// Problem 7 — Beautiful Arrangement

// Attempt first (10 mins):

// Count arrangements of [1..n] where:
// position i has number that is divisible by i
// OR i is divisible by the number.

// Input: n=2  → 2
// ([1,2] → 1%1=0✓, 2%2=0✓ and [2,1] → 2%1=0✓, 1%2=no but 2%1=0✓)

{
    function countArrangement(n) {
        let count = 0;
        const visited = new Array(n + 1).fill(false);

        function backtrack(pos) {
            if (pos > n) {
                count++;
                return;
            }

            for (let i = 1; i <= n; i++) {
                if (!visited[i] && (pos % i === 0 || i % pos === 0)) {
                    visited[i] = true;
                    backtrack(pos+ 1);
                    visited[i] = false;
                }
            }
        }
        backtrack(1);
        return count;
    }

    console.log(countArrangement(2)); // 2
    console.log(countArrangement(3)); // 3
}
// Note: LeetCode #526 — backtrack position by position. At each position, try all unused numbers that satisfy the divisibility condition. Prune invalid placements immediately!