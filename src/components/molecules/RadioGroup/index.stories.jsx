import React from 'react'
import RadioGroup from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Radio Group`,
  component: RadioGroup,
  args: mocks.minimalConfig
}

const Template = args => <RadioGroup {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const OneSelected = Template.bind({})
OneSelected.storyName = 'One selected'
OneSelected.args = {
  ...Minimal.args,
  radios: mocks.minimalConfig.radios.map((radioItem, i) => ({ ...radioItem, isChecked: !i }))
}

export const AllDisabled = Template.bind({})
AllDisabled.storyName = 'All disabled'
AllDisabled.args = {
  ...OneSelected.args,
  radios: OneSelected.args.radios.map(radioItem => ({ ...radioItem, isDisabled: true }))
}
