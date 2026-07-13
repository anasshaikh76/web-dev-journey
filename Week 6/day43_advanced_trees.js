// Problem 1 — Search in BST

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = this.right;
        }
    }
    function searchBST(root, target) {
        if (!root) return null;
        if (root.val === target) return root;

        if (target < root.val) {
            return searchBST(root.left, target);
        } else {
            return searchBST(root.right, target);
        }
    }
    const root = new TreeNode(8);
    root.left = new TreeNode(3);
    root.right = new TreeNode(10);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(6);

    console.log(searchBST(root, 6)?.val);
    console.log(searchBST(root, 5));
}
// Note: LeetCode #700 — same logic as binary search but on a tree! Each step eliminates half the tree!

// Problem 2 — Insert into BST

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = this.right;
        }
    }
    function insertBST(root, val) {
        if (!root) return new TreeNode(val);

        if (val < root.val) {
            root.left = insertBST(root.left, val);
        } else {
            root.right = insertBST(root.right, val);
        }
        return root;
    }
    function inorder(root, res = []) {
        if (!root) return res;
        inorder(root.left, res);
        res.push(root.val);
        inorder(root.right, res);
        return res;
    }
    let root = new TreeNode(8);
    root.left = new TreeNode(3);
    root.right = new TreeNode(10);

    root = insertBST(root, 5);
    root = insertBST(root, 1);
    root = insertBST(root, 14);

    console.log(inorder(root));
}

// Problem 3 replacement — Delete Node in BST

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = this.right;
        }
    }
    function deleteNode(root, key) {
        if (!root) return null;

        if (key < root.val) {
            root.left = deleteNode(root.left, key);
        } else if (key > root.val) {
            root.right = deleteNode(root.right, key);
        } else {
            if (!root.left && !root.right) return null;

            if (!root.left) return root.right;
            if (!root.right) return root.left;

            let successor = root.right;
            while (successor.left) successor = successor.left;

            root.val = successor.val;
            root.right = deleteNode(root.right, successor.val);
        }
        return root;
    }
    function inorder(root, res = []) {
        if (!root) return res;
        inorder(root.left, res);
        res.push(root.val);
        inorder(root.right, res);
        return res;
    }

    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);

    deleteNode(root, 3);
    console.log(inorder(root));
}

// Problem 4 — Lowest Common Ancestor of BST

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = this.right;
        }
    }
    function lowestCommonAncestor(root, p, q) {
        if (!root) return null;

        if (p.val < root.val && q.val < root.val) {
            return lowestCommonAncestor(root.left, p, q);
        }
        if (p.val > root.val && q.val > root.val) {
            return lowestCommonAncestor(root.right, p, q);
        }
        return root;
    }
    const root = new TreeNode(6);
    root.left = new TreeNode(2);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(0);
    root.left.right = new TreeNode(4);

    const p = root.left;
    const q = root.left.right;

    console.log(lowestCommonAncestor(root, p, q).val);
}
// Note: LeetCode #235 — use BST property! If both values are smaller than root, LCA is in left subtree. If both bigger, it's in right. If they split, current root IS the LCA!

// Problem 5 — Kth Smallest Element in BST

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }
    function kthSmallest(root, k) {
        const inorder = [];

        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            inorder.push(node.val);
            traverse(node.right);
        }
        traverse(root);
        return inorder[k - 1];
    }
    const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);
    root.left.left.left = new TreeNode(1);

    console.log(kthSmallest(root, 3)); // 3
    console.log(kthSmallest(root, 1)); // 1
}
// Note: LeetCode #230 — inorder traversal of BST gives sorted array. Kth smallest = index k-1!

