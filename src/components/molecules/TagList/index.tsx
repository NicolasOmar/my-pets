import React from 'react'
// TYPES
import { ElementProps } from '@interfaces/components'
// OTHER COMPONENTES
import { Tag } from 'reactive-bulma'
import { TagProps } from 'reactive-bulma/dist/interfaces/atomProps'

interface TagListProps extends ElementProps {
  dataList: TagProps[]
}

const TagList: React.FC<TagListProps> = ({
  testId = null,
  cssClasses = null,
  style = null,
  dataList
}) => {
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
