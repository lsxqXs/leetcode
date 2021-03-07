import 'dart:collection';

enum Colors {
  White,
  Grey,
  Black,
}

class Graph {
  List<String> _nodes = [];
  Map<String, List<String>> _edges = {};

  addVertex(dynamic node) {
    if (!_nodes.contains(node)) {
      _nodes.add(node);
      _edges[node] = [];
    }
    return Graph;
  }

  addEdge(dynamic startNode, dynamic endNode) {
    if (!_nodes.contains(startNode)) {
      addVertex(startNode);
    }
    if (!_nodes.contains(endNode)) {
      addVertex(endNode);
    }

    _edges[startNode].add(endNode);
    return Graph;
  }

  String format() {
    String str = "";

    for (var node in _nodes) {
      str += "$node\t->";
      var edges = _edges[node];
      for (var e in edges) {
        str += "\t$e";
      }
      str += "\n";
    }
    return str;
  }

  bfs(String startNode, Function handler) {
    Map<String, Colors> cache = {};
    Queue queue = new Queue();

    // 所有节点入队
    for (var n in _nodes) {
      cache[n] = Colors.White;
    }

    // 最后的开始位置
    queue.add(startNode);
    while (queue.isNotEmpty) {
      var n = queue.removeFirst();
      var edgs = _edges[n];
      cache[n] = Colors.Grey;

      for (var e in edgs) {
        if (cache[e] == Colors.White) {
          cache[e] = Colors.Grey;
          queue.add(e);
        }
      }

      cache[n] = Colors.Black;
      handler(n);
    }
  }

  dfs(String startNode, Function handler) {
    Map<String, Colors> cache = {};
    Queue queue = new Queue();
    // 所有节点入队
    for (var n in _nodes) {
      cache[n] = Colors.White;
    }

    for (var n in _nodes) {
      if (cache[n] == Colors.White) {
        _depthFirstSearch(n,cache,handler);
      }
    }

  }

  _depthFirstSearch(String n, Map<String, Colors> cache, Function handler) {
    cache[n] = Colors.Grey;
    handler(n);

    var nEdge = _edges[n];
    for (var e in nEdge) {
      if (cache[e] == Colors.White) {
        _depthFirstSearch(e, cache, handler);
      }
    }
    cache[n] = Colors.Black;
  }

}
