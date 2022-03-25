import React from 'react'
import { useHistory } from 'react-router'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_PET_TYPES } from '../../../graphql/queries'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { header, inputs, addPetButton, goToHomeButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'

const AddPetPage = () => {
  let history = useHistory()

  const { loading, data } = useQuery(GET_PET_TYPES)

  const onSubmitNewPet = data => {
    const petObj = Object.keys(data)
      .map(key => ({ [key]: data[key] }))
      .reduce((finalObj, currentProp) => ({ ...finalObj, ...currentProp }), {})
    console.error({
      ...petObj
    })
  }

  const onInputBlurChange = formData => {
    console.error(Object.keys(formData).map(key => `${key}: ${formData[key].value}`))

    /**
     * TODOS:
     * find a way to import propTypes for higher order components
     * check if RadioCheckGroup makes sense of having a group of BasicRadioCheck or split the atom in two
     * check dates have their limits (ex 1/1/1900)
     * check adoption date could not be before the birthday date
     * add the isVisible to all Pages
     * fix broken UT
     */
    const isAdopted = formData.isAdopted.value === true
    return {
      ...formData,
      isAdopted: {
        ...formData.isAdopted,
        value: isAdopted
      },
      adoptionDate: {
        ...formData.adoptionDate,
        isVisible: isAdopted,
        isRequired: isAdopted
      }
    }
  }

  return (
    <FormTemplate
      header={header}
      inputs={{
        ...inputs,
        type: {
          ...inputs.type,
          options: data?.getPetTypes?.map(({ id, name }) => ({ value: id, label: name })) || []
        }
      }}
      formButtons={[
        addPetButton,
        {
          ...goToHomeButton,
          onClick: () => history.push(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={formData => onSubmitNewPet(formData)}
      onInputBlurChange={onInputBlurChange}
      dataFetched={!loading}
    />
  )
}

export default AddPetPage
