import React, { useState } from 'react'
// COMPONENTS
import TitleHeader from '../../atoms/TitleHeader'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const HomePage = () => {
  const [user] = useState(getLoggedUser())
  const homeText = {
    titleText: `HELLO ${user.name.toUpperCase()}`,
    subText: 'Welcome to our beautiful place',
    isCentered: true
  }

  return <TitleHeader {...homeText} />
}

export default HomePage
