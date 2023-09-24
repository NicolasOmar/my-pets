import Label from '.'
// STYLES
// FUNCITONS
// MOCKS
import { testing } from './index.mocks.json'

export default {
  title: 'MyPets/Atoms/Label',
  component: Label,
  args: testing.withLabelText
}

const Template = args => <Label {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const RequiredVersion = Template.bind({})
RequiredVersion.storyName = 'Required version'
RequiredVersion.args = {
  ...testing.requiredVersion
}
