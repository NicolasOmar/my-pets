import React from 'react'
import { describe, test, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
// COMPONENTS
import Card from '.'
// MOCKS
import { testing } from './index.mocks.json'

describe('[Card]', () => {
  const { testCardContent, testBaseImage, testFooterItems } = testing

  test('Should render the component with required props only', () => {
    render(<Card cardContent={testCardContent} />)
    expect(screen.getByTestId('test-card-content')).toBeInTheDocument()
  })

  test('Should render the component with cardImage', () => {
    render(<Card cardContent={testCardContent} cardImage={testBaseImage} />)
    expect(screen.getByTestId('test-card-image')).toBeInTheDocument()
  })

  test('Should render the component with cardFooter', () => {
    render(<Card cardContent={testCardContent} cardFooter={testFooterItems} />)
    expect(screen.getByTestId('test-card-content')).toBeInTheDocument()
  })

  test('Should click the button and run the assigned onClick function', () => {
    const onClickFn = vi.fn()
    const cardConfig = {
      cardContent: testCardContent,
      cardFooter: [
        {
          ...testFooterItems[0],
          onClick: onClickFn
        }
      ]
    }

    render(<Card {...cardConfig} />)

    const testCardFooterButton = screen.getByTestId('test-card-footer-item-0')
    fireEvent.click(testCardFooterButton)
    expect(onClickFn).toHaveBeenCalled()
  })
})
