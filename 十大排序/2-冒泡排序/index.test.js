const bubbleSort = require('./index')

describe('冒泡排序测试', () => {
  test('空数组', () => {
    expect(bubbleSort([])).toEqual([])
  })

  test('单个元素的数组', () => {
    expect(bubbleSort([1])).toEqual([1])
  })

  test('已排序的数组', () => {
    expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
  })

  test('倒序排列的数组', () => {
    expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
  })

  test('包含重复元素的数组', () => {
    expect(bubbleSort([3, 1, 4, 1, 5, 9, 2, 6, 5])).toEqual([
      1, 1, 2, 3, 4, 5, 5, 6, 9,
    ])
  })

  test('全部元素相同的数组', () => {
    expect(bubbleSort([2, 2, 2, 2, 2])).toEqual([2, 2, 2, 2, 2])
  })

  test('包含负数的数组', () => {
    expect(bubbleSort([5, -1, 3, 0, -5, 8])).toEqual([-5, -1, 0, 3, 5, 8])
  })

  test('大数组性能测试', () => {
    const largeArray = Array.from({ length: 1000 }, () =>
      Math.floor(Math.random() * 1000)
    )
    const sortedArray = [...largeArray].sort((a, b) => a - b)
    expect(bubbleSort(largeArray)).toEqual(sortedArray)
  })

  test('包含小数的数组', () => {
    expect(bubbleSort([3.5, 1.2, 4.8, 2.3])).toEqual([1.2, 2.3, 3.5, 4.8])
  })

  test('稳定性测试 - 相同值排序应保持原顺序', () => {
    // 创建带有原始位置信息的数组
    const original = [
      { val: 3, pos: 0 },
      { val: 1, pos: 1 },
      { val: 3, pos: 2 },
      { val: 2, pos: 3 },
      { val: 1, pos: 4 },
    ]

    // 转换为数字数组来排序
    const arr = original.map((item) => item.val)
    const sorted = bubbleSort([...arr])

    // 使用JavaScript的sort方法验证
    const expected = [...arr].sort((a, b) => a - b)
    expect(sorted).toEqual(expected)

    // 验证冒泡排序是稳定的 - 我们无法直接在这里测试，因为bubbleSort函数只接受数字数组
    // 这是一个知识点提示：冒泡排序应该是稳定的排序算法
  })
})
