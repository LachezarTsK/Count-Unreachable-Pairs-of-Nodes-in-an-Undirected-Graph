
/**
 * @param {number} numberOfNodes
 * @param {number[][]} edges
 * @return {number}
 */
var countPairs = function (numberOfNodes, edges) {
    this.graph = Array.from(new Array(numberOfNodes), () => new Array());
    createGraph(edges);

    const visited = new Array(numberOfNodes).fill(false);
    let numberOfVisitedNodes = 0;
    let numberOfUnreachablePairsOfNodes = 0;

    for (let node = 0; node < numberOfNodes; ++node) {
        if (!visited[node]) {
            let numberOfNodesInCurrentGroup = depthFirstSearch_countConnectedNodesInCurrentGroup(node, visited);
            numberOfUnreachablePairsOfNodes += numberOfNodesInCurrentGroup * numberOfVisitedNodes;
            numberOfVisitedNodes += numberOfNodesInCurrentGroup;
        }
    }
    return numberOfUnreachablePairsOfNodes;
};

/**
 * @param {number} node
 * @param {boolean[]} visited
 * @return {number}
 */
function depthFirstSearch_countConnectedNodesInCurrentGroup(node, visited) {
    visited[node] = true;
    let countConnectedNodes = 1;

    for (let neighbour of this.graph[node]) {
        if (!visited[neighbour]) {
            countConnectedNodes += depthFirstSearch_countConnectedNodesInCurrentGroup(neighbour, visited);
        }
    }
    return countConnectedNodes;
}

/**
 * @param {number[][]} edges
 * @return {void}
 */
function createGraph(edges) {
    for (let node = 0; node < edges.length; ++node) {
        this.graph[edges[node][0]].push(edges[node][1]);
        this.graph[edges[node][1]].push(edges[node][0]);
    }
}
