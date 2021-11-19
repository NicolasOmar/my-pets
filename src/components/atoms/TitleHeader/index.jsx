import React from 'react'
import { bool, object, oneOf, string } from 'prop-types'
// CONSTANTS
import { fontSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys, parseCssClasses } from '../../../functions/parsers'

const TitleHeader = ({
  titleText,
  titleSize = Object.keys(fontSizes)[4],
  subText = null,
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
      <p data-testid={'test-title'} className={classes.title}>
        {titleText}
      </p>
      {subText && (
        <p data-testid={'sub-test-title'} className={classes.subTitle}>
          {subText}
        </p>
      )}
    </section>
  )
}

export default TitleHeader

TitleHeader.propTypes = {
  titleText: string.isRequired,
  titleSize: oneOf(parseObjKeys(fontSizes, true)),
  subText: string,
  subSize: oneOf(parseObjKeys(fontSizes, true)),
  isCentered: bool,
  styles: object
}
