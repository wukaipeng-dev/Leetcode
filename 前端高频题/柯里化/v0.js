// Leetcode：https://leetcode.cn/problems/curzry/description/
// Leetcode Wiki: https://leetcode.doocs.org/lc/2632/

function curry(fn) {
  // Resolve by yourself
  return function curried(...args) {
    
  };
}

// Test Case 1
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

const r1 = curriedAdd(1)(2)(3);
if (r1 !== 6) {
  throw new Error('Test Case 1 Failed');
}

// Test Case 2
const add2 = (a, b) => a + b;
const curriedAdd2 = curry(add2);

const r2 = curriedAdd2(1)(2);
if (r2 !== 3) {
  throw new Error('Test Case 2 Failed');
}

// Test Case 3
const add3 = (a, b, c, d) => a + b + c + d;
const curriedAdd3 = curry(add3);

const r3 = curriedAdd3(1)(2)(3)(4);
if (r3 !== 10) {
  throw new Error('Test Case 3 Failed');
}