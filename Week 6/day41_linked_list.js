// Problem 1 — Node & LinkedList Class

{
    class Node {
        constructor(val) {
            this.val = val;
            this.next = null;
        }
    }

    class LinkedList {
        constructor() {
            this.head = null;
            this.size = 0;
        }
        append(val) {
            const node = new Node(val);
            if (!this.head) {
                this.head = node;
            } else {
                let current = this.head;
                while (current.next) {
                    current = current.next;
                }
                current.next = node;
            }
            this.size++;
        }
        print() {
            let current = this.head;
            const values = [];
            while (current) {
                values.push(current.val);
                current = current.next;
            }
            console.log(values.join(" → ") + " → null");
        }
    }
    const list = new LinkedList();
    list.append(1);
    list.append(2);
    list.append(3);
    list.print();
}
// Note: The key to linked lists is always traversing from head — you can never jump to index directly!

// Problem 2 — Prepend & Delete

{
    class Node {
        constructor(val) {
            this.val = val;
            this.next = null;
        }
    }
    class LinkedList {
        constructor() {
            this.head = null;
        }
        prepend(val) {
            const node = new Node(val);
            node.next = this.head;
            this.head = node;
        }
        delete(val) {
            if (!this.head) return;

            if (this.head.val === val) {
                this.head = this.head.next;
                return;
            }
            let current = this.head;
            while (current.next) {
                if (current.next.val === val) {
                    current.next = current.next.next;
                    return;
                }
                current = current.next;
            }
        }

        print() {
            let curr = this.head;
            const vals = [];
            while (curr) { vals.push(curr.val); curr = curr.next; }
            console.log(vals.join(" → ") + " → null");
        }
    }
    const list = new LinkedList();
    list.prepend(3);
    list.prepend(2);
    list.prepend(1);
    list.print();
    list.delete(2);
    list.print();
}
// Note: Deleting = making previous node skip over the deleted node by pointing to deleted.next!

// Problem 3 — Reverse Linked List

{
    class Node {
        constructor(val) { this.val = val; this.nexth = null; }
    }
    function reverseList(head) {
        let prev = null;
        let current = head;

        while (current) {
            let nextNode = current.next;
            current.next = prev;
            prev = current;
            current = nextNode;
        }
        return prev;
    }
    let head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = new Node(5);

    let reversed = reverseList(head);
    let curr = reversed;
    while (curr) { process.stdout.write(curr.val + " → "); curr = curr.next; }
    console.log("null");
}
// Note: LeetCode #206 — three pointer technique! prev, current, next. Reverse one pointer at a time while saving the next node!

// Problem 4 — Find Middle of Linked List

{
    class Node {
        constructor(val) { this.val = val; this.next = null; }
    }
    function findMiddle(head) {
        let slow = head;
        let fast = head;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    let head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = new Node(5);

    console.log(findMiddle(head).val);
}
// Note: LeetCode #876 — Fast & Slow pointer (tortoise and hare)! When fast reaches end, slow is at middle. Fast moves 2x speed of slow!

// Problem 5 — Detect Cycle

{
    class Node {
        constructor(val) { this.val = val; this.next = null; }
    }
    function hasCycle(head) {
        let slow = head;
        let fast = head;

        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow === fast) return true;
        }
        return false;
    }
    let head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = head.next; // cycle!

    console.log(hasCycle(head));
}
// Note: LeetCode #141 — Fast & Slow pointer again! If there's a cycle, fast will eventually lap slow and they'll meet. If no cycle, fast reaches null!

// Problem 6 — Merge Two Sorted Lists

{
    class Node {
        constructor(val) { this.val = val; this.next = null; }
    }
    function mergeTwoList(l1, l2) {
        const dummy = new Node(0);
        let current = dummy;

        while (l1 && l2) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        current.next = l1 || l2;
        return dummy.next;
    }
    let l1 = new Node(1);
    l1.next = new Node(3);
    l1.next.next = new Node(5);

    let l2 = new Node(2);
    l2.next = new Node(4);
    l2.next.next = new Node(6);

    let merged = mergeTwoList(l1, l2);
    let curr = merged;
    while (curr) { process.stdout.write(curr.val + " → "); curr = curr.next; }
    console.log("null"); // 1→2→3→4→5→6→null
}
// Note: LeetCode #21 — dummy node trick! Create a fake head node so you don't need special case for empty list. Return dummy.next at the end!

// Problem 7 — Remove Nth Node From End

{
    class Node {
        constructor(val) {this.val = val; this.next = null; }
    }
    function removeNthFromEnd(head, n) {
        const dummy = new Node(0);
        dummy.next = head;
        let fast = dummy;
        let slow = dummy;

        for (let i = 0; i <= n; i++) {
            fast = fast.next;
        }

        while (fast) {
            slow = slow.next;
            fast = fast.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
     let head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(3);
    head.next.next.next = new Node(4);
    head.next.next.next.next = new Node(5);

    let result = removeNthFromEnd(head, 3);
    let curr = result;
    while (curr) { process.stdout.write(curr.val + " → "); curr = curr.next; }
    console.log("null");
}
// Note: LeetCode #19 — two pointer with a gap of n! Fast pointer gets n steps head start, then both move together. When fast hits end, slow is at the right position!

// Problem 8 — Palindrome Linked List

{
    class Node {
        constructor(val) {this.val = val; this.next = null;}
    }
    function ispalindrome(head) {
        let slow = head, fast = head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        let prev = null, curr = slow;
        while (curr) {
            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        let left = head, right = prev;
        while (right) {
            if (left.val !== right.val) return false;
            left = left.next;
            right = right.next;
        }
        return true;
    }
    let head = new Node(1);
    head.next = new Node(2);
    head.next.next = new Node(2);
    head.next.next.next = new Node(1);

    console.log(ispalindrome(head));
}
// Note: LeetCode #234 — combines THREE techniques: find middle (fast/slow), reverse linked list, then compare! Classic interview problem!

// Problem 9 — Intersection of Two Linked Lists

{
    class Node {
        constructor(val) {this.val = val; this.next = null;}
    }
    function getIntersectionNode(headA, headB) {
        let a = headA;
        let b = headB;

        while (a !== b) {
            a = a ? a.next : headB;
            b = b ? b.next : headA;
        }
        return a;
    }
    const shared = new Node(8);
    shared.next = new Node(10);

    let headA = new Node(4);
    headA.next = new Node(1);
    headA.next.next = shared;

    let headB = new Node(5);
    headB.next = new Node(6);
    headB.next.next = new Node(1);
    headB.next.next.next = shared;

    console.log(getIntersectionNode(headA, headB)?.val);
}
// Note: LeetCode #160 — brilliant trick! Both pointers traverse both lists. They'll meet at intersection because they travel the same total distance!

// Problem 10 — LRU Cache

{
    class LRUCache {
        constructor(capacity) {
            this.capacity = capacity;
            this.cache = new Map();
        }
        get(key) {
            if (!this.cache.has(key)) return - 1;

            const val = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, val);
            return val;
        }
        put(key, value) {
            if (this.cache.has(key)) {
                this.cache.delete(key);
            } else if (this.cache.size >= this.capacity) {
                this.cache.delete(this.cache.keys().next().value);
            }
            this.cache.set(key, value);
        }
    }
    const lru = new LRUCache(3);
    lru.put(1, "one");
    lru.put(2, "two");
    lru.put(3, "three");
    console.log(lru.get(1));
    lru.put(4, "four");
    console.log(lru.get(2));
    console.log(lru.get(3));
}