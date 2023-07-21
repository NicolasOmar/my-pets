import Image from '.'
// STYLES
import { imageRatios } from '../../../constants/bulma-styles.json'
// FUNCITONS
import { buildArgTypes, parseObjKeys } from '../../../functions/parsers'
// MOCKS
import { testing, storybook } from './index.mocks.json'

const imageStoryConfig = {
  ratio: {
    options: parseObjKeys(imageRatios)
  }
}

export default {
  title: 'MyPets/Atoms/Image',
  component: Image,
  argTypes: buildArgTypes(storybook, imageStoryConfig),
  args: testing.minimalConfig
}

const Template = args => (
  <section style={{ width: '50%', margin: '0 auto' }}>
    <Image {...args} />
  </section>
)

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const FixedRatio = Template.bind({})
FixedRatio.storyName = 'Fixed ratio, 64px'
FixedRatio.args = {
  ...testing.minimalConfig,
  fixedRatio: 64
}

export const IsRounded = Template.bind({})
IsRounded.storyName = 'Rounded'
IsRounded.args = {
  ...FixedRatio.minimalConfig,
  isRounded: true
}

export const BigImage = Template.bind({})
BigImage.storyName = 'Big Fixed Image'
BigImage.args = {
  ...testing.bigImage,
  fixedRatio: 258
}

export const Ratio3by2 = Template.bind({})
Ratio3by2.storyName = 'Ratio 3by2'
Ratio3by2.args = testing['3by2']

export const Ratio5by3 = Template.bind({})
Ratio5by3.storyName = 'Ratio 5by3'
Ratio5by3.args = testing['5by3']

export const Ratio16by9 = Template.bind({})
Ratio16by9.storyName = 'Ratio 16by9'
Ratio16by9.args = testing['16by9']

export const Ratio3by5 = Template.bind({})
Ratio3by5.storyName = 'Ratio 3by5'
Ratio3by5.args = testing['3by5']

export const Ratio9by16 = Template.bind({})
Ratio9by16.storyName = 'Ratio 9by16'
Ratio9by16.args = testing['9by16']
