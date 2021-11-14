import React, { useState } from 'react'
// COMPONENTS
import Title from '../../atoms/Title'
// HELPER FUNCTIONS
import { getLoggedUser } from '../../../functions/local-storage'

const HomePage = () => {
  const [user] = useState(getLoggedUser())
  const homeText = {
    titleText: `HELLO ${user.name.toUpperCase()}`,
    subText: 'Welcome to our beautiful place',
    isCentered: true
  }

  return <Title {...homeText} />
}

export default HomePage
