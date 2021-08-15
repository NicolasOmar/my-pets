import BasicInput from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'
// ENUMS
import { inputTypeEnums } from '../../../enums/type.enums.json'

export default {
  title: `${STORYBOOK_ROUTES.ELEMENTS}/Basic Input`,
  component: BasicInput,
  argTypes: {
    type: {
      options: inputTypeEnums
    }
  },
  args: mocks.minimalConfig
}

const Template = args => <BasicInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Password = Template.bind({})
Password.storyName = 'Password'
Password.args = mocks.password

export const WithPlaceholder = Template.bind({})
WithPlaceholder.storyName = 'With Placeholder'
WithPlaceholder.args = mocks.placeholderOnly

export const ValueAndPlaceholder = Template.bind({})
ValueAndPlaceholder.storyName = 'Value & Placeholder'
ValueAndPlaceholder.args = mocks.valueAndPlaceholder

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = mocks.disabled

export const Styled = Template.bind({})
Styled.storyName = 'Styled'
Styled.args = mocks.styled
