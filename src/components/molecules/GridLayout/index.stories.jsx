import React from 'react'
import GridLayout from '.'
import TitleHeader from '../../atoms/TitleHeader'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/GridLayout`,
  component: GridLayout,
  argTypes: {
    width: {
      options: parseObjKeys(columnSizes)
    }
  }
}

const Template = args => <GridLayout {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithComponent = Template.bind({})
WithComponent.storyName = 'With a "TitleHeader" component'
WithComponent.args = {
  children: <TitleHeader titleText={'Test'} />
}

export const WithSeveralComponent = Template.bind({})
WithSeveralComponent.storyName = 'With 3 "TitleHeader" components'
WithSeveralComponent.args = {
  children: [
    <TitleHeader key="test-1" titleText={'Test 1'} />,
    <TitleHeader key="test-2" titleText={'Test 2'} />,
    <TitleHeader key="test-3" titleText={'Test 3'} />
  ]
}

export const Centered = Template.bind({})
Centered.storyName = 'Centered'
Centered.args = {
  ...WithSeveralComponent.args,
  centerGrid: true
}

export const MinimalWidth = Template.bind({})
MinimalWidth.storyName = 'Minimun Width'
MinimalWidth.args = {
  ...Centered.args,
  width: 1
}

export const MaximunWidth = Template.bind({})
MaximunWidth.storyName = 'Maximun Width'
MaximunWidth.args = {
  ...Centered.args,
  width: 12
}
