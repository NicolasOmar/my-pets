import React from 'react'
import TagList from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
// import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/TagList`,
  component: TagList
  // args: mocks.minimalConfig
}

const Template = args => <TagList {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
Minimal.args = {
  dataList: Array(5)
    .fill(null)
    .map((_, i) => ({
      text: `widget-test-${i}`,
      color: 'success',
      size: 'big'
    }))
}
