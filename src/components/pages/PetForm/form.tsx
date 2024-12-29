// CORE
import { useFormik } from 'formik'
// INTERFACES
import { SelectProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { PetFormData, PetFormikProps } from '@interfaces/forms'
// CONSTANTS
import { PET_FORM_LABELS } from '@constants/forms'
import { DATE_FOR_DATEPICKER } from '@constants/formats'
// FUNCTIONS
import { parseStringToLuxonDate } from '@functions/parsers'

const usePetFormik = ({
  formIsWorking,
  petTypes,
  colors,
  petData,
  handleSubmit
}: PetFormikProps) => {
  const petFormik = useFormik<PetFormData>({
    initialValues: {
      name: petData?.name ?? '',
      petType: petData?.petType.id ?? '',
      birthday: parseStringToLuxonDate(petData?.birthday, '', DATE_FOR_DATEPICKER) as string,
      isAdopted: petData?.isAdopted ?? false,
      adoptionDate: parseStringToLuxonDate(
        petData?.adoptionDate,
        '',
        DATE_FOR_DATEPICKER
      ) as string,
      height: petData?.height ?? 0,
      length: petData?.length ?? 0,
      weight: petData?.weight ?? 0,
      gender: petData?.gender ?? false,
      hairColors: petData?.hairColors.map(({ id }) => id) ?? [''],
      eyeColors: petData?.eyeColors[0].id ?? '',
      hasHeterochromia: petData?.hasHeterochromia ?? false,
      passedAway: petData?.passedAway ?? false
    },
    enableReinitialize: true,
    onSubmit: handleSubmit
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
          options: [{ id: 0, name: '' }, ...(petTypes ?? [])],
          selectedValues: petFormik.values.petType,
          onChange: petFormik.handleChange
        }
      }
    },
    birthday: {
      config: {
        labelText: PET_FORM_LABELS.BIRTHDAY,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'date',
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
        type: FormFieldType.CHECKBOX,
        input: {
          label: PET_FORM_LABELS.IS_ADOPTED,
          name: 'isAdopted',
          isDisabled: formIsWorking,
          isChecked: petFormik.values.isAdopted,
          onChange: petFormik.handleChange
        }
      }
    },
    adoptionDate: {
      config: {
        labelText: PET_FORM_LABELS.ADOPTION_DATE,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'date',
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
            type: 'number',
            name: 'height',
            isDisabled: formIsWorking,
            value: petFormik.values.height.toString(),
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
            type: 'number',
            name: 'length',
            isDisabled: formIsWorking,
            value: petFormik.values.length.toString(),
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
            type: 'number',
            name: 'weight',
            isDisabled: formIsWorking,
            value: petFormik.values.weight.toString(),
            onChange: petFormik.handleChange
          }
        }
      }
    },
    gender: {
      config: {
        type: FormFieldType.CHECKBOX,
        input: {
          label: PET_FORM_LABELS.GENDER,
          name: 'gender',
          isDisabled: formIsWorking,
          isChecked: petFormik.values.gender,
          onChange: petFormik.handleChange
        }
      }
    },
    hairColors: {
      config: {
        labelText: PET_FORM_LABELS.HAIR_COLORS,
        type: FormFieldType.SELECT,
        input: {
          name: 'hairColors',
          isDisabled: formIsWorking,
          isMultiple: true,
          showOptions: 4,
          options: [{ id: 0, name: '' }, ...(colors ?? [])],
          selectedValues: petFormik.values.hairColors,
          onChange: petFormik.handleChange
        } as SelectProps
      }
    },
    eyeColors: {
      config: {
        labelText: PET_FORM_LABELS.EYE_COLORS,
        type: FormFieldType.SELECT,
        input: {
          name: 'eyeColors',
          isDisabled: formIsWorking,
          isMultiple: petFormik.values.hasHeterochromia,
          showOptions: petFormik.values.hasHeterochromia ? 2 : 1,
          options: [{ id: 0, name: '' }, ...(colors ?? [])],
          selectedValues: petFormik.values.eyeColors,
          onChange: petFormik.handleChange
        }
      }
    },
    hasHeterochromia: {
      config: {
        type: FormFieldType.CHECKBOX,
        input: {
          label: PET_FORM_LABELS.HAS_HETEROCHROMIA,
          name: 'hasHeterochromia',
          isDisabled: formIsWorking,
          isChecked: petFormik.values.hasHeterochromia,
          onChange: petFormik.handleChange
        }
      }
    },
    passedAway: {
      config: {
        type: FormFieldType.CHECKBOX,
        input: {
          label: PET_FORM_LABELS.PASSED_AWAY,
          name: 'passedAway',
          isDisabled: formIsWorking,
          isChecked: petFormik.values.passedAway,
          onChange: petFormik.handleChange
        }
      }
    }
  }

  return { petFormik, petFormInputs }
}

export default usePetFormik
