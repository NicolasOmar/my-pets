import React from 'react'
import PropTypes from 'prop-types'
// COMPONENTS
import TableSection from '../../molecules/TableSection'

const Table = ({ headConfig = null, bodyConfig = null, footConfig = null }) => {
  return (
    <table className="table">
      {headConfig ? <TableSection type="head" rowsContent={headConfig.rowsContent} /> : null}
      {bodyConfig ? <TableSection type="body" rowsContent={bodyConfig.rowsContent} /> : null}
      {footConfig ? <TableSection type="foot" rowsContent={footConfig.rowsContent} /> : null}
    </table>
  )
}

export default Table

Table.propTypes = {
  headConfig: PropTypes.shape(TableSection.propTypes),
  bodyConfig: PropTypes.shape(TableSection.propTypes),
  footConfig: PropTypes.shape(TableSection.propTypes)
}
