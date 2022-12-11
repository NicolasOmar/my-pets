import React from 'react'
import ProgressBar from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/ProgressBar`,
  component: ProgressBar,
  argTypes: {
    color: {
      options: parseObjKeys(colors)
    },
    size: {
      options: parseObjKeys(sizes)
    }
  }
}

const Template = args => <ProgressBar {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const IsHalfSize = Template.bind({})
IsHalfSize.storyName = 'Is half size'
IsHalfSize.args = mocks.isHalfSize

export const IsSuccessColor = Template.bind({})
IsSuccessColor.storyName = 'Has other color'
IsSuccessColor.args = {
  ...IsHalfSize.args,
  ...mocks.isSuccessColor
}

export const IsLargeSize = Template.bind({})
IsLargeSize.storyName = 'Has large size'
IsLargeSize.args = {
  ...IsSuccessColor.args,
  ...mocks.isLargeSize
}

export const IsInfiniteLoading = Template.bind({})
IsInfiniteLoading.storyName = 'With infinite loading'
IsInfiniteLoading.args = {
  ...IsLargeSize.args,
  ...mocks.IsInfiniteLoading
}
