import { DirectedGraph, UndigraphGraph } from "./data-struct/graph/graph";


const graph = new DirectedGraph();

// 添加节点
graph.insertNode(0, "A");
graph.insertNode(1, "B");
graph.insertNode(3, "D");
graph.insertNode(2, "C");

// 设置边
graph.addEdge(3, 1); // B A->B, D->B
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(3, 2);
graph.addEdge(2, 3);
graph.addEdge(2, 0);
graph.addEdge(3, 0);



let res = graph.display();
let jsonRes = JSON.stringify(res, null, 4);
console.log(`%c${jsonRes}`, "color:red");
/*
  console.log(res);
  res ->
  [
    {
        "input": [
            "D->A",
            "C->A"
        ],
        "output": [
            "A->B",
            "A->C"
        ],
        "name": "A"
    },
    {
        "input": [
            "A->B",
            "D->B"
        ],
        "output": [],
        "name": "B"
    },
    {
        "input": [
            "C->D"
        ],
        "output": [
            "D->B",
            "D->A",
            "D->C"
        ],
        "name": "D"
    },
    {
        "input": [
            "A->C",
            "D->C"
        ],
        "output": [
            "C->D",
            "C->A"
        ],
        "name": "C"
    }
]
*/
/*
graph.deleteNode(0)
res = graph.display();
jsonRes = JSON.stringify(res, null, 4);
console.log(jsonRes);


graph.deleteEdge(3, 1)

res = graph.display();
jsonRes = JSON.stringify(res, null, 4);
console.log(jsonRes);
 */

let s = ''

graph.bfs(graph.getNode(2), n => {
    s += n.data
})
console.log(s);


s = '';
graph.dfs(graph.getNode(2), n => {
    s += n.data;
})

console.log(s);

s = '';
graph.dfsStack(graph.getNode(2), n => {
    s += n.data;
})

console.log(s);



const ung = new UndigraphGraph();


ung.insertNode(0, "A");
ung.insertNode(1, "B");
ung.insertNode(2, "C")
ung.insertNode(3, "D")
ung.insertNode(4, "E");


ung.addEdge(0, 1)
ung.addEdge(0, 3)
ung.addEdge(1, 4)
ung.addEdge(2, 1)
ung.addEdge(2, 4)
ung.addEdge(2, 3)
let di = ung.display();
console.log(JSON.stringify(di, null, 4));
