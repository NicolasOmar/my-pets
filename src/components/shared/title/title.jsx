import React from 'react'
import { string } from 'prop-types'

const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="ui header">{title}</h1>
      {subTitle && <span>{subTitle}</span>}
    </>
  )
}

export default Title

Title.propTypes = {
  title: string,
  subTitle: string
}
