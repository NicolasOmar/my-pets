import NavBarDropdown from '.'
// FUNCTIONS
import { buildArgTypes } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

const navBarDropdownStoryConfig = {
  options: {
    table: {
      type: {
        summary: 'NavBarItem[]'
      }
    }
  }
}

export default {
  title: 'MyPets/Molecules/NavBarDropdown',
  component: NavBarDropdown,
  argTypes: buildArgTypes(storybook, navBarDropdownStoryConfig),
  args: testing.minimalConfig
}

const Template = args => <NavBarDropdown {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithOneItem = Template.bind({})
WithOneItem.storyName = 'With 1 item'
WithOneItem.args = testing.withOneItem

export const WithSeveralItems = Template.bind({})
WithSeveralItems.storyName = 'With several items'
WithSeveralItems.args = {
  ...testing.withSeveralItems,
  options: new Array(7).fill(null).map((_, i) => ({ itemLabel: `Option N°${++i}` }))
}
