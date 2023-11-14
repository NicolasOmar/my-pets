import CardsListTemplate from '.'
// MOCKS
import cardMocks from '../../molecules/Card/index.mocks.json'
import { storybook } from './index.mocks.json'

const cardTestMocks = cardMocks.testing

const renderCards = number =>
  Array(number)
    .fill(null)
    .map(() => ({
      cardImage: cardTestMocks.testBaseImage,
      cardContent: [
        {
          type: 'section',
          content: cardTestMocks.testCardContent
        }
      ],
      cardFooter: cardTestMocks.testFooterItems
    }))

export default {
  title: 'MyPets/Templates/CardsListTemplate',
  component: CardsListTemplate,
  argTypes: storybook,
  args: {
    cardsListData: renderCards(1)
  }
}

const Template = args => <CardsListTemplate {...args} />

export const DisplayOneCard = Template.bind({})
DisplayOneCard.storyName = 'Display 1 card'
DisplayOneCard.args = { cardsListData: renderCards(1) }

export const DisplayFourCards = Template.bind({})
DisplayFourCards.storyName = 'Display 4 cards'
DisplayFourCards.args = { cardsListData: renderCards(4) }

export const DisplaySixCards = Template.bind({})
DisplaySixCards.storyName = 'Display 6 cards'
DisplaySixCards.args = { cardsListData: renderCards(6) }

export const DisplayTwelveCards = Template.bind({})
DisplayTwelveCards.storyName = 'Display 12 cards'
DisplayTwelveCards.args = { cardsListData: renderCards(12) }
