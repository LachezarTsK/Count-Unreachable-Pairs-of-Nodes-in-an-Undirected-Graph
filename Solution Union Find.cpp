
#include <vector>
#include <unordered_map>
using namespace std;

class UnionFind {
    
    vector<int> parent;
    vector<int> rank;

public:
    UnionFind(int numberOfNodes) {
        parent.resize(numberOfNodes);
        rank.resize(numberOfNodes);
        iota(parent.begin(), parent.end(), 0);
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void joinByRank(int first, int second) {
        if (rank[first] > rank[second]) {
            parent[second] = first;
        } else if (rank[first] < rank[second]) {
            parent[first] = second;
        } else {
            parent[second] = first;
            ++rank[first];
        }
    }
};

class Solution {
    
public:
    long long countPairs(int numberOfNodes, vector<vector<int>>& edges) {

        UnionFind unionFind(numberOfNodes);
        joinNodesOfSameGroup(unionFind, edges);

        unordered_map<int, int> parentAndGroupSize;
        fillMap_parentAndGroupSize(unionFind, parentAndGroupSize, numberOfNodes);

        return findNumberOfUnreachablePairsOfNodes(parentAndGroupSize, numberOfNodes);
    }

private:
    long long findNumberOfUnreachablePairsOfNodes(const unordered_map<int, int>& parentAndGroupSize, int numberOfNodes) {
        long long numberOfUnreachablePairsOfNodes = 0;
        int remainingNodesToMakePairs = numberOfNodes;

        for (const auto& groups : parentAndGroupSize) {
            numberOfUnreachablePairsOfNodes += static_cast<long long> (groups.second) * (remainingNodesToMakePairs - groups.second);
            remainingNodesToMakePairs -= groups.second;
        }
        return numberOfUnreachablePairsOfNodes;
    }

    void joinNodesOfSameGroup(UnionFind& unionFind, const vector<vector<int>>& edges) {
        for (const auto& edge : edges) {
            int parentFirst = unionFind.findParent(edge[0]);
            int parentSecond = unionFind.findParent(edge[1]);
            if (parentFirst != parentSecond) {
                unionFind.joinByRank(parentFirst, parentSecond);
            }
        }
    }

    void fillMap_parentAndGroupSize(UnionFind& unionFind, unordered_map<int, int>& parentAndGroupSize, int numberOfNodes) {
        for (int node = 0; node < numberOfNodes; ++node) {
            int parent = unionFind.findParent(node);
            parentAndGroupSize[parent] = parentAndGroupSize[parent] + 1;
        }
    }
};
