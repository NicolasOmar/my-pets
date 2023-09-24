import TitleHeader from '.'
// MOCKS
import { testing } from './index.mocks.json'
// CONSTANTS
import { fontSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'

const titleHeaderStoryConfig = {
  titleSize: {
    table: {
      type: {
        summary: parseListToStoryOptions(fontSizes, true)
      },
      defaultValue: {
        summary: parseObjKeys(fontSizes)[4]
      }
    },
    options: parseObjKeys(fontSizes)
  },
  subSize: {
    table: {
      type: {
        summary: parseListToStoryOptions(fontSizes, true)
      },
      defaultValue: {
        summary: parseObjKeys(fontSizes)[2]
      }
    },
    options: parseObjKeys(fontSizes)
  }
}

export default {
  title: 'MyPets/Atoms/TitleHeader',
  component: TitleHeader,
  argTypes: titleHeaderStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <TitleHeader {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const MainAndSub = Template.bind({})
MainAndSub.storyName = 'Main and Sub titles'
MainAndSub.args = {
  ...Minimal.args,
  ...testing.titleWithSubTitle
}

export const BigSize = Template.bind({})
BigSize.storyName = 'Big Size'
BigSize.args = testing.bigSize

export const SmallSize = Template.bind({})
SmallSize.storyName = 'Small Size'
SmallSize.args = testing.smallSize

export const Centered = Template.bind({})
Centered.storyName = 'Centered'
Centered.args = {
  ...testing.smallSize,
  isCentered: true
}
