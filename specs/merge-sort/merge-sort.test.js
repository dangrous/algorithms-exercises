/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const mergeSort = (nums) => {
  if (nums.length <= 1) {
    return nums
  } else {
    const half = Math.floor(nums.length / 2)
    const left = nums.slice(0, half)
    const right = nums.slice(half)
    const result = merge(mergeSort(left), mergeSort(right))
    return result
  }
}

const merge = (nums1, nums2) => {
  const result = []
  while (nums1.length && nums2.length) {
    if (nums1[0] < nums2[0]) {
      result.push(nums1.shift())
    } else {
      result.push(nums2.shift())
    }
  }

  return result.concat(nums1, nums2)
}

// unit tests
// do not modify the below code
test('merge sort', function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1]
  const ans = mergeSort(nums)
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
})
