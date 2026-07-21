// Problem 1 — Min Heap Implementation

{
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        parent(i) { return Math.floor((i-1) / 2); }
        left(i)   { return 2 * i + 1; }
        right(i)  { return 2 * i + 2; }

        swap(i, j) {
            [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
        }

        push(val) {
            this.heap.push(val);
            this.bubbleUp(this.heap.length - 1);
        }

        bubbleUp(i) {
            while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
                this.swap(i, this.parent(i));
                i = this.parent(i);
            }
        }

        pop() {
            if (this.heap.length === 0) return null;
            if (this.heap.length === 1) return this.heap.pop();

            const min = this.heap[0];
            this.heap[0] = this.heap.pop(); // move last to root
            this.bubbleDown(0);
            return min;
        }

        bubbleDown(i) {
            let smallest = i;
            const left = this.left(i);
            const right = this.right(i);

            if (left < this.heap.length &&
                this.heap[left] < this.heap[smallest]) {
                smallest = left;
            }
            if (right < this.heap.length &&
                this.heap[right] < this.heap[smallest]) {
                smallest = right;
            }

            if (smallest !== i) {
                this.swap(i, smallest);
                this.bubbleDown(smallest);
            }
        }

        peek() { return this.heap[0]; }
        size() { return this.heap.length; }
    }

    const heap = new MinHeap();
    heap.push(5);
    heap.push(3);
    heap.push(8);
    heap.push(1);
    heap.push(4);

    console.log(heap.peek()); // 1 (minimum!)
    console.log(heap.pop());  // 1
    console.log(heap.pop());  // 3
    console.log(heap.pop());  // 4
}
// Note: bubbleUp after insert, bubbleDown after remove. Always maintain heap property!

// Problem 2 — Max Heap Implementation

