// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { EventFormData } from '@interfaces/forms'
// CONSTANTS
import { EVENT_FORM_LABELS, EVENT_FORM_TEST_IDS } from '@constants/forms'
// FUNCTIONS

const useEventFormik = (
  formIsWorking: boolean,
  handleSubmit: (eventFormData: EventFormData) => void
) => {
  const eventFormik = useFormik<EventFormData>({
    initialValues: {
      description: '',
      date: ''
    },
    onSubmit: handleSubmit
  })

  const eventFormInputsConfig: CustomFormInputProps<FormFieldProps> = {
    description: {
      config: {
        labelText: EVENT_FORM_LABELS.DESCRIPTION,
        type: FormFieldType.INPUT,
        input: {
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
    },
    date: {
      config: {
        labelText: EVENT_FORM_LABELS.DATE,
        type: FormFieldType.INPUT,
        input: {
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

  return { eventFormik, eventFormInputsConfig }
}

export default useEventFormik
