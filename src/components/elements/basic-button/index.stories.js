import BasicButton from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'
// ENUMS
import { buttonTypeEnums, buttonColorEnums } from '../../../enums/button.enums.json'

export default {
  title: `${STORYBOOK_ROUTES.ELEMENTS}/Basic Button`,
  component: BasicButton,
  argTypes: {
    type: {
      options: buttonTypeEnums
    },
    color: {
      options: buttonColorEnums
    }
  },
  args: mocks.minimalConfig
}

const Template = args => <BasicButton {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const RedColored = Template.bind({})
RedColored.storyName = 'Colored config'
RedColored.args = mocks.colored

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = mocks.disabled
