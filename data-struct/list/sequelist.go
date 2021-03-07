package list

import (
	"errors"
)

// List 表
type List struct {
	content []interface{}
	length  int
}

//New 初始化一张表
func NewList(size int) *List {

	r := make([]interface{}, size, size)

	for i := range r {
		r[i] = nil
	}

	return &List{
		content: r,
		length:  0,
	}
}

// Size 表的现有长度
func (l *List) Size() int {
	return l.length
}

//IsEmpty 判空操作
func (l *List) IsEmpty() bool {
	return l.length == 0
}

// IsFull 判满
func (l *List) IsFull() bool {
	return l.length == cap(l.content)
}

// Unmount 销毁一张表
func (l *List) Unmount() {
	l.content = nil
	l.length = 0
}

// GetEle 获取一个元素
func (l *List) GetEle(i int) interface{} {
	if i < 0 || i > l.length {
		return nil
	}
	return l.content[i]
}

// GetIndex 返回一个元素的下表
func (l *List) GetIndex(el interface{}) int {
	for i, v := range l.content {
		if v == el {
			return i
		}
	}
	return -1
}

// Append 添加一个元素
func (l *List) Append(el interface{}) error {

	if l.length > cap(l.content) {
		return errors.New("你想干啥")
	}
	l.content[l.length] = el
	l.length++

	return nil
}

// InsertElem 插入一个元素
func (l *List) InsertElem(i int, el interface{}) error {
	if i > l.length {
		return errors.New("你想干啥")
	}
	for j := i; j < l.length; j++ {
		l.content[j+1] = l.content[j]
	}
	l.content[i] = el
	l.length++
	return nil
}

// Remove 删除一个位序元素
func (l *List) Remove(i int) error {
	if i > l.length || i < 0 {
		return errors.New("你想干啥")
	}

	for j := i; j < l.length; j++ {
		l.content[j] = l.content[j+1]
	}

	l.length--
	return nil
}

// RemoveElem 删除一个元素
func (l *List) RemoveElem(el interface{}) error {
	for i, v := range l.content {
		if v == el {
			return l.Remove(i)
		}
	}

	l.length--
	return errors.New("没有")
}

// Update 更新一个元素
func (l *List) Update(i int, newVal interface{}) error {
	if i > l.length {
		return errors.New("你搞错了")
	}
	l.content[i] = newVal
	return nil
}

// GetAll 返回元素
func (l *List) GetAll() []interface{} {
	return l.content
}
