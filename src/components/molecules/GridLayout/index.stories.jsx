import React from 'react'
import GridLayout from '.'
import Title from '../../atoms/Title'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// ENUMS
import { columnWidthEnums, colorEnums } from '../../../constants/bulma-styles.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Grid Layout`,
  component: GridLayout,
  argTypes: {
    width: {
      options: Object.keys(columnWidthEnums).map(width => +width)
    },
    color: {
      options: colorEnums
    }
  }
}

const Template = args => <GridLayout {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithComponent = Template.bind({})
WithComponent.storyName = 'With "Title" component'
WithComponent.args = {
  children: <Title title={'Test'} />
}

export const Colored = Template.bind({})
Colored.storyName = 'Colored'
Colored.args = {
  ...WithComponent.args,
  color: 'teal'
}

export const Centered = Template.bind({})
Centered.storyName = 'Centered'
Centered.args = {
  ...Colored.args,
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
  width: 16
}
