import React, { useEffect, useRef, useState } from 'react'
// COMPONENTS
// FUNCTIONS
import { checkIsValidForm, validateInput, sendObjValues } from '../../../functions/methods'
import { parseFieldConfigToClasses } from '../../../functions/parsers'
import validators from '../../../functions/validators'
import { FormLayoutProps } from '@interfaces/components'
import { ButtonGroup, FormField, Message } from 'reactive-bulma'

const FormLayout: React.FC<FormLayoutProps> = ({
  inputs,
  buttons,
  errors = null,
  onSubmit,
}) => {
  const formClasses = parseFieldConfigToClasses({
    fieldConfig: { errors },
    fieldName: 'form'
  })

  return (
    <form key="form-base" data-testid="test-form-base" className={formClasses} onSubmit={onSubmit}>
      {Object.keys(inputs).map((prop, i) => {
        return (
          <React.Fragment key={`input-container-${prop}-${i}`}>
            <FormField {...inputs[prop]} />
          </React.Fragment>
        )
      })}
      {buttons && (
        <ButtonGroup key="form-button-group" {...buttons} />
      )}
      {errors && (
        <Message
          key="form-error-message"
          headerText={'New Errors'}
          bodyText={errors}
        />
      )}
    </form>
  )
}

export default FormLayout
