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
        return root;
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
};