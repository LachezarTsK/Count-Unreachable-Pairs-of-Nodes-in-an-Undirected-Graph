
#include <vector>
using namespace std;

class Solution {
    
    vector<vector<int>> graph;

public:
    long long countPairs(int numberOfNodes, vector<vector<int>>& edges) {
        createGraph(numberOfNodes, edges);
        vector<bool> visited(numberOfNodes, false);
        int numberOfVisitedNodes = 0;
        long long numberOfUnreachablePairsOfNodes = 0;

        for (int node = 0; node < numberOfNodes; ++node) {
            if (!visited[node]) {
                int numberOfNodesInCurrentGroup = depthFirstSearch_countConnectedNodesInCurrentGroup(node, visited);
                numberOfUnreachablePairsOfNodes += static_cast<long long> (numberOfNodesInCurrentGroup) * numberOfVisitedNodes;
                numberOfVisitedNodes += numberOfNodesInCurrentGroup;
            }
        }
        return numberOfUnreachablePairsOfNodes;
    }

private:
    int depthFirstSearch_countConnectedNodesInCurrentGroup(int node, vector<bool>& visited) {
        visited[node] = true;
        int countConnectedNodes = 1;

        for (const auto& neighbour : graph[node]) {
            if (!visited[neighbour]) {
                countConnectedNodes += depthFirstSearch_countConnectedNodesInCurrentGroup(neighbour, visited);
            }
        }
        return countConnectedNodes;
    }

    void createGraph(int numberOfNodes, const vector<vector<int>>& edges) {
        graph.assign(numberOfNodes, vector<int>());
        for (int node = 0; node < edges.size(); ++node) {
            graph[edges[node][0]].push_back(edges[node][1]);
            graph[edges[node][1]].push_back(edges[node][0]);
        }
    }
};
