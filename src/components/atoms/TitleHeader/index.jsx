import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys, parseFieldConfigToClasses } from '../../../functions/parsers'

const { fontSizes } = BULMA_STYLES

const TitleHeader = ({
  testId = null,
  cssClasses = null,
  style = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = null,
  titleText,
  subText = null,
  titleSize = Object.keys(fontSizes)[4],
  subSize = Object.keys(fontSizes)[2],
  isCentered = false
}) => {
  const titleContainerTestId = containerTestId ?? null
  const titleConfig = {
    testId: testId ? `test-title-${testId}` : 'test-title',
    classes: parseFieldConfigToClasses({
      useCommonClasses: true,
      fieldConfig: { isCentered },
      fieldName: 'title',
      otherClasses: [fontSizes[titleSize], cssClasses]
    })
  }
  const subTitleConfig = {
    testId: testId ? `test-sub-title-${testId}` : 'test-sub-title',
    classes: parseFieldConfigToClasses({
      useCommonClasses: true,
      fieldConfig: { isCentered },
      fieldName: 'subtitle',
      otherClasses: [fontSizes[subSize]]
    })
  }

  return (
    <section
      data-testid={titleContainerTestId}
      className={containerCssClasses ?? undefined}
      style={containerStyle ?? undefined}
    >
      <p
        data-testid={titleConfig.testId}
        className={titleConfig.classes}
        style={style ?? undefined}
      >
        {titleText}
      </p>
      {subText && (
        <p data-testid={subTitleConfig.testId} className={subTitleConfig.classes}>
          {subText}
        </p>
      )}
    </section>
  )
}

export default TitleHeader

TitleHeader.propTypes = {
  ...complexPropTypes,
  /** `Attribute` `Required` Sets the text that will be shown as main title */
  titleText: PropTypes.string.isRequired,
  /** `Attribute` Sets the text that will be shown as subtitle */
  subText: PropTypes.string,
  /** `Styling` Sets title's size based on Bulma's size options */
  titleSize: PropTypes.oneOf(parseObjKeys(fontSizes)),
  /** `Styling` Sets subtitle's size based on Bulma's size options */
  subSize: PropTypes.oneOf(parseObjKeys(fontSizes)),
  /** `Styling` Centers the whole title (and subtitle) */
  isCentered: PropTypes.bool
}
