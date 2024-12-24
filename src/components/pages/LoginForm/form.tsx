import { CustomFormInputProps } from '@interfaces/components'
import { useFormik } from 'formik'
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'

const useFormikShape = (
  formIsWorking: boolean,
  handleSubmit: (data: { email: string; password: string }) => void
) => {
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async formData => {
      console.warn(formData)
      handleSubmit(formData)
    },
    enableReinitialize: true
  })

  const formConfig: CustomFormInputProps<FormFieldProps> = {
    email: {
      config: {
        labelText: 'Email',
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
        labelText: 'Password',
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

export default useFormikShape
