import { render, screen } from '@testing-library/react'
import Title from './title'

describe('[Title]', () => {
  describe('[HAPPY PATH]', () => {
    test('Renders with required props only', () => {
      const props = {
        title: 'My',
        subTitle: 'Test'
      }

      render(<Title {...props} />)
      const element = screen.getByText(props.title)
      expect(element).toBeInTheDocument()
    })
  })
})
