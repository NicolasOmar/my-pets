import { render, screen } from '@testing-library/react'
import BasicButton from '.'

describe('[BasicButton] => [HAPPY PATH]', () => {
  test('Renders using required props only', () => {
    const props = {
      type: 'button',
      label: 'Test'
    }
    render(<BasicButton {...props} />)
    const element = screen.getByText(props.label)
    expect(element).toBeInTheDocument()
  })
})
