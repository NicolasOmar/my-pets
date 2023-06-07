import React from 'react'
import { element, array, oneOfType, oneOf, bool, object } from 'prop-types'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
import Column from '../../atoms/Column'

const { columnSizes } = BULMA_STYLES

const GridLayout = ({
  children = [],
  width = parseObjKeys(columnSizes)[0],
  centerGrid = false,
  styles = {}
}) => {
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
    children.filter(childNode => childNode).every(childNode => childNode?.props?.childWidth) ? (
      <Column
        key={'grid-layout'}
        {...{
          _key: `grid-layout`,
          testId: `test-grid-layout`,
          isCentered: centerGrid,
          isMultiline: true,
          isContainer: true,
          children: children
            .filter(childNode => childNode)
            .map((childNode, i) => renderChild(childNode, i)),
          styles
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
              testId: `test-grid-layout-${i}`,
              isCentered: centerGrid,
              isContainer: true,
              children: renderChild(childNode),
              styles
            }}
          />
        ))
    )
  ) : (
    <Column
      {...{
        _key: `grid-layout`,
        testId: `test-grid-layout`,
        isCentered: centerGrid,
        isContainer: true,
        children: renderChild(children),
        styles
      }}
    />
  )
}

export default GridLayout

GridLayout.propTypes = {
  children: oneOfType([element, array]),
  width: oneOf(parseObjKeys(columnSizes, true)),
  centerGrid: bool,
  styles: object
}