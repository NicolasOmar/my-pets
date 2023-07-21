import React from 'react'
import PropTypes from 'prop-types'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys, parseFieldConfigToClasses } from '../../../functions/parsers'

const { fontSizes } = BULMA_STYLES

const TitleHeader = ({
  titleText,
  subText = null,
  titleSize = Object.keys(fontSizes)[4],
  subSize = Object.keys(fontSizes)[2],
  isCentered = false,
  styles = {},
  cssClasses = ''
}) => {
  const classes = {
    title: parseFieldConfigToClasses({
      useCommonClasses: true,
      fieldConfig: { isCentered },
      fieldName: 'title',
      otherClasses: [fontSizes[titleSize]]
    }),
    subTitle: parseFieldConfigToClasses({
      useCommonClasses: true,
      fieldConfig: { isCentered },
      fieldName: 'subtitle',
      otherClasses: [fontSizes[subSize]]
    })
  }

  return (
    <section style={styles} className={cssClasses}>
      <p key={'title'} data-testid={'test-title'} className={classes.title}>
        {titleText}
      </p>
      {subText && (
        <p key={'sub-title'} data-testid={'test-sub-title'} className={classes.subTitle}>
          {subText}
        </p>
      )}
    </section>
  )
}

export default TitleHeader

TitleHeader.propTypes = {
  titleText: PropTypes.string.isRequired,
  subText: PropTypes.string,
  // STYLE PROPS
  titleSize: PropTypes.oneOf(parseObjKeys(fontSizes)),
  subSize: PropTypes.oneOf(parseObjKeys(fontSizes)),
  isCentered: PropTypes.bool,
  styles: PropTypes.object,
  cssClasses: PropTypes.string
}
