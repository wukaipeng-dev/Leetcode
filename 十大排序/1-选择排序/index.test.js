const selectionSort = require('./index')

describe('选择排序测试', () => {
  test('空数组', () => {
    expect(selectionSort([])).toEqual([])
  })

  test('单个元素的数组', () => {
    expect(selectionSort([1])).toEqual([1])
  })

  test('已排序的数组', () => {
    expect(selectionSort([1, 2, 3, 4, 5], (a, b) => a - b)).toEqual([
      1, 2, 3, 4, 5,
    ])
  })

  test('倒序排列的数组', () => {
    expect(selectionSort([5, 4, 3, 2, 1], (a, b) => a - b)).toEqual([
      1, 2, 3, 4, 5,
    ])
  })

  test('包含重复元素的数组', () => {
    expect(selectionSort([3, 1, 4, 1, 5, 9, 2, 6, 5], (a, b) => a - b)).toEqual(
      [1, 1, 2, 3, 4, 5, 5, 6, 9]
    )
  })

  test('全部元素相同的数组', () => {
    expect(selectionSort([2, 2, 2, 2, 2], (a, b) => a - b)).toEqual([
      2, 2, 2, 2, 2,
    ])
  })

  test('包含负数的数组', () => {
    expect(selectionSort([5, -1, 3, 0, -5, 8], (a, b) => a - b)).toEqual([
      -5, -1, 0, 3, 5, 8,
    ])
  })

  test('大数组性能测试', () => {
    const largeArray = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 1000)
    )
    const sortedArray = [...largeArray].sort((a, b) => a - b)
    expect(selectionSort(largeArray, (a, b) => a - b)).toEqual(sortedArray)
  })

  test('包含小数的数组', () => {
    expect(selectionSort([3.5, 1.2, 4.8, 2.3], (a, b) => a - b)).toEqual([
      1.2, 2.3, 3.5, 4.8,
    ])
  })

  test('使用默认比较函数时的行为', () => {
    const arr = [10, 5, 8, 3, 1]
    // 没有提供比较函数时，应该有默认行为
    expect(selectionSort(arr)).toEqual([1, 3, 5, 8, 10])
  })

  test('降序排序', () => {
    const arr = [1, 5, 3, 9, 7]
    expect(selectionSort(arr, (a, b) => b - a)).toEqual([9, 7, 5, 3, 1])
  })

  test('对象数组排序', () => {
    const arr = [
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]
    const sorted = selectionSort(arr, (a, b) => a.id - b.id)
    expect(sorted).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ])
  })

  test('字符串数组排序', () => {
    const arr = ['banana', 'apple', 'pear', 'orange']
    expect(selectionSort(arr, (a, b) => a.localeCompare(b))).toEqual([
      'apple',
      'banana',
      'orange',
      'pear',
    ])
  })

  test('稳定性测试说明', () => {
    const arr = [
      { value: 1, id: 1 },
      { value: 1, id: 2 },
      { value: 2, id: 3 },
    ]
    const sorted = selectionSort(arr, (a, b) => a.value - b.value)
    expect(sorted).toEqual([
      { value: 1, id: 1 },
      { value: 1, id: 2 },
      { value: 2, id: 3 },
    ])
  })
})
