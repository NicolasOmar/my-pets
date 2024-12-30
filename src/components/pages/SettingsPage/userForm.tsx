// CORE
import { useFormik } from 'formik'
// INTERFACES
import { FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { CustomFormInputProps } from '@interfaces/components'
import { UserUpdateFormData } from '@interfaces/forms'
// CONSTANTS
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
        labelText: 'Name',
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
        labelText: 'Last Name',
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
