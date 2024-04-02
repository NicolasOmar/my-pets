import BasicSelect from '.'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const basicSelectStoryConfig = {
  color: {
    table: {
      type: {
        summary: parseListToStoryOptions(colors, true)
      },
      defaultValue: {
        summary: parseObjKeys(colors)[3]
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
  title: 'MyPets/Atoms/BasicSelect',
  component: BasicSelect,
  argTypes: basicSelectStoryConfig,
  args: testing.minimalConfig
}

const Template = args => <BasicSelect {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const OneOption = Template.bind({})
OneOption.args = testing.oneOption

export const Disabled = Template.bind({})
Disabled.args = {
  ...OneOption.args,
  ...testing.disabled
}

export const Loading = Template.bind({})
Loading.args = {
  ...OneOption.args,
  ...testing.loading
}

export const Colored = Template.bind({})
Colored.args = {
  ...OneOption.args,
  ...testing.colored
}

export const Rounded = Template.bind({})
Rounded.args = {
  ...OneOption.args,
  ...Colored.args,
  ...testing.rounded
}

export const ManyOptions = Template.bind({})
ManyOptions.args = {
  ...testing.manyOptions,
  options: Array(testing.manyOptions.optionsShown)
    .fill(null)
    .map((_, i) => ({ label: `Option N°${++i}`, value: `${i}` }))
}
