import { render, screen } from '@testing-library/react'
import BasicButton from './basic-button'

describe('[BasicButton]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders using required props only', () => {
      const props = {
        type: 'button',
        label: 'Test'
      }
      render(<BasicButton config={props} />)
      const element = screen.getByText(props.label)
      expect(element).toBeInTheDocument()
    })
  })
})
