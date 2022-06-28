
#include <queue>
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
                int numberOfNodesInCurrentGroup = breadthFirstSearch_countConnectedNodesInCurrentGroup(node, visited);
                numberOfUnreachablePairsOfNodes += static_cast<long long> (numberOfNodesInCurrentGroup) * numberOfVisitedNodes;
                numberOfVisitedNodes += numberOfNodesInCurrentGroup;
            }
        }
        return numberOfUnreachablePairsOfNodes;
    }

private:
    int breadthFirstSearch_countConnectedNodesInCurrentGroup(int start, vector<bool>& visited) {
        queue<int> queue;
        queue.push(start);
        visited[start] = true;
        int countConnectedNodes = 0;

        while (!queue.empty()) {
            int current = queue.front();
            queue.pop();
            ++countConnectedNodes;

            for (const auto& neighbour : graph[current]) {
                if (!visited[neighbour]) {
                    visited[neighbour] = true;
                    queue.push(neighbour);
                }
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
