import React from 'react'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
// COMPONENT
import TitleHeader from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[TitleHeader]', () => {
  const { minimalConfig, titleWithSubTitle, centerMainAndSubTitle } = testing

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
