// Problem 1 — Median of Two Sorted Arrays

// Attempt first:

// Find median of two sorted arrays in O(log(m+n))

// Input: nums1=[1,3], nums2=[2]      → 2.0
// Input: nums1=[1,2], nums2=[3,4]    → 2.5

{
    function findMedianSortedArrays(nums1, nums2) {
        if (nums1.length > nums2.length) {
            return findMedianSortedArrays(nums2, nums1);
        }

        const m = nums1.length, n = nums2.length;
        let left = 0, right = m;

        while (left <= right) {
            const partX = Math.floor((left + right) / 2);
            const partY = Math.floor((m + n + 1) / 2) - partX;

            const maxLeftX = partX === 0 ? -Infinity : nums1[partX - 1];
            const minRightX = partX === m ? Infinity : nums1[partX];
            const maxLeftY = partY === 0 ? -Infinity : nums2[partY - 1];
            const minRightY = partY === n ? Infinity : nums2[partY];

            if (maxLeftX <= minRightY && maxLeftY <= minRightX) {
                if ((m + n) % 2 === 0) {
                    return (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2;
                }
                return Math.max(maxLeftX, maxLeftY);
            } else if (maxLeftX > minRightY) {
                right = partX - 1;
            } else {
                left = partX + 1;
            }
        }
    }

    console.log(findMedianSortedArrays([1, 3], [2]));    // 2.0
    console.log(findMedianSortedArrays([1, 2], [3, 4]));  // 2.5
}
// Pattern: Binary Search on partition! Find correct partition where left half ≤ right half in both arrays!

// Problem 2 — LRU Cache

// Attempt first:

// Design LRU Cache with get and put in O(1)

// LRUCache(2) → capacity 2
// put(1,1), put(2,2)
// get(1)      → 1
// put(3,3)    → evicts key 2
// get(2)      → -1 (evicted)

{
    class LRUCache {
        constructor(capacity) {
            this.capacity = capacity;
            this.cache = new Map();
        }
        get(key) {
            if (!this.cache.has(key)) return -1;

            const val = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, val);
            return val;
        }
        put(key, value) {
            if (this.cache.has(key)) {
                this.cache.delete(key);
            } else if (this.cache.size >= this.capacity) {
                const firstKey = this.cache.keys().next().value;
                this.cache.delete(firstKey);
            }
            this.cache.set(key, value);
        }
    }

    const lru = new LRUCache(2);
    lru.put(1, 1); lru.put(2, 2);
    console.log(lru.get(1));    // 1
    lru.put(3, 3);
    console.log(lru.get(2));    // -1 (evicted!)
    console.log(lru.get(3));    // 3
}
// Pattern: Hash Map + Order tracking! JavaScript Map preserves insertion order — first entry = LRU!

// Problem 3 — Alien Dictionary

// Attempt first:

// Given sorted words in alien language,
// find character order.

// Input: ["wrt","wrf","er","ett","rftt"]
// Output: "wertf"

{
    function alienOrder(words) {
        const adj = new Map();
        const inDegree = new Map();

        for (let word of words) {
            for (let char of word) {
                if (!adj.has(char)) adj.set(char, new Set());
                if (!inDegree.has(char)) inDegree.set(char, 0);
            }
        }
        for (let i = 0; i < words.length - 1; i++) {
            const w1 = words[i], w2 = words[i + 1];
            const minLen = Math.min(w1.length, w2.length);

            if (w1.length > w2.length && w1.startsWith(w2)) return "";

            for (let j = 0; j < minLen; j++) {
                if (w1[j] !== w2[j]) {
                    if (!adj.get(w1[j]).has(w2[j])) {
                        adj.get(w1[j]).add(w2[j]);
                        inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
                    }
                    break;
                }
            }
        }
        const queue = [];
        for (let [char, deg] of inDegree) {
            if (deg === 0) queue.push(char);
        }

        let result = "";
        while (queue.length > 0) {
            queue.sort();
            const char = queue.shift();
            result += char;
            for (let neighbor of adj.get(char)) {
                inDegree.set(neighbor, inDegree.get(neighbor)-1);
                if (inDegree.get(neighbor) === 0) queue.push(neighbor);
            }
        }

        return result.length === inDegree.size ? result : "";
    }

    console.log(alienOrder(["wrt","wrf","er","ett","rftt"]));
    // "wertf"
}
// Pattern: Graph building + Topological Sort!

// Problem 4 — Serialize and Deserialize Binary Tree

// Attempt first:

