/** @type { import('@storybook/react').Preview } */
import './styles.css'

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      },
      expanded: true
    }
  }
}

export default preview
