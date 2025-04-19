/*
请将以下 async/await 代码，换一种方式实现，保证异步等待功能和输出顺序：

function delay(ms, data) {
  return new Promise((resolve) => setTimeout(resolve, ms, data));
}

const func = async () => {
  const data = await delay(2000, "A");
  console.log(data);
  const res = await delay(2000, "B");
  console.log(res);
};

func();
 */

/*
const func = async () => {
  const data = await delay(2000, "A");
  console.log(data);
  const res = await delay(2000, "B");
  console.log(res);
};
会被编译为 generator 方法：
const func = function* () {
  const data = yield delay(2000, "A");
  console.log(data);
  const res = yield delay(2000, "B");
  console.log(res);
}
*/
function asyncToGenerator(generatorFun) {
  return function (...args) {
    const iterator = generatorFun.apply(this, args);
    return new Promise((resolve, reject) => {
      const NEXT = "next";
      const THROW = "throw";
      function _step(method, args) {
        let result;
        try {
          result = iterator[method](...args);
        } catch (error) {
          reject(error);
        }

        const { value, done } = result;
        if (done) {
          resolve(value);
        } else {
          // ，使用 Promise.resolve 可以接受一个 Promise 对象，而这个 value 就是一个 Promise 对象
          return Promise.resolve(value).then(
            function onFulFilled(value) {
              _step(NEXT, value);
            },
            function onRejected(reason) {
              _step(THROW, reason);
            },
          );
        }
      }
      _step(NEXT, args);
    });
  };
}

const getData = () =>
  new Promise((resolve) => setTimeout(() => resolve("data"), 1000));
function* testG() {
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}

const gen = asyncToGenerator(testG);
gen().then((res) => console.log(res));
