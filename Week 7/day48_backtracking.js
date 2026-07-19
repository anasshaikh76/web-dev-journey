// Problem 1 — All Permutations

{
    function permutations(nums) {
        const result = [];

        function bactrack(current, remaining) {
            if (remaining.length === 0) {
                result.push([...current]);
                return;
            }
            for (let i = 0; i < remaining.length; i++) {
                current.push(remaining[i]);
                bactrack(current,
                    [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
                current.pop();
            }
        }
        bactrack([], nums);
        return result;
    }
    console.log(permutations([1, 2, 3]));
}
// Note: LeetCode #46 — for each position, try every remaining number. Backtrack by removing the last added number!

// Problem 2 — Subsets

{
    function subsets(nums) {
        const result = [];

        function bactrack(start, current) {
            result.push([...current]);

            for (let i = start; i < nums.length; i++) {
                current.push(nums[i]);
                bactrack(i + 1, current);
                current.pop();
            }
        }
        bactrack(0, []);
        return result;
    }

    console.log(subsets([1, 2, 3]));
}
// Note: LeetCode #78 — add current state at EVERY step (not just base case). Start index prevents duplicates!

// Problem 3 — Combinations

{
    function combine(n, k) {
        const result = [];

        function bactrack(start, current) {
            if (current.length === k) {
                result.push([...current]);
                return;
            }

            for (let i = start; i <= n; i++) {
                current.push(i);
                bactrack(i + 1, current);
                current.pop();
            }
        }
        bactrack(1, []);
        return result;
    }

    console.log(combine(4, 2));
}
// Note: LeetCode #77 — similar to subsets but stop at exactly k elements!

// Problem 4 — Combination Sum

{
    function combinationSum(candidates, target) {
        const result = [];

        function bactrack(start, current, remaining) {
            if (remaining === 0) {
                result.push([...current]);
                return;
            }
            if (remaining < 0) return;

            for (let i = start; i < candidates.length; i++) {
                current.push(candidates[i]);
                bactrack(i, current, remaining - candidates[i]);
                current.pop();
            }
        }
        bactrack(0, [], target);
        return result;
    }

    console.log(combinationSum([2, 3, 6, 7], 7));
    // [[2,2,3],[7]]
    console.log(combinationSum([2, 3, 5], 8));
}
// Note: LeetCode #39 — key difference: pass i not i+1 to allow reusing same number. remaining < 0 prunes dead branches early!

// Problem 5 — Combination Sum II (No duplicates)

{
    function combinationSum2(candidates, target) {
        candidates.sort((a, b) => a - b);
        const result = [];

        function bactrack(start, current, remaining) {
            if (remaining === 0) {
                result.push([...current]);
                return;
            }

            for (let i = start; i < candidates.length; i++) {
                if (i > start && candidates[i] === candidates[i + 1]) continue;
                if (candidates[i] > remaining);

                current.push(candidates[i]);
                bactrack(i + 1, current, remaining - candidates[i]);
                current.pop();
            }
        }
        bactrack(0, [], target);
        return result;
    }
    console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
}
// Note: LeetCode #40 — sort first, then skip duplicate values at the same recursion level to avoid duplicate combinations!

// Problem 6 — Word Search

{
    function exist(board, word) {
        const rows = board.length;
        const cols = board[0].length;

        function backtrack(r, c, index) {
            if (index === word.length) return true;
            if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[index]) return false;

            const temp = board[r][c];
            board[r][c] = '#';

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
// Note: LeetCode #79 — backtrack on a grid! Mark cell as visited with '#', explore all 4 directions, then restore original value (backtrack)!

// Problem 7 — N-Queens

{
    function solveNQueens(n) {
        const result = [];
        const cols = new Set();
        const diag1 = new Set();
        const diag2 = new Set();

        function backtrack(row, board) {
            if (row === n) {
                result.push(board.map(r => r.join(" ")));
                return;
            }
            for (let col = 0; col < n; col++) {
                if (cols.has(col) || diag1.has(row - col) || diag2.has(row + cols)) continue;

                cols.add(col);
                diag1.add(row - col);
                diag2.add(row + col);
                board[row][col] = 'Q';

                backtrack(row + 1, board);

                cols.delete(col);
                diag1.delete(row - col);
                diag2.delete(row + col);
                board[row][col] = '.';
            }
        }
        const board = Array.from({ length: n }, () => new Array(n).fill('.'));
        backtrack(0, board);
        return result;
    }

    console.log(solveNQueens(4).length); // 2 solutions
    console.log(solveNQueens(4)[0]);
}
// Note: LeetCode #51 — classic backtracking! Track attacked columns and diagonals with Sets. Place queen row by row, backtrack if conflict!

// Problem 8 — Sudoku Solver

{
    function solveSudoku(board) {
        function isValid(board, row, col, num) {
            for (let j = 0; j < 9; j++) {
                if (board[row][j] === num) return false;
            }
            for (let i = 0; i < 9; i++) {
                if (board[i][col] === num) return false;
            }
            const boxRow = Math.floor(row / 3) * 3;
            const boxCol = Math.floor(col / 3) * 3;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (board[boxRow + i][boxCol + j] === num) return false;
                }
            }
            return true;
        }

        function solve(board) {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] === '.') {
                        for (let num = 1; num <= 9; num++) {
                            const char = String(num);
                            if (isValid(board, i, j, char)) {
                                board[i][j] = char;
                                if (solve(board)) return true;
                                board[i][j] = '.';
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }
        solve(board);
    }

    const board = [
        ["5", "3", ".", ".", "7", ".", ".", ".", "."],
        ["6", ".", ".", "1", "9", "5", ".", ".", "."],
        [".", "9", "8", ".", ".", ".", ".", "6", "."],
        ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
        ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
        ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
        [".", "6", ".", ".", ".", ".", "2", "8", "."],
        [".", ".", ".", "4", "1", "9", ".", ".", "5"],
        [".", ".", ".", ".", "8", ".", ".", "7", "9"]
    ];

    solveSudoku(board);
    console.log(board[0]);
}
// Note: LeetCode #37 — try each number 1-9 in empty cells. If valid, place it and recurse. If stuck, backtrack by resetting to '.'!

// Problem 9 — Palindrome Partitioning

{
    function partition(s) {
        const result = [];

        function isPalin(str, l, r) {
            while (l < r) {
                if (str[l] !== str[r]) return false;
                l++, r--;
            }
            return true;
        }
        function backtrack(start, current) {
            if (start === s.length) {
                result.push([...current]);
                return;
            }
            for (let end = start; end < s.length; end++) {
                if (isPalin(s, start, end)) {
                    current.push(s.slice(start, end + 1));
                    backtrack(end + 1, current);
                    current.pop();
                }
            }
        }
        backtrack(0, []);
        return result;
    }
    console.log(partition("aab"));
    // [["a","a","b"],["aa","b"]]
    console.log(partition("racecar"));
}
// Note: LeetCode #131 — only branch on valid palindromes. Check if current substring is palindrome before exploring that path!

// Problem 10 — Letter Combinations of Phone Number

{
    function letterCombinations(digits) {
        if (!digits) return [];

        const phone = {
            '2': 'abc', '3': 'def', '4': 'ghi',
            '5': 'jkl', '6': 'mno', '7': 'pqrs',
            '8': 'tuv', '9': 'wxyz'
        };

        const result = [];

        function backtrack(index, current) {
            if (index === digits.length) {
                result.push(current);
                return;
            }
            for (let char of phone[digits[index]]) {
                backtrack(index + 1, current + char);
            }
            
        } 
        backtrack(0, "");
        return result;
    }
    console.log(letterCombinations("23"));
    // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
    console.log(letterCombinations(""));
}
// Note: LeetCode #17 — for each digit, try all corresponding letters. String concatenation instead of push/pop since strings are immutable!
