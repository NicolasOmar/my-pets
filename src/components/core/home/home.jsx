import React, { useState } from 'react'
// COMPONENTS
import Title from '../../shared/title/title'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const Home = () => {
  const [user] = useState(getLoggedUser())
  const homeText = {
    title: `HELLO ${user.name.toUpperCase()}`,
    subTitle: 'Welcome to our beautiful place'
  }

  return <Title {...homeText} />
}

export default Home
