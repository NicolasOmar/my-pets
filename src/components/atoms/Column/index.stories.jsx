import Column from '.'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { buildArgTypes, parseListToStoryOptions, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { storybook } from './index.mocks.json'

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
  argTypes: buildArgTypes(storybook, columnStoryConfig)
}

const Template = args => <Column {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
