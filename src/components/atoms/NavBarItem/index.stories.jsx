import NavBarItem from '.'
// OTHER COMPONENTS
import TitleHeader from '../TitleHeader'
// FUNCTIONS
// MOCKS
import { testing } from './index.mocks.json'

export default {
  title: 'MyPets/Atoms/NavBarItem',
  component: NavBarItem,
  args: testing.minimalConfig
}

const Template = args => <NavBarItem {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const LinkItem = Template.bind({})
LinkItem.storyName = 'As a link'
LinkItem.args = testing.linkItem

export const WithChildren = Template.bind({})
WithChildren.storyName = 'With a "TitleHeader" component'
WithChildren.args = {
  title: 'Item without a child component',
  children: <TitleHeader titleText={'Child TitleHeader'} />
}
