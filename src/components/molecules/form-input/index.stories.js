import FormInput from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import { minimalConfig } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Form Input`,
  component: FormInput,
  args: minimalConfig
}

const Template = args => (
  <form className={'ui form'}>
    <FormInput {...args} />
  </form>
)

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Invalid = Template.bind({})
Invalid.storyName = 'Invalid case'
Invalid.args = { isValid: false }

export const Required = Template.bind({})
Required.storyName = 'Required case'
Required.args = { isRequired: true }
