import { vi, test, describe, expect } from 'vitest'
import { debouncer } from '../methods'

describe('[Functions.methods]', () => {
  test('debouncer delays function execution', (done: () => void) => {
    let callCount = 0
    const fn = vi.fn(() => {
      callCount++
    })
    const debounced = debouncer(fn, 100)
    debounced()
    debounced()
    debounced()
    expect(callCount).toBe(0)
    setTimeout(() => {
      expect(fn).toHaveBeenCalledTimes(1)
      done()
    }, 150)
  })

  test('debouncer uses latest arguments', (done: () => void) => {
    const fn = vi.fn()
    const debounced = debouncer(fn, 50)
    debounced('first')
    debounced('second')
    setTimeout(() => {
      expect(fn).toHaveBeenCalledWith('second')
      done()
    }, 100)
  })
})
