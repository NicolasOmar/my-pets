import { number, object, string } from 'prop-types'
import React from 'react'
import './index.scss'

const Spinner = ({
  styles = {},
  size = 120,
  borderSize = 16,
  mainColor = '#F3F3F3',
  spinnerColor = '#3498DB',
  animationTime = 2
}) => (
  <div
    key="spinner"
    data-testid="test-spinner"
    className="loader"
    style={{
      ...styles,
      width: `${size}px`,
      height: `${size}px`,
      border: `${borderSize}px solid ${mainColor}`,
      borderTop: `${borderSize}px solid ${spinnerColor}`,
      animation: `spin ${animationTime}s linear infinite`
    }}
  />
)

export default Spinner

Spinner.propTypes = {
  styles: object,
  size: number,
  borderSize: number,
  mainColor: string,
  spinnerColor: string,
  animationTime: number
}
