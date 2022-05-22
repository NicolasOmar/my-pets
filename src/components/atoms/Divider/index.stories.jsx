import React from 'react'
import Divider from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
import { parseObjKeys } from '../../../functions/parsers'
// CONSTANTS
import { textColors } from '../../../constants/bulma-styles.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Divider`,
  component: Divider,
  argTypes: {
    color: {
      options: parseObjKeys(textColors)
    }
  }
}

const Template = args => <Divider {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Light = Template.bind({})
Light.storyName = 'Light color'
Light.args = mocks.lightColored

export const Dark = Template.bind({})
Dark.storyName = 'Dark color'
Dark.args = mocks.darkColored

export const CustomStyle = Template.bind({})
CustomStyle.storyName = 'Custom Style'
CustomStyle.args = {
  ...mocks.darkColored,
  ...mocks.customStyle
}
