import './styles.css'
import { useDarkMode } from 'storybook-dark-mode'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  darkMode: {
    classTarget: 'html',
    stylePreview: true,
    darkClass: 'dark-mode',
    lightClass: 'light-mode'
  },
    backgrounds: {
    disable: true
  }
}

export const decorators = [
  (Story) => {
    const toggleStyle = useDarkMode() ? 'dark-mode' : 'light-mode'
    document.body.classList.toggle(toggleStyle)
    return <Story />
  }
]