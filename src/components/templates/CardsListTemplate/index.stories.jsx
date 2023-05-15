import React from 'react'
import CardsListTemplate from '.'
// MOCKS
import cardMocks from '../../molecules/Card/index.mocks.json'

const renderCards = number =>
  Array(number)
    .fill(null)
    .map(() => ({
      cardImage: cardMocks.testBaseImage,
      cardContent: [
        {
          type: 'section',
          content: cardMocks.testCardContent
        }
      ],
      cardFooter: cardMocks.testFooterItems
    }))

export default {
  title: 'MyPets/Templates/CardsListTemplate',
  component: CardsListTemplate,
  args: {
    cardListData: renderCards(1)
  }
}

const Template = args => <CardsListTemplate {...args} />

export const DisplayOneCard = Template.bind({})
DisplayOneCard.storyName = 'Display 1 card'
DisplayOneCard.args = { cardListData: renderCards(1) }

export const DisplayFourCards = Template.bind({})
DisplayFourCards.storyName = 'Display 4 cards'
DisplayFourCards.args = { cardListData: renderCards(4) }

export const DisplaySixCards = Template.bind({})
DisplaySixCards.storyName = 'Display 6 cards'
DisplaySixCards.args = { cardListData: renderCards(6) }

export const DisplayTwelveCards = Template.bind({})
DisplayTwelveCards.storyName = 'Display 12 cards'
DisplayTwelveCards.args = { cardListData: renderCards(12) }
