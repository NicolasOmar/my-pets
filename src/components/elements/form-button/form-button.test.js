import { render, screen } from '@testing-library/react'
import FormButton from './form-button'

describe('[FormButton]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders using required props only', () => {
      const props = {
        type: 'button',
        label: 'Test'
      }
      render(<FormButton config={props} />)
      const element = screen.getByText(props.label)
      expect(element).toBeInTheDocument()
    })
  })
})
