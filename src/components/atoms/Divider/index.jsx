import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const { textColors } = BULMA_STYLES

const Divider = ({
  testId = null,
  cssClasses = null,
  style = { borderTop: '1px solid' },
  color = parseObjKeys(textColors)[0]
}) => (
  <hr
    key={`divider-${color}`}
    data-testid={testId ?? `test-divider-${color}`}
    style={style}
    className={`${textColors[color]} ${cssClasses ?? ''}`}
  />
)

export default Divider

Divider.propTypes = {
  ...elementPropTypes,
  /** `Styling` Sets a color based con Bulma's color options */
  color: PropTypes.oneOf(parseObjKeys(textColors))
}
