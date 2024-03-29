import ButtonGroup from '.'
// MOCKS
import { testing } from './index.mocks.json'

export default {
  title: 'MyPets/Molecules/ButtonGroup',
  component: ButtonGroup,
  args: testing.minimalConfig
}

const mockButtons = (prop, values, buttonArray = testing.minimalConfig.buttons) => ({
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
Colored.args = mockButtons('color', ['success', 'danger'])

export const FirstDisabled = Template.bind({})
FirstDisabled.storyName = 'First button disabled'
FirstDisabled.args = mockButtons('isDisabled', [true, false], Colored.args.buttons)

export const BothDisabled = Template.bind({})
BothDisabled.storyName = 'Both buttons disabled'
BothDisabled.args = mockButtons('isDisabled', [true, true], Colored.args.buttons)
