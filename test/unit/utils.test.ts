import { describe, it, expect } from 'vitest'

describe('Basic Unit Test', () => {
  it('should confirm that unit testing is working', () => {
    expect(true).toBe(true)
  })

  it('should add numbers correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('should compare strings', () => {
    expect('hello').toBe('hello')
  })
})
