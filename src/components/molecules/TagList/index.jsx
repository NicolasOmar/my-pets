
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// OTHER COMPONENTES
import Tag from '../../atoms/Tag'

const TagList = ({ testId = null, cssClasses = null, style = null, dataList }) => {
  const tagListTestId = testId ?? 'test-tag-list-item'
  const tagListClasses = cssClasses ?? 'tags'

  return Array.isArray(dataList) ? (
    <section data-testid={tagListTestId} className={tagListClasses} style={style ?? undefined}>
      {dataList.map((_dataItem, i) => (
        <Tag key={`tag-${i}`} {..._dataItem} />
      ))}
    </section>
  ) : null
}

export default TagList

TagList.propTypes = {
  ...elementPropTypes,
  /** `Attribute` `Required` Sets the tags that will be shown inside this group */
  dataList: PropTypes.arrayOf(PropTypes.shape(Tag.propTypes)).isRequired
}
