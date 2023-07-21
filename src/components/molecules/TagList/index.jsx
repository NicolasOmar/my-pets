import React from 'react'
import PropTypes from 'prop-types'
// OTHER COMPONENTES
import Tag from '../../atoms/Tag'
// MOCKS
import { testing } from './index.mocks.json'

const { testDataListText } = testing
const TagList = ({ dataList = [] }) =>
  Array.isArray(dataList) ? (
    <div data-testid={`${testDataListText}-${dataList.length}`} className="tags">
      {dataList.map((_dataItem, i) => (
        <Tag key={`tag-${i}`} {..._dataItem} />
      ))}
    </div>
  ) : null

export default TagList

TagList.propTypes = {
  dataList: PropTypes.arrayOf(
    PropTypes.shape(Tag.propTypes)
  ).isRequired
}
