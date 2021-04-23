import React from 'react'
import { string } from 'prop-types'

const Header = ({ header, subHeader }) => {
  return (
    <>
      <h1 className="ui header">{header}</h1>
      {subHeader && <span>{subHeader}</span>}
    </>
  )
}

export default Header

Header.propTypes = {
  header: string,
  subHeader: string
}
