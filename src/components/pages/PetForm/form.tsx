// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { PetFormData, PetFormikProps } from '@interfaces/forms'
// CONSTANTS
import { PET_FORM_LABELS, PET_FORM_TEST_IDS } from '@constants/forms'
import { DATE_FOR_DATEPICKER } from '@constants/formats'
// FUNCTIONS
import { parseStringToLuxonDate } from '@functions/parsers'
import { COMMON_LABELS } from '@constants/common'

const genderOptions = [
  { label: COMMON_LABELS.MASCULINE, value: COMMON_LABELS.MASCULINE.toLowerCase() },
  { label: COMMON_LABELS.FEMENINE, value: COMMON_LABELS.FEMENINE.toLowerCase() }
]

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
      weight: petData?.weight ?? 0,
      gender:
        petData?.gender !== undefined
          ? petData.gender
            ? COMMON_LABELS.MASCULINE.toLowerCase()
            : COMMON_LABELS.FEMENINE.toLowerCase()
          : '',
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
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: PET_FORM_LABELS.NAME,
            inputConfig: {
              testId: PET_FORM_TEST_IDS.NAME,
              type: 'text',
              name: 'name',
              isDisabled: formIsWorking,
              value: petFormik.values.name,
              onChange: petFormik.handleChange
            }
          }
        }
      }
    },
    petType: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.RADIOBUTTON,
          config: {
            // testId: PET_FORM_TEST_IDS.PET_TYPE,
            name: 'petType',
            options: petTypes
              ? petTypes.map(_type => ({
                  label: _type.name,
                  isChecked: petFormik.values.petType === _type.id,
                  value: _type.id
                }))
              : [],
            onChange: petFormik.handleChange
          }
        }
      }
    },
    birthday: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: PET_FORM_LABELS.BIRTHDAY,
            inputConfig: {
              testId: PET_FORM_TEST_IDS.BIRTHDAY,
              type: 'date',
              name: 'birthday',
              isDisabled: formIsWorking,
              value: petFormik.values.birthday,
              onChange: petFormik.handleChange
            }
          }
        }
      }
    },
    isAdopted: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.CHECKBOX,
          fieldLabel: PET_FORM_LABELS.IS_ADOPTED,
          config: {
            testId: PET_FORM_TEST_IDS.IS_ADOPTED,
            label: petFormik.values.isAdopted ? COMMON_LABELS.YES : COMMON_LABELS.NO,
            name: 'isAdopted',
            isDisabled: formIsWorking,
            isChecked: petFormik.values.isAdopted,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    adoptionDate: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: PET_FORM_LABELS.ADOPTION_DATE,
            inputConfig: {
              testId: PET_FORM_TEST_IDS.ADOPTION_DATE,
              type: 'date',
              name: 'adoptionDate',
              isDisabled: formIsWorking,
              value: petFormik.values.adoptionDate,
              onChange: petFormik.handleChange
            }
          }
        }
      }
    },
    weight: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: PET_FORM_LABELS.WEIGHT,
            inputConfig: {
              testId: PET_FORM_TEST_IDS.WEIGHT,
              type: 'number',
              name: 'weight',
              isDisabled: formIsWorking,
              value: petFormik.values.weight.toString(),
              onChange: petFormik.handleChange
            }
          }
        }
      }
    },
    gender: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.RADIOBUTTON,
          fieldLabel: PET_FORM_LABELS.GENDER,
          config: {
            // testId: PET_FORM_TEST_IDS.GENDER,
            name: 'gender',
            isDisabled: formIsWorking,
            options: genderOptions.map(option => ({
              ...option,
              isChecked: petFormik.values.gender === option.value
            })),
            onChange: petFormik.handleChange
          }
        }
      }
    },
    hairColors: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.SELECT,
          fieldLabel: PET_FORM_LABELS.HAIR_COLORS,
          config: {
            testId: PET_FORM_TEST_IDS.HAIR_COLORS,
            name: 'hairColors',
            isDisabled: formIsWorking,
            isMultiple: true,
            showOptions: 4,
            options: [{ id: 0, name: '' }, ...(colors ?? [])],
            selectedValues: petFormik.values.hairColors,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    eyeColors: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.SELECT,
          fieldLabel: PET_FORM_LABELS.EYE_COLORS,
          config: {
            testId: PET_FORM_TEST_IDS.EYE_COLORS,
            name: 'eyeColors',
            isDisabled: formIsWorking,
            isMultiple: petFormik.values.hasHeterochromia,
            showOptions: petFormik.values.hasHeterochromia ? 2 : 1,
            options: [{ id: 0, name: '' }, ...(colors ?? [])],
            selectedValues: petFormik.values.eyeColors,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    hasHeterochromia: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.CHECKBOX,
          fieldLabel: PET_FORM_LABELS.TRAITS,
          config: {
            testId: PET_FORM_TEST_IDS.HAS_HETEROCHROMIA,
            label: PET_FORM_LABELS.HAS_HETEROCHROMIA,
            name: 'hasHeterochromia',
            isDisabled: formIsWorking,
            isChecked: petFormik.values.hasHeterochromia,
            onChange: petFormik.handleChange
          }
        }
      }
    },
    passedAway: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.CHECKBOX,
          fieldLabel: PET_FORM_LABELS.PASSED_AWAY,
          config: {
            testId: PET_FORM_TEST_IDS.PASSED_AWAY,
            label: petFormik.values.passedAway ? COMMON_LABELS.YES : COMMON_LABELS.NO,
            name: 'passedAway',
            isDisabled: formIsWorking,
            isChecked: petFormik.values.passedAway,
            onChange: petFormik.handleChange
          }
        }
      }
    }
  }

  return { petFormik, petFormInputs }
}

export default usePetFormik
