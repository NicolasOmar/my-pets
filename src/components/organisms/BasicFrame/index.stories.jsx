import BasicFrame from '.'
// OTHER COMPONENTS
import ButtonGroup from '../../molecules/ButtonGroup'
// OTHER COMPONENTS STORY CONFIGS
import { gridLayoutArgsConfig } from '../../molecules/GridLayout/index.stories'
// FUNCTIONS
import { buildArgTypes } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

const basicFrameStoryConfig = {
  header: {
    table: {
      type: {
        summary: 'TitleHeader'
      }
    }
  }
}

export default {
  title: 'MyPets/Organisms/BasicFrame',
  component: BasicFrame,
  argTypes: {
    ...buildArgTypes(storybook, basicFrameStoryConfig),
    ...gridLayoutArgsConfig
  }
}

const Template = args => <BasicFrame {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithHeader = Template.bind({})
WithHeader.storyName = 'With a Header'
WithHeader.args = testing.withHeader

export const WithChildren = Template.bind({})
WithChildren.storyName = 'With a Button Group'
WithChildren.args = {
  ...WithHeader.args,
  children: <ButtonGroup {...testing.withButtons} />
}

export const FullWidth = Template.bind({})
FullWidth.storyName = 'With full width'
FullWidth.args = {
  ...WithChildren.args,
  width: 12
}
