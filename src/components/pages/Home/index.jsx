import React, { useState } from 'react'
// COMPONENTS
import TitleHeader from '../../atoms/TitleHeader'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'
import GridLayout from '../../molecules/GridLayout'
import CardsListTemplate from '../../templates/CardsListTemplate'

const Home = () => {
  const [user] = useState(getLoggedUser())
  const homeTextConfig = {
    titleText: `HELLO ${user?.name?.toUpperCase()}`,
    titleSize: 'bigger',
    subText: 'Welcome to our beautiful place',
    subSize: 'small',
    isCentered: true,
    styles: {
      margin: '20px 0px'
    }
  }
  const cardListConfig = {
    cardListData: [
      { cardContent: 'test' },
      { cardContent: 'test' },
      { cardContent: 'test' },
      { cardContent: 'test' },
      { cardContent: 'test' }
    ]
  }

  const girdConfig = {
    width: 11,
    centerGrid: true,
    children: [
      <TitleHeader key={'home-title'} {...homeTextConfig} />,
      <CardsListTemplate key={'home-card-list'} {...cardListConfig} />
    ]
  }

  return <GridLayout {...girdConfig} />
}

export default Home
