import Icon from '.'
// CONSTANTS
// FUNCTIONS
import { buildArgTypes } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

export default {
  title: 'MyPets/Atoms/Icon',
  component: Icon,
  argTypes: buildArgTypes(storybook)
}

const Template = args => <Icon {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const CustomWithSrc = Template.bind({})
CustomWithSrc.storyName = 'Custom with soruce icon'
CustomWithSrc.args = testing.ghostSrc

export const CustomWithTitle = Template.bind({})
CustomWithTitle.storyName = 'Custom with title'
CustomWithTitle.args = {
  ...CustomWithSrc.args,
  alt: 'Passed Away'
}

export const WithBigSize = Template.bind({})
WithBigSize.storyName = 'Custom with big size'
WithBigSize.args = {
  ...CustomWithSrc.args,
  size: 90
}
