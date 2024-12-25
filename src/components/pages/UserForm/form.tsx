// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
// CONSTANTS
import { USER_FORM_LABELS } from '@constants/forms'

const useUserFormik = (formIsWorking: boolean) => {
  const userFormik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      repeatPass: ''
    },
    onSubmit: formData => console.warn(formData)
  })

  const userFormInputs: CustomFormInputProps<FormFieldProps> = {
    name: {
      config: {
        labelText: USER_FORM_LABELS.NAME,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'name',
            value: userFormik.values.name,
            isDisabled: formIsWorking,
            onChange: userFormik.handleChange
          }
        }
      }
    },
    lastName: {
      config: {
        labelText: USER_FORM_LABELS.LAST_NAME,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'lastName',
            value: userFormik.values.lastName,
            isDisabled: formIsWorking,
            onChange: userFormik.handleChange
          }
        }
      }
    },
    userName: {
      config: {
        labelText: USER_FORM_LABELS.USER_NAME,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'userName',
            value: userFormik.values.userName,
            isDisabled: formIsWorking,
            onChange: userFormik.handleChange
          }
        }
      }
    },
    email: {
      config: {
        labelText: USER_FORM_LABELS.EMAIL,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'email',
            name: 'email',
            value: userFormik.values.email,
            isDisabled: formIsWorking,
            onChange: userFormik.handleChange
          }
        }
      }
    },
    password: {
      config: {
        labelText: USER_FORM_LABELS.PASSWORD,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'password',
            value: userFormik.values.password,
            isDisabled: formIsWorking,
            onChange: userFormik.handleChange
          }
        }
      }
    },
    repeatPass: {
      config: {
        labelText: USER_FORM_LABELS.REPEAT_PASS,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'repeatPass',
            value: userFormik.values.repeatPass,
            isDisabled: formIsWorking,
            onChange: userFormik.handleChange
          }
        }
      }
    }
  }

  return { userFormik, userFormInputs }
}

export default useUserFormik
