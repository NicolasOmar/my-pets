import { describe, test, expect } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import Message from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[Message]', () => {
  const { minimalConfig } = testing

  test('Should render the component with required props only', () => {
    render(<Message {...minimalConfig} />)
    const minimalMsgBlock = screen.getByTestId(`test-${minimalConfig.msgType}-msg`)
    expect(minimalMsgBlock).toBeInTheDocument()
  })

  test('Should throw an error trying to render the component without required props only', () => {
    render(<Message {...{ msgType: minimalConfig.msgType }} />)
    expect(() => screen.getByTestId(`test-${minimalConfig.msgType}-msg`)).toThrow()
  })

  test('Should render the component with header', () => {
    render(<Message {...{ ...minimalConfig, headerText: 'test' }} />)
    const headerMsgBlock = screen.getByTestId(`test-${minimalConfig.msgType}-message-header`)
    expect(headerMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with a error msg', () => {
    render(<Message {...minimalConfig} />)
    const singleMsgBlock = screen.getByTestId(`test-${minimalConfig.msgType}-msg`)
    expect(singleMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with several messages', () => {
    const messages = Array(5)
      .fill(null)
      .map((_, i) => `test-${++i}`)

    render(<Message {...{ ...minimalConfig, messages }} />)

    messages.forEach((_, i) => {
      const multipleMsgBlock = screen.getByTestId(`test-${minimalConfig.msgType}-msg-${i}`)
      expect(multipleMsgBlock).toBeInTheDocument()
    })
  })
})
