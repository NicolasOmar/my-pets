// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { EventFormData, EventFormikProps } from '@interfaces/forms'
// CONSTANTS
import { EVENT_FORM_LABELS, EVENT_FORM_TEST_IDS } from '@constants/forms'
// FUNCTIONS

const useEventFormik = ({ petId, petList, formIsWorking, handleSubmit }: EventFormikProps) => {
  const eventFormik = useFormik<EventFormData>({
    initialValues: {
      pet: petId,
      description: '',
      date: ''
    },
    enableReinitialize: true,
    onSubmit: handleSubmit
  })

  const eventFormInputsConfig: CustomFormInputProps<FormFieldProps> = {
    pet: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.SELECT,
          fieldLabel: EVENT_FORM_LABELS.PET,
          config: {
            testId: EVENT_FORM_TEST_IDS.PET,
            name: 'pet',
            isDisabled: formIsWorking,
            value: eventFormik.values.pet,
            selectedValues: eventFormik.values.pet,
            options: [{ id: 0, name: '' }, ...petList],
            onChange: eventFormik.handleChange
          }
        }
      }
    },
    description: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: EVENT_FORM_LABELS.DESCRIPTION,
            inputConfig: {
              testId: EVENT_FORM_TEST_IDS.DESCRIPTION,
              type: 'text',
              name: 'description',
              isDisabled: formIsWorking,
              value: eventFormik.values.description,
              onChange: eventFormik.handleChange
            }
          }
        }
      }
    },
    date: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: EVENT_FORM_LABELS.DATE,
            inputConfig: {
              testId: EVENT_FORM_TEST_IDS.DATE,
              type: 'date',
              name: 'date',
              isDisabled: formIsWorking,
              value: eventFormik.values.date,
              onChange: eventFormik.handleChange
            }
          }
        }
      }
    }
  }

  return { eventFormik, eventFormInputsConfig }
}

export default useEventFormik
