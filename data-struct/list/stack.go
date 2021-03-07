package list

import "errors"

// Stack 栈
type Stack struct {
	content []interface{}
	size    int
}

// NewStack 新建一个栈
func NewStack(size int) *Stack {
	return &Stack{
		content: make([]interface{}, 0, size),
		size:    0,
	}
}

// Pop 出栈
func (s *Stack) Pop() interface{} {
	if s.size < 1 {
		return nil
	}
	val := s.content[s.size-1]
	s.content = append(s.content[0 : s.size-1])
	s.size--
	return val
}

// Push 入栈
func (s *Stack) Push(el interface{}) interface{} {
	if s.size > len(s.content) {
		return nil
	}
	s.content = append(s.content, el)
	s.size++
	return errors.New("错误")
}

// Flush 返回栈元素
func (s *Stack) Flush() []interface{} {
	return s.content
}
