import Icon from '.'
// CONSTANTS
// FUNCTIONS
// MOCKS
import { testing } from './index.mocks.json'

export default {
  title: 'MyPets/Atoms/Icon',
  component: Icon
}

const Template = args => <Icon {...args} />

export const MinimalConfig = Template.bind({})

export const MaterialVersion = Template.bind({})
MaterialVersion.args = {
  iconLabel: 'ab-testing',
  isCustom: false
}

export const CustomVersion = Template.bind({})
CustomVersion.args = testing.ghostSrc

export const CustomWithTitle = Template.bind({})
CustomWithTitle.args = {
  ...CustomVersion.args,
  alt: 'Passed Away'
}

export const CustomWithBigSize = Template.bind({})
CustomWithBigSize.args = {
  ...CustomVersion.args,
  size: 90
}
