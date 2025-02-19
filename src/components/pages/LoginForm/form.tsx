// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { LoginFormData } from '@interfaces/forms'
// CONSTANTS
import { LOGIN_FORM_LABELS, LOGIN_FORM_TEST_IDS } from '@constants/forms'
// FUNCTIONS

const useLoginFormik = (
  formIsWorking: boolean,
  handleSubmit: (loginFormData: LoginFormData) => void
) => {
  const loginFormik = useFormik<LoginFormData>({
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
            testId: LOGIN_FORM_TEST_IDS.EMAIL,
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
            testId: LOGIN_FORM_TEST_IDS.PASSWORD,
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
