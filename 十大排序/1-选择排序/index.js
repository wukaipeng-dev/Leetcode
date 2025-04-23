/**
 * 选择排序
 * @param {Array} arr - 需要排序的数组
 * @param {Function} compareFn - 比较函数，默认按升序排序
 * @returns {Array} 排序后的数组
 */
function selectionSort(arr, compareFn = (a, b) => a - b) {
  if (arr.length <= 1) return arr;

  for (let i = 0; i < arr.length - 1; i++) {
    let extremeValueIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (compareFn(arr[extremeValueIndex], arr[j]) > 0) {
        extremeValueIndex = j;
      }
    }
    swap(arr, i, extremeValueIndex);
  }

  return arr;
}

function swap(arr, i, j) {
  if (i === j) return;
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

module.exports = selectionSort;
