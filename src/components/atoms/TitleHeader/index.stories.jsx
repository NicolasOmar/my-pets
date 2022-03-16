import React from 'react'
import TitleHeader from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'
// CONSTANTS
import { fontSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/TitleHeader`,
  component: TitleHeader,
  argTypes: {
    titleSize: {
      options: parseObjKeys(fontSizes)
    },
    subSize: {
      options: parseObjKeys(fontSizes)
    }
  },
  args: mocks.minimalConfig
}

const Template = args => <TitleHeader {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const MainAndSub = Template.bind({})
MainAndSub.storyName = 'Main and Sub titles'
MainAndSub.args = {
  ...Minimal.args,
  ...mocks.titleWithSubTitle
}

export const BigSize = Template.bind({})
BigSize.storyName = 'Big Size'
BigSize.args = mocks.bigSize

export const SmallSize = Template.bind({})
SmallSize.storyName = 'Small Size'
SmallSize.args = mocks.smallSize

export const Centered = Template.bind({})
Centered.storyName = 'Centered'
Centered.args = {
  ...mocks.smallSize,
  isCentered: true
}