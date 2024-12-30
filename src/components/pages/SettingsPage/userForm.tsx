// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { UserUpdateFormData } from '@interfaces/forms'
// CONSTANTS
import { USER_UPDATE_FORM_LABELS } from '@constants/forms'
// FUNCTIONS

const useUserUpdateFormik = (
  userData: UserUpdateFormData,
  formIsWorking: boolean,
  handleSubmit: (userUpdateFormData: UserUpdateFormData) => void
) => {
  const updateUserFormik = useFormik<UserUpdateFormData>({
    initialValues: {
      name: userData.name,
      lastName: userData.lastName
    },
    onSubmit: handleSubmit
  })

  const updateUserInputsConfig: CustomFormInputProps<FormFieldProps> = {
    name: {
      config: {
        labelText: USER_UPDATE_FORM_LABELS.NAME,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'name',
            isDisabled: formIsWorking,
            value: updateUserFormik.values.name,
            onChange: updateUserFormik.handleChange
          }
        }
      }
    },
    lastName: {
      config: {
        labelText: USER_UPDATE_FORM_LABELS.LAST_NAME,
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'lastName',
            isDisabled: formIsWorking,
            value: updateUserFormik.values.lastName,
            onChange: updateUserFormik.handleChange
          }
        }
      }
    }
  }

  return { updateUserFormik, updateUserInputsConfig }
}

export default useUserUpdateFormik