// Problem 6 — Diameter of Binary Tree

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }
    function diameterOfBinaryTree(root) {
        let maxDiameter = 0;

        function height(node) {
            if (!node) return 0;

            const leftH = height(node.left);
            const rightH = height(node.right);

            maxDiameter = Math.max(maxDiameter, leftH + rightH);

            return 1 + Math.max(leftH, rightH);
        }
        height(root);
        return maxDiameter;
    }
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    console.log(diameterOfBinaryTree(root));
}
// Note: LeetCode #543 — diameter = longest path between any two nodes. At each node, diameter = left height + right height. Track global maximum!

// Problem 7 — Balanced Binary Tree

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }
    function isBalanced(root) {
        function checkHeight(node) {
            if (!node) return 0;

            const leftH = checkHeight(node.left);
            if (leftH === -1) return -1;

            const rightH = checkHeight(node.right);
            if (rightH === -1) return -1;

            if (Math.abs(leftH - rightH) > 1) return -1;

            return 1 + Math.max(leftH, rightH);
        }
        return checkHeight(root) !== -1;
    }

    const balanced = new TreeNode(1);
    balanced.left = new TreeNode(2);
    balanced.right = new TreeNode(3);
    balanced.left.left = new TreeNode(4);

    const unbalanced = new TreeNode(1);
    unbalanced.left = new TreeNode(2);
    unbalanced.left.left = new TreeNode(3);
    unbalanced.left.left.left = new TreeNode(4);

    console.log(isBalanced(balanced));   // true
    console.log(isBalanced(unbalanced)); // false
}
// Note: LeetCode #110 — use -1 as a signal for "unbalanced" propagating up. Clever trick to avoid redundant traversals!

// Problem 8 — Path Sum II (All Paths)

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }

    function pathSumII(root, targetSum) {
        const result = [];

        function dfs(node, remaining, path) {
            if (!node) return;

            path.push(node.val);
            remaining -= node.val;

            // Leaf node and sum matches
            if (!node.left && !node.right && remaining === 0) {
                result.push([...path]); // copy current path
            }

            dfs(node.left, remaining, path);
            dfs(node.right, remaining, path);

            path.pop(); // backtrack!
        }

        dfs(root, targetSum, []);
        return result;
    }

    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);
    root.right.left = new TreeNode(13);
    root.right.right = new TreeNode(4);
    root.right.right.right = new TreeNode(1);

    console.log(pathSumII(root, 22));
    // [[5,4,11,2], [5,8,4,5]]
}
// Note: LeetCode #113 — builds on path sum but collects ALL valid paths. Uses backtracking — push to path going down, pop going back up!


// Problem 9  — Zigzag Level Order Traversal

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }
    function zigzagLevelOrder(root) {
        if (!root) return [];

        const result = [];
        const queue = [root];
        let leftToRight = true;

        while (queue.length > 0) {
            const levelSize = queue.length;
            const level = [];

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();

                if (leftToRight) {
                    level.push(node.val);
                } else {
                    level.unshift(node.val);
                }

                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            result.push(level);
            leftToRight = !leftToRight;
        }
        return result;
    }
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);

    console.log(zigzagLevelOrder(root));
}
// Note: LeetCode #103 — BFS with a direction flag. Even levels left→right, odd levels right→left. unshift adds to front instead of back!

// Problem 10 — Construct BST from Sorted Array

{
    class TreeNode {
        constructor(val) { this.val = val; this.left = null; this.right = null; }
    }
    function sortedArrayToBSt(nums) {
        if (nums.length === 0) return null;

        const mid = Math.floor(nums.length / 2);
        const root = new TreeNode(nums[mid]);

        root.left = sortedArrayToBSt(nums.slice(0, mid));
        root.right = sortedArrayToBSt(nums.slice(mid + 1));

        return root;
    }
    function inorder(root, res = []) {
        if (!root) return res;
        inorder(root.left, res);
        res.push(root.val);
        inorder(root.right, res);
        return res;
    }

    const root = sortedArrayToBSt([1, 2, 3, 4, 5, 6, 7]);
    console.log(inorder(root)); // [1,2,3,4,5,6,7]
    console.log(root.val);
}