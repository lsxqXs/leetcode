

### offer 删除链表的结点

```go
func deleteNode(head *ListNode, val int) *ListNode {

    if head == nil {
        return head
    }
    if head.Val == val {
        return head.Next
    }
    pre := head
    curr := head.Next
    for curr != nil {
        if curr.Val == val {
            pre.Next = curr.Next
        }
        curr = curr.Next
        pre = pre.Next
    }
    return head
}
```