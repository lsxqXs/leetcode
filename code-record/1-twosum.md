

## twosum

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
你可以按任意顺序返回答案。
示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。


每次把已经出现的第i项加入map，值未i；如果tar - nums[i] 在map中有值直接返回
* 1

```js
let arrs = [3, 2, 4]
	function funcIndex(nums, target) {
		let temp = {};
		for (let i = 0; i < nums.length; i++) {
			let endNum = target - nums[i];
			if (temp.hasOwnProperty(endNum)) {
				return [temp[endNum], i]
			}
			temp[nums[i]] = i
		}
	}
	console.log(funcIndex(arrs, 6));

```
* 2
```go
func toSums(nums []int, tar int) (response []int) {
	maps := make(map[int]int, 0)

	for i := 0; i < len(nums); i++ {
		r := tar - nums[i]
		if _, ok := maps[r]; ok {
			response = append(response, maps[r], i)
			break
		}
		maps[nums[i]] = i
	}

	return
}

```

