
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class Solution {

    private List<Integer>[] graph;

    public long countPairs(int numberOfNodes, int[][] edges) {
        createGraph(numberOfNodes, edges);
        boolean[] visited = new boolean[numberOfNodes];
        int numberOfVisitedNodes = 0;
        long numberOfUnreachablePairsOfNodes = 0;

        for (int node = 0; node < numberOfNodes; ++node) {
            if (!visited[node]) {
                int numberOfNodesInCurrentGroup = breadthFirstSearch_countConnectedNodesInCurrentGroup(node, visited);
                numberOfUnreachablePairsOfNodes += (long) numberOfNodesInCurrentGroup * numberOfVisitedNodes;
                numberOfVisitedNodes += numberOfNodesInCurrentGroup;
            }
        }
        return numberOfUnreachablePairsOfNodes;
    }

    private int breadthFirstSearch_countConnectedNodesInCurrentGroup(int start, boolean[] visited) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(start);
        visited[start] = true;
        int countConnectedNodes = 0;

        while (!queue.isEmpty()) {
            int current = queue.poll();
            ++countConnectedNodes;

            for (int neighbour : graph[current]) {
                if (!visited[neighbour]) {
                    visited[neighbour] = true;
                    queue.add(neighbour);
                }
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
