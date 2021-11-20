import React from 'react'
import BasicRadio from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Basic Radio`,
  component: BasicRadio
}

const Template = args => <BasicRadio {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithLabel = Template.bind({})
WithLabel.storyName = 'With label'
WithLabel.args = mocks.withLabel

export const CheckedWithlabel = Template.bind({})
CheckedWithlabel.storyName = 'Checked with label'
CheckedWithlabel.args = mocks.checkedWithLabel

export const DisabledWithlabel = Template.bind({})
DisabledWithlabel.storyName = 'Disabled with label'
DisabledWithlabel.args = mocks.disabledWithLabel
