import React from 'react'
import Tag from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
import { colors, sizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Tag`,
  component: Tag,
  argTypes: {
    color: {
      options: parseObjKeys(colors)
    },
    size: {
      options: parseObjKeys(sizes)
    }
  },
  args: mocks.minimal
}

const Template = args => <Tag {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const Colored = Template.bind({})
Colored.storyName = 'Colored'
Colored.args = mocks.colored

export const Large = Template.bind({})
Large.storyName = 'Large'
Large.args = {
  ...Colored.args,
  ...mocks.large
}

export const Rounded = Template.bind({})
Rounded.storyName = 'Rounded'
Rounded.args = {
  ...Large.args,
  ...mocks.rounded
}

export const WithDelete = Template.bind({})
WithDelete.storyName = 'With delete'
WithDelete.args = {
  ...Rounded.args,
  ...mocks.withDeleteBtn
}
