// Problem 1 — Merge Intervals

// Attempt first (10 mins):

// Merge all overlapping intervals.

// Input: [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]
// Input: [[1,4],[4,5]]               → [[1,5]]

{
    function merge(intervals) {
        intervals.sort((a, b) => a[0] - b[0]);
        const result = [intervals[0]];

        for (let i = 1; i < intervals.length; i++) {
            const current = intervals[i];
            const last = result[result.length -1];

            if (current[0] <= last[1]) {
                last[1] = Math.max(last[1], current[1]);
            } else {
                result.push(current);
            }
        }
        return result;
    }

    console.log(merge([[1,3],[2,6],[8,10],[15,18]]));
    // [[1,6],[8,10],[15,18]]
    console.log(merge([[1,4],[4,5]]));
    // [[1,5]]
}
// Note: LeetCode #56 — sort by start, then greedily merge! If current start ≤ last end → overlap → extend end!

// Problem 2 — Insert Interval

// Attempt first (10 mins):

// Insert new interval into sorted non-overlapping list.

// Input: intervals=[[1,3],[6,9]], newInterval=[2,5]
// Output: [[1,5],[6,9]]

// Input: intervals=[[1,2],[3,5],[6,7],[8,10]], newInterval=[4,8]
// Output: [[1,2],[3,10]]

{
    function insert(intervals, newInterval) {
        const result = [];
        let i = 0;
        const n = intervals.length;

        while (i < n && intervals[i][1] < newInterval[0]) {
            result.push(intervals[i]);
            i++;
        }
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.push(newInterval);

        while (i < n) {
            result.push(intervals[i]);
            i++;
        }
        return result;
    }

    console.log(insert([[1,3],[6,9]], [2,5]));
    // [[1,5],[6,9]]
    console.log(insert([[1,2],[3,5],[6,7],[8,10]], [4,8]));
    // [[1,2],[3,10]]
}
// Note: LeetCode #57 — 3 phases: add intervals before, merge overlapping, add intervals after. No sorting needed since already sorted!

// Problem 3 — Minimum Number of Arrows to Burst Balloons

// Attempt first (10 mins):

// Minimum arrows to burst all balloons.
// Arrow at x bursts balloon if start ≤ x ≤ end.

// Input: [[10,16],[2,8],[1,6],[7,12]] → 2
// Input: [[1,2],[3,4],[5,6],[7,8]]    → 4

{
    function findMinArrowShots(points) {
        points.sort((a, b) => a[1] - b[1]);
        let arrows = 1;
        let prevEnd = points[0][1];

        for (let i = 1; i < points.length; i++) {
            if (points[i][0] > prevEnd) {
                arrows++;
                prevEnd = points[i][1];
            }
        }
        return arrows;
    }

    console.log(findMinArrowShots([[10,16],[2,8],[1,6],[7,12]])); // 2
    console.log(findMinArrowShots([[1,2],[3,4],[5,6],[7,8]]));    // 4
}
// Note: LeetCode #452 — sort by END time! Greedy: one arrow at the end of current balloon bursts all overlapping ones. New arrow only when balloon starts AFTER previous end!

// Problem 4 — Remove Covered Intervals

// Attempt first (10 mins):

// Count intervals NOT covered by another interval.
// [a,b] covers [c,d] if a≤c and d≤b.

// Input: [[1,4],[3,6],[2,8]] → 2
// ([2,8] covers [1,4] and [3,6] → only [2,8] remains? No...)
// Actually: [1,4] is covered by [2,8]? No: 2>1
// [3,6] covered by [2,8]? 2≤3 and 6≤8 YES!
// So remaining: [1,4] and [2,8] → 2

{
    function removeCoveredIntervals(intervals) {
        intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

        let count = 0;
        let maxEnd = 0;

        for (let [start, end] of intervals) {
            if (end > maxEnd) {
                count++;
                maxEnd = end;
            }
        }
        return count;
    }

    console.log(removeCoveredIntervals([[1,4],[3,6],[2,8]])); // 2
    console.log(removeCoveredIntervals([[1,2],[1,4],[3,4]])); // 1
}
// Note: LeetCode #1288 — sort by start ASC, end DESC. Track max end seen. If current end ≤ maxEnd, it's covered!

