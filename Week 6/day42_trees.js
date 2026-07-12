// Problem 1 — Tree Node & Build Tree

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }

    // Build this tree:
    //       1
    //      / \
    //     2   3
    //    / \   \
    //   4   5   6

    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(6);

    console.log(root.val);             // 1
    console.log(root.left.val);        // 2
    console.log(root.left.left.val);  
}
// Note: Trees are recursive by nature — each node IS a tree (a subtree)!

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = this.left;
            this.right = this.right;
        }
    }
    function inOrder(root) {
        if (!root) return [];
        return [
            ...inOrder(root.left),
            root.val,
            ...inOrder(root.right)
        ];
    }
    const root = new TreeNode(4);
    root.left = new TreeNode(2);
    root.right = new TreeNode(6);
    root.left.left = new TreeNode(1);
    root.left.right = new TreeNode(3);
    root.right.left = new TreeNode(5);
    root.right.right = new TreeNode(7);

    console.log(inOrder(root));
}
// Note: Inorder traversal of a BST gives sorted order! Left → Root → Right

// Problem 3 — Preorder & Postorder Traversal

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function preOrder(root) {
        if (!root) return [];
        return [root.val, ...preOrder(root.left), ...preOrder(root.right)];
    }
    function postorder(root) {
        if (!root) return [];
        return [...postorder(root.left), ...postorder(root.right), root.val];
    }

    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    console.log(preOrder(root));
    console.log(postorder(root));
}

// Problem 4 — Level Order Traversal (BFS)

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function levelOrder(root) {
        if (!root) return [];
        const result = [];
        const queue = [root];

        while (queue.length > 0) {
            const levelSize = queue.length;
            const currentLevel = [];

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();
                currentLevel.push(node.val);

                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
            result.push(currentLevel);
        }
        return result;
    }

    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.left = new TreeNode(4);
    root.left.right = new TreeNode(5);

    console.log(levelOrder(root));
}
// Note: LeetCode #102 — BFS uses a Queue! Process level by level, add children to queue as you go!

// Problem 5 — Maximum Depth of Binary Tree

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function maxDepth(root) {
        if (!root) return 0;
        const leftDepth = maxDepth(root.left);
        const rightDepth = maxDepth(root.right);
        return 1 + Math.max(leftDepth, rightDepth);
    }
    const root = new TreeNode(3);
    root.left = new TreeNode(9);
    root.right = new TreeNode(20);
    root.right.left = new TreeNode(15);
    root.right.right = new TreeNode(7);

    console.log(maxDepth(root));
}
// Note: LeetCode #104 — pure recursion! The depth of a tree = 1 + max(left depth, right depth). Beautiful recursive definition!

// Problem 6 — Symmetric Tree

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function isSymmetric(root) {
        function isMirror(left, right) {
            if (!left && !right) return true;
            if (!left || !right) return false;
            return left.val === right.val &&
                    isMirror(left.left, right.right) &&
                    isMirror(left.right, right.left);
        }
        return isMirror(root.left, root.right);
    }
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(2);
    root.left.left = new TreeNode(3);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(4);
    root.right.right = new TreeNode(3);

    console.log(isSymmetric(root));
}
// Note: LeetCode #101 — compare left and right subtrees as mirrors! Left.left mirrors Right.right, Left.right mirrors Right.left!

// Problem 7 — Validate BST

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function isValidBST(root, min = -Infinity, max = Infinity) {
        if (!root) return true;

        if (root.val <= min || root.val >= max) return false;

        return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);
    }
     const root = new TreeNode(5);
    root.left = new TreeNode(3);
    root.right = new TreeNode(7);
    root.left.left = new TreeNode(2);
    root.left.right = new TreeNode(4);
    root.right.left = new TreeNode(6);
    root.right.right = new TreeNode(8);

    console.log(isValidBST(root));
}
// Note: LeetCode #98 — pass min and max bounds down the tree! Every node must be within its valid range!

// Problem 8 — Lowest Common Ancestor

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function  lowestCommonAncestor(root, p, q) {
        if (!root || root === p || root === q) return root;

        const left = lowestCommonAncestor(root.left, p, q);
        const right = lowestCommonAncestor(root.right, p, q);

        if (left & right) return root;

        return left || right;
    }
    const root = new TreeNode(3);
    root.left = new TreeNode(5);
    root.right = new TreeNode(1);
    root.left.left = new TreeNode(6);
    root.left.right = new TreeNode(2);

    const p = root.left;
    const q = root.left.left;

    console.log(lowestCommonAncestor(root, p, q).val);
}
// Note: LeetCode #236 — if both nodes are in different subtrees, current node is LCA. If both in same subtree, recurse into that subtree!

// Problem 9 — Path Sum

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function hasPathSum(root, targetSum) {
        if (!root) return false;

        if (!root.left && !root.right) {
            return root.val === targetSum;
        }
        return hasPathSum (root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val);
    }
    const root = new TreeNode(5);
    root.left = new TreeNode(4);
    root.right = new TreeNode(8);
    root.left.left = new TreeNode(11);
    root.left.left.left = new TreeNode(7);
    root.left.left.right = new TreeNode(2);

    console.log(hasPathSum(root, 22));
    console.log(hasPathSum(root, 17));
}
// Note: LeetCode #112 — subtract node value as you go down. At leaf, check if remaining equals leaf value!

// Problem 10 — Binary Tree Right Side View

{
    class TreeNode {
        constructor(val) {
            this.val = val;
            this.left = null;
            this.right = null;
        }
    }
    function rightSideView(root) {
        if (!root) return [];
        const result = [];
        const queue = [root];

        while (queue.length > 0) {
            const levelSize = queue.length;

            for (let i = 0; i < levelSize; i++) {
                const node = queue.shift();

                if (i === levelSize - 1) result.push(node.val);

                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
            }
        }
        return result;
    }
    const root = new TreeNode(1);
    root.left = new TreeNode(2);
    root.right = new TreeNode(3);
    root.left.right = new TreeNode(5);
    root.right.right = new TreeNode(4);

    console.log(rightSideView(root));
}