import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { ElementProps } from '../../../interfaces/commonTypes'
// OTHER COMPONENTS
import Column from '../../atoms/Column'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const { columnSizes } = BULMA_STYLES

const GridLayout = ({
  testId = null,
  style = null,
  children = [],
  width = parseObjKeys(columnSizes)[0],
  centerGrid = false
}) => {
  const gridLayoutTestId = testId ?? 'test-grid-layout'
  const renderGridLayout = () => {
    const gridHasDefinedWidth = children
      .filter(childNode => childNode)
      .every(childNode => childNode?.props?.childWidth)

    return gridHasDefinedWidth ? (
      <Column
        key={'grid-layout'}
        {...{
          _key: `grid-layout`,
          testId: gridLayoutTestId,
          isCentered: centerGrid,
          isMultiline: true,
          isContainer: true,
          children: children
            .filter(childNode => childNode)
            .map((childNode, i) => renderChild(childNode, i)),
          style: style ?? undefined
        }}
      />
    ) : (
      children
        .filter(childNode => childNode)
        .map((childNode, i) => (
          <Column
            key={`grid-layout-${i}`}
            {...{
              _key: `grid-layout-${i}`,
              testId: `${gridLayoutTestId}-${i}`,
              isCentered: centerGrid,
              isContainer: true,
              children: renderChild(childNode),
              style: style ?? undefined
            }}
          />
        ))
    )
  }
  const renderChild = (childNode, i = 0) => (
    <Column
      key={`column-${i}`}
      {...{
        _key: `column-${i}`,
        testId: `test-column-${i}`,
        width: childNode.props?.childWidth || width,
        children: childNode
      }}
    />
  )

  return Array.isArray(children) ? (
    renderGridLayout()
  ) : (
    <Column
      {...{
        _key: `grid-layout`,
        testId: `${gridLayoutTestId}`,
        isCentered: centerGrid,
        isContainer: true,
        children: renderChild(children),
        style: style ?? undefined
      }}
    />
  )
}

export default GridLayout

GridLayout.propTypes = {
  ...ElementProps,
  /** `Attribute` Indicates which components (could be 1 or more) container in the grid */
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  /** `Styling` Indicates grid's width using a idea similar to Bootstrap grid system */
  width: PropTypes.oneOf(parseObjKeys(columnSizes, true)),
  /** `Styling` Centers grid's content */
  centerGrid: PropTypes.bool
}
