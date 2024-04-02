
import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'
// OTHER COMPONENTS
import BasicButton from '../../atoms/BasicButton'
// FUNCTIONS
import { parseFieldConfigToClasses } from '../../../functions/parsers'

const ButtonGroup = ({
  testId = null,
  cssClasses = null,
  style = null,
  buttons,
  isCentered = true
}) => {
  const btnGroupTestId = testId ?? 'test-button-group'
  const btnGroupClasses = parseFieldConfigToClasses({
    useCommonClasses: true,
    fieldConfig: { isCentered },
    fieldName: 'buttons',
    otherClasses: ['has-addons', cssClasses]
  })
  return (
    <section
      key={'button-group'}
      data-testid={btnGroupTestId}
      className={btnGroupClasses}
      style={style}
    >
      {buttons.map((button, i) => (
        <BasicButton key={`btn-${button.color}-${i}`} {...button} />
      ))}
    </section>
  )
}

export default ButtonGroup

ButtonGroup.propTypes = {
  ...elementPropTypes,
  /** `Attribute` `Required` Array of button that will be shown together without any gap */
  buttons: PropTypes.arrayOf(PropTypes.shape(BasicButton.propTypes)).isRequired,
  /** `Styling` Will center the group in the screen (on in another container) */
  isCentered: PropTypes.bool
}
