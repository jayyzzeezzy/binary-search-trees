class Node {
    constructor(value = null, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    };
};

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    };

    sortAndRemoveDuplicates(array) {
        const sorted = [...new Set(array)].sort((a, b) => a - b);
        return sorted;
    };

    buildTree(array) {
        let sorted = this.sortAndRemoveDuplicates(array);
        if(sorted.length === 0) return null;

        const midpoint = parseInt(sorted.length / 2);
        const node = new Node(
            sorted[midpoint],
            this.buildTree(sorted.slice(0, midpoint)),
            this.buildTree(sorted.slice(midpoint + 1))
        );
        
        return node;
    };

    insert(value, root = this.root) {
        // base cases:
        // the tree is empty
        if(root === null) return new Node(value);
        // value is already in the tree
        if(value === root.value) return;

        // recur down the tree
        if(value < root.value) {
            root.left = this.insert(value, root.left);
        } 
        else if(value > root.value) {
            root.right = this.insert(value, root.right);
        };

        // return the node pointer
        return root;
    };

    findMin(root) {
        let min = root.value;
        while(root.left != null) {
            min = root.left.value;
            root = root.left;
        };
        return min;
    };

    delete(value, root = this.root) {
        // ensure recursion works,
        // when we have several nodes in a tree
        if(root === null) return root;

        // recursively find the node that will match value
        if(value < root.value) {
            root.left = this.delete(value, root.left);
        }
        else if(value > root.right) {
            root.right = this.delete(value, root.right);
        }
        else {
            // case 1: node has no children
            if(!root.left && !root.right) return null;

            // case 2: node has only one child
            if(!root.left) {
                return root.right;
            } 
            else if(!root.right) {
                return root.left;

            };

            // case 3: node has two children
            root.value = this.findMin(root.right);
            root.right = this.delete(root.value, root.right);
        };
        return root;
    };

    find(value, root = this.root) {
        if(root === null || root.value === value) return root;

        if(value < root.value) {
            return this.find(value, root.left);
        }
        else {
            return this.find(value, root.right);
        }
    };

    levelOrder(callback) {
        if(!this.root) return [];

        const result = [];
        const queue = [this.root];
        while(queue.length) {
            let queueSize = queue.length;
            let level = [];
            for(let i = 0; i < queueSize; i++) {
                let node = queue.shift();

                // this make sure only node with value will be added
                if(node) {
                    level.push(node.value);
                    queue.push(node.left);
                    queue.push(node.right);
                };
                if(callback) callback(node);
            };
            // this checks for array with null nodes,
            // which is not what we want
            if(level) result.push(level);
        }

        if(!callback) return result;
    };

    // root left right
    preOrder(callback, root = this.root, result = []) {
        if(root === null) return;

        // perform callback calculations
        if(callback) {
            callback(root);
        }
        else {
            result.push(root.value);
        }
        this.preOrder(callback, root.left, result);
        this.preOrder(callback, root.right, result);

        return result;
    };

    // left root right
    inOrder(callback, root = this.root, result = []) {
        if(root === null) return;

        this.inOrder(callback, root.left, result);
        // perform callback calculations
        if(callback) {
            callback(root);
        } else {
            result.push(root.value);
        }
        this.inOrder(callback, root.right, result);

        return result;
    };

    // left right root
    postOrder(callback, root = this.root, result = []) {
        if(root === null) return;
        
        this.postOrder(callback, root.left, result);
        this.postOrder(callback, root.right, result);
        // perform callback calculations
        if(callback) {
            callback(root);
        } else {
            result.push(root.value);
        }

        return result;
    };

    // number of edges from said node to leaf node in the longest path
    // height = max depth of any node in the tree
    height(node = this.root) {
        // return -1 to cancel out the edge to null at leaf nodes
        if(node === null) return -1;

        let lHeight = this.height(node.left);
        let rHeight = this.height(node.right);

        if(lHeight > rHeight) {
            return lHeight + 1;
        } else {
            return rHeight + 1;
        }
    };

    // number of edges from said node to root
    depth(node, root = this.root, count = 0) {
        if(!node || !root) return;
        if(root.value === node.value) return count;
        if(node.value < root.value) {
            return this.depth(node, root.left, count += 1);
        } else {
            return this.depth(node, root.right, count += 1);
        }
    };

    isBalanced(node = this.root) {
        const lHeight = this.height(node.left);
        const rHeight = this.height(node.right);
        const difference = Math.abs(lHeight - rHeight);
        return difference < 2 ? "true" : "false";
    };

    rebalance(node = this.root) {
        if(node === null) return;
        const sorted = [...new Set(this.inOrder().sort((a, b) => a - b))];
        this.root = this.buildTree(sorted);
    };
};