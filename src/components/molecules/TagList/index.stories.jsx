import React from 'react'
import TagList from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/TagList`,
  component: TagList
}

const Template = args => <TagList {...args} />

const renderList = fn =>
  Array(5)
    .fill(null)
    .map((_, i) => fn(i))

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
Minimal.args = {
  dataList: renderList(i => ({
    text: `widget-test-${++i}`,
    color: 'link'
  }))
}

export const DiffSizes = Template.bind({})
DiffSizes.storyName = 'Different sizes'
DiffSizes.args = {
  dataList: renderList(i => ({
    text: `${i % 2 ? 'small' : 'large'}-test-${++i}`,
    color: 'success',
    size: i % 2 ? 'small' : 'large'
  }))
}

export const DiffColors = Template.bind({})
DiffColors.storyName = 'Different Colors'
DiffColors.args = {
  dataList: renderList(i => ({
    text: `${i % 2 ? 'color' : 'success'}-test-${++i}`,
    color: i % 2 ? 'danger' : 'success',
    size: 'big'
  }))
}
