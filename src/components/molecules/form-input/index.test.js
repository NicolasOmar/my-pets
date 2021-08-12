import { render, screen } from '@testing-library/react'
import FormInput from '.'

describe.skip('[FormInput]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with required props only', () => {
      const config = {
        inputLabel: 'Test',
        inputConfig: {
          label: 'Test',
          type: 'text',
          control: 'test',
          onInputChange: () => {}
        }
      }
      render(<FormInput {...config} />)
      const element = screen.getByText(config.inputLabel)
      expect(element).toBeInTheDocument()
    })
  })
})
