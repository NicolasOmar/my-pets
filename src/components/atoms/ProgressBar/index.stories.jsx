import ProgressBar from '.'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const progressBarStoryConfig = {
  color: {
    table: {
      type: {
        summary: parseListToStoryOptions(colors, true)
      },
      defaultValue: {
        summary: parseObjKeys(colors)[7]
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
  title: 'MyPets/Atoms/ProgressBar',
  component: ProgressBar,
  argTypes: progressBarStoryConfig
}

const Template = args => <ProgressBar {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const IsHalfSize = Template.bind({})
IsHalfSize.storyName = 'Is half size'
IsHalfSize.args = testing.isHalfSize

export const IsSuccessColor = Template.bind({})
IsSuccessColor.storyName = 'Has other color'
IsSuccessColor.args = {
  ...IsHalfSize.args,
  ...testing.isSuccessColor
}

export const IsLargeSize = Template.bind({})
IsLargeSize.storyName = 'Has large size'
IsLargeSize.args = {
  ...IsSuccessColor.args,
  ...testing.isLargeSize
}

export const IsInfiniteLoading = Template.bind({})
IsInfiniteLoading.storyName = 'With infinite loading'
IsInfiniteLoading.args = {
  ...IsLargeSize.args,
  ...testing.isInfiniteLoading
}
