import { render, screen } from '@testing-library/react'
// COMPONENTS
import Divider from '.'
// CONSTANTS
import { textColors } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

describe('[Divider]', () => {
  test('Should render the component with required props only', () => {
    render(<Divider />)
    const minimalDivider = screen.getByTestId('test-divider-white')
    expect(minimalDivider).toBeInTheDocument()
  })

  test('Should render with a different color', () => {
    const colors = parseObjKeys(textColors)

    colors.forEach(color => {
      render(<Divider {...{ color }} />)
      const coloredDivider = screen.getByTestId(`test-divider-${color}`)
      expect(coloredDivider).toBeInTheDocument()
    })
  })
})
