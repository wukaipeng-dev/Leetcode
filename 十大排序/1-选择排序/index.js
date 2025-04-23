/**
 * 选择排序
 * @param {Array} arr - 需要排序的数组
 * @param {Function} compareFn - 比较函数，默认按升序排序
 * @returns {Array} 排序后的数组
 */
function selectionSort(arr, compareFn = (a, b) => a - b) {
  for (let i = 0; i < arr.length - 1; i++) {
    let extremeValueIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (compareFn(arr[extremeValueIndex], arr[j]) > 0) {
        extremeValueIndex = j;
      }
    }
    if (extremeValueIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[extremeValueIndex];
      arr[extremeValueIndex] = temp;
    }
  }

  return arr;
}

module.exports = selectionSort;
