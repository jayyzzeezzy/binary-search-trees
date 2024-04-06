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
};