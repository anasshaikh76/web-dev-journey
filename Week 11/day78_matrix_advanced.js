// Problem 1 — Spiral Matrix

// Attempt first (10 mins):

// Return all elements in spiral order.

// Input: [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,3,6,9,8,7,4,5]

{
    function spiralOrder(matrix) {
        const result = [];
        let top = 0, bottom = matrix.length - 1;
        let left = 0, right = matrix[0].length - 1;

        while (top <= bottom && left <= right) {
            for (let c = left; c <= right; c++) result.push(matrix[top][c]);
            top++;

            for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
            right--;

            if (top <= bottom) {
                for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
                bottom--;
            }
            if (left <= right) {
                for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
                left++;
            }
        }
        return result;
    }

    console.log(spiralOrder([[1,2,3],[4,5,6],[7,8,9]]));
    // [1,2,3,6,9,8,7,4,5]
}
// Note: LeetCode #54 — 4 boundaries shrink after each direction! Check validity before left/up passes to avoid duplicates!

// Problem 2 — Spiral Matrix II (Generate)

// Attempt first (10 mins):

// Generate n×n matrix filled 1 to n² in spiral order.

// Input: n=3
// Output: [[1,2,3],[8,9,4],[7,6,5]]

{
    function generateMatrix(n) {
        const matrix = Array.from({length : n}, () => new Array(n).fill(0));
        let r = 0, c = 0;
        let dr = 0, dc = 1;

        for (let i = 1; i <= n * n; i++) {
            matrix[r][c] = i;

            const nr = r + dr, nc = c + dc;

            if (nr < 0 || nc < 0 || nr >= n || nc >= n || matrix[nr][nc] !== 0) {
                [dr, dc] = [dc, -dr];
            }

            r += dr;
            c += dc;
        }
        return matrix;
    }

    console.log(generateMatrix(3));
    // [[1,2,3],[8,9,4],[7,6,5]]
}
// Note: LeetCode #59 — direction vector approach! Rotate (dr,dc) → (dc,-dr) for clockwise turn when hitting boundary or filled cell!

// Problem 3 — Rotate Image (In-place 90°)

// Attempt first (10 mins):

// Rotate n×n matrix 90° clockwise IN-PLACE.

// Input:  [[1,2,3],[4,5,6],[7,8,9]]
// Output: [[7,4,1],[8,5,2],[9,6,3]]

{
    function rotate(matrix) {
        const n = matrix.length;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }

        for (let row of matrix) row.reverse();
    }

    const matrix = [[1,2,3],[4,5,6],[7,8,9]];
    rotate(matrix);
    console.log(matrix); // [[7,4,1],[8,5,2],[9,6,3]]
}
// Note: LeetCode #48 — Transpose (swap rows↔columns) then reverse each row = 90° clockwise rotation!

// Problem 4 — Set Matrix Zeroes

// Attempt first (10 mins):

// If element is 0, set entire row and column to 0.
// Do it in-place with O(1) extra space.

// Input: [[1,1,1],[1,0,1],[1,1,1]]
// Output: [[1,0,1],[0,0,0],[1,0,1]]

{
    function setZeroes(matrix) {
        const rows = matrix.length, cols = matrix[0].length;
        let firstRowHasZero = false, firstColHasZero = false;

        for (let c = 0; c < cols; c++) if (matrix[0][c] === 0) firstRowHasZero = true;
        for (let r = 0; r < rows; r++) if (matrix[r][0] === 0) firstColHasZero = true;

        for (let r = 1; r < rows; r++) {
            for (let c = 1; c < cols; c++) {
                if (matrix[r][c] === 0) {
                    matrix[r][0] = 0;
                    matrix[0][c] = 0;
                }
            }
        }

        for (let r = 1; r < rows; r++) {
            for (let c = 1; c < cols; c++) {
                if (matrix[r][0] === 0 || matrix[0][c] === 0) {
                    matrix[r][c] = 0;
                }
            }
        }

        if (firstRowHasZero) matrix[0].fill(0);
        if (firstColHasZero) for (let r = 0; r < rows; r++) matrix[r][0] = 0;
    }

    const matrix = [[1,1,1],[1,0,1],[1,1,1]];
    setZeroes(matrix);
    console.log(matrix); // [[1,0,1],[0,0,0],[1,0,1]]
}
// Note: LeetCode #73 — clever O(1) space trick! Use first row/column as markers instead of extra arrays!

// Problem 5 — Word Search II (Grid + Trie)

// Attempt first (10 mins):

// Find all words from list that exist in grid.

// board = [["o","a","a","n"],
//          ["e","t","a","e"],
//          ["i","h","k","r"],
//          ["i","f","l","v"]]
// words = ["oath","pea","eat","rain"]
// Output: ["eat","oath"]

{
    class TrieNode {
        constructor() { this.children = {}; this.word = null; }
    }

    function findWords(board, words) {
        const root = new TrieNode();
        for (let word of words) {
            let node = root;
            for (let char of word) {
                if (!node.children[char]) node.children[char] = new TrieNode();
                node = node.children[char];
            }
            node.word = word;
        }
        const result = new Set();
        const rows = board.length, cols = board[0].length;

        function dfs(r, c, node) {
            if (r < 0 || c < 0 || r >= rows || c >= cols) return;
            const char = board[r][c];
            if (char === '#' || !node.children[char]) return;

            const next = node.children[char];
            if (next.word) result.add(next.word);

            board[r][c] = '#';
            dfs(r+1,c,next); dfs(r-1,c,next);
            dfs(r,c+1,next); dfs(r,c-1,next);
            board[r][c] = char;
        }

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) dfs(r, c, root);
        }
        return [...result];
    }

    console.log(findWords([
        ['o','a','a','n'],['e','t','a','e'],
        ['i','h','k','r'],['i','f','l','v']
    ], ["oath","pea","eat","rain"]));
    // ["eat","oath"]
}
// Note: Combines your Day 65 Trie skills with Day 44 grid DFS! Build trie from words, then search grid following trie paths!

// Problem 6 — Diagonal Traverse

// Attempt first (10 mins):

// Return all elements in diagonal order (zigzag).

// Input: [[1,2,3],[4,5,6],[7,8,9]]
// Output: [1,2,4,7,5,3,6,8,9]

{
    function findDiagonalOrder(mat) {
        const rows = mat.length, cols = mat[0].length;
        const result = [];
        let r = 0, c = 0;
        let goingUp = true;

        while (result.length < rows * cols) {
            result.push(mat[r][c]);

            if (goingUp) {
                if (c === cols - 1) { r++; goingUp = false; }
                else if (r === 0){ c++; goingUp = false; }
                else {r--; c++; }
            } else {
                if (r === rows - 1) { c++; goingUp = true; }
                else if (c === 0) { r++; goingUp = true; }
                else {r++; c--; }
            }
        }
        return result;
    }

    console.log(findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]]));
    // [1,2,4,7,5,3,6,8,9]
}
// Note: LeetCode #498 — track direction (up-right or down-left) and handle boundary bounces carefully!

// Problem 7 — Valid Sudoku

// Attempt first (10 mins):

// Check if 9×9 Sudoku board is valid (partial fills OK).
// Each row, column, 3×3 box must have unique 1-9.

// Input: 9x9 grid with '.' for empty
// Output: true/false

{
    function isValidSudoku(board) {
        const rows = Array.from({length: 9}, () => new Set());
        const cols = Array.from({length: 9}, () => new Set());
        const boxes = Array.from({length: 9}, () => new Set());

        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < cols; c++) {
                let val = board[r][c];
                if (val === '.') continue;

                const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);

                if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {
                    return false;
                }

                rows[r].add(val);
                cols[c].add(val);
                boxes[boxIdx].add(val);
            }
        }
        return true;
    }

    const board = [
        ["5","3",".",".","7",".",".",".","."],
        ["6",".",".","1","9","5",".",".","."],
        [".","9","8",".",".",".",".","6","."],
        ["8",".",".",".","6",".",".",".","3"],
        ["4",".",".","8",".","3",".",".","1"],
        ["7",".",".",".","2",".",".",".","6"],
        [".","6",".",".",".",".","2","8","."],
        [".",".",".","4","1","9",".",".","5"],
        [".",".",".",".","8",".",".","7","9"]
    ];
    console.log(isValidSudoku(board)); // true
}