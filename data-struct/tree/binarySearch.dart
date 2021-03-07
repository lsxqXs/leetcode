

class Node {
  Node left;
  Node right;
  dynamic key;
  dynamic value;
  Node(this.key,this.value);
}

class BinarySearchTree {
  Node root;

  bool insert(dynamic key, dynamic value){
    Node node = new Node(key, value);

    if (this.root == null) {
      this.root = node;
    }else {
      // xxx
    }
    return true;
  }

}