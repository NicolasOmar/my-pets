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

const TableRow = ({ sectionType, content }) => (
  <tr>
    {Array.isArray(content)
      ? content.map(contentItem => renderRowContent(sectionType, contentItem))
      : renderRowContent(sectionType, content)}
  </tr>
)

export default TableRow

TableRow.propTypes = {
  sectionType: PropTypes.oneOf(['head', 'body', 'foot']).isRequired,
  content: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.elementType,
    PropTypes.string
  ])
}