// Convert tree to string and back.

//     1
//    / \
//   2   3
//      / \
//     4   5

// Serialize: "1,2,null,null,3,4,null,null,5,null,null"
// Deserialize: rebuild original tree

{
    class TreeNode {
        constructor(val) {
            this.val =val;
            this.left = null;
            this.right = null;
        }
    }
    function serialize(root) {
        if (!root) return "null";
        return `${root.val},${serialize(root.left)},${serialize(root.right)}`;
    }
    function deserialize(data) {
        const nodes = data.split(",");
        let index = 0;

        function build() {
            if (nodes[index] === "null") {
                index++;
                return null;
            }
            const node = new TreeNode(Number(nodes[index++]));
            node.left = build();
            node.right = build();
            return node;
        }
        return build();
    }

    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(5);

    const serialized = serialize(root);
    console.log(serialized);

    const deserialized = deserialize(serialized);
    console.log(deserialized.val);            // 1
    console.log(deserialized.right.left.val); // 4
}
// Pattern: Tree DFS (Preorder) + Recursion!

// Problem 5 — Largest Rectangle in Histogram

// Attempt first:

// Find largest rectangle in histogram.

// Input: [2,1,5,6,2,3]  → 10
// Input: [2,4]           → 4

{
    function largestRectangleArea(heights) {
        const stack = [];
        let maxArea = 0;
        heights.push(0);

        for (i = 0; i < heights.length; i++) {
            while(stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
                const height = heights[stack.pop()];
                const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }

    console.log(largestRectangleArea([2,1,5,6,2,3])); // 10
    console.log(largestRectangleArea([2,4]));           // 4
}
// Pattern: Monotonic Stack! Keep increasing heights, pop when shorter bar found!

// Problem 6 — Minimum Window Substring

// Attempt first:

// Find minimum window in s containing all chars of t.

// Input: s="ADOBECODEBANC", t="ABC"  → "BANC"
// Input: s="a", t="a"               → "a"

{
    function minWindow(s, t) {
        if (!s || !t || s.length < t.length) return "";
        
        const need = new Map();
        for (let char of t) need.set(char, (need.get(char) ||0) + 1);
        
        let left = 0, matched = 0;
        let minlen = Infinity, minstart = 0;
        const window = new Map();

        for (let right = 0; right < s.length; right++) {
            const char = s[right];
            window.set(char, (window.get(char) || 0) + 1);

            if (need.has(char) && window.get(char) === need.get(char)) {
                matched++;
            }
            while (matched === need.size) {
                if (right - left + 1 < minlen) {
                    minlen = right - left + 1;
                    minstart = left;
                }
                const leftChar = s[left];
                window.set(leftChar, window.get(leftChar) - 1);
                if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                    matched--;
                }
                left++;
            }
        }
        return minlen === Infinity ? "" : s.slice(minstart, minstart + minlen);
    }

    console.log(minWindow("ADOBECODEBANC", "ABC")); // "BANC"
    console.log(minWindow("a", "a"));                // "a"
}

// Problem 7 — Trapping Rain Water II (3D)

// Attempt first:

// Given 2D elevation map, find total water trapped.

// Input: [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
// Output: 4

{
    function trapRainWater(heightMap) {
        if (!heightMap || heightMap.length < 3 || heightMap[0].length < 3) return 0;

        const rows = heightMap.length, cols = heightMap[0].length;
        const visited = Array.from({length : rows}, () => new Array(cols).fill(false));

        let pq = [];

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (r === 0 || c === 0 || r === rows - 1 || c === cols - 1) {
                    pq.push([heightMap[r][c], r, c]);
                    visited[r][c] = true;
                }
            }
        }
        const dirs = [[1,0],[-1,0],[0,1],[0,-1]];
        let water = 0;

        while (pq.length > 0) {
            pq.sort((a, b) => a[0] - b[0]);
            const [h, r, c] = pq.shift();

            for (let [dr, dc] of dirs) {
                const nr = r + dr, nc = c + dc;
                if (nr < 0 || nc < 0 || nr >= rows || nc >= cols || visited[nr][nc]) continue;

                visited[nr][nc] = true;
                water += Math.max(0, h - heightMap[nr][nc]);
                pq.push([Math.max(h, heightMap[nr][nc]), nr, nc]);
            }
        }
        return water;
    }

    console.log(trapRainWater([
        [1,4,3,1,3,2],
        [3,2,1,3,2,4],
        [2,3,3,2,3,1]
    ])); // 4
}