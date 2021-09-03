import { render, screen } from '@testing-library/react'
// COMPONENTS
import MessageBlock from '.'
// MOCKS
import { minimalConfig } from './index.mocks.json'

describe('[MessageBox]', () => {
  test('Should render the component with required props only', () => {
    render(<MessageBlock {...minimalConfig} />)
    const minimalMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-block`)
    expect(minimalMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with header', () => {
    render(<MessageBlock {...{ ...minimalConfig, header: 'test' }} />)
    const headerMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-header`)
    expect(headerMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with a error msg', () => {
    render(<MessageBlock {...minimalConfig} />)
    const singleMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-msg`)
    expect(singleMsgBlock).toBeInTheDocument()
  })

  test('Should render the component with header', () => {
    const errors = Array(5)
      .fill(null)
      .map((_, i) => `test-${++i}`)
    render(<MessageBlock {...{ ...minimalConfig, errors }} />)

    errors.forEach((_, i) => {
      const multipleMsgBlock = screen.getByTestId(`${minimalConfig.msgType}-msg-${i}`)
      expect(multipleMsgBlock).toBeInTheDocument()
    })
  })
})
