// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { PetFormikProps } from '@interfaces/forms'
// CONSTANTS
import { PET_FORM_LABELS } from '@constants/pets'

const usePetFormik = ({ formIsWorking, petTypes, colors }: PetFormikProps) => {
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

  const petFormInputs: CustomFormInputProps<FormFieldProps> = {
    name: {
      config: {
        labelText: PET_FORM_LABELS.TITLE,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'name',
            isDisabled: formIsWorking,
            value: petFormik.values.name,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    petType: {
      config: {
        labelText: PET_FORM_LABELS.PET_TYPE,
        type: FormFieldType.SELECT,
        input: {
          name: 'petType',
          options: petTypes ?? []
        }
      }
    },
    birthday: {
      config: {
        labelText: PET_FORM_LABELS.BIRTHDAY,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'birthday',
            isDisabled: formIsWorking,
            value: petFormik.values.birthday,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    isAdopted: {
      config: {
        labelText: PET_FORM_LABELS.IS_ADOPTED,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'isAdopted',
            isDisabled: formIsWorking,
            value: petFormik.values.isAdopted,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    adoptionDate: {
      config: {
        labelText: PET_FORM_LABELS.ADOPTION_DATE,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'adoptionDate',
            isDisabled: formIsWorking,
            value: petFormik.values.adoptionDate,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    height: {
      config: {
        labelText: PET_FORM_LABELS.HEIGHT,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'height',
            isDisabled: formIsWorking,
            value: petFormik.values.height,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    length: {
      config: {
        labelText: PET_FORM_LABELS.LENGTH,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'length',
            isDisabled: formIsWorking,
            value: petFormik.values.length,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    weight: {
      config: {
        labelText: PET_FORM_LABELS.WEIGHT,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'weight',
            isDisabled: formIsWorking,
            value: petFormik.values.weight,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    gender: {
      config: {
        labelText: PET_FORM_LABELS.GENDER,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'gender',
            isDisabled: formIsWorking,
            value: petFormik.values.gender,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    hairColors: {
      config: {
        labelText: PET_FORM_LABELS.HAIR_COLORS,
        type: FormFieldType.SELECT,
        input: {
          name: 'hairColors',
          options: colors ?? []
        }
      }
    },
    eyeColors: {
      config: {
        labelText: PET_FORM_LABELS.EYE_COLORS,
        type: FormFieldType.SELECT,
        input: {
          name: 'eyeColors',
          options: colors ?? []
        }
      }
    },
    hasHeterochromia: {
      config: {
        labelText: PET_FORM_LABELS.HAS_HETEROCHROMIA,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'hasHeterochromia',
            isDisabled: formIsWorking,
            value: petFormik.values.hasHeterochromia,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    passedAway: {
      config: {
        labelText: PET_FORM_LABELS.PASSED_AWAY,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'passedAway',
            isDisabled: formIsWorking,
            value: petFormik.values.passedAway,
            onChange: petFormik.handleChange
          }
        }
      }
    }
  }

  return { petFormik, petFormInputs }
}

export default usePetFormik