{
    class MaxHeap {
        constructor() { this.heap = []; }

        parent(i) {return Math.floor((i - 1) / 2);}
        left(i) {return 2 * i + 1;}
        right(i){return 2 * i + 2;}
        swap(i, j){ [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }
        
        push(val) {
            this.heap.push(val);
            let i = this.heap.length - 1;
            while(i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
                this.swap(i, this.parent(i));
                i= this.parent(i);
            }
        }
        pop() {
            if (!this.heap.length) return null;
            if (this.heap.length === 1) return this.heap.pop();

            const max = this.heap[0];
            this.heap[0] = this.heap.pop();
            let i = 0;

            while (true) {
                let largest = i;
                const l = this.left(i), r = this.right(i);
                if (l < this.heap.length && this.heap[l] > this.heap[largest]) largest = l;
                if (r < this.heap.length && this.heap[r] > this.heap[largest]) largest = r;
                if (largest === i) break;
                this.swap(i, largest);
                i = largest;
            }
            return max;
        }
        peek() { return this.heap[0]; }
        size() { return this.heap.length; }
    }

    const heap = new MaxHeap();
    [3,1,7,2,9,4].forEach(n => heap.push(n));
    console.log(heap.pop()); // 9
    console.log(heap.pop()); // 7
    console.log(heap.pop()); // 4
}

// Problem 3 — Kth Largest Element

{
    function findKthLargest(nums, k) {
        const minHeap = [];

        for (let num of nums) {
            minHeap.push(num);
            minHeap.sort((a, b) => a - b);

            if (minHeap.length > k) {
                minHeap.shift();
            }
        }
        return minHeap[0];
    }

    console.log(findKthLargest([3,2,1,5,6,4], 2)); // 5
    console.log(findKthLargest([3,2,3,1,2,4,5,5,6], 4)); // 4
}
// Note: LeetCode #215 — Min Heap of size k keeps k largest elements. Root of min heap = kth largest!

// Problem 4 — Top K Frequent Elements with Heap

{
    function topKFrequent(nums, k) {
        const freq = new Map();
        for (let num of nums){
            freq.set(num, (freq.get(num) || 0) + 1);
        }

        return [...freq.entries()]
            .sort((a, b) => b[1] - a[1])
            .slice(0, k)
            .map(([num]) => num);
    }

    console.log(topKFrequent([1,1,1,2,2,3], 2)); // [1,2]
    console.log(topKFrequent([1], 1));             // [1]
}
// Note: LeetCode #347 — you solved this before with sorting! With a proper heap it's O(n log k) instead of O(n log n)!

// Problem 5 — Merge K Sorted Lists

{
    class Node {
        constructor(val) { this.val = val; this.next = null; }
    }
    function mergeKLists(lists) {
        const values = [];

        for (let list of lists) {
            let curr = list;
            while(curr) {
                values.push(curr.val);
                curr = curr.next;
            }
        }
        values.sort((a,b) => a - b);

        const dummy = new Node(0);
        let curr = dummy;
        for (let val of values) {
            curr.next = new Node(val);
            curr = curr.next;
        }
        return dummy.next;
    }

    const l1 = new Node(1); l1.next = new Node(4); l1.next.next = new Node(5);
    const l2 = new Node(1); l2.next = new Node(3); l2.next.next = new Node(4);
    const l3 = new Node(2); l3.next = new Node(6);

    let result = mergeKLists([l1, l2, l3]);
    while (result) {
        process.stdout.write(result.val + " → ");
        result = result.next;
    }
    console.log("null"); // 1→1→2→3→4→4→5→6→null
}
// Note: LeetCode #23 — with proper Min Heap this is O(n log k). Our approach O(n log n) but works correctly!

// Problem 6 — Find Median from Data Stream

{
    class MedianFinder {
        constructor() {
            this.lowerHalf = []; // max heap (simulated)
            this.upperHalf = []; // min heap (simulated)
        }
        addNum(num) {
            this.lowerHalf.push(num);
            this.lowerHalf.sort((a, b) => b - a);

            if (this.upperHalf.length > 0 && this.lowerHalf[0] > this.upperHalf[0]) {
                this.upperHalf.push(this.lowerHalf.shift());
                this.upperHalf.sort((a, b) => a - b);
            }
            if (this.lowerHalf.length > this.upperHalf.length + 1) {
                this.upperHalf.push(this.lowerHalf.shift());
                this.upperHalf.sort((a, b) => a - b);
            } else if (this.upperHalf.length > this.lowerHalf.length) {
                this.lowerHalf.push(this.upperHalf.shift());
                this.lowerHalf.sort((a, b) => b - a);
            }
        }
        findMedian() {
            if (this.lowerHalf.length > this.upperHalf.length) {
                return this.lowerHalf[0];
            }
            return (this.lowerHalf[0] + this.upperHalf[0]) / 2;
        }
    }

     const mf = new MedianFinder();
    mf.addNum(1);
    mf.addNum(2);
    console.log(mf.findMedian()); // 1.5
    mf.addNum(3);
    console.log(mf.findMedian()); // 2
}
// Note: LeetCode #295 — two heaps trick! Lower half in max heap, upper half in min heap. Median = top of one or average of both tops!

// Problem 7 — Task Scheduler

{
    function leastInterval(tasks, n) {
        const freq = new Array(26).fill(0);
        for (let task of tasks) {
            freq[task.charCodeAt(0) - 65]++;
        }
        freq.sort((a, b) => b - a);
        const maxFreq = freq[0];
        const maxCount = freq.filter(f => f === maxFreq).length;

        return Math.max(
            tasks.length,
            (maxFreq - 1) * (n + 1) + maxCount
        );
    }

    console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
    console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6
}
// Note: LeetCode #621 — Greedy with heap thinking! Most frequent task determines minimum intervals needed. Formula accounts for idle slots!

// Problem 8 — K Closest Points to Origin

{
    function kClosest(points, k) {
        return points
            .map(([x, y]) => [x*x + y*y, x, y])
            .sort((a, b) => a[0] - b[0])
            .slice(0, k)
            .map(([_, x, y]) => [x, y]);
    }

    console.log(kClosest([[1,3],[-2,2]], 1));
    // [[-2,2]]
    console.log(kClosest([[3,3],[5,-1],[-2,4]], 2));
}
// Note: LeetCode #973 — use distance² (no need for Math.sqrt, avoids floating point). With proper Max Heap of size k this is O(n log k)!

// Problem 9 — Reorganize String

{
    function reorganizeString(s) {
        const freq = new Map();
        for (let char of s) {
            freq.set(char, (freq.get(char) || 0) + 1);
        }
        const entries = [...freq.entries()].sort((a, b) => b[1] - a[1]);

        if (entries[0][1] > Math.ceil(s.length / 2)) return "";

        const result = new Array(s.length);
        let idx = 0;
        
        for (let [char,count] of entries) {
            for (let i = 0; i < count; i++) {
                if (idx >= s.length) idx = 1;
                result[idx] = char;
                idx += 2;
            }
        }
        return result.join("");
    }

    console.log(reorganizeString("aab"));  // "aba"
    console.log(reorganizeString("aaab")); // "" (impossible)
    console.log(reorganizeString("aabb")); // "abab"
}
// Note: LeetCode #767 — place most frequent characters at even indices first, then odd indices. Greedy with heap thinking!

// Problem 10 — Sliding Window Maximum

{
    function maxSlidingWindow(nums, k) {
        const result = [];
        const deque = [];

        for (let i = 0; i < nums.length; i++) {
            while(deque.length && deque[0] < i - k + 1) {
                deque.shift();
            }

            while (deque.length && nums[deque[deque.length-1]] < nums[i]) {
                deque.pop();
            }
            deque.push(i);

            if (i >= k - 1) {
                result.push(nums[deque[0]]);
            }
        }
        return result;
    }

    console.log(maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
    // [3,3,5,5,6,7]
    console.log(maxSlidingWindow([1], 1));
    // [1]
}
// Note: LeetCode #239 — Monotonic Deque (double-ended queue)! Keeps potential maximums in decreasing order. Front is always the maximum of current window!