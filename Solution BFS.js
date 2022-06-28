
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
            let numberOfNodesInCurrentGroup = breadthFirstSearch_countConnectedNodesInCurrentGroup(node, visited);
            numberOfUnreachablePairsOfNodes += numberOfNodesInCurrentGroup * numberOfVisitedNodes;
            numberOfVisitedNodes += numberOfNodesInCurrentGroup;
        }
    }
    return numberOfUnreachablePairsOfNodes;
};

/**
 * @param {number} start
 * @param {boolean[]} visited
 * @return {number}
 */
function breadthFirstSearch_countConnectedNodesInCurrentGroup(start, visited) {
    const queue = new Queue();
    queue.enqueue(start);
    visited[start] = true;
    let countConnectedNodes = 0;

    while (!queue.isEmpty()) {
        let current = queue.dequeue();
        ++countConnectedNodes;

        for (let neighbour of this.graph[current]) {
            if (!visited[neighbour]) {
                visited[neighbour] = true;
                queue.enqueue(neighbour);
            }
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
