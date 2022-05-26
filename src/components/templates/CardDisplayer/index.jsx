import React from 'react'
import { arrayOf } from 'prop-types'
// COMPONENTS
import Card from '../../molecules/Card'
// import BasicFrame from '../../organisms/BasicFrame'
import GridLayout from '../../molecules/GridLayout'

const CardDisplayer = ({ data = [] }) => {
  const configObj = {
    width: 12,
    centerGrid: true,
    children:
      Array.isArray(data) &&
      data.map((cardInfo, i) => <Card key={`card-info-${i}`} {...{ ...cardInfo, childWidth: 3 }} />)
  }

  return <GridLayout {...configObj} />
}

export default CardDisplayer

CardDisplayer.propTypes = {
  data: arrayOf(Card)
}
