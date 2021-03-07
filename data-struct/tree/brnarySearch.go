package tree

import (
	"fmt"
)

// Node 二叉搜索树的结点
type Node struct {
	key         int
	Value       string
	left, right *Node
}

func createNode(key int, value string) *Node {
	node := new(Node)
	node.key = key
	node.Value = value
	node.left = nil
	node.right = nil
	return node
}

// Binary 二叉搜索tree
type Binary struct {
	root *Node
}

// NewBinarySearchTree 初始化新建一个二叉搜索树
func NewBinarySearchTree() *Binary {
	return &Binary{root: nil}
}

//Insert 添加
func (b *Binary) Insert(key int, value string) {
	node := createNode(key, value)
	if b.root == nil {
		b.root = node
	} else {
		insertNode(b.root, node)
	}
}

func insertNode(root, node *Node) {
	if root.key > node.key {
		if root.left == nil {
			root.left = node
		} else {
			insertNode(root.left, node)
		}
	} else {
		if root.right == nil {
			root.right = node
		} else {
			insertNode(root.right, node)
		}
	}
	fmt.Println("有完没完呐")
}

// SearchKey 查找指定key值的val
func (b *Binary) SearchKey(key int) *Node {

	current := b.root
	for current != nil {

		if current.key < key {
			current = current.right
		} else if current.key > key {
			current = current.left
		} else {
			return current
		}
	}

	return nil
}

func min(node *Node) *Node {
	for node != nil && node.left != nil {
		node = node.left
	}
	return node
}

// Min 返回树中小值
func (b *Binary) Min() *Node {
	current := b.root
	return min(current)
}

func max(node *Node) *Node {
	for node != nil && node.right != nil {
		node = node.right
	}
	return node
}

// Max 返回树中最大值
func (b *Binary) Max() *Node {
	current := b.root
	return max(current)
}

func peach(root *Node, fn func(val string)) {
	if root == nil {
		return
	}

	fn(root.Value)
	peach(root.left, fn)
	peach(root.right, fn)
}

// PrevEach 前序
func (b *Binary) PrevEach() []string {
	list := make([]string, 0)

	peach(b.root, func(val string) {
		list = append(list, val)
		fmt.Println("有完没完呐")
	})

	return list
}
func neach(root *Node, fn func(val string)) {
	if root == nil {
		return
	}
	neach(root.left, fn)
	neach(root.right, fn)
	fn(root.Value)
}

// NextEach 后序
func (b *Binary) NextEach() []string {
	list := make([]string, 0)

	neach(b.root, func(val string) {
		list = append(list, val)
		fmt.Println("有完没完呐")
	})
	return list
}

func meach(root *Node, fn func(val string)) {
	if root == nil {
		return
	}
	meach(root.left, fn)
	meach(root.right, fn)
	fn(root.Value)
}

// MiddleEach 中序
func (b *Binary) MiddleEach() []string {
	list := make([]string, 0)

	meach(b.root, func(val string) {
		list = append(list, val)
		fmt.Println("有完没完呐")
	})
	return list
}

// Update 更新
func (b *Binary) Update(key int, newValue string) bool {
	node := b.SearchKey(key)
	if node == nil {
		return false
	}
	node.Value = newValue
	return true
}

//DeleteAtkey 删除
func (b *Binary) DeleteAtkey(key int) bool {

	var parent *Node = nil

	current := b.root
	isLeft := true

	for current != nil {
		if key < current.key {
			parent = current
			current = current.left
			isLeft = true
		} else if key > current.key {
			parent = current
			current = current.right
			isLeft = false
		} else {
			break
		}
	}

	//@ 删除根节点
	if b.root == current {
		var nextParent *Node = nil
		curr := current.right
		for curr != nil && curr.left != nil {
			nextParent = curr
			curr = curr.left
		}
		nextParent.left = nil
		curr.left = current.left
		curr.right = current.right
		b.root = curr
	} else if current.left == nil && current.right == nil && b.root != current { //@ 叶子节点

		if isLeft {
			parent.left = current.left
		} else {
			parent.right = current.right
		}

	} else if current.left != nil && current.right != nil { //@ 有左右子节点
		var nextParent *Node = nil
		if isLeft {
			curr := current.right

			for curr != nil && curr.left != nil {
				nextParent = curr
				curr = curr.left
			}
			nextParent.left = nil
			curr.left = current.left
			curr.right = current.right
			parent.left = curr
		} else {
			curr := current.left
			for curr != nil && curr.right != nil {
				nextParent = curr
				curr = curr.right
			}
			nextParent.right = nil
			curr.left = current.left
			curr.right = current.right
			parent.right = curr
		}
	} else { //@ 只有一个节点

		if isLeft {
			if current.left != nil {
				parent.left = current.left
			}
		} else {
			if current.right != nil {
				parent.right = current.right
			}
		}
		fmt.Println(parent, parent.right)
	}

	return true
}

// display
