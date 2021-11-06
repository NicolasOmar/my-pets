import React from 'react'
import BasicFrame from '.'
import ButtonGroup from '../../molecules/ButtonGroup'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'
// ENUMS
import { columnWidthEnums, colorEnums } from '../../../constants/bulma-styles.json'

export default {
  title: `${STORYBOOK_ROUTES.ORGANISMS}/Basic Frame`,
  component: BasicFrame,
  argTypes: {
    width: {
      options: Object.keys(columnWidthEnums).map(width => +width)
    },
    color: {
      options: colorEnums
    }
  }
}

const Template = args => <BasicFrame {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithHeader = Template.bind({})
WithHeader.storyName = 'With Header'
WithHeader.args = mocks.withHeader

export const WithChildren = Template.bind({})
WithChildren.storyName = 'With a Button Group'
WithChildren.args = {
  ...WithHeader.args,
  children: <ButtonGroup {...mocks.withButtons} />
}

export const InDarkmode = Template.bind({})
InDarkmode.storyName = 'In "Dark Mode"'
InDarkmode.args = {
  ...WithChildren.args,
  color: 'black'
}

export const FullWidth = Template.bind({})
FullWidth.storyName = 'With full width'
FullWidth.args = {
  ...InDarkmode.args,
  width: 16
}
