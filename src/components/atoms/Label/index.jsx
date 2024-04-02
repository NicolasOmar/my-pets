import PropTypes from 'prop-types'
// TYPES
import { elementPropTypes } from '../../../types/commonTypes'

const Label = ({
  testId = null,
  cssClasses = null,
  style = null,
  labelText,
  isRequired = false
}) => {
  const labelTestId = testId ?? `test-label-${labelText.replace(' ', '-')}`
  const labelClasses = cssClasses ? `label ${cssClasses}` : 'label'
  const requiredLabelTestId = `test-required-${labelText.replace(' ', '-')}`
  const requiredStyles = { color: 'red', marginLeft: '2px' }

  return (
    <label
      key={`label-${labelText.replace(' ', '-')}`}
      data-testid={labelTestId}
      className={labelClasses}
      style={style ?? undefined}
    >
      {labelText}
      {isRequired && (
        <label data-testid={requiredLabelTestId} style={requiredStyles}>
          *
        </label>
      )}
    </label>
  )
}

export default Label

Label.propTypes = {
  ...elementPropTypes,
  /** `Attribute` `Required` Sets the text that will be shown */
  labelText: PropTypes.string.isRequired,
  /** `Styling` Adds a red asterisk that mark the component next to it as required */
  isRequired: PropTypes.bool
}
