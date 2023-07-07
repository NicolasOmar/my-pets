import Label from '.'
// STYLES
// FUNCITONS
import { buildArgTypes } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

export default {
  title: 'MyPets/Atoms/Label',
  component: Label,
  argTypes: buildArgTypes(storybook)
}

const Template = args => <Label {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithTextLabel = Template.bind({})
WithTextLabel.storyName = 'With Text'
WithTextLabel.args = {
  ...testing.withLabelText
}

export const RequiredVersion = Template.bind({})
RequiredVersion.storyName = 'Required version'
RequiredVersion.args = {
  ...WithTextLabel.args,
  ...testing.requiredVersion
}
