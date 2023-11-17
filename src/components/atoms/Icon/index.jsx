import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes, clickeablePropTypes } from '../../../types/commonTypes'
import { parseFieldConfigToClasses } from '../../../functions/parsers'

const Icon = ({
  testId = null,
  cssClasses = null,
  style = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = null,
  iconLabel = null,
  iconText = null,
  isCustom = true,
  src = null,
  alt = null,
  size = 30,
  onClick = null
}) => {
  const iconTestId = testId ?? isCustom ? `test-custom-icon-img` : `test-icon-mdi-${iconLabel}`
  const iconContainerTestId = containerTestId ?? isCustom ? `test-custom-icon` : `test-icon`
  const iconContainerClasses = parseFieldConfigToClasses({
    fieldName: 'icon',
    otherClasses: [containerCssClasses]
  })
  const iconClasses = parseFieldConfigToClasses({
    fieldName: 'mdi',
    otherClasses: [iconLabel ? `mdi-${iconLabel}` : null, cssClasses]
  })

  return isCustom ? (
    <section
      data-testid={iconContainerTestId}
      className={containerCssClasses}
      style={containerStyle ?? undefined}
    >
      {src ? (
        <img
          data-testid={iconTestId}
          className={cssClasses ?? undefined}
          style={style ?? undefined}
          aria-hidden="true"
          src={src}
          alt={alt ?? undefined}
          title={alt ?? undefined}
          height={size}
          width={size}
          onClick={onClick ?? undefined}
        />
      ) : null}
    </section>
  ) : (
    <span
      data-testid={iconContainerTestId}
      className={iconContainerClasses}
      style={containerStyle ?? undefined}
    >
      <i
        data-testid={iconTestId}
        className={iconClasses}
        style={style ?? undefined}
        aria-hidden="true"
        alt={alt ?? undefined}
        title={alt ?? undefined}
        onClick={onClick ?? undefined}
      ></i>
        {iconText ? <span onClick={onClick ?? undefined}>{iconText}</span> : null}
    </span>
  )
}

export default Icon

Icon.propTypes = {
  ...complexPropTypes,
  ...clickeablePropTypes,
  /** `Attribute` In case of using [a Material Design Icon](https://pictogrammers.com/library/mdi/), it will make appear the selected option in the UI */
  iconLabel: PropTypes.string,
  /** `Attribute` Used when `isCustom` is `false`. Sets a text next to the icon */
  iconText: PropTypes.string,
  /** `Attribute` Indicates that the icon shown is from an external url (and be shown in a `img` tag)*/
  isCustom: PropTypes.bool,
  /** `Attribute` Used when `isCustom` is `true`. It indicates link related to the custom icon that will be shown */
  src: PropTypes.string,
  /** `Attribute` Displays an alternative text when the icon can't be shown */
  alt: PropTypes.string,
  /** `Attribute` Used when `isCustom` is `true`. Sets a size in pixels based on a numeric input */
  size: PropTypes.number
}
