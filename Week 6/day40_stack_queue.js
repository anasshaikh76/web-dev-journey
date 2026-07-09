// Problem 1 — Stack Implementation

{
    class Stack {
        constructor() {
            this.items = [];
        }

        push(item) {
            this.items.push(item);
        }

        pop() {
            if(this.isEmpty()) return "Stack is empty";
            return this.items.pop();
        }

        peek() {
            return this.items[this.items.length - 1];
        }

        isEmpty() {
            return this.items.length === 0;
        }

        size() {
            return this.items.length;
        }
    }

    const stack = new Stack();
    stack.push(1);
    stack.push(2);
    stack.push(3);
    console.log(stack.peek());
    console.log(stack.pop());
    console.log(stack.pop());
    console.log(stack.size());
}
// Note: Stack is just an array with restricted access — only add/remove from the TOP!

// Problem 2 — Queue Implementation

{
    class Queue {
        constructor() {
            this.items = [];
        }

        enqueue(item) {
            this.items.push(item);
        }

        dequeue() {
            if (this.isEmpty()) return "Queue is empty";
            return this.items.shift();
        }

        front() {
            return this.items[0];
        }

        isEmpty() {
            return this.items.length === 0;
        }

        size() {
            return this.items.length;
        }
    }

    const queue = new Queue();
    queue.enqueue("Anas");
    queue.enqueue("Ahmed");
    queue.enqueue("Sara");
    console.log(queue.front());
    console.log(queue.dequeue());
    console.log(queue.dequeue());
    console.log(queue.size());
}

// Problem 3 — Valid Parentheses (Stack classic)

{
    function isValid(s) {
        const stack = [];
        const pairs = {
            ')': '(',
            '}': '{',
            ']': '['
        };

        for (let char of s) {
            if ('({['.includes(char)) {
                stack.push(char);
            } else {
                if (stack.pop() !== pairs[char]) {
                    return false;
                }
            }
        }
        return stack.length === 0;
    }

    console.log(isValid("(){}[]"));  // true
    console.log(isValid("([{}])"));  // true
    console.log(isValid("(]"));      // false
    console.log(isValid("([)]")); 
}
// Note: LeetCode #20 — you saw this in Day 34! Now you know WHY it uses a stack — matching pairs need LIFO behavior!

// Problem 4 — Min Stack

{
    class MinStack {
        constructor() {
            this.stack = [];
            this.minStack = [];
        }

        push(val) {
            this.stack.push(val);
            const min = this.minStack.length === 0
                ? val
                : Math.min(val, this.getMin());
            this.minStack.push(min);
        }

        pop() {
            this.stack.pop();
            this.minStack.pop();
        }

        top() {
            return this.stack[this.stack.length - 1];
        }

        getMin() {
            return this.minStack[this.minStack.length - 1];
        }
    }

    const minStack = new MinStack();
    minStack.push(5);
    minStack.push(3);
    minStack.push(7);
    minStack.push(1);
    console.log(minStack.getMin()); // 1
    minStack.pop();
    console.log(minStack.getMin()); // 3
    minStack.pop();
    console.log(minStack.getMin()); // 3
}
// Note: LeetCode #155 — trick is maintaining a SECOND stack that tracks the minimum at each state. When you pop the main stack, pop the min stack too!

// Problem 5 — Daily Temperatures

{
    function dailyTemperatures(temperatures) {
        const result = new Array(temperatures.length).fill(0);
        const stack = [];

        for (let i = 0; i < temperatures.length; i++) {
            while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
                const idx = stack.pop();
                result[idx] = i - idx;
            }
            stack.push(i);
        }
        return result;
    }
    console.log(dailyTemperatures([73,74,75,71,69,72,76,73]));
}
// Note: LeetCode #739 — Monotonic Stack pattern! Stack stores indices of temperatures waiting for a warmer day. When we find a warmer day, pop all indices that are resolved!

// Problem 6 — Evaluate Reverse Polish Notation

