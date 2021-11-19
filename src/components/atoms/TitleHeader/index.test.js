import { render, screen } from '@testing-library/react'
// COMPONENT
import TitleHeader from '.'
// MOCKS
import { minimalConfig, titleWithSubTitle, centerMainAndSubTitle } from './index.mocks.json'

describe('[TitleHeader]', () => {
  test('Should render the component with required props only', () => {
    render(<TitleHeader {...minimalConfig} />)
    const minimalTitle = screen.getByText(minimalConfig.titleText)
    expect(minimalTitle).toBeInTheDocument()
  })

  test('Should render the component with both main and sub titles', () => {
    render(<TitleHeader {...titleWithSubTitle} />)

    Object.keys(titleWithSubTitle).forEach(key => {
      const completeTitle = screen.getByText(titleWithSubTitle[key])
      expect(completeTitle).toBeInTheDocument()
    })
  })

  test('Should render the component with both main and sub title centered', () => {
    const centerClass = 'has-text-centered'
    render(<TitleHeader {...centerMainAndSubTitle} />)

    Object.keys(centerMainAndSubTitle).forEach((key, i) => {
      if (i < 2) {
        const centeredTitle = screen.getByText(centerMainAndSubTitle[key])
        expect(centeredTitle.className).toEqual(expect.stringContaining(centerClass))
      }
    })
  })
})
