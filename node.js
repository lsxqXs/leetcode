
function majorityElement(nums) {
  return majorityElementRec(nums, 0, nums.length - 1);
}

function majorityElementRec(nums, low, high) {
  if (low === high) {
    return nums[low];
  }

  let mid = Math.floor((high - low) / 2) + low;

  let left = majorityElementRec(nums, low, mid);
  let right = majorityElementRec(nums, mid + 1, high);

  if (left === right) return left;

  let leftCount = countInRange(nums, left, low, high);
  let rightCount = countInRange(nums, right, low, high);
  // console.log(leftCount, rightCount);
  return leftCount > rightCount ? left : right;
}

function countInRange(nums, num, low, high) {
  let count = 0;
  for (let i = low; i <= high; i++) {
    if (nums[i] === num) {
      count++;
    }
  }
  return count;
}

let arr = [2, 2, 3, 3, 3, 3, 2]

console.log(majorityElement(arr));