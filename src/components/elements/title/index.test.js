import { render, screen } from '@testing-library/react'
// COMPONENT
import Title from '.'
// MOCKS
import { minimalConfig, titleWithSubTitle } from './index.mocks.json'

describe('[Title]', () => {
  test('Should render the component with required props only', () => {
    render(<Title {...minimalConfig} />)
    const element = screen.getByText(minimalConfig.title)
    expect(element).toBeInTheDocument()
  })

  test('Should render the component with both main and subTitle', () => {
    render(<Title {...titleWithSubTitle} />)

    Object.keys(titleWithSubTitle).forEach(key => {
      const element = screen.getByText(titleWithSubTitle[key])
      expect(element).toBeInTheDocument()
    })
  })
})
