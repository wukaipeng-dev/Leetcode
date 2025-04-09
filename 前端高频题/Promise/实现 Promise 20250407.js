// Write you code
const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";

class Promise {
  status = undefined;
  value = undefined;
  reason = undefined;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    function resolve(value) {
      this.status = FULFILLED;
      this.value = value;
      onFulfilledCallbacks.map((fn) => fn(value));
    }

    function reject(reason) {
      this.status = REJECTED;
      this.reason = reason;
      onRejectedCallbacks.map((fn) => fn(reason));
    }

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
}

const p1 = new Promise((resolve, reject) => {
  console.log("create a promise");
  resolve("成功了");
});

console.log("after new promise");

const p2 = p1.then((data) => {
  console.log(data);
  throw new Error("失败了");
});

const p3 = p2.then(
  (data) => {
    console.log("success", data);
  },
  (err) => {
    console.log("faild", err);
  },
);
