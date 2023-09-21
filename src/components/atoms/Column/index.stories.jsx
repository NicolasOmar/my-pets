import Column from '.'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'

const columnStoryConfig = {
  width: {
    table: {
      type: {
        summary: parseListToStoryOptions(columnSizes, true)
      }
    },
    options: parseObjKeys(columnSizes)
  }
}

export default {
  title: 'MyPets/Atoms/Column',
  component: Column,
  argTypes: columnStoryConfig
}

const Template = args => <Column {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