// Problem 5 — Interval List Intersections

// Attempt first (10 mins):

// Find intersections of two interval lists.

// Input: A=[[0,2],[5,10],[13,23],[24,25]]
//        B=[[1,5],[8,12],[15,24],[25,26]]
// Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

{
    function intervalIntersection(firstList, secondList) {
        const result = [];
        let i = 0, j = 0;

        while (i < firstList.length && j < secondList.length) {
            const start = Math.max(firstList[i][0], secondList[j][0]);
            const end = Math.min(firstList[i][1], secondList[j][1]);

            if (start <= end) {
                result.push([start, end]);
            }
            if (firstList[i][1] < secondList[j][1]) {
                i++;
            } else {
                j++;
            }
        }
        return result;
    }

    console.log(intervalIntersection(
        [[0,2],[5,10],[13,23],[24,25]],
        [[1,5],[8,12],[15,24],[25,26]]
    ));
    // [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
}
// Note: LeetCode #986 — two pointers on two lists! Intersection = [max(starts), min(ends)]. Valid if start ≤ end. Move pointer for whichever interval ends first!

// Problem 6 — Meeting Rooms III

// Attempt first (10 mins):

// n rooms (0 to n-1). Meetings assigned to lowest
// available room. Find room that held most meetings.

// Input: n=2, meetings=[[0,10],[1,5],[2,7],[3,4]] → 0
// Input: n=3, meetings=[[1,20],[2,10],[3,5],[4,9],[6,8]] → 1

{
    function mostBooked(n, meetings) {
        meetings.sort((a, b) => a[0] - b[0]);

        const roomCount = new Array(n).fill(0);
        const roomEnd = new Array(n).fill(0);

        for (let [start, end] of meetings) {
            let assigned = false;

            let minEndTime = Infinity;
            let minRoom = 0;

            for (let room = 0; room < n; room++) {
                if (roomEnd[room] <= start) {
                    roomEnd[room] = end;
                    roomCount[room]++;
                    assigned = true;
                    break;
                }
                if (roomEnd[room] < minEndTime) {
                    minEndTime = roomEnd[room];
                    minRoom = room;
                }
            }
            if (!assigned) {
                const duration = end - start;
                roomEnd[minRoom] = minEndTime + duration;
                roomCount[minRoom]++;
            }
        }

        let maxCount = 0, result = 0;
        for (let room = 0; room < n; room++) {
            if (roomCount[room] > maxCount) {
                maxCount = roomCount[room];
                result = room;
            }
        }
        return result;
    }

    console.log(mostBooked(2, [[0,10],[1,5],[2,7],[3,4]]));       // 0
    console.log(mostBooked(3, [[1,20],[2,10],[3,5],[4,9],[6,8]])); // 1
}
// Note: LeetCode #2402 — Hard! Sort meetings by start, assign to lowest available room, delay if all busy!

// Problem 7 — Divide Intervals Into Minimum Groups

// Attempt first (10 mins):

// Minimum groups so no two intervals in same group overlap.

// Input: [[5,10],[6,8],[1,5],[2,3],[1,10]] → 3
// Input: [[1,3],[5,7],[8,10]]              → 1

{
    function minGroups(intervals) {
        const starts = intervals.map(i => i[0]).sort((a, b) => a- b);
        const ends = intervals.map(i => i[1]).sort((a, b) => a- b);

        let groups = 0, maxGroup = 0;
        let endPtr = 0;

        for (let i = 0; i < starts.length; i++) {
            if (starts[i] <= ends[endPtr]) {
                groups++;
            } else {
                endPtr++;
            }
            maxGroup = Math.max(maxGroup, groups);
        }
        return maxGroup;
    }

    console.log(minGroups([[5,10],[6,8],[1,5],[2,3],[1,10]])); // 3
    console.log(minGroups([[1,3],[5,7],[8,10]]));               // 1
}