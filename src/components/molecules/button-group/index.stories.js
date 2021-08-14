import ButtonGroup from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Button Group`,
  component: ButtonGroup,
  args: mocks.minimalConfig
}

const remockButtons = (prop, values, buttonArray = mocks.minimalConfig.buttons) => ({
  buttons: buttonArray.map((button, i) => ({
    ...button,
    [prop]: values[i]
  }))
})

const Template = args => <ButtonGroup {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Colored = Template.bind({})
Colored.storyName = 'Colored buttons'
Colored.args = remockButtons('color', ['green', 'red'])

export const FirstDisabled = Template.bind({})
FirstDisabled.storyName = 'First button disabled'
FirstDisabled.args = remockButtons('isDisabled', [true, false], Colored.args.buttons)

export const BothDisabled = Template.bind({})
BothDisabled.storyName = 'Both buttons disabled'
BothDisabled.args = remockButtons('isDisabled', [true, true], Colored.args.buttons)

export const AndSeparator = Template.bind({})
AndSeparator.storyName = 'Other separator text'
AndSeparator.args = {
  ...Colored.args,
  separator: 'and'
}
