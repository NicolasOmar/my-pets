import React from 'react'
import { bool, number, object, string } from 'prop-types'

const Icon = ({ isCustom = false, src = '', alt = '', size = 30, styles = {}, cssClasses = '' }) =>
  isCustom ? (
    <section style={styles} className={cssClasses}>
      <img src={src} alt={alt} title={alt} height={size} width={size} />
    </section>
  ) : (
    <span className="icon">
      <i className={`fas fa-${cssClasses}`}></i>
    </span>
  )

export default Icon

Icon.propTypes = {
  isCustom: bool,
  src: string,
  alt: string,
  size: number,
  styles: object,
  cssClasses: string
}
