
import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

public class Solution {

    public long countPairs(int numberOfNodes, int[][] edges) {

        UnionFind unionFind = new UnionFind(numberOfNodes);
        joinNodesOfSameGroup(unionFind, edges);

        Map<Integer, Integer> parentAndGroupSize = new HashMap<>();
        fillMap_parentAndGroupSize(unionFind, parentAndGroupSize, numberOfNodes);

        return findNumberOfUnreachablePairsOfNodes(parentAndGroupSize, numberOfNodes);
    }

    private long findNumberOfUnreachablePairsOfNodes(Map<Integer, Integer> parentAndGroupSize, int numberOfNodes) {
        long numberOfUnreachablePairsOfNodes = 0;
        int remainingNodesToMakePairs = numberOfNodes;

        for (int groups : parentAndGroupSize.values()) {
            numberOfUnreachablePairsOfNodes += (long) (remainingNodesToMakePairs - groups) * groups;
            remainingNodesToMakePairs -= groups;
        }
        return numberOfUnreachablePairsOfNodes;
    }

    private void joinNodesOfSameGroup(UnionFind unionFind, int[][] edges) {
        for (int[] edge : edges) {
            int parentFirst = unionFind.findParent(edge[0]);
            int parentSecond = unionFind.findParent(edge[1]);
            if (parentFirst != parentSecond) {
                unionFind.joinByRank(parentFirst, parentSecond);
            }
        }
    }

    private void fillMap_parentAndGroupSize(UnionFind unionFind, Map<Integer, Integer> parentAndGroupSize, int numberOfNodes) {
        for (int node = 0; node < numberOfNodes; ++node) {
            int parent = unionFind.findParent(node);
            parentAndGroupSize.putIfAbsent(parent, 0);
            parentAndGroupSize.put(parent, parentAndGroupSize.get(parent) + 1);
        }
    }
}

class UnionFind {

    int[] parent;
    int[] rank;

    UnionFind(int numberOfNodes) {
        parent = IntStream.range(0, numberOfNodes).toArray();
        rank = new int[numberOfNodes];
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
}
