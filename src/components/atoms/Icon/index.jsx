import React from 'react'
import PropTypes from 'prop-types'
// TYPES
import { complexPropTypes } from '../../../types/commonTypes'

const Icon = ({
  testId = null,
  cssClasses = null,
  style = null,
  containerTestId = null,
  containerCssClasses = null,
  containerStyle = null,
  isCustom = true,
  src = '',
  alt = '',
  size = 30
}) =>{
  const iconTestId = testId ?? isCustom ? `test-custom-icon-img` : null
  const iconContainerTestId = containerTestId ?? isCustom ? `test-custom-icon` : `test-icon`

  return (
    isCustom ? (
      <section
        data-testid={iconContainerTestId}
        className={containerCssClasses}
        style={containerStyle ?? undefined}
      >
        {src ? (
          <img
            data-testid={iconTestId}
            src={src}
            alt={alt}
            title={alt}
            height={size}
            width={size}
            className={cssClasses ?? undefined}
            style={style}
          />
        ) : null}
      </section>
    ) : (
      <span
        data-testid={iconContainerTestId}
        className={containerCssClasses ?? 'icon'}
        style={containerStyle ?? undefined}
      >
        <i
          data-testid={iconTestId}
          className={`fas fa-${cssClasses}`}
          style={style}
        ></i>
      </span>
    )
  )
}

export default Icon

Icon.propTypes = {
  ...complexPropTypes,
  /** `Attribute` Indicates that the icon shown is not from any of Bulma's sources */
  isCustom: PropTypes.bool,
  /** `Attribute` Indicates link related to the custom icon that will be shown */
  src: PropTypes.string,
  /** `Attribute` Displays an alternative text when the icon can't be shown */
  alt: PropTypes.string,
  /** `Attribute` Sets a size in pixels based on a numeric input */
  size: PropTypes.number
}
