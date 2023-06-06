import React from 'react'
import { arrayOf, shape } from 'prop-types'
// OTHER COMPONENTES
import Tag from '../../atoms/Tag'

const TagList = ({ dataList = [] }) =>
  Array.isArray(dataList) ? (
    <div data-testid={`test-tag-list-${dataList.length}`} className="tags">
      {dataList.map((dataItem, i) => (
        <Tag key={`tag-${i}`} {...dataItem} />
      ))}
    </div>
  ) : null

export default TagList

TagList.propTypes = {
  dataList: arrayOf(shape(Tag.propTypes)).isRequired
}
