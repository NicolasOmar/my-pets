import { render, screen } from '@testing-library/react'
import FormTemplate from '.'
// CONFIG AS MOCK
import LoginPageConfigMock from '../../pages/LoginPage/config.json'

describe('[FormTemplate]', () => {
  test('Should render the component with required props only', () => {
    render(<FormTemplate {...LoginPageConfigMock} />)
    const formElement = screen.getByTestId('form')
    expect(formElement).toBeInTheDocument()
  })
})
