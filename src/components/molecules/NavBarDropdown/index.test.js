// MOCKS
import { render, screen } from '@testing-library/react'
import NavBarDropdown from '.'
import { minimalConfig, withOneItem, withSeveralItems } from './index.mocks.json'

describe('[NavBarDropdown]', () => {
  test('Should render the component with required props only', () => {
    render(<NavBarDropdown {...minimalConfig} />)
    const testSection = screen.getByTestId('navbar-dropdown')
    const testLabel = screen.getByTestId('navbar-dropdown-label')
    const testLabelText = screen.getByText(minimalConfig.label)

    expect(testSection).toBeInTheDocument()
    expect(testLabel).toBeInTheDocument()
    expect(testLabelText).toBeInTheDocument()
  })

  test('Should render with one and many options', () => {
    render(<NavBarDropdown {...withOneItem} />)

    withOneItem.options.forEach(({ itemLabel }) => {
      const testOptionLabel = screen.getByText(itemLabel)
      expect(testOptionLabel).toBeInTheDocument()
    })
  })
})
