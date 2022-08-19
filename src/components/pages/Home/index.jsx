import React, { useState } from 'react'
// COMPONENTS
import TitleHeader from '../../atoms/TitleHeader'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const Home = () => {
  const [user] = useState(getLoggedUser())
  const homeTextConfig = {
    titleText: `HELLO ${user?.name?.toUpperCase()}`,
    titleSize: 'bigger',
    subText: 'Welcome to our beautiful place',
    subSize: 'small',
    isCentered: true,
    styles: {
      marginTop: '40px'
    }
  }

  return <TitleHeader {...homeTextConfig} />
}

export default Home
