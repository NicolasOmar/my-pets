import React from "react"
import PropTypes from 'prop-types'
// COMPONENTS
import TableRow from "../../atoms/TableRow"

const renderRows = (sectionType, rows) => (
  rows.map(rowConfig => <TableRow {...{ sectionType, content: rowConfig }} />)
)

const renderSection = (sectionType, content) => {
  switch (sectionType) {
    case 'head':
      return <thead>{renderRows(sectionType, content)}</thead>
    case 'foot':
      return <tfoot>{renderRows(sectionType, content)}</tfoot>
    default:
      return <tbody>{renderRows(sectionType, content)}</tbody>
  }
}

const TableSection = ({
  type,
  rowsContent = []
}) => (
  renderSection(type, rowsContent)
)

export default TableSection

TableSection.propTypes = {
  type: PropTypes.oneOf(['head', 'body', 'foot']).isRequired,
  rowsContent: PropTypes.arrayOf(PropTypes.shape(TableRow.propTypes))
}