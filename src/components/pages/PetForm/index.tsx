import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// API
import { FetchResult, useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { GET_COLORS_QUERY, GET_PET_QUERY, GET_PET_TYPES_QUERY } from '@graphql/queries'
import { CREATE_PET, UPDATE_PET } from '@graphql/mutations'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
import usePetFormik from './form'
// INTERFACES
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
import {
  ColorsResponse,
  GetPetResponse,
  PetCreatePayload,
  PetCreateResponse,
  PetTypesResponse,
  PetUpdateResponse
} from '@interfaces/graphql'
import { PetFormData } from '@interfaces/forms'
// CONSTANTS
import { PET_FORM_LABELS } from '@constants/forms'
import { APP_ROUTES } from '@constants/routes'
// FUNCTIONS
import { getDataFromArrays, nullifyValue, parseToLuxonDate } from '@functions/parsers'

const PetForm = () => {
  const { petId = null } = useParams()
  let navigate = useNavigate()
  const {
    loading: loadingPetTypes,
    data: petTypes,
    error: errorPetTypes
  } = useQuery<PetTypesResponse>(GET_PET_TYPES_QUERY)
  const {
    loading: loadingColors,
    data: colors,
    error: errorColors
  } = useQuery<ColorsResponse>(GET_COLORS_QUERY, { variables: { petId } })
  const [getPet, { loading: loadingPetData, data: petData, error: errorPetData }] =
    useLazyQuery<GetPetResponse>(GET_PET_QUERY)
  const [createPet, { loading: loadingCreate, error: errorCreate }] = useMutation<
    PetCreateResponse,
    PetCreatePayload
  >(CREATE_PET)
  const [updatePet, { loading: loadingUpdate, error: errorUpdate }] = useMutation<
    Boolean,
    PetUpdateResponse
  >(UPDATE_PET)

  useEffect(() => {
    if (petId !== null && petTypes && colors && petData === undefined) {
      getPet({ variables: { petId } })
    }
  }, [petId, petTypes, colors, petData, getPet])

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
    () => loadingPetTypes || loadingColors || loadingPetData || loadingCreate || loadingUpdate,
    [loadingPetTypes, loadingColors, loadingPetData, loadingCreate, loadingUpdate]
  )

  const formErrors = useMemo(
    () => errorPetTypes || errorColors || errorPetData || errorCreate || errorUpdate,
    [errorPetTypes, errorColors, errorPetData, errorCreate, errorUpdate]
  )

  const handleSubmit = async (formData: PetFormData) => {
    let result: FetchResult<PetCreateResponse> | FetchResult<Boolean>

    const birthday = nullifyValue({
      value: formData.birthday,
      nullableValue: '',
      valueToShow: parseToLuxonDate(formData.birthday)
    })
    const adoptionDate = nullifyValue({
      value: formData.adoptionDate,
      nullableValue: '',
      valueToShow: parseToLuxonDate(formData.adoptionDate)
    })

    const petPayload = {
      name: formData.name,
      birthday,
      isAdopted: formData.isAdopted,
      adoptionDate,
      height: formData.height,
      length: formData.length,
      weight: formData.weight,
      gender: formData.gender,
      petType:
        (petTypes?.getPetTypes ?? []).find(_type => formData.petType === _type.id)?.id.toString() ??
        '',
      hairColors: getDataFromArrays(formData.hairColors, colors?.getColors ?? [], 'id', 'id'),
      hasHeterochromia: !!formData.hasHeterochromia,
      eyeColors: [
        (colors?.getColors ?? []).find(_color => formData.eyeColors === _color.id)?.id.toString() ??
          ''
      ],
      passedAway: formData.passedAway
    }

    if (petId) {
      result = await updatePet({
        variables: {
          id: petId,
          payload: petPayload
        }
      })
    } else {
      result = await createPet({
        variables: {
          payload: petPayload
        }
      })
    }

    if (result) {
      navigate(APP_ROUTES.PET_LIST)
    }
  }

  const { petFormik, petFormInputs } = usePetFormik({
    formIsWorking,
    petTypes: petTypes?.getPetTypes ?? undefined,
    colors: colors?.getColors ?? undefined,
    petData: petData?.getPet,
    handleSubmit
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
        color: 'is-danger',
        onClick: () => navigate(APP_ROUTES.PET_LIST)
      }
    ]
  }

  const memorizedInputs = useMemo(
    () => (
      <>
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
        {petId ? <FormField {...petFormInputs.passedAway} /> : null}
      </>
    ),
    [petFormInputs]
  )

  return (
    <Column size="is-8" offset="is-offset-2">
      <Box>
        <Title {...petFormHeader} />

        <form onSubmit={petFormik.handleSubmit}>
          {memorizedInputs}

          <ButtonGroup {...petFormButtons} />

          {formErrors ? (
            <Message
              headerText={PET_FORM_LABELS.ERROR_TITLE}
              bodyText={formErrors.message}
              color="is-danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default PetForm
