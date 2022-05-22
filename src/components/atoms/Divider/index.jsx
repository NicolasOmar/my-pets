import React from 'react'
import { object, oneOf } from 'prop-types'
// CONSTANTS
import { textColors } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const Divider = ({ color = parseObjKeys(textColors)[0], style = { borderTop: '1px solid' } }) => (
  <hr style={style} className={`${textColors[color]}`} data-testid={`test-${color}-divider`} />
)

export default Divider

Divider.propTypes = {
  color: oneOf(parseObjKeys(textColors)),
  style: object
}
