import { render, screen } from '@testing-library/react'
// COMPONENT
import Title from '.'
// MOCKS
import { minimalConfig, titleWithSubTitle, centerMainAndSubTitle } from './index.mocks.json'

describe('[Title]', () => {
  test('Should render the component with required props only', () => {
    render(<Title {...minimalConfig} />)
    const element = screen.getByText(minimalConfig.title)
    expect(element).toBeInTheDocument()
  })

  test('Should render the component with both main and sub titles', () => {
    render(<Title {...titleWithSubTitle} />)

    Object.keys(titleWithSubTitle).forEach(key => {
      const element = screen.getByText(titleWithSubTitle[key])
      expect(element).toBeInTheDocument()
    })
  })

  test('Should render the component with both main and sub title centered', () => {
    const centerClasses = ['center aligned', 'subtitle-centered']
    render(<Title {...centerMainAndSubTitle} />)

    Object.keys(centerMainAndSubTitle).forEach((key, i) => {
      if (i < 2) {
        const element = screen.getByText(centerMainAndSubTitle[key])
        expect(element.className).toEqual(expect.stringContaining(centerClasses[i]))
      }
    })
  })
})
