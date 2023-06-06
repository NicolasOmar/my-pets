import { render, screen } from '@testing-library/react'
// COMPONENTS
import Icon from '.'
// MOCKS
import mocks from './index.mocks.json'

describe('[Icon]', () => {
  test('Should render the component with required props only', () => {
    render(<Icon />)
    const minimalIcon = screen.getByTestId('test-custom-icon')
    expect(minimalIcon).toBeInTheDocument()
  })

  test('Should render the component with a custom src', () => {
    render(<Icon {...mocks.ghostSrc} />)
    const iconWithImageSrc = screen.getByTestId('test-custom-icon-img')
    expect(iconWithImageSrc).toBeInTheDocument()
    expect(iconWithImageSrc.src).toEqual(mocks.ghostSrc.src)
  })
})
