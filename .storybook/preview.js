/** @type { import('@storybook/react').Preview } */
import './styles.css'

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      },
      expanded: true
    }
  },

  tags: ['autodocs']
}

export default preview
