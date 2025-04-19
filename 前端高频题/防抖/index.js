/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function (fn, t) {
  let timer;
  return function (...args) {
    const context = this;
    timer && clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, t);
  };
};

module.exports = debounce;
