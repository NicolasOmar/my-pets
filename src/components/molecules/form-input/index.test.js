import { render, screen } from '@testing-library/react'
import FormInput from '.'

describe('[FormInput]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with required props only', () => {
      const config = {
        inputLabel: 'Test',
        inputConfig: {
          type: 'text',
          control: 'test'
        }
      }
      render(<FormInput {...config} />)
      const element = screen.getByText(config.inputLabel)
      expect(element).toBeInTheDocument()
    })
  })
})
