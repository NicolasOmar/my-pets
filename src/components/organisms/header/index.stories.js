import Header from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// STORIES
import { minimalConfig } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ORGANISMS}/Header`,
  component: Header,
  args: minimalConfig
}

const Template = args => <Header {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const ManyOptions = Template.bind({})
ManyOptions.storyName = 'Many options'
ManyOptions.args = {
  dropdownConfig: {
    ...minimalConfig.dropdownConfig,
    options: new Array(5).fill(null).map((_, i) => ({ label: `Idea N°${++i}` }))
  }
}
