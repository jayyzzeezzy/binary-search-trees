class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
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

};