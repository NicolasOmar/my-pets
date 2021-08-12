// APP_ROUTES
import Title from '.'
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ELEMENTS}/Title`,
  component: Title,
  args: mocks.minimalConfig
}

const Template = args => <Title {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const MainAndSub = Template.bind({})
MainAndSub.storyName = 'Main and Sub titles'
MainAndSub.args = mocks.titleWithSubTitle

export const Centered = Template.bind({})
Centered.storyName = 'Centered title'
Centered.args = mocks.centeredTitle

export const AllCentered = Template.bind({})
AllCentered.storyName = 'Centered Title and Subtitle'
AllCentered.args = mocks.centerMainAndSubTitle
