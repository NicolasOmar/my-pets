import React from 'react'
import { useHistory } from 'react-router'
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, addPetButton, goToHomeButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'

const AddPetPage = () => {
  let history = useHistory()

  const onSubmitNewPet = data => {
    console.error(
      Object.keys(data)
        .map(key => ({ [key]: data[key] ?? false }))
        .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
    )
  }

  return (
    <FormTemplate
      header={header}
      inputs={inputs}
      formButtons={[
        addPetButton,
        {
          ...goToHomeButton,
          onClick: () => history.push(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={formData => onSubmitNewPet(formData)}
    />
  )
}

export default AddPetPage
