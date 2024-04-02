import GridLayout from '.'
// OTHER COMPONENTS
import TitleHeader from '../../atoms/TitleHeader'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing } from './index.mocks.json'

const gridLayoutStoryConfig = {
  width: {
    table: {
      type: {
        summary: parseListToStoryOptions(columnSizes, true)
      },
      defaultValue: {
        summary: parseObjKeys(columnSizes)[0]
      }
    },
    options: parseObjKeys(columnSizes)
  }
}

export default {
  title: 'MyPets/Molecules/GridLayout',
  component: GridLayout,
  argTypes: gridLayoutStoryConfig
}

const Template = args => <GridLayout {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithComponent = Template.bind({})
WithComponent.storyName = 'With a "TitleHeader" component'
WithComponent.args = {
  children: <TitleHeader titleText={testing.testText} />
}

export const WithSeveralComponent = Template.bind({})
WithSeveralComponent.storyName = 'With 3 "TitleHeader" components'
WithSeveralComponent.args = {
  children: testing.severalTestTexts.map(_text => (
    <TitleHeader key={_text.replace(' ', '-').toLocaleLowerCase()} titleText={testing.testText} />
  ))
}

export const Centered = Template.bind({})
Centered.args = {
  ...WithSeveralComponent.args,
  centerGrid: true
}

export const MinimalWidth = Template.bind({})
MinimalWidth.args = {
  ...Centered.args,
  width: 1
}

export const MaximunWidth = Template.bind({})
MaximunWidth.args = {
  ...Centered.args,
  width: 12
}
