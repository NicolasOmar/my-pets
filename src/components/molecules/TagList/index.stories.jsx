import TagList from '.'
import { buildArgTypes } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

const tagListStoryConfig = {
  dataList: {
    table: {
      type: {
        summary: 'Tag[]'
      }
    }
  }
}

export default {
  title: 'MyPets/Molecules/TagList',
  component: TagList,
  argTypes: buildArgTypes(storybook, tagListStoryConfig)
}

const Template = args => <TagList {...args} />

const renderList = fn =>
  Array(5)
    .fill(null)
    .map((_, i) => fn(i))

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'
Minimal.args = {
  dataList: renderList(i => ({
    text: `${testing.testDataListText}-${++i}`,
    color: 'link'
  }))
}

export const DiffSizes = Template.bind({})
DiffSizes.storyName = 'Different sizes'
DiffSizes.args = {
  dataList: renderList(i => ({
    text: `${i % 2 ? 'small' : 'large'}-test-${++i}`,
    color: 'success',
    size: i % 2 ? 'small' : 'large'
  }))
}

export const DiffColors = Template.bind({})
DiffColors.storyName = 'Different Colors'
DiffColors.args = {
  dataList: renderList(i => ({
    text: `${i % 2 ? 'success' : 'danger'}-test-${++i}`,
    color: i % 2 ? 'danger' : 'success',
    size: 'big'
  }))
}
