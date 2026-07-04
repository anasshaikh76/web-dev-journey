// Problem 1 — Bubble Sort

{
    function bubbleSort(arr) {
        n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                }
            }
        }
        return arr;
    }
    console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
}
// How it works: Repeatedly compares adjacent elements and swaps them if wrong order. Largest element "bubbles up" to the end each pass. Like bubble rising to surface!

// Problem 2 — Selection Sort

{
    function selectionSort(arr) {
        const n = arr.length;

        for (let i = 0; i < n; i++){
            let minIdx = i;

            for (let j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            if (minIdx !== i) {
                [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
            }
        }
        return arr;
    }
    console.log(selectionSort([64, 25, 12, 22, 11]));
}
// How it works: Find the minimum element, put it at the start. Then find next minimum, put it second. "Selects" the minimum each time!

// Problem 3 — Insertion Sort

{
    function insertionSort(arr) {
        for (let i = 1; i < arr.length; i++) {
            let current = arr[i];
            let j = i - 1;

            // Shift elements right until correct position found
            while (j >= 0 && arr[j] > current) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = current;
        }
        return arr;
    }

    console.log(insertionSort([12, 11, 13, 5, 6]));
    // [5, 6, 11, 12, 13]
}
// How it works: Like sorting playing cards in your hand — pick up each card and insert it in the correct position among already-sorted cards!

// Problem 4 — Merge Sort (Divide & Conquer)

{
    function mergeSort(arr) {
        if (arr.length <= 1) return arr;

        const mid = Math.floor(arr.length / 2);
        const left = mergeSort(arr.slice(0, mid));
        const right = mergeSort(arr.slice(mid));

        return merge(left, right);
    }
    function merge(left, right) {
        const result = [];
        let i = 0; j = 0;

        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i]); i++;
            } else {
                result.push(right[j]); j++;
            }
        }
        return [...result, ...left.slice(i), ...right.slice(j)];
    }
    console.log(mergeSort([38, 27, 43, 3, 9, 82, 10]));
}

// Problem 5 — Quick Sort

{
    function quickSort(arr, low = 0, high = arr.length - 1) {
        if (low < high) {
            const pivotIdx = partition(arr, low, high);
            quickSort(arr, low, pivotIdx - 1);
            quickSort(arr, pivotIdx + 1, high);
        }
        return arr;
    }
    function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for ( let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }
     console.log(quickSort([10, 7, 8, 9, 1, 5]));
}
// How it works: Pick a pivot element, put smaller elements left, larger elements right. Recursively sort both sides. Fastest in practice!

// Problem 6 — JavaScript's Built-in Sort (Deep Dive)

{
    console.log([10, 9, 2, 21, 3].sort());

    console.log([10, 9, 2, 21, 3].sort((a, b) => a - b));

    console.log([10, 9, 2, 21, 3].sort((a, b) => b - a));

    const students = [
        { name: "Anas", grade: 92 },
        { name: "Ahmed", grade: 78 },
        { name: "Sara", grade: 85 }
    ];
    students.sort((a, b) => b.grade - a.grade);
    console.log(students.map(s => s.name));
}
// Note: Always pass a comparator function to .sort() for numbers! This is the most common sorting mistake in JavaScript!

// Problem 7 — Sort Colors (Dutch National Flag)

{
    function sortColors(nums) {
        let low = 0;
        let mid = 0;
        let high = nums .length - 1;

        while ( mid <= high) {
            if (nums[mid] === 0) {
                [nums[low], nums[mid]] = [nums[mid], nums[low]];
                low++; mid++;
            } else if (nums[mid] === 1) {
                mid++;
            } else {
                [nums[mid], nums[high]] = [nums[high], nums[mid]];
                high--;
            }
        }
        return nums;
    }
    console.log(sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]
    console.log(sortColors([2, 0, 1])); 
}
// Note: LeetCode #75 — Three pointer approach! Low tracks 0s, high tracks 2s, mid scans through. This is O(n) — better than sorting!

// Problem 8 — Merge Intervals

{
    function merge(intervals) {
        if (intervals.length <= 1) return intervals;

        intervals.sort((a, b) => a[0] - b[0]);

        const result = [intervals[0]];

        for (let i = 0; i < intervals.length; i++) {
            const current = intervals[i];
            const lastmerged = result[result.length - 1];

            if (current[0] <= lastmerged[1]) {
                lastmerged[1] = Math.max(lastmerged[1], current[1]); 
            } else {
                result.push(current);
            }
        }
        return result;
    }
    console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
    // [[1,6],[8,10],[15,18]]
    console.log(merge([[1,4],[4,5]]));
}
// Note: LeetCode #56 — classic problem! Always sort first, then merge overlapping intervals. Sorting makes it possible to process intervals in order!

// Problem 9 — Largest Number

{
    function largestNumber(nums) {
        const result = nums
            .map(String)
            .sort((a, b) => (b + a) - (a + b))
            .join("");

        return result[0] === "0" ? "0" : result;
    }
    console.log(largestNumber([3, 30, 34, 5, 9])); // "9534330"
    console.log(largestNumber([10, 2]));
}
// Note: LeetCode #179 — brilliant custom comparator! Compare "ba" vs "ab" to decide which number goes first. "9" + "34" = "934" vs "34" + "9" = "349" — 934 > 349 so 9 goes first!

// Problem 10 — Meeting Rooms

{
    function canAttendMeetings(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);

        for (let i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                return false;
            }
        }
        return true;
    }
    console.log(canAttendMeetings([[0,30],[5,10],[15,20]])); // false
    console.log(canAttendMeetings([[7,10],[2,4]])); 
}