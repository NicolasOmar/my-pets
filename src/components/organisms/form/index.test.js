import { fireEvent, render, screen } from '@testing-library/react'
import Form from '.'
// MOCKS
import { minimalConfig, withButtons, withErrors } from './index.mocks.json'

const interactWithInput = (input, value) => {
  fireEvent.click(input)
  fireEvent.change(input, { target: { value } })
  fireEvent.blur(input)
}

describe('[Form]', () => {
  test('Should render the component with required props only', () => {
    render(<Form {...minimalConfig} />)
    const minimalForm = screen.getByTestId('form')
    expect(minimalForm).toBeInTheDocument()
  })

  test('Should render with the button group', () => {
    render(<Form {...{ ...minimalConfig, ...withButtons }} />)
    const btnGroupForm = screen.getByTestId('button-group')
    expect(btnGroupForm).toBeInTheDocument()
  })

  test('Should render with errors', () => {
    render(<Form {...{ ...minimalConfig, ...withErrors }} />)
    const errorForm = screen.getByTestId('error-block')
    expect(errorForm).toBeInTheDocument()

    withErrors.errors.graphQLErrors[0].message.split(', ').forEach((_, i) => {
      const errorFormElm = screen.getByTestId(`error-msg-${i}`)
      expect(errorFormElm).toBeInTheDocument()
    })
  })

  test('Should run "submit" form action by setting the correct input values', () => {
    const [{ type, color }] = withButtons.formButtons
    const emailInput = minimalConfig.inputs.email
    const passInput = minimalConfig.inputs.password
    const onFormSubmit = jest.fn()

    render(
      <Form
        {...{
          ...minimalConfig,
          ...withButtons,
          onFormSubmit
        }}
      />
    )

    const email = screen.getByTestId(`${emailInput.control}-${emailInput.type}`)
    const pass = screen.getByTestId(`${passInput.control}-${passInput.type}`)
    const submitBtn = screen.getByTestId(`${type}-ui-button ${color}`)

    interactWithInput(email, 'test@test.com')
    interactWithInput(pass, 'testtest')
    fireEvent.click(submitBtn)
    expect(onFormSubmit).toHaveBeenCalled()
  })

  test('Should not run "submit" form action by setting no valid value on any input', () => {
    const [{ type, color }] = withButtons.formButtons
    const emailInput = minimalConfig.inputs.email
    const emailValues = ['test@test.com', '']
    const onFormSubmit = jest.fn()
    const onInputBlurChange = jest.fn(() => minimalConfig.inputs)

    render(
      <Form
        {...{
          ...minimalConfig,
          ...withButtons,
          onFormSubmit,
          onInputBlurChange
        }}
      />
    )

    const email = screen.getByTestId(`${emailInput.control}-${emailInput.type}`)
    const submitBtn = screen.getByTestId(`${type}-ui-button ${color}`)

    emailValues.forEach(value => interactWithInput(email, value))
    fireEvent.click(submitBtn)
    expect(onFormSubmit).not.toHaveBeenCalled()
  })
})
