import BasicButton from '.'
// CONSTANTS
import { buttonTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const basicButtonStoryConfig = {
  type: {
    table: {
      type: {
        summary: parseListToStoryOptions(buttonTypes)
      }
    },
    options: buttonTypes
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
        summary: parseObjKeys(sizes)[1]
      }
    },
    options: parseObjKeys(sizes)
  }
}

export default {
  title: 'MyPets/Atoms/BasicButton',
  component: BasicButton,
  argTypes: basicButtonStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <BasicButton {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Colored = Template.bind({})
Colored.storyName = 'Colored'
Colored.args = testing.colored

export const Loading = Template.bind({})
Loading.storyName = 'Loading'
Loading.args = {
  ...Colored.args,
  ...testing.loading
}

export const Outlined = Template.bind({})
Outlined.storyName = 'Outlined'
Outlined.args = {
  ...Colored.args,
  ...testing.outlined
}

export const Inverted = Template.bind({})
Inverted.storyName = 'Inverted'
Inverted.args = {
  ...Colored.args,
  ...testing.inverted
}

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = {
  ...Colored.args,
  ...testing.disabled
}

export const Large = Template.bind({})
Large.storyName = 'Large'
Large.args = {
  ...Colored.args,
  ...testing.large
}
