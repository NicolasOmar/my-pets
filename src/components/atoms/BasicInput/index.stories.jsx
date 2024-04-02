import BasicInput from '.'
// CONSTANTS
import { inputTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const basicInputStoryConfig = {
  type: {
    table: {
      type: {
        summary: parseListToStoryOptions(inputTypes)
      }
    },
    options: inputTypes
  },
  color: {
    table: {
      type: {
        summary: parseListToStoryOptions(colors, true)
      },
      defaultValue: {
        summary: parseObjKeys(colors)[0]
      }
    },
    options: parseObjKeys(colors)
  },
  size: {
    table: {
      type: {
        summary: parseListToStoryOptions(sizes, true)
      },
      defaultValue: {
        summary: parseObjKeys(sizes)[0]
      }
    },
    options: parseObjKeys(sizes)
  }
}

export default {
  title: 'MyPets/Atoms/BasicInput',
  component: BasicInput,
  argTypes: basicInputStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <BasicInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Password = Template.bind({})
Password.args = testing.password

export const Colored = Template.bind({})
Colored.args = testing.colored

export const Large = Template.bind({})
Large.args = testing.large

export const Rounded = Template.bind({})
Rounded.args = {
  ...Large.args,
  ...testing.rounded
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = testing.placeholderOnly

export const ValueAndPlaceholder = Template.bind({})
ValueAndPlaceholder.args = testing.valueAndPlaceholder

export const Disabled = Template.bind({})
Disabled.args = testing.disabled
