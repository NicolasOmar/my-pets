import React from 'react'
import PropTypes from 'prop-types'

const Icon = ({ isCustom = true, src = '', alt = '', size = 30, styles = {}, cssClasses = '' }) =>
  isCustom ? (
    <section data-testid={`test-custom-icon`} style={styles} className={cssClasses}>
      {src ? (
        <img
          data-testid={`test-custom-icon-img`}
          src={src}
          alt={alt}
          title={alt}
          height={size}
          width={size}
        />
      ) : null}
    </section>
  ) : (
    <span data-testid={`test-icon`} className="icon">
      <i className={`fas fa-${cssClasses}`}></i>
    </span>
  )

export default Icon

Icon.propTypes = {
  isCustom: PropTypes.bool,
  src: PropTypes.string,
  alt: PropTypes.string,
  size: PropTypes.number,
  styles: PropTypes.object,
  cssClasses: PropTypes.string
}
