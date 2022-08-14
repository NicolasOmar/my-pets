import React from 'react'
import { bool, number, object, oneOf, string } from 'prop-types'
// CONSTANTS
import { imageRatios } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const Image = ({ src, altText, styles = {}, fixedRatio, ratio, isRounded = false }) => {
  const figureClass = Number.isInteger(fixedRatio)
    ? `image is-${fixedRatio}x${fixedRatio}`
    : imageRatios[ratio]
    ? `image ${imageRatios[ratio]}`
    : 'image'
  const imgClass = isRounded && 'is-rounded'

  return (
    <figure className={figureClass} style={styles}>
      <img src={src} alt={altText} className={imgClass} />
    </figure>
  )
}

export default Image

Image.propTypes = {
  // BASE IMG PROPS
  src: string.isRequired,
  altText: string.isRequired,
  // STYLE PROPS
  styles: object,
  fixedRatio: number,
  ratio: oneOf(parseObjKeys(imageRatios)),
  isRounded: bool
}
