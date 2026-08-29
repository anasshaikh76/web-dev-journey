// Problem 1 — Jump Game

// Attempt first (10 mins):

// Can you reach the last index?
// Each element = max jump from that position.

// Input: [2,3,1,1,4] → true
// Input: [3,2,1,0,4] → false

{
    function canJump(nums) {
        let maxReach = 0;

        for(let i = 0; i < nums.length; i++) {
            if (i > maxReach) return false;
            maxReach = Math.max(maxReach, i + nums[i]);
        }
        return true;
    }

    console.log(canJump([2,3,1,1,4])); // true
    console.log(canJump([3,2,1,0,4])); // false
    console.log(canJump([0]));          // true
}
// Note: LeetCode #55 — track furthest reachable index. If current index exceeds maxReach, we're stuck!

// Problem 2 — Jump Game II (Minimum Jumps)

// Attempt first (10 mins):

// Minimum jumps to reach last index.

// Input: [2,3,1,1,4] → 2
// Input: [2,3,0,1,4] → 2

{
    function jump(nums) {
        let jumps = 0;
        let currentEnd = 0;
        let farthest = 0;

        for (let i = 0; i < nums.length - 1; i++) {
            farthest = Math.max(farthest, i + nums[i]);

            if (i === currentEnd) {
                jumps++;
                currentEnd = farthest;
            }
        }
        return jumps;
    }

    console.log(jump([2,3,1,1,4])); // 2
    console.log(jump([2,3,0,1,4])); // 2
}
// Note: LeetCode #45 — when we exhaust current jump range, we must jump. Track farthest reachable in each range!

// Problem 3 — Non-overlapping Intervals

// Attempt first (10 mins):

// Remove minimum intervals to make rest non-overlapping.

// Input: [[1,2],[2,3],[3,4],[1,3]] → 1 (remove [1,3])
// Input: [[1,2],[1,2],[1,2]]       → 2

{
    function eraseOverlapIntervals(intervals) {
        intervals.sort((a, b) => a[1] - b[1]);
        let count = 0;
        let prevEnd = -Infinity;

        for (let [start, end] of intervals) {
            if (start >= prevEnd) {
                prevEnd = end;
            } else {
                count++;
            }
        }
        return count;
    }

    console.log(eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1
    console.log(eraseOverlapIntervals([[1,2],[1,2],[1,2]]));       // 2
}
// Note: LeetCode #435 — sort by END time! Greedy: always keep interval that ends earliest (leaves most room for future intervals)!

// Problem 4 — Meeting Rooms II

// Attempt first (10 mins):

// Minimum meeting rooms needed.

// Input: [[0,30],[5,10],[15,20]] → 2
// Input: [[7,10],[2,4]]          → 1

{
    function minMeetingRooms(intervals) {
        const starts = intervals.map(i => i[0]).sort((a,b) => a-b);
        const ends   = intervals.map(i => i[1]).sort((a,b) => a-b);

        let rooms = 0, maxRooms = 0, endPtr = 0;

        for (let i = 0; i < starts.length; i++) {
            if (starts[i] < ends[endPtr]) {
                rooms++;
            } else {
                endPtr++;
            }
            maxRooms = Math.max(maxRooms, rooms);
        }
        return maxRooms;
    }

    console.log(minMeetingRooms([[0,30],[5,10],[15,20]])); // 2
    console.log(minMeetingRooms([[7,10],[2,4]]));           // 1
}
// Note: Sort starts and ends separately! If next meeting starts before earliest end → need new room. Otherwise reuse!

// Problem 5 — Task Scheduler

// Attempt first (10 mins):

// Minimum time to execute all tasks with cooldown n.
// Same task must wait n intervals.

// Input: tasks=["A","A","A","B","B","B"], n=2 → 8
// (A→B→idle→A→B→idle→A→B)

{
    function leastInterval(tasks, n) {
        const freq = new Array(26).fill(0);
        for (let task of tasks) {
            freq[task.charCodeAt(0) - 65]++;
        }
        freq.sort((a, b) =>b - a);
        const maxFreq = freq[0];
        const maxCount = freq.filter(f => f === maxFreq).length;

        return Math.max(tasks.length, (maxFreq-1)*(n+1)+maxCount);
    }

    console.log(leastInterval(["A","A","A","B","B","B"], 2)); // 8
    console.log(leastInterval(["A","A","A","B","B","B"], 0)); // 6
}
// Note: LeetCode #621 — most frequent task determines structure. Formula accounts for idle slots between most frequent task repetitions!

// Problem 6 — Gas Station

// Attempt first (10 mins):

// Can complete circular route? If yes return start index.

// Input: gas=[1,2,3,4,5], cost=[3,4,5,1,2] → 3
// Input: gas=[2,3,4], cost=[3,4,3]           → -1

{
    function canCompleteCircuit(gas, cost) {
        let totalGas = 0;
        let currentGas = 0;
        let startStation = 0;

        for (let i = 0; i < gas.length; i++) {
            const diff = gas[i] - cost[i];
            totalGas += diff;
            currentGas += diff;

            if (currentGas < 0) {
                startStation = i + 1;
                currentGas = 0;
            }
        }
        return totalGas >= 0 ? startStation : -1;
    }

    console.log(canCompleteCircuit([1,2,3,4,5],[3,4,5,1,2])); // 3
    console.log(canCompleteCircuit([2,3,4],[3,4,3]));           // -1
}
// Note: LeetCode #134 — if total gas ≥ total cost, solution exists. Start after the point where we run out of gas!

// Problem 7 — Hand of Straights

// Attempt first (10 mins):

// Can arrange hand into groups of consecutive cards?

// Input: hand=[1,2,3,6,2,3,4,7,8], groupSize=3 → true
// Groups: [1,2,3],[2,3,4],[6,7,8]

// Input: hand=[1,2,3,4,5], groupSize=4 → false

{
    function isNStraightHand(hand, groupSize) {
        if (hand.length % groupSize !== 0) return false;

        const count = new Map();
        for (let card of hand) {
            count.set(card, (count.get(card) || 0) + 1);
        }
        const sorted = [...count.keys()].sort((a, b) => a - b);

        for (let card of sorted) {
            const freq = count.get();
            if (freq > 0) {
                for (let i = 0; i < groupSize; i++) {
                    const curr = card + i;
                    if (count.get(curr) < freq) return false;
                    count.set(curr, count.get(curr) - freq);
                }
            }
        }
        return true;
    }

    console.log(isNStraightHand([1,2,3,6,2,3,4,7,8], 3)); // true
    console.log(isNStraightHand([1,2,3,4,5], 4));           // false
}