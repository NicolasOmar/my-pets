import React from 'react'
import BasicInput from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
import { inputTypes } from '../../../constants/tag-types.json'
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Basic Input`,
  component: BasicInput,
  argTypes: {
    type: {
      options: inputTypes
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

const Template = args => <BasicInput {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Password = Template.bind({})
Password.storyName = 'Password'
Password.args = mocks.password

export const Colored = Template.bind({})
Colored.storyName = 'Colored'
Colored.args = mocks.colored

export const Large = Template.bind({})
Large.storyName = 'Large'
Large.args = mocks.large

export const Rounded = Template.bind({})
Rounded.storyName = 'Rounded'
Rounded.args = {
  ...Large.args,
  ...mocks.rounded
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.storyName = 'With Placeholder'
WithPlaceholder.args = mocks.placeholderOnly

export const ValueAndPlaceholder = Template.bind({})
ValueAndPlaceholder.storyName = 'Value & Placeholder'
ValueAndPlaceholder.args = mocks.valueAndPlaceholder

export const Disabled = Template.bind({})
Disabled.storyName = 'Disabled'
Disabled.args = mocks.disabled
