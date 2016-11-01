/* global describe, test, expect, jest, beforeEach */

import { displayVisibility } from './messages'

describe('displayVisibility', () => {
  test('has last one open', () => {
    const messages = [
      { id: 1, unread: false },
      { id: 2, unread: false },
      { id: 3, unread: true },
    ]

    const expectedVisibility = {
      1: 'closed',
      2: 'closed',
      3: 'open',
    }

    expect(displayVisibility(messages)).toEqual(expectedVisibility)
  })

  test('all are unread', () => {
    const messages = [
      { id: 1, unread: true },
      { id: 2, unread: true },
      { id: 3, unread: true },
    ]

    const expectedVisibility = {
      1: 'open',
      2: 'open',
      3: 'open',
    }

    expect(displayVisibility(messages)).toEqual(expectedVisibility)
  })

  test('all are read', () => {
    const messages = [
      { id: 1, unread: false },
      { id: 2, unread: false },
      { id: 3, unread: false },
    ]

    const expectedVisibility = {
      1: 'closed',
      2: 'closed',
      3: 'open',
    }

    expect(displayVisibility(messages)).toEqual(expectedVisibility)
  })

  test('all are read 2', () => {
    const messages = [{ id: 1, unread: false }]
    const expectedVisibility = { 1: 'open' }
    expect(displayVisibility(messages)).toEqual(expectedVisibility)
  })

  test('should collapse 3 or more grouped read message', () => {
    const messages = [
      { id: 1, unread: false },
      { id: 2, unread: false },
      { id: 3, unread: false },
      { id: 4, unread: false },
      { id: 5, unread: false },
      { id: 6, unread: false },
    ]

    const expectedVisibility = {
      1: 'closed',
      2: 'collapsed',
      3: 'collapsed',
      4: 'collapsed',
      5: 'closed',
      6: 'open',
    }

    expect(displayVisibility(messages)).toEqual(expectedVisibility)
  })
})
