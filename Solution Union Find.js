
/**
 * @param {number} numberOfNodes
 * @param {number[][]} edges
 * @return {number}
 */
var countPairs = function (numberOfNodes, edges) {
    const unionFind = new UnionFind(numberOfNodes);
    joinNodesOfSameGroup(unionFind, edges);

    const parentAndGroupSize = new Map();
    fillMap_parentAndGroupSize(unionFind, parentAndGroupSize, numberOfNodes);

    return findNumberOfUnreachablePairsOfNodes(parentAndGroupSize, numberOfNodes);
};

/**
 * @param {Map<number, number>} parentAndGroupSize
 * @param {number} numberOfNodes
 * @return {number}
 */
function findNumberOfUnreachablePairsOfNodes(parentAndGroupSize, numberOfNodes) {
    let numberOfUnreachablePairsOfNodes = 0;
    let remainingNodesToMakePairs = numberOfNodes;

    for (let groups of parentAndGroupSize.values()) {
        numberOfUnreachablePairsOfNodes += (remainingNodesToMakePairs - groups) * groups;
        remainingNodesToMakePairs -= groups;
    }
    return numberOfUnreachablePairsOfNodes;
}

/**
 * @param {class UnionFind} unionFind
 * @param {number[][]} edges
 * @return {void}
 */
function joinNodesOfSameGroup(unionFind, edges) {
    for (let edge of edges) {
        let parentFirst = unionFind.findParent(edge[0]);
        let parentSecond = unionFind.findParent(edge[1]);
        if (parentFirst !== parentSecond) {
            unionFind.joinByRank(parentFirst, parentSecond);
        }
    }
}

/**
 * @param {class UnionFind} unionFind
 * @param {Map<number, number>} parentAndGroupSize
 * @param {number} numberOfNodes
 * @return {void}
 */
function fillMap_parentAndGroupSize(unionFind, parentAndGroupSize, numberOfNodes) {
    for (let node = 0; node < numberOfNodes; ++node) {
        let parent = unionFind.findParent(node);
        if (!parentAndGroupSize.has(parent)) {
            parentAndGroupSize.set(parent, 0);
        }
        parentAndGroupSize.set(parent, parentAndGroupSize.get(parent) + 1);
    }
}

class UnionFind {

    constructor(numberOfNodes) {
        this.parent = Array.from(new Array(numberOfNodes).keys());
        this.rank = new Array(numberOfNodes);
    }

    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    joinByRank(first, second) {
        if (this.rank[first] > this.rank[second]) {
            this.parent[second] = first;
        } else if (this.rank[first] < this.rank[second]) {
            this.parent[first] = second;
        } else {
            this.parent[second] = first;
            ++this.rank[first];
        }
    }
}
