import NavBar from '.'
// MOCKS
import { testing, storybook } from './index.mocks.json'

export default {
  title: 'MyPets/Organisms/NavBar',
  component: NavBar,
  argTypes: storybook
}

const Template = args => <NavBar {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithStart = Template.bind({})
WithStart.storyName = 'With items at start'
WithStart.args = testing.startConfig

export const WithStartAndEnd = Template.bind({})
WithStartAndEnd.storyName = 'With items at start and end'
WithStartAndEnd.args = {
  ...testing.startConfig,
  ...testing.endConfig
}

export const withDropdownConfigAtEnd = Template.bind({})
withDropdownConfigAtEnd.storyName = 'With items at start and a dropdown'
withDropdownConfigAtEnd.args = {
  ...testing.startConfig,
  ...testing.withDropdownConfig
}
