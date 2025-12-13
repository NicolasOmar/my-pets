import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
// API
import { ApolloClient } from '@apollo/client'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client/react'
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
  ColorListResponse,
  PetGetResponse,
  PetCreatePayload,
  PetCreateResponse,
  PetTypeListResponse,
  PetUpdateResponse
} from '@interfaces/graphql'
import { PetFormData } from '@interfaces/forms'
// CONSTANTS
import { PET_FORM_LABELS, PET_FORM_TEST_IDS } from '@constants/forms'
import { APP_ROUTES } from '@constants/routes'
import { COMMON_LABELS } from '@constants/common'
// FUNCTIONS
import { parsePetFormData } from './parsers'

const PetForm: React.FC = () => {
  const { petId = null } = useParams()
  const navigate = useNavigate()
  const {
    loading: loadingPetTypes,
    data: petTypes,
    error: errorPetTypes
  } = useQuery<PetTypeListResponse>(GET_PET_TYPES_QUERY)
  const {
    loading: loadingColors,
    data: colors,
    error: errorColors
  } = useQuery<ColorListResponse>(GET_COLORS_QUERY, { variables: { petId } })
  const [getPet, { loading: loadingPetData, data: petData, error: errorPetData }] =
    useLazyQuery<PetGetResponse>(GET_PET_QUERY, { fetchPolicy: 'network-only' })
  const [createPet, { loading: loadingCreate, error: errorCreate }] = useMutation<
    PetCreateResponse,
    PetCreatePayload
  >(CREATE_PET)
  const [updatePet, { loading: loadingUpdate, error: errorUpdate }] = useMutation<
    boolean,
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
    let result: ApolloClient.MutateResult<PetCreateResponse> | ApolloClient.MutateResult<boolean>
    const petPayload = parsePetFormData(formData, petTypes, colors)

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
        testId: PET_FORM_TEST_IDS.SUBMIT_BTN,
        text: petId ? COMMON_LABELS.CONFIRM : COMMON_LABELS.ADD,
        type: 'submit',
        color: 'success'
      },
      {
        testId: PET_FORM_TEST_IDS.CANCEL_BTN,
        text: COMMON_LABELS.CANCEL,
        type: 'button',
        color: 'danger',
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
        <FormField {...petFormInputs.weight} />
        <FormField {...petFormInputs.gender} />
        <FormField {...petFormInputs.hairColors} />
        <FormField {...petFormInputs.eyeColors} />
        <FormField {...petFormInputs.hasHeterochromia} />
        {petId ? <FormField {...petFormInputs.passedAway} /> : null}
      </>
    ),
    [petFormInputs, petId]
  )

  return (
    <Column size="8" offset="2">
      <Box>
        <Title {...petFormHeader} />

        <form onSubmit={petFormik.handleSubmit}>
          {memorizedInputs}

          <ButtonGroup {...petFormButtons} />

          {formErrors ? (
            <Message
              headerText={PET_FORM_LABELS.ERROR_TITLE}
              bodyText={formErrors.message}
              color="danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default PetForm
