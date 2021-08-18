import Form from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import { minimalConfig } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ORGANISMS}/Form`,
  component: Form,
  args: {
    ...minimalConfig,
    onFormSubmit: () => {}
  }
}

const Template = args => <Form {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
