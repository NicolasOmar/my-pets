import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const { imageRatios } = BULMA_STYLES

const parseImgClasses = (fixedRatio, ratio) =>
  Number.isInteger(fixedRatio)
    ? `image is-${fixedRatio}x${fixedRatio}`
    : imageRatios[ratio]
    ? `image ${imageRatios[ratio]}`
    : 'image'

const Image = ({
  testId = null,
  cssClasses = null,
  style = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = null,
  src,
  altText,
  fixedRatio,
  ratio,
  isRounded = false
}) => {
  const imgContainerTestId = containerTestId ?? ''
  const imgTestId = testId ?? altText.toLowerCase().replace(' ', '-')
  const imgContainerClass = `${parseImgClasses(fixedRatio, ratio)} ${containerCssClasses}`
  const imgClass = `${isRounded ? 'is-rounded' : ''} ${cssClasses}`

  return (
    <figure
      data-testid={imgContainerTestId}
      className={imgContainerClass}
      style={containerStyle ?? undefined}
    >
      <img
        data-testid={imgTestId}
        src={src}
        alt={altText}
        className={imgClass}
        style={style ?? undefined}
      />
    </figure>
  )
}

export default Image

Image.propTypes = {
  ...complexPropTypes,
  /** `Attribute` `Required` Indicates link related to the image that will be shown */
  src: PropTypes.string.isRequired,
  /** `Attribute` `Required` Displays an alternative text when the image can't be shown */
  altText: PropTypes.string.isRequired,
  /** `Styling` Sets a size based on a list of defined ratios by Bulma */
  fixedRatio: PropTypes.number,
  /** `Styling` Sets a size in pixels based on a numeric input */
  ratio: PropTypes.oneOf(parseObjKeys(imageRatios)),
  /** `Styling` Makes select's corners rounded */
  isRounded: PropTypes.bool
}
