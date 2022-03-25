import React from 'react'
import BasicSelect from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/BasicSelect`,
  component: BasicSelect,
  argTypes: {
    color: {
      options: parseObjKeys(colors)
    },
    size: {
      options: parseObjKeys(sizes)
    }
  },
  args: mocks.minimalConfig
}

const Template = args => <BasicSelect {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const OneOption = Template.bind({})
OneOption.storyName = 'One option'
OneOption.args = mocks.oneOption

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = {
  ...mocks.oneOption,
  isDisabled: true
}

export const Loading = Template.bind({})
Loading.storyName = 'Loading'
Loading.args = {
  ...mocks.oneOption,
  isLoading: true
}

export const ManyOptions = Template.bind({})
ManyOptions.storyName = 'Many options'
ManyOptions.args = {
  options: Array(7)
    .fill(null)
    .map((_, i) => ({ label: `Option N°${++i}`, value: `${i}` }))
}
