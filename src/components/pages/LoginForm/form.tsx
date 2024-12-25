// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
// CONSTANTS
import { CustomFormInputProps } from '@interfaces/components'
import { LOGIN_FORM_LABELS } from '@constants/users'

const useLoginFormik = (
  formIsWorking: boolean,
  handleSubmit: (data: { email: string; password: string }) => void
) => {
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: handleSubmit,
    enableReinitialize: true
  })

  const formConfig: CustomFormInputProps<FormFieldProps> = {
    email: {
      config: {
        labelText: LOGIN_FORM_LABELS.EMAIL,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'email',
            name: 'email',
            value: loginFormik.values.email,
            isDisabled: formIsWorking,
            onChange: loginFormik.handleChange
          }
        }
      }
    },
    password: {
      config: {
        labelText: LOGIN_FORM_LABELS.PASSWORD,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'password',
            value: loginFormik.values.password,
            isDisabled: formIsWorking,
            onChange: loginFormik.handleChange
          }
        }
      }
    }
  }

  return {
    loginFormik,
    formConfig
  }
}

export default useLoginFormik
