// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { UserFormData } from '@interfaces/forms'
// CONSTANTS
import { USER_FORM_LABELS, USER_FORM_TEST_IDS } from '@constants/forms'
// FUNCTIONS

const useUserFormik = (
  formIsWorking: boolean,
  handleSubmit: (userFormData: UserFormData) => void
) => {
  const userFormik = useFormik<UserFormData>({
    initialValues: {
      name: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      repeatPass: ''
    },
    onSubmit: handleSubmit
  })

  const userFormInputs: CustomFormInputProps<FormFieldProps> = {
    name: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: USER_FORM_LABELS.NAME,
            inputConfig: {
              testId: USER_FORM_TEST_IDS.NAME,
              type: 'text',
              name: 'name',
              value: userFormik.values.name,
              isDisabled: formIsWorking,
              onChange: userFormik.handleChange
            }
          }
        }
      }
    },
    lastName: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: USER_FORM_LABELS.LAST_NAME,
            inputConfig: {
              testId: USER_FORM_TEST_IDS.LAST_NAME,
              type: 'text',
              name: 'lastName',
              value: userFormik.values.lastName,
              isDisabled: formIsWorking,
              onChange: userFormik.handleChange
            }
          }
        }
      }
    },
    userName: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: USER_FORM_LABELS.USER_NAME,
            inputConfig: {
              testId: USER_FORM_TEST_IDS.USER_NAME,
              type: 'text',
              name: 'userName',
              value: userFormik.values.userName,
              isDisabled: formIsWorking,
              onChange: userFormik.handleChange
            }
          }
        }
      }
    },
    email: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: USER_FORM_LABELS.EMAIL,
            inputConfig: {
              testId: USER_FORM_TEST_IDS.EMAIL,
              type: 'email',
              name: 'email',
              value: userFormik.values.email,
              isDisabled: formIsWorking,
              onChange: userFormik.handleChange
            }
          }
        }
      }
    },
    password: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: USER_FORM_LABELS.PASSWORD,
            inputConfig: {
              testId: USER_FORM_TEST_IDS.PASSWORD,
              type: 'password',
              name: 'password',
              value: userFormik.values.password,
              isDisabled: formIsWorking,
              onChange: userFormik.handleChange
            }
          }
        }
      }
    },
    repeatPass: {
      inputsConfig: {
        mainInput: {
          type: FormFieldType.INPUT,
          config: {
            labelText: USER_FORM_LABELS.REPEAT_PASS,
            inputConfig: {
              testId: USER_FORM_TEST_IDS.REPEAT_PASS,
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
  }

  return { userFormik, userFormInputs }
}

export default useUserFormik
