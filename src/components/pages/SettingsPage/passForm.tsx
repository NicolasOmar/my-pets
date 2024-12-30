// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { PassUpdateFormData } from '@interfaces/forms'
// CONSTANTS
import { PASS_UPDATE_FORM_LABELS } from '@constants/forms'
// FUNCTIONS

const usePassUpdateFormik = (
  formIsWorking: boolean,
  handleSubmit: (passUpdateFormData: PassUpdateFormData) => void
) => {
  const updatePassFormik = useFormik<PassUpdateFormData>({
    initialValues: {
      oldPass: '',
      newPass: '',
      repeatPass: ''
    },
    onSubmit: handleSubmit
  })

  const updatePassInputsConfig: CustomFormInputProps<FormFieldProps> = {
    oldPass: {
      config: {
        labelText: PASS_UPDATE_FORM_LABELS.OLD_PASS,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'oldPass',
            isDisabled: formIsWorking,
            value: updatePassFormik.values.oldPass,
            onChange: updatePassFormik.handleChange
          }
        }
      }
    },
    newPass: {
      config: {
        labelText: PASS_UPDATE_FORM_LABELS.NEW_PASS,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'newPass',
            isDisabled: formIsWorking,
            value: updatePassFormik.values.newPass,
            onChange: updatePassFormik.handleChange
          }
        }
      }
    },
    repeatPass: {
      config: {
        labelText: PASS_UPDATE_FORM_LABELS.REPEAT_PASS,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'repeatPass',
            isDisabled: formIsWorking,
            value: updatePassFormik.values.repeatPass,
            onChange: updatePassFormik.handleChange
          }
        }
      }
    }
  }

  return { updatePassFormik, updatePassInputsConfig }
}

export default usePassUpdateFormik
