import React from 'react'
import { bool, object, oneOf, string } from 'prop-types'
// CONSTANTS
import { fontSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys, parseCssClasses } from '../../../functions/parsers'

const TitleHeader = ({
  titleText,
  subText = null,
  titleSize = Object.keys(fontSizes)[4],
  subSize = Object.keys(fontSizes)[2],
  isCentered = false,
  styles = {}
}) => {
  const classes = {
    title: parseCssClasses({ isCentered }, 'title', [fontSizes[titleSize]]),
    subTitle: parseCssClasses({ isCentered }, 'subtitle', [fontSizes[subSize]])
  }

  return (
    <section style={styles}>
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
  titleText: string.isRequired,
  subText: string,
  // STYLE PROPS
  titleSize: oneOf(parseObjKeys(fontSizes)),
  subSize: oneOf(parseObjKeys(fontSizes)),
  isCentered: bool,
  styles: object
}
