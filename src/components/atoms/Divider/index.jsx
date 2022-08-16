import React from 'react'
import { object, oneOf } from 'prop-types'
// CONSTANTS
import { textColors } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const Divider = ({ color = parseObjKeys(textColors)[0], styles = { borderTop: '1px solid' } }) => (
  <hr
    key={`divider-${color}`}
    data-testid={`test-divider-${color}`}
    style={styles}
    className={`${textColors[color]}`}
  />
)

export default Divider

Divider.propTypes = {
  color: oneOf(parseObjKeys(textColors)),
  styles: object
}
