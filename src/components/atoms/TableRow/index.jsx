import React from 'react'
import PropTypes from 'prop-types'

const renderRowContent = (sectionType, content) => {
  switch (sectionType) {
    case 'head':
    case 'foot':
      return <th>{content}</th>
    default:
      return <td>{content}</td>
  }
}

const TableRow = ({
  sectionType,
  content
}) => (
  <tr>{renderRowContent(sectionType, content)}</tr>
)

export default TableRow

TableRow.propTypes = {
  sectionType: PropTypes.oneOf(['head', 'body', 'foot']).isRequired,
  content: PropTypes.element
}