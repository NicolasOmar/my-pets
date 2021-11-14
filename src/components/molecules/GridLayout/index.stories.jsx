import React from 'react'
import GridLayout from '.'
import Title from '../../atoms/Title'
// APP_ROUTES
import { STORYBOOK_ROUTES } from 'constants/routes.json'
// ENUMS
import { columnSizes } from 'constants/bulma-styles.json'
import { parseObjKeys } from 'functions/parsers'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Grid Layout`,
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
WithComponent.storyName = 'With a "Title" component'
WithComponent.args = {
  children: <Title titleText={'Test'} />
}

export const WithSeveralComponent = Template.bind({})
WithSeveralComponent.storyName = 'With 3 "Title" components'
WithSeveralComponent.args = {
  children: [
    <Title key="test-1" titleText={'Test 1'} />,
    <Title key="test-2" titleText={'Test 2'} />,
    <Title key="test-3" titleText={'Test 3'} />
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
