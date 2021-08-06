import React, { useState } from 'react'
// COMPONENTS
import Title from '../../elements/title/title'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const HomePage = () => {
  const [user] = useState(getLoggedUser())
  const homeText = {
    title: `HELLO ${user.name.toUpperCase()}`,
    subTitle: 'Welcome to our beautiful place',
    centered: true
  }

  return <Title {...homeText} />
}

export default HomePage
