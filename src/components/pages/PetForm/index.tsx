import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// GRAPHQL CLIENT
import { useMutation, useQuery } from '@apollo/client'
import { GET_COLORS_QUERY, GET_PET_TYPES_QUERY } from '@graphql/queries'
import { CREATE_PET } from '@graphql/mutations'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// FORM CONFIG
// FUNCTIONS
// INTERFACES
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// CONSTANTS
// import ROUTES from '@constants/routes'
import { PET_FORM_LABELS } from '@constants/pets'
import usePetFormik from './form'

// const { header, inputs, dividers, addPetButton, goToHomeButton } = CONFIG

const PetForm = () => {
  let navigate = useNavigate()
  const { loading: loadingPetTypes, data: petTypes } = useQuery(GET_PET_TYPES_QUERY)
  const {
    loading: loadingColors,
    data: colors,
    error: petCreateErrors
  } = useQuery(GET_COLORS_QUERY)
  const [createPet, { loading: loadingCreate, error: errorCreate }] = useMutation(CREATE_PET)

  // const onSubmitNewPet = async formData => {
  //   const petObj = parseFormDataToObj(formData)

  //   const petInfo = {
  //     ...petObj,
  //     birthday: parseDate(petObj?.birthday),
  //     isAdopted: !!petObj.isAdopted,
  //     adoptionDate: parseDate(petObj?.adoptionDate),
  //     height: parseNumber(petObj.height),
  //     length: parseNumber(petObj.length),
  //     weight: parseNumber(petObj.weight),
  //     petType: searchNamesFromIds(petObj?.petType, petTypes?.getPetTypes),
  //     hairColors: searchNamesFromIds(petObj?.hairColors, colors?.getColors, true),
  //     hasHeterochromia: !!petObj.hasHeterochromia,
  //     eyeColors: searchNamesFromIds(petObj?.eyeColors, colors?.getColors, true),
  //     passedAway: false
  //   }

  //   await createPet({
  //     variables: { petInfo }
  //   })

  //   navigate(APP_ROUTES.LIST_MY_PETS)
  // }

  // const onInputBlurChange = formData => {
  //   const { isAdopted, adoptionDate, birthday, hasHeterochromia, eyeColors } = formData
  //   const isAdoptedSelected = isAdopted.value === true
  //   const hasCorrectDates =
  //     !isAdoptedSelected || !validators.dateIsBefore(adoptionDate.value, birthday.value)
  //   const hasDiffEyes = !!hasHeterochromia.value

  //   return {
  //     ...formData,
  //     isAdopted: {
  //       ...formData.isAdopted,
  //       value: isAdoptedSelected
  //     },
  //     birthday: {
  //       ...formData.birthday,
  //       isValid: hasCorrectDates
  //     },
  //     adoptionDate: {
  //       ...formData.adoptionDate,
  //       value: isAdoptedSelected ? formData.adoptionDate.value : null,
  //       isVisible: isAdoptedSelected,
  //       isRequired: isAdoptedSelected,
  //       isValid: hasCorrectDates
  //     },
  //     eyeColors: {
  //       ...eyeColors,
  //       isMultiple: hasDiffEyes,
  //       optionsShown: hasDiffEyes ? 3 : 1,
  //       firstNullOption: !hasDiffEyes,
  //       value: eyeColors.isMultiple !== hasDiffEyes ? null : eyeColors.value
  //     }
  //   }
  // }

  const petFormHeader: TitleProps = {
    main: {
      text: PET_FORM_LABELS.TITLE,
      type: 'title'
    }
  }

  const formIsWorking = useMemo(
    () => loadingCreate || loadingPetTypes || loadingColors,
    [loadingCreate, loadingPetTypes, loadingColors]
  )

  const { petFormik, petFormInputs } = usePetFormik({
    formIsWorking,
    petTypes: petTypes?.getPetTypes ?? undefined,
    colors: colors?.getColors ?? undefined
  })

  const petFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        text: PET_FORM_LABELS.SUBMIT_BTN,
        type: 'submit',
        color: 'is-success'
      },
      {
        text: PET_FORM_LABELS.CANCEL_BTN,
        type: 'button',
        color: 'is-danger'
      }
    ]
  }

  return (
    <Column size="is-8" offset="is-offset-2">
      <Box>
        <Title {...petFormHeader} />

        <form onSubmit={petFormik.handleSubmit}>
          <FormField {...petFormInputs.name} />
          <FormField {...petFormInputs.petType} />
          <FormField {...petFormInputs.birthday} />
          <FormField {...petFormInputs.isAdopted} />
          <FormField {...petFormInputs.adoptionDate} />
          <FormField {...petFormInputs.height} />
          <FormField {...petFormInputs.length} />
          <FormField {...petFormInputs.weight} />
          <FormField {...petFormInputs.gender} />
          <FormField {...petFormInputs.hairColors} />
          <FormField {...petFormInputs.eyeColors} />
          <FormField {...petFormInputs.hasHeterochromia} />
          <FormField {...petFormInputs.passedAway} />

          <ButtonGroup {...petFormButtons} />

          {petCreateErrors ? (
            <Message
              headerText={PET_FORM_LABELS.ERROR_TITLE}
              bodyText={petCreateErrors.message}
              color="is-danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default PetForm
