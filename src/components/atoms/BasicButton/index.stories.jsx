import React from 'react'
import BasicButton from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
import { buttonTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/BasicButton`,
  component: BasicButton,
  argTypes: {
    type: {
      options: buttonTypes
    },
    color: {
      options: parseObjKeys(colors)
    },
    size: {
      options: parseObjKeys(sizes)
    }
  },
  args: mocks.minimalConfig
}

const Template = args => <BasicButton {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Colored = Template.bind({})
Colored.storyName = 'Colored'
Colored.args = mocks.colored

export const Loading = Template.bind({})
Loading.storyName = 'Loading'
Loading.args = {
  ...Colored.args,
  ...mocks.loading
}

export const Outlined = Template.bind({})
Outlined.storyName = 'Outlined'
Outlined.args = {
  ...Colored.args,
  ...mocks.outlined
}

export const Inverted = Template.bind({})
Inverted.storyName = 'Inverted'
Inverted.args = {
  ...Colored.args,
  ...mocks.inverted
}

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = {
  ...Colored.args,
  ...mocks.disabled
}

export const Large = Template.bind({})
Large.storyName = 'Large'
Large.args = {
  ...Colored.args,
  ...mocks.large
}
