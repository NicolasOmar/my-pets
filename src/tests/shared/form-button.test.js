import { render, screen } from '@testing-library/react'
import FormButton from '../../app/shared/form-button/form-button'

test('Renders a FormButton using required props only', () => {
  const props = {
    type: 'button',
    label: 'Test'
  }
  render(<FormButton config={props} />)
  const element = screen.getByText(props.label)
  expect(element).toBeInTheDocument()
})
