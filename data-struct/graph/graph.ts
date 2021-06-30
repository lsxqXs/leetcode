



class linkNode {
  // 弧尾编号
  tailVex: number
  // 弧头编号
  headVex: number
  // 弧头相同的下一条弧
  hLink: linkNode
  // 弧尾相同的下一条弧
  tLink: linkNode
  // 节点信息
  info: any
  constructor(t?: number, h?: number) {
    this.tailVex = t;
    this.headVex = h;
    this.hLink = null;
    this.tLink = null;
  }
}


/* 
  linkNode 
*/
class GraphNode<T = any> {
  // 数据域
  data: T
  // 弧头的第一条弧
  firstin: linkNode
  // 弧尾的第一条弧
  firstout: linkNode
  constructor(data: T) {
    this.data = data;
    this.firstin = null;
    this.firstout = null;
  }
}


/**
 * Graph 图-十字链表存储有向图
 */
export class DirectedGraph {

  private nodeMaps = new Map<number, GraphNode>()

  // 插入一个节点
  insertNode(index: number, val: any) {
    // 如果没有 跑出错误
    let node = new GraphNode(val);
    this.nodeMaps.set(index, node);
  }

  private setEdgeInput(node: linkNode, edge: linkNode) {
    let t = node;
    while (t.hLink !== null) {
      t = t.hLink;
    }
    t.hLink = edge;
  }
  private setEdgeOutput(node: linkNode, edge: linkNode) {
    let t = node;
    while (t.tLink !== null) {
      t = t.tLink;
    }
    t.tLink = edge;
  }

  // 添加节点边信息
  addEdge(i1: number, i2: number) {
    // 如果没有抛出错误
    let n1 = this.nodeMaps.get(i1), n2 = this.nodeMaps.get(i2);
    // n1 -> n2
    let edge = new linkNode(i1, i2);

    n1.firstout === null ? (n1.firstout = edge) : this.setEdgeOutput(n1.firstout, edge);
    n2.firstin === null ? (n2.firstin = edge) : this.setEdgeInput(n2.firstin, edge);
  }

  getNode(i: number) {
    return this.nodeMaps.get(i)
  }

  display(): { name: string, input: string[], output: string[] }[] {
    let res = [];
    this.nodeMaps.forEach((node, key) => {
      res.push({ name: node.data, input: this.getNodeByIut(node), output: this.getNodeByOut(node) });
    })
    return res;
  }

  // 删除节点
  deleteNode(index: number) {
    // 抛错❌
    let outputLine = this.nodeMaps.get(index);
    let outputNode = outputLine.firstout;
    // output  删除当前节点对其他定点对弧
    while (outputNode !== null) {
      let out = this.nodeMaps.get(outputNode.headVex); // 所有指向当前节点的边
      if (out.firstin !== outputNode) {
        let temp = out.firstin;
        while (temp !== null && temp.hLink !== outputNode) {
          temp = temp.hLink;
        }
        if (temp !== null) {
          temp.hLink = outputNode.hLink;
        }
      } else {
        out.firstin = outputNode.hLink
      }
      // 节点下一个边节点信息
      outputNode = outputNode.tLink;
    }

    // input 删除对当前节点对弧
    let inputNode = outputLine.firstin;
    while (inputNode !== null) {
      let input = this.nodeMaps.get(inputNode.tailVex);

      if (input.firstout !== inputNode) {
        let temp = input.firstout;
        while (temp !== null && temp.tLink !== inputNode) {
          temp = temp.tLink;
        }
        if (temp !== null) {
          temp.tLink = inputNode.tLink;
        }
      } else {
        input.firstout = inputNode.tLink
      }
      inputNode = inputNode.hLink
    }
    this.nodeMaps.delete(index);
  }

  // 删除两个节点之间的边
  deleteEdge(i1: number, i2: number) {
    let n1 = this.nodeMaps.get(i1);
    let n2 = this.nodeMaps.get(i2);

    // 找到两个节点之间链接度边
    let currentEdge = n1.firstout;
    while (currentEdge.headVex !== i2) {
      currentEdge = currentEdge.tLink;
    }

    // 删除出度节点的边
    if (n1.firstout === currentEdge) {
      n1.firstout = currentEdge.tLink;
    } else {
      let temp = n1.firstout;
      let prevOut = temp;

      while (temp !== currentEdge) {
        prevOut = temp;
        temp = temp.tLink;
      }
      prevOut.tLink = temp.tLink;
    }

    // 删除入度节点对应的边
    let intEdge = n2.firstin;
    let prevInt = intEdge;
    if (intEdge !== currentEdge) {
      while (intEdge !== currentEdge) {
        prevInt = intEdge;
        intEdge = intEdge.hLink;
      }
      prevInt.hLink = currentEdge.hLink;
    } else {
      n2.firstin = intEdge.hLink;
    }

  }

