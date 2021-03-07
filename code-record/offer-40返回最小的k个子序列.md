
### 剑指 Offer 40. 最小的k个数

归并排序
返回前k个子数组

```go
/* 
    1. 适用归并排序
    2. 返回0-k的切片
 */

func mergerSort(arrays []int) (result []int) {
	if len(arrays) <= 1 {
		return arrays
	}

	m := len(arrays) / 2
	left := mergerSort(arrays[0:m])
	right := mergerSort(arrays[m:])
	l, r := 0, 0

	for l < len(left) && r < len(right) {

		if left[l] < right[r] {
			result = append(result, left[l])
			l++
		} else {
			result = append(result, right[r])
			r++
		}
	}

	result = append(result, right[r:]...)
	result = append(result, left[l:]...)
	return result
}

func getLeastNumbers(arr []int, k int) []int {

	return mergerSort(arr)[0:k]
}

```