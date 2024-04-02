import Tag from '.'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const tagStoryConfig = {
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
  title: 'MyPets/Atoms/Tag',
  component: Tag,
  argTypes: tagStoryConfig,
  args: testing.minimal
}

const Template = args => <Tag {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Colored = Template.bind({})
Colored.args = testing.colored

export const Large = Template.bind({})
Large.args = {
  ...Colored.args,
  ...testing.large
}

export const Rounded = Template.bind({})
Rounded.args = {
  ...Large.args,
  ...testing.rounded
}

export const WithDelete = Template.bind({})
WithDelete.args = {
  ...Rounded.args,
  ...testing.withDeleteBtn
}
