function resolvePromise(promise, x, resolve, reject) {
  if (x instanceof Promise) {
    const then = x.then;
    if (x.status === Promise.PENDING) {
      then.call(
        x,
        (value) => {
          resolvePromise(promise, y, resolve, reject);
        },
        (reason) => {
          reject(reason);
        },
      );
    } else {
      x.then(resolve, reject);
    }
  } else {
    resolve(x);
  }
}
class Promise {
  static PENDING = "PENDING";
  static FULFILLED = "FULFILLED";
  static REJECTED = "REJECTED";

  status = undefined;
  value = undefined;
  reason = undefined;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  constructor(executor) {
    this.status = Promise.PENDING;

    const resolve = (value) => {
      if (this.status !== Promise.PENDING) return; // ⚠️

      this.status = Promise.FULFILLED;
      this.value = value;
      this.onFulfilledCallbacks.map((fn) => fn(this.value));
    };

    const reject = (reason) => {
      if (this.status !== Promise.PENDING) return;

      this.status = Promise.REJECTED;
      this.reason = reason;
      this.onRejectedCallbacks.map((fn) => fn(this.reason));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // then(fulfilledCallback) { // ⚠️
  //   this.onFulfilledCallbacks.push(fulfilledCallback);
  // }

  // catch(rejectedCallback) {
  //   this.reject.push(rejectedCallback);
  // }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise = new Promise((resolve, reject) => {
      if (this.status === Promise.FULFILLED) {
        setTimeout(() => {
          const x = onFulfilled(this.value);
          resolvePromise(promise, x, resolve, reject);
        });
      }
      if (this.status === Promise.REJECTED) {
        setTimeout(() => {
          const x = onRejected(this.reason);
          resolvePromise(promise, x, resolve, reject);
        });
      }
      if (this.status === Promise.PENDING) {
        this.onFulfilledCallbacks.push((value) => {
          setTimeout(() => {
            const x = onFulfilled(value);
            resolvePromise(promise, x, resolve, reject);
          });
        });
        this.onRejectedCallbacks.push((reason) => {
          setTimeout(() => {
            const x = onRejected(reason);
            resolvePromise(promise, x, resolve, reject);
          });
        });
      }
    });
    return promise;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(fn) {
    return this.then(fn, fn);
  }

  static resolve(value) {
    return new Promise((resolve) => {
      resolve(value);
    });
  }

  static all(promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let count = 0;
      for (let i = 0; i < promises.length; i++) {
        promise.then(
          (value) => {
            results[i] = value;
            count++;
            if (count === promises.length) {
              resolve(results);
            }
          },
          (reason) => {
            reject(reason);
          },
        );
      }
    });
  }
}

// 测试用例
// (1) 基本使用
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

// (2) 异步操作
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 1000);
}).then(
  (data) => {
    console.log("success", data);
  },
  (err) => {
    console.log("faild", err);
  },
);

// (3) 链式调用
const promise2 = new Promise((resolve, reject) => {
  reject("失败");
})
  .then()
  .then()
  .then(
    (data) => {
      console.log(data);
    },
    (err) => {
      console.log("err", err);
    },
  );

// (4) Promise.resolve
Promise.resolve(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("ok");
    }, 3000);
  }),
)
  .then((data) => {
    console.log(data, "success");
  })
  .catch((err) => {
    console.log(err, "error");
  });

// (5) Promise.prototype.finally
Promise.resolve(456)
  .finally(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(123);
      }, 3000);
    });
  })
  .then((data) => {
    console.log(data, "success");
  })
  .catch((err) => {
    console.log(err, "error");
  });

// (6) Promise.all
let p4 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("ok1");
  }, 1000);
});

let p5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("ok2");
  }, 1000);
});

Promise.all([1, 2, 3, p4, p5]).then(
  (data) => {
    console.log("resolve", data);
  },
  (err) => {
    console.log("reject", err);
  },
);
