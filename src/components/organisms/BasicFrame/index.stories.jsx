import React from 'react'
import BasicFrame from '.'
import ButtonGroup from '../../molecules/ButtonGroup'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

export default {
  title: `${STORYBOOK_ROUTES.ORGANISMS}/BasicFrame`,
  component: BasicFrame,
  argTypes: {
    width: {
      options: parseObjKeys(columnSizes, true)
    }
  }
}

const Template = args => <BasicFrame {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithHeader = Template.bind({})
WithHeader.storyName = 'With a Header'
WithHeader.args = mocks.withHeader

export const WithChildren = Template.bind({})
WithChildren.storyName = 'With a Button Group'
WithChildren.args = {
  ...WithHeader.args,
  children: <ButtonGroup {...mocks.withButtons} />
}

export const FullWidth = Template.bind({})
FullWidth.storyName = 'With full width'
FullWidth.args = {
  ...WithChildren.args,
  width: 12
}
