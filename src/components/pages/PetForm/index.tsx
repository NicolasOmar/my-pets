import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// GRAPHQL CLIENT
import { useMutation, useQuery } from '@apollo/client'
import { GET_COLORS_QUERY, GET_PET_TYPES_QUERY } from '@graphql/queries'
import { CREATE_PET } from '@graphql/mutations'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Select, Title } from 'reactive-bulma'
// FORM CONFIG
import CONFIG from './config.json'
// FUNCTIONS
// INTERFACES
import { InputProps } from '@interfaces/components'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps, FormFieldType } from 'reactive-bulma/dist/interfaces/organismProps'
// CONSTANTS
// import ROUTES from '@constants/routes'

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
      text: 'Add a new pet',
      type: 'title'
    }
  }

  const petFormik = useFormik({
    initialValues: {
      name: '',
      petType: '',
      birthday: '',
      isAdopted: '',
      adoptionDate: '',
      height: '',
      length: '',
      weight: '',
      gender: '',
      hairColors: '',
      eyeColors: '',
      hasHeterochromia: '',
      passedAway: ''
    },
    onSubmit: petFormData => console.warn(petFormData)
  })

  const isLoading = useMemo(
    () => loadingCreate || loadingPetTypes || loadingColors,
    [loadingCreate, loadingPetTypes, loadingColors]
  )

  const petFormInputs: InputProps<FormFieldProps> = {
    name: {
      labelText: 'name',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'name',
            isDisabled: isLoading,
            value: petFormik.values.name,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    petType: {
      labelText: 'Pet Type',
      inputControlConfig: {
        type: FormFieldType.SELECT,
        config: {
          name: 'petType',
          options: petTypes?.getPetTypes ?? []
        }
      }
    },
    birthday: {
      labelText: 'birthday',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'birthday',
            isDisabled: isLoading,
            value: petFormik.values.birthday,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    isAdopted: {
      labelText: 'isAdopted',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'isAdopted',
            isDisabled: isLoading,
            value: petFormik.values.isAdopted,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    adoptionDate: {
      labelText: 'adoptionDate',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'adoptionDate',
            isDisabled: isLoading,
            value: petFormik.values.adoptionDate,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    height: {
      labelText: 'height',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'height',
            isDisabled: isLoading,
            value: petFormik.values.height,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    length: {
      labelText: 'length',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'length',
            isDisabled: isLoading,
            value: petFormik.values.length,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    weight: {
      labelText: 'weight',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'weight',
            isDisabled: isLoading,
            value: petFormik.values.weight,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    gender: {
      labelText: 'gender',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'gender',
            isDisabled: isLoading,
            value: petFormik.values.gender,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    hairColors: {
      labelText: 'HairColors',
      inputControlConfig: {
        type: FormFieldType.SELECT,
        config: {
          name: 'hairColors',
          options: colors?.getColors ?? []
        }
      }
    },
    eyeColors: {
      labelText: 'Eye Colors',
      inputControlConfig: {
        type: FormFieldType.SELECT,
        config: {
          name: 'eyeColors',
          options: colors?.getColors ?? []
        }
      }
    },
    hasHeterochromia: {
      labelText: 'hasHeterochromia',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'hasHeterochromia',
            isDisabled: isLoading,
            value: petFormik.values.hasHeterochromia,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    passedAway: {
      labelText: 'passedAway',
      inputControlConfig: {
        type: FormFieldType.INPUT,
        config: {
          inputConfig: {
            type: 'text',
            name: 'passedAway',
            isDisabled: isLoading,
            value: petFormik.values.passedAway,
            onChange: petFormik.handleChange
          }
        }
      }
    }
  }

  const petFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        type: 'submit',
        color: 'is-success',
        text: 'Confirm'
      },
      {
        type: 'button',
        color: 'is-danger',
        text: 'Cancel'
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
              headerText={'Pet creation errors'}
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
