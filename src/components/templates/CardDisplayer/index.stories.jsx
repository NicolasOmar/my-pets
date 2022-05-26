import React from 'react'
import CardDisplayer from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CARD MOCKS
import cardMocks from '../../molecules/Card/index.mocks.json'

const renderCards = number =>
  Array(number)
    .fill(null)
    .map(() => ({
      cardImage: cardMocks.testBaseImage,
      cardContent: <section>{cardMocks.testCardContent}</section>,
      cardFooter: cardMocks.testFooterItems
    }))

export default {
  title: `${STORYBOOK_ROUTES.TEMPLATES}/CardsDisplayed`,
  component: CardDisplayer,
  args: {
    data: renderCards(1)
  }
}

const Template = args => <CardDisplayer {...args} />

export const DisplayOneCard = Template.bind({})
DisplayOneCard.storyName = 'Display 1 card'
DisplayOneCard.args = { data: renderCards(1) }

export const DisplayFourCards = Template.bind({})
DisplayFourCards.storyName = 'Display 4 cards'
DisplayFourCards.args = { data: renderCards(4) }

export const DisplaySixCards = Template.bind({})
DisplaySixCards.storyName = 'Display 6 cards'
DisplaySixCards.args = { data: renderCards(6) }

export const DisplayTwelveCards = Template.bind({})
DisplayTwelveCards.storyName = 'Display 12 cards'
DisplayTwelveCards.args = { data: renderCards(12) }
