const debounce = require('./index');

// Mock timer functions
jest.useFakeTimers();

describe('debounce function', () => {
  let fn;
  let debouncedFn;

  beforeEach(() => {
    // Create a new spy function before each test
    fn = jest.fn();
    // Clear all timers
    jest.clearAllTimers();
  });

  test('Example 1: should debounce function calls with t = 50ms', () => {
    debouncedFn = debounce(fn, 50);
    
    // First call at t = 50ms
    setTimeout(() => debouncedFn(1), 50);
    // Second call at t = 75ms
    setTimeout(() => debouncedFn(2), 75);

    // Fast forward time to 124ms
    jest.advanceTimersByTime(124);
    expect(fn).not.toBeCalled();

    // Fast forward time to 125ms
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(2);
  });

  test('Example 2: should debounce function calls with t = 20ms', () => {
    debouncedFn = debounce(fn, 20);
    
    // First call at t = 50ms
    setTimeout(() => debouncedFn(1), 50);
    // Second call at t = 100ms
    setTimeout(() => debouncedFn(2), 100);

    // Fast forward time to 69ms
    jest.advanceTimersByTime(69);
    expect(fn).not.toBeCalled();

    // Fast forward time to 70ms
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(1);

    // Fast forward time to 119ms
    jest.advanceTimersByTime(49);
    expect(fn).toHaveBeenCalledTimes(1);

    // Fast forward time to 120ms
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(2);
  });

  test('Example 3: should debounce function calls with t = 150ms and multiple parameters', () => {
    debouncedFn = debounce(fn, 150);
    
    // First call at t = 50ms
    setTimeout(() => debouncedFn(1, 2), 50);
    // Second call at t = 300ms
    setTimeout(() => debouncedFn(3, 4), 300);
    // Third call at t = 300ms
    setTimeout(() => debouncedFn(5, 6), 300);

    // Fast forward time to 199ms
    jest.advanceTimersByTime(199);
    expect(fn).not.toBeCalled();

    // Fast forward time to 200ms
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(1, 2);

    // Fast forward time to 449ms
    jest.advanceTimersByTime(249);
    expect(fn).toHaveBeenCalledTimes(1);

    // Fast forward time to 450ms
    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith(5, 6);
  });

  test('should handle edge cases', () => {
    debouncedFn = debounce(fn, 0);
    debouncedFn(1);
    
    // Even with 0ms delay, the execution is still async
    expect(fn).not.toBeCalled();
    
    // Fast forward all pending timers
    jest.runAllTimers();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenLastCalledWith(1);
  });

  test('should maintain the correct context', () => {
    const context = {
      value: 'test',
      method: function(param) {
        fn(this.value, param);
      }
    };

    const debouncedMethod = debounce(context.method.bind(context), 50);
    debouncedMethod('param');

    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledWith('test', 'param');
  });
}); 