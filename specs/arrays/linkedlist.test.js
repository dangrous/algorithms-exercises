/*
  LinkedList
  
  Name your class / constructor (something you can call new on) LinkedList
  
  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.
  
  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value
                      
  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }

  push(value) {
    const newNode = new Node(value)

    if (!this.head) {
      this.head = newNode
    } else {
      this.tail.next = newNode
    }

    this.tail = newNode
    this.length++
  }

  pop() {
    if (!this.head) return null

    if (this.head === this.tail) {
      const value = this.head.value
      this.head = null
      this.tail = null
      return value
    }

    let pointer = this.head
    while (pointer.next !== this.tail) {
      pointer = pointer.next
    }
    pointer.next = null

    const value = this.tail.value

    this.tail = pointer

    this.length--

    return value
  }

  get(index) {
    if (index > this.length) return -1

    let pointer = this.head
    while (index > 0) {
      pointer = pointer.next
      index--
    }

    return pointer.value
  }

  delete(index) {
    if (index > this.length) return -1

    this.length--

    let pointer = this.head

    if (index === 0) {
      this.head = pointer.next
      return pointer.value
    }

    while (index > 1) {
      pointer = pointer.next
      index--
    }

    const toDelete = pointer.next

    pointer.next = toDelete.next

    if (toDelete === this.tail) this.tail = pointer

    return toDelete.value
  }
}

class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

// unit tests
// do not modify the below code
describe('LinkedList', function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number)
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num))
  let list

  beforeEach(() => {
    list = new LinkedList()
  })

  test('constructor', () => {
    expect(list).toEqual(expect.any(LinkedList))
  })

  test('push', () => {
    abcRange(26).map((character) => list.push(character))
    expect(list.length).toEqual(26)
  })

  test('pop', () => {
    abcRange(13).map((character) => list.push(character))
    expect(list.length).toEqual(13)
    range(10).map(() => list.pop())
    expect(list.length).toEqual(3)
    expect(list.pop()).toEqual('c')
  })

  test('get', () => {
    list.push('first')
    expect(list.get(0)).toEqual('first')
    list.push('second')
    expect(list.get(1)).toEqual('second')
    expect(list.get(0)).toEqual('first')
    abcRange(26).map((character) => list.push(character))
    expect(list.get(27)).toEqual('z')
    expect(list.get(0)).toEqual('first')
    expect(list.get(9)).toEqual('h')
    list.pop()
    expect(list.get(list.length - 1)).toEqual('y')
  })

  test('delete', () => {
    abcRange(26).map((character) => list.push(character))
    list.delete(13)
    expect(list.length).toEqual(25)
    expect(list.get(12)).toEqual('m')
    expect(list.get(13)).toEqual('o')
    list.delete(0)
    expect(list.length).toEqual(24)
    expect(list.get(0)).toEqual('b')
  })
})
