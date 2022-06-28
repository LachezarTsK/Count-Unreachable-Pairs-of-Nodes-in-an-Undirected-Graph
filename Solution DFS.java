
import java.util.ArrayList;
import java.util.List;

public class Solution {

    private List<Integer>[] graph;

    public long countPairs(int numberOfNodes, int[][] edges) {
        createGraph(numberOfNodes, edges);
        boolean[] visited = new boolean[numberOfNodes];
        int numberOfVisitedNodes = 0;
        long numberOfUnreachablePairsOfNodes = 0;

        for (int node = 0; node < numberOfNodes; ++node) {
            if (!visited[node]) {
                int numberOfNodesInCurrentGroup = depthFirstSearch_countConnectedNodesInCurrentGroup(node, visited);
                numberOfUnreachablePairsOfNodes += (long) numberOfNodesInCurrentGroup * numberOfVisitedNodes;
                numberOfVisitedNodes += numberOfNodesInCurrentGroup;
            }
        }
        return numberOfUnreachablePairsOfNodes;
    }

    private int depthFirstSearch_countConnectedNodesInCurrentGroup(int node, boolean[] visited) {
        visited[node] = true;
        int countConnectedNodes = 1;

        for (int neighbour : graph[node]) {
            if (!visited[neighbour]) {
                countConnectedNodes += depthFirstSearch_countConnectedNodesInCurrentGroup(neighbour, visited);
            }
        }
        return countConnectedNodes;
    }

    private void createGraph(int numberOfNodes, int[][] edges) {
        graph = new List[numberOfNodes];
        for (int node = 0; node < numberOfNodes; ++node) {
            graph[node] = new ArrayList<>();
        }
        for (int node = 0; node < edges.length; ++node) {
            graph[edges[node][0]].add(edges[node][1]);
            graph[edges[node][1]].add(edges[node][0]);
        }
    }
}
