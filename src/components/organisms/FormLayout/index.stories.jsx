import FormLayout from '.'
// MOCKS
import { testing, storybook } from './index.mocks.json'

const { minimalConfig, withButtons, withErrors } = testing

export default {
  title: 'MyPets/Organisms/FormLayout',
  component: FormLayout,
  argTypes: storybook,
  args: minimalConfig
}

const Template = args => <FormLayout {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithButtons = Template.bind({})
WithButtons.storyName = 'With buttons'
WithButtons.args = {
  ...Minimal.args,
  ...withButtons
}

export const DisabledButtons = Template.bind({})
DisabledButtons.storyName = 'With disabled buttons'
DisabledButtons.args = {
  ...WithButtons.args,
  formButtons: WithButtons.args.formButtons.map(button => ({ ...button, isDisabled: true }))
}

export const WithErrors = Template.bind({})
WithErrors.storyName = 'With form errors'
WithErrors.args = {
  ...WithButtons.args,
  ...withErrors
}

export const FreeBoxed = Template.bind({})
FreeBoxed.storyName = 'Without box container'
FreeBoxed.args = {
  ...WithErrors.args,
  isBoxed: false
}
