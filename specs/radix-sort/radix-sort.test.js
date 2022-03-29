/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/
const getDigit = (num, place) => {
  const numString = num.toString()
  if (numString.length < place + 1) {
    return 0
  } else {
    return parseInt(numString[numString.length - 1 - place])
  }
}

const createQueue = (array, groups) => {
  for (let group of groups) {
    if (group) {
      for (let num of group) {
        array.push(num)
      }
    }
  }
  return array
}

function radixSort(array) {
  // code goes here
  let maxDigits = 0
  for (let num of array) {
    maxDigits = Math.max(maxDigits, num.toString().length)
  }

  for (let i = 0; i < maxDigits; i++) {
    let groups = [[], [], [], [], [], [], [], [], [], []]

    while (array.length > 0) {
      let num = array.shift()
      let digit = getDigit(num, i)
      groups[digit].push(num)
    }
    array = createQueue(array, groups)
  }

  return array
}

// unit tests
// do not modify the below code
describe('radix sort', function () {
  it('should sort correctly', () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633,
    ]
    const ans = radixSort(nums)
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001,
    ])
  })
  it('should sort 99 random numbers correctly', () => {
    const fill = 99
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000))
    const ans = radixSort([...nums])
    // I had to change the sort() here because without parameters it sorts lexicographically
    expect(ans).toEqual(nums.sort((a, b) => a - b))
  })
})