  // 获取节点入度
  getNodeByIut(node: GraphNode) {
    let tempIut = node.firstin;
    let input = [];
    let str;
    // 出度
    while (tempIut !== null) {
      str = `${this.nodeMaps.get(tempIut.tailVex).data}->${this.nodeMaps.get(tempIut.headVex).data}`;
      input.push(str);
      str = null;
      tempIut = tempIut.hLink;
    }
    return input;
  }

  // 获取节点度出度
  getNodeByOut(node: GraphNode) {
    let output = [];
    let tempOut = node.firstout;
    let str;
    // 出度
    while (tempOut !== null) {
      str = `${this.nodeMaps.get(tempOut.tailVex).data}->${this.nodeMaps.get(tempOut.headVex).data}`;
      output.push(str);
      str = null;
      tempOut = tempOut.tLink;
    }
    return output;
  }


  /**
   *    广度优先搜索，借助队列实现，
   *    拿到某一个节点，获取节点附近弧链接的节点，加入队列，后面出队访问。再加入一个缓存，用于记录已经被访问过的节点
   * @param node GraphNode
   * @param cb func
   */
  bfs(node: GraphNode, cb: Function) {
    let visitedMaps = new WeakMap();
    visitedMaps.set(node, true);
    let stack = [node];


    while (stack.length > 0) {
      let cur = stack.pop();
      if (visitedMaps.get(cur)) {
        visitedMaps.set(cur, false);
        cb(cur);
        let t = cur.firstout;
        while (t !== null) {
          let n = this.nodeMaps.get(t.headVex);
          if (!visitedMaps.has(n)) {
            visitedMaps.set(n, true)
          }
          stack.unshift(n)
          t = t.tLink;
        }
      }
    }
    visitedMaps = null;
  }

  // 深度优先搜索
  dfs(node: GraphNode, cb: Function) {
    let stack = [node];
    let visitedMaps = new WeakMap();
    visitedMaps.set(node, true);


    while (stack.length > 0) {
      let cur = stack.pop();
      if (visitedMaps.get(cur)) {
        visitedMaps.set(cur, false);
        cb(cur);
        let t = cur.firstout;
        while (t !== null) {
          let n = this.nodeMaps.get(t.headVex)
          if (!visitedMaps.has(n)) {
            visitedMaps.set(n, true);
          }
          stack.push(n);
          t = t.tLink;
        }
      }
    }
  }

  dfsStack(node: GraphNode, cb: Function) {
    let visitedMaps = new WeakMap();
    visitedMaps.set(node, true);
    let _this = this;
    function dfs(n: GraphNode) {
      if (!visitedMaps.get(n)) { // 表示已经访问过
        return
      }
      visitedMaps.set(n, false) // 设置已经访问
      cb(n); // 访问
      let t = n.firstout;
      while (t !== null) {
        let cur = _this.nodeMaps.get(t.headVex);
        if (!visitedMaps.has(cur)) {
          visitedMaps.set(cur, true);
          dfs(cur);
        }
        t = t.tLink;
      }
    }
    dfs(node)
  }
}



class HeadNode<T = any> {
  data: T
  firstEdge: LinkEdgeNode
  constructor(data: T) {
    this.data = data;
    this.firstEdge = null;
  }
}

class LinkEdgeNode {
  i: number
  j: number
  iLink: LinkEdgeNode
  jLink: LinkEdgeNode

  info: any
  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
    this.iLink = null;
    this.jLink = null;
  }
}



export class UndigraphGraph {

  private nodeMaps = new Map<number, HeadNode>();


  insertNode(i: number, data: any) {
    let node = new HeadNode(data);
    this.nodeMaps.set(i, node)
  }

  private setEdge(n: HeadNode, edge: LinkEdgeNode) {
    let cur = n.firstEdge;
    while (cur.jLink !== null) {
      cur = cur.jLink;
    }
    cur.jLink = edge;
  }

  private setIlink(n: HeadNode, edge: LinkEdgeNode) {
    let cur = n.firstEdge;
    while (cur.iLink !== null) {
      cur = cur.iLink;
    }
    cur.iLink = edge;
  }

  addEdge(i1: number, i2: number) {
    let n1 = this.nodeMaps.get(i1), n2 = this.nodeMaps.get(i2);

    let edge = new LinkEdgeNode(i1, i2);
    n1.firstEdge === null ? n1.firstEdge = edge : this.setEdge(n1, edge);
    n2.firstEdge === null ? n2.firstEdge = edge : this.setIlink(n2, edge);
  }

  getNode(i: number) { return this.nodeMaps.get(i) }

  display() {
    let str = null;
    let res = [];

    this.nodeMaps.forEach((node) => {
      let edge = [];

      let cur = node.firstEdge;
      while (cur.jLink !== null) {
        str = `${this.nodeMaps.get(cur.i).data}->${this.nodeMaps.get(cur.j).data}`;
        edge.push(str);
        str = null;
        cur = cur.jLink;
      }
      res.push({
        name: node.data,
        edge
      })
    })
    return res;
  }


  bfs() { }


  dfs() { }

}