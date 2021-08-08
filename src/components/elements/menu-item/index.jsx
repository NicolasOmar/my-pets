import React from 'react'
import { func, string } from 'prop-types'

const MenuItem = ({ label, onClick }) => (
  <div className="item" onClick={onClick}>
    {label}
  </div>
)

export default MenuItem

MenuItem.propTypes = {
  label: string.isRequired,
  onClick: func.isRequired
}