{
    function evalRPN(tokens) {
        const stack = [];
        const operators = new Set(['+', '-', '*', '/']);

        for (let token of tokens) {
            if (operators.has(token)) {
                const b = stack.pop();
                const a = stack.pop();

                if (token === '+') stack.push(a + b);
                else if (token === '-') stack.push(a - b);
                else if (token === '*') stack.push(a * b);
                else stack.push(Math.trunc(a / b));
            } else {
                stack.push(Number(token));
            }
        }
        return stack[0];
    }
    console.log(evalRPN(["2","1","+","3","*"])); // 9  ((2+1)*3)
    console.log(evalRPN(["4","13","5","/","+"])); // 6 (4+(13/5))
}
// Note: LeetCode #150 — numbers go on the stack, operators pop two numbers, calculate, push result back. Stack is perfect for this!

// Problem 7 — Decode String

{
    function decodeString(s) {
        const stack = [];
        let currentStr = "";
        let currentNum = 0;

        for (let char of s) {
            if (!isNaN(char)) {
                currentNum = currentNum * 10 + Number(char);
            } else if (char === '[') {
                stack.push([currentStr, currentNum]);
                currentStr = "";
                currentNum = 0;
            } else if (char === ']') {
                const [prevStr, num] = stack.pop();
                currentStr = prevStr + currentStr.repeat(num);
            } else {
                currentStr += char;
            }
        }
        return currentStr;
    }

    console.log(decodeString("3[a]2[bc]"));    // "aaabcbc"
    console.log(decodeString("3[a2[c]]"));
}
// Note: LeetCode #394 — when we hit [, save current state to stack. When we hit ], pop state and repeat the string!

// Problem 8 — Queue Using Two Stacks

{
    class MyQueue {
        constructor() {
            this.stack1 = [];
            this.stack2 = [];
        }

        push(x) {
            this.stack1.push(x);
        }

        pop() {
            this.move();
            return this.stack2.pop();
        }

        peek() {
            this.move();
            return this.stack2[this.stack2.length - 1];
        }

        move() {
            if (this.stack2.length === 0) {
                while (this.stack1.length > 0) {
                    this.stack2.push(this.stack1.pop());
                }
            }
        }

        empty() {
            return this.stack1.length === 0 && this.stack2.length === 0;
        }
    }

    const q = new MyQueue();
    q.push(1); q.push(2); q.push(3);
    console.log(q.pop());  // 1 (FIFO!)
    console.log(q.peek()); // 2
}
// Note: LeetCode #232 — clever trick! Reversing a stack twice gives you queue order. Stack2 is the "reversed" version of stack1!

// Problem 9 — Next Greater Element

{
    function nextGreaterElement(nums1, nums2) {
        const map = new Map();
        const stack = [];

        for (let num of nums2) {
            while (stack.length > 0 && num > stack[stack.length - 1]) {
                map.set(stack.pop(), num);
            }
            stack.push(num);
        }

        while (stack.length > 0) {
            map.set(stack.pop(), - 1);
        }

        return nums1.map(n => map.get(n));
    }

    console.log(nextGreaterElement([4,1,2], [1,3,4,2]));
    // [-1,3,-1]
    console.log(nextGreaterElement([2,4], [1,2,3,4]));
    // [3,-1]
}
// Note: LeetCode #496 — Monotonic Stack + Hash Map combined!

// Problem 10 — Largest Rectangle in Histogram

{
    function largestRectangle(heights) {
        const stack = [];
        let maxArea = 0;
        heights.push(0);

        for (let i = 0; i < heights.length; i++) {
            while (stack.length > 0 && heights[i] < heights[stack[stack.length - 1]]) {
                const height = heights[stack.pop()];
                const width = stack.length === 0
                    ? i
                    : i - stack[stack.length - 1] - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }

    console.log(largestRectangle([2,1,5,6,2,3])); // 10
    console.log(largestRectangle([2,4]));           // 4
}