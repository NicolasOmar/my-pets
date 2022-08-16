import React from 'react'
import Card from '.'
// COMPONENTS
import Image from '../../atoms/Image'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import { testCardContent, testBaseImage, testFooterItems } from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.MOLECULES}/Card`,
  component: Card,
  args: {
    cardContent: <section>{testCardContent}</section>
  }
}

const Template = args => (
  <section style={{ width: '40%', margin: '0 auto' }}>
    <Card {...args} />
  </section>
)

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithComplexContent = Template.bind({})
WithComplexContent.storyName = 'With other content'
WithComplexContent.args = {
  cardContent: (
    <div className="card-content">
      <div className="media">
        <div className="media-left">
          <Image
            src={'https://bulma.io/images/placeholders/96x96.png'}
            altText={'Placeholder image'}
          />
        </div>
        <div className="media-content">
          <p className="title is-4">John Smith</p>
          <p className="subtitle is-6">@johnsmith</p>
        </div>
      </div>

      <div className="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.{' '}
        <a>@bulmaio</a>.<a href="#">#css</a> <a href="#">#responsive</a>
        <br />
        <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
      </div>
    </div>
  )
}

export const WithImage = Template.bind({})
WithImage.storyName = 'With image header'
WithImage.args = {
  cardImage: testBaseImage
}

export const WithOneFooter = Template.bind({})
WithOneFooter.storyName = 'One footer item'
WithOneFooter.args = {
  ...WithImage.args,
  cardFooter: [testFooterItems[0]]
}

export const WithThreeFooters = Template.bind({})
WithThreeFooters.storyName = 'Several footer items'
WithThreeFooters.args = {
  ...WithImage.args,
  cardFooter: testFooterItems
}
