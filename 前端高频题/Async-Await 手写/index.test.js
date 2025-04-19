const { delay, func } = require('./index')

describe('Async/await implementation', () => {
  jest.useFakeTimers()

  test('should output values in correct order with proper delays', async () => {
    const consoleSpy = jest.spyOn(console, 'log')

    const promise = func()

    // Fast-forward time by 2000ms for first delay
    jest.advanceTimersByTime(2000)
    await Promise.resolve() // Let any pending promises resolve
    expect(consoleSpy).toHaveBeenCalledWith('A')

    // Fast-forward time by another 2000ms for second delay
    jest.advanceTimersByTime(2000)
    await Promise.resolve() // Let any pending promises resolve
    expect(consoleSpy).toHaveBeenCalledWith('B')

    await promise
    consoleSpy.mockRestore()
  })
})
