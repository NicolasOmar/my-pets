import { render, screen } from '@testing-library/react'
import FormInput from './form-input'

describe('[FormInput]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with required props only', () => {
      const props = {
        label: 'Test',
        type: 'text',
        control: 'test',
        onInputChange: () => {}
      }
      render(<FormInput config={props} />)
      const element = screen.getByText(props.label)
      expect(element).toBeInTheDocument()
    })
  })
})
