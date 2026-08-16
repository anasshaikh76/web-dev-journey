// Problem 1 — Segment Tree Implementation

{
    class SegmentTree {
        constructor(nums) {
            this.n = nums.length;
            this.tree = new Array(4 * this.n).fill(0);
            this.build(nums, 0, 0, this.n - 1);
        }
        build(nums, node, start, end) {
            if (start === end) {
                this.tree[node] = nums[start];
                return;
            }
            const mid = Math.floor((start + end) / 2);
            this.build(nums, 2 * node + 1, start, mid);
            this.build(nums, 2 * node + 2, mid + 1, end);
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
        update(node, start, end, idx, val) {
            if (start === end) {
                this.tree[node] = val;
                return;
            }
            const mid = Math.floor((start + end) / 2);
            if (idx <= mid) {
                this.update(2 * node + 1, start, mid, idx, val);
            } else {
                this.update(2 * node + 2, mid + 1, end, idx, val);
            }
            this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
        }
        query(node, start, end, l, r) {
            if (r < start || end < l) return 0;
            if (l <= start && end <= r) return this.tree[node];

            const mid = Math.floor((start + end) / 2);
            return this.query(2 * node + 1, start , mid, l, r) + this.query(2 * node + 2, mid +1, end, l, r);
        }
        updateVal(idx, val) { this.update(0, 0, this.n - 1, idx, val); }
        rangeSum(l, r) { return this.query(0, 0, this.n - 1, l , r); }
    }

    const st = new SegmentTree([1,3,5,7,9,11]);
    console.log(st.rangeSum(0, 2)); // 9  (1+3+5)
    console.log(st.rangeSum(2, 5)); // 32 (5+7+9+11)
    st.updateVal(1, 10);            // change index 1 from 3 to 10
    console.log(st.rangeSum(0, 2)); // 16 (1+10+5)
}
// Note: LeetCode #307! Three operations: build O(n), update O(log n), query O(log n). Parent = sum of children!

// Problem 2 — Range Sum Query Mutable

{
    class NumArray {
        constructor(nums) {
            this.n = nums.length;
            this.tree = new Array(2 * this.n).fill(0);

            for (let i = 0; i < this.n; i++) {
                this.tree[this.n + i] = nums[i];
            }
            for (let i = this.n - 1; i > 0; i--) {
                this.tree[i] = this.tree[2 * i] + this.tree[2 * i + 1];
            }
        }
        update(index, val) {
            index += this.n;
            this.tree[index] = val;
            while (index > 1) {
                index = Math.floor(index / 2);
                this.tree[index] = this.tree[2 * index] + this.tree[2 * index + 1];
            }
        }
        sumRange(left, right) {
            left  += this.n;
            right += this.n + 1;
            let sum = 0;
            while (left < right) {
                if (left & 1) sum += this.tree[left++];
                if (right & 1) sum += this.tree[--right];
                left >>= 1;
                right >>= 1;
            }
            return sum;
        }
    }

    const na = new NumArray([1,3,5,7,9,11]);
    console.log(na.sumRange(0, 2)); // 9
    na.update(1, 10);
    console.log(na.sumRange(0, 2)); // 16
}
// Note: LeetCode #307 — iterative segment tree! Leaves at indices n to 2n-1, parents at 1 to n-1. Cleaner than recursive!

// Problem 3 — Range Minimum Query

{
    class RMQ {
        constructor(nums) {
            this.n = nums.length;
            this.tree = new Array(4 * this.n).fill(Infinity);
            this.build(nums, 0, 0, this.n - 1);
        }
        build(nums, node, start, end) {
            if (start === end) {
                this.tree[node] = nums[start];
                return;
            }
            const mid = Math.floor((start + end) / 2);
            this.build(nums, 2 * node + 1, start, mid);
            this.build(nums, 2 * node + 2, mid + 1, end);
            this.tree[node] = Math.min(
                this.tree[2 * node + 1],
                this.tree[2 * node + 2]
            );
        }
        query(node, start, end, l, r) {
            if (r < start || end < l) return Infinity;
            if (l <= start && end <= r) return this.tree[node];

            const mid = Math.floor((start + end) / 2);
            return Math.min(
                this.query(2 * node + 1, start, mid, l, r),
                this.query(2 * node + 2, mid + 1, end, l, r)
            );
        }
        rangeMin(l, r) { return this.query(0, 0, this.n - 1, l, r); }
    }

    const rmq = new RMQ([1,3,2,7,9,5,4,8]);
    console.log(rmq.rangeMin(0, 3)); // 1
    console.log(rmq.rangeMin(2, 6)); // 2
    console.log(rmq.rangeMin(4, 7)); // 4
}
// Note: Same structure as sum tree but use Math.min instead of + ! Works for max too — just use Math.max!

// Problem 4 — Binary Indexed Tree (Fenwick Tree)

{
    class BIT {
        constructor(n) {
            this.n = n;
            this.tree = new Array(n + 1).fill(0);
        }
        update(i, delta) {
            i++;
            while (i <= this.n){
                this.tree[i] += delta;
                i += i & (-i);
            }
        }
        query(i) {
            i++;
            let sum = 0;
            while (i > 0) {
                sum += this.tree[i];
                i -= i & (-i);
            }
            return sum;
        }
        rangeSum(l, r) {
            return this.query(r) - (l > 0 ? this.query(l - 1) : 0);
        }
    }

    const bit = new BIT(6);
    [1,3,5,7,9,11].forEach((val, i) => bit.update(i, val));

    console.log(bit.rangeSum(0, 2)); // 9  (1+3+5)
    console.log(bit.rangeSum(2, 5)); // 32 (5+7+9+11)
    bit.update(1, 7);                // add 7 to index 1 (now 10)
    console.log(bit.rangeSum(0, 2)); // 16 (1+10+5)
}
// Note: Fenwick Tree = simpler alternative to Segment Tree for SUM queries only! Uses bit manipulation to traverse. O(log n) for both update and query!

// Problem 5 — Count of Smaller Numbers After Self

{
    function countSmaller(nums) {
        const sorted = [...new Set(nums)].sort((a, b) => a-b);
        const rank = new Map();
        sorted.forEach((val, i) => rank.set(val, i + 1));

        const n = nums.length;
        const bit = new Array(n + 1).fill(0);
        const result = [];

        function update(i) {
            while (i <= n) { bit[i]++; i += i & (-i); }
        }

        function query(i) {
            let sum = 0;
            while (i > 0) { sum += bit[i]; i -= i & (-i); }
            return sum;
        }

        for (let i = nums.length - 1; i >= 0; i--) {
            const r = rank.get(nums[i]);
            result.unshift(query(r - 1));
            update(r);
        }
        return result;
    }

    console.log(countSmaller([5,2,6,1])); // [2,1,1,0]
    console.log(countSmaller([2,0,1]));    // [2,0,0] wait...
    // Actually: [2,1,1,0] means:
    // 5 has 2 smaller after it (2,1)
    // 2 has 1 smaller after it (1)
    // 6 has 1 smaller after it (1)
    // 1 has 0 smaller after it
}
// Note: LeetCode #315 — Hard! BIT to count smaller elements. Process right to left, query counts how many smaller already inserted, then insert current!

// Problem 6 — Range Sum Query 2D Mutable

{
    class NumMatrix {
        constructor(matrix) {
            this.m = matrix.length;
            this.n = matrix[0].length;
            this.tree = Array.from({length : this.m + 1}, () => new Array(this.n + 1).fill(0));
            this.nums = Array.from({length : this.m}, () => new Array(this.n).fill(0));

            for (let i = 0; i < this.m; i++) {
                for (let j = 0; j < this.n; j++) {
                    this.update(i, j, matrix[i][j]);
                }
            }
        }
        update(row, col, val) {
            const delta = val - this.nums[row][col];
            this.nums[row][col] = val;

            for (let i = row + 1; i <= this.m; i += i & (-i)) {
                for (let j = col + 1; j <= this.n; j += j & (j)) {
                    this.tree[i][j] += delta;
                }
            }
        }
        query(row, col) {
            let sum = 0;
            for (let i = row + 1; i > 0; i -= i & (-i)) {
                for (let j = col + 1; j > 0; j -= j & (-j)) {
                    sum += this.tree[i][j];
                }
            }
            return sum;
        }

        sumRegion(r1, c1, r2, c2) {
            return this.query(r2, c2)
                 - this.query(r1-1, c2)
                 - this.query(r2, c1-1)
                 + this.query(r1-1, c1-1);
        }
    }

    const nm = new NumMatrix([
        [3,0,1,4],
        [5,6,3,2],
        [1,2,0,1]
    ]);
    console.log(nm.sumRegion(1, 1, 2, 2)); // 11
    nm.update(1, 1, 10);
    console.log(nm.sumRegion(1, 1, 2, 2)); // 15
}
// Note: LeetCode #308 — 2D BIT! Same inclusion-exclusion as 2D prefix sum but supports updates!

// Problem 7 — My Calendar I & II

{
    class MyCalendar {
        constructor() { this.calender = [];}

        book(start, end) {
            for (let [s, e] of this.calender) {
                if (start < e && end > s) return false;
            }
            this.calender.push([start, end]);
            return true;
        }
    }

    const cal = new MyCalendar();
    console.log(cal.book(10, 20)); // true
    console.log(cal.book(15, 25)); // false (overlaps!)
    console.log(cal.book(20, 30)); // true

    class MyCalendarTwo {
        constructor() {
            this.single = [];
            this.double = []; 
        }

        book (start, end) {
            for (let [s, e] of this.double) {
                if (start < e && end > s) return false;
            }

            for (let [s, e] of this.single) {
                const overlapStart = Math.max(start, s);
                const overlapEnd = Math.min(end, e);
                if (overlapStart < overlapEnd) {
                    this.double.push([overlapStart, overlapEnd]);
                }
            }
            this.single.push([start, end]);
            return true;
        }
    }

    const cal2 = new MyCalendarTwo();
    console.log(cal2.book(10, 20)); // true
    console.log(cal2.book(50, 60)); // true
    console.log(cal2.book(10, 40)); // true (double booking OK)
    console.log(cal2.book(5, 15));  // false (would be triple!)
}