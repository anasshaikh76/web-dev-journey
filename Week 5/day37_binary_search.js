// Problem 1 — Classic Binary Search

{
    function binarySearch(arr, target) {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (arr[mid] === target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
    console.log(binarySearch([1,3,5,7,9,11,13], 7));  // 3
    console.log(binarySearch([1,3,5,7,9,11,13], 6));  // -1
    console.log(binarySearch([1,3,5,7,9,11,13], 13));
}
// Note: Three cases every binary search: found (return mid), too small (search right), too big (search left). Memorize this template — every binary search problem uses it!

// Problem 2 — Search Insert Position

{
    function searchInsert(nums, target) {
        let left = 0;
        let right = nums.length - 1;

        while(left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return left;
    }
     console.log(searchInsert([1,3,5,6], 5)); // 2
    console.log(searchInsert([1,3,5,6], 2)); // 1
    console.log(searchInsert([1,3,5,6], 7)); // 4
    console.log(searchInsert([1,3,5,6], 0));
}
// Note: LeetCode #35 — when target not found, left naturally lands at the correct insert position. This is a key binary search property!

// Problem 3 — First and Last Position

{
    function searchRange(nums, target) {
        return [
            findFirst(nums, target),
            findLast(nums, target)
        ];
    }

    function findFirst(nums, target) {
        let left = 0, right = nums.length - 1;
        let result = - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                result = mid;
                right = mid - 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }

    function findLast(nums, target) {
        let left = 0, right = nums.length - 1;
        let result = -1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (nums[mid] === target) {
                result = mid;
                left = mid + 1;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return result;
    }
    console.log(searchRange([5,7,7,8,8,10], 8)); // [3, 4]
    console.log(searchRange([5,7,7,8,8,10], 6));
}
// Note: LeetCode #34 — run binary search TWICE! Once biased left (keep going left when found), once biased right (keep going right when found)!

// Problem 4 — Search in Rotated Sorted Array

{
    function search(nums, target) {
        let left = 0;
        let right = nums.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] === target) return mid;

            if (nums[left] <= nums[mid]) {
                if (target >= nums[left] && target < nums[mid]) {
                    right  = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else {
                if (target > nums[mid] && target <= nums[right]) {
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }
        }
        return -1;
    }
    console.log(search([4,5,6,7,0,1,2], 0)); // 4
    console.log(search([4,5,6,7,0,1,2], 3)); 
}
// Note: LeetCode #33 — classic medium problem! Array is sorted but rotated (like [4,5,6,7,0,1,2]). Key insight: one half is always properly sorted — figure out which half, then decide where target is!

// Problem 5 — Find Minimum in Rotated Array

{
    function findMin(nums) {
        let left = 0; 
        let right = nums.length - 1;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
    console.log(findMin([3,4,5,1,2]));     // 1
    console.log(findMin([4,5,6,7,0,1,2])); // 0
    console.log(findMin([11,13,15,17]));
}
// Note: LeetCode #153 — compare mid with right to determine which side the minimum is on!

// Problem 6 — Sqrt(x) without Math.sqrt

{
    function mySqrt(x) {
        if (x < 2) return x;

        let left = 0;
        let right = Math.floor(x / 2);

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (mid * mid === x) return mid;
            else if (mid * mid < x) left = mid + 1;
            else right = mid - 1;
        }
        return right;
    }
    console.log(mySqrt(4));  // 2
    console.log(mySqrt(8));  // 2 (floor of 2.82...)
    console.log(mySqrt(16));
}
// Note: LeetCode #69 — binary search on the ANSWER instead of on an array! The answer is somewhere between 1 and x/2 — binary search finds it!

// Problem 7 — Count Negatives in Sorted Matrix

{
    function countNegatives(grid) {
        let count = 0;

        for (let row of grid) {
            let left = 0;
            let right = row.length - 1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);
                if (row[mid] < 0) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } count += row.length - left;
        }
        return count;
    }
    console.log(countNegatives([[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]));
}

// Problem 8 — Koko Eating Bananas

{
    function minEatingSpeed(piles, h) {
        let left = 1;
        let right = Math.max(...piles);

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            const hoursNeeded = piles.reduce((sum, pile) => {
                return sum + Math.ceil(pile/mid);
            }, 0);

            if (hoursNeeded <= h) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
    console.log(minEatingSpeed([3,6,7,11], 8)); // 4
    console.log(minEatingSpeed([30,11,23,4,20], 5));
}
// Note: LeetCode #875 — binary search on the ANSWER again! Instead of searching an array, we search for the best eating speed between 1 and max(piles)!

// Problem 9 — Peak Element

{
    function findPeakElement(nums) {
        let left = 0;
        let right = nums.length - 1;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (nums[mid] > nums[mid + 1]) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return left;
    }
     console.log(findPeakElement([1,2,3,1]));     // 2
    console.log(findPeakElement([1,2,1,3,5,6,4]));
}

// Problem 10 — Two Sum on Sorted Array (Binary Search version)

function twoSumSorted(numbers, target) {
    for (let i = 0; i < numbers.length; i++) {
        const complement = target - numbers[i];
        let left = i + 1;
        let right = numbers.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (numbers[mid] === complement) {
                return [i + 1, mid + 1];
            } else if (numbers[mid] < complement) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return [];
}

console.log(twoSumSorted([2,7,11,15], 9)); // [1, 2] ✅
console.log(twoSumSorted([2,3,4], 6));     // [1, 3] ✅