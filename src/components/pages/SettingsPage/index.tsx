// CORE
import React, { useEffect, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// API
import { useMutation } from '@apollo/client'
import { UPDATE_USER, UPDATE_PASS } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
// INTERFACES
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { ButtonGroupProps, FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { CustomFormInputProps } from '@interfaces/components'
import { PassUpdateFormData, UserUpdateFormData } from '@interfaces/forms'
import {
  UserPassUpdateResponse,
  UserPassUpdatePayload,
  UserUpdatePayload,
  UserUpdateResponse
} from '@interfaces/graphql'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
// FUNCTIONS
import { getLoggedUser, setLoggedUser } from '@functions/local-storage'
import { parseGraphToObj } from '@functions/parsers'
import { encryptPass } from '@functions/encrypt'

const SettingsPage: React.FC = () => {
  let navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [
    updateUser,
    { data: updateUserData, loading: isLoadingUserUpdate, error: updateUserError }
  ] = useMutation<UserUpdateResponse, UserUpdatePayload>(UPDATE_USER)
  const [updatePass, { loading: isLoadingPassUpdate, error: updatePassError }] = useMutation<
    UserPassUpdateResponse,
    UserPassUpdatePayload
  >(UPDATE_PASS)

  useEffect(() => {
    const userInfo = updateUserData
      ? parseGraphToObj(updateUserData.updateUser, getLoggedUser())
      : getLoggedUser()

    if (updateUserData) {
      setLoggedUser(userInfo)
      userContext?.setUserData(userInfo)
    }
  }, [updateUserData])

  const onSubmitUserUpdate = async (userUpdateFormData: UserUpdateFormData) => {
    await updateUser({ variables: { payload: userUpdateFormData } })
  }

  const onSubmitPassUpdate = async (passUpdateFormData: PassUpdateFormData) => {
    const parsedPassUpdate = {
      oldPass: encryptPass(passUpdateFormData.oldPass),
      newPass: encryptPass(passUpdateFormData.newPass)
    }

    await updatePass({ variables: { payload: parsedPassUpdate } })
  }

  // const onUpdatePassBlurChange = formData => {
  //   const isValid =
  //     formData.oldPass.value !== formData.newPass.value &&
  //     formData.newPass.value === formData.repeatPass.value

  //   return {
  //     ...formData,
  //     oldPass: {
  //       ...formData.oldPass,
  //       hasCustomValidation: true,
  //       isValid
  //     },
  //     newPass: {
  //       ...formData.newPass,
  //       hasCustomValidation: true,
  //       isValid
  //     },
  //     repeatPass: {
  //       ...formData.repeatPass,
  //       hasCustomValidation: true,
  //       isValid
  //     }
  //   }
  // }

  const isLoading = useMemo(
    () => isLoadingUserUpdate || isLoadingPassUpdate,
    [isLoadingUserUpdate, isLoadingPassUpdate]
  )

  const updateUserFormik = useFormik<UserUpdateFormData>({
    initialValues: {
      name: getLoggedUser().name ?? '',
      lastName: getLoggedUser().lastName ?? ''
    },
    onSubmit: onSubmitUserUpdate
  })

  const updatePassFormik = useFormik<PassUpdateFormData>({
    initialValues: {
      oldPass: '',
      newPass: '',
      repeatPass: ''
    },
    onSubmit: onSubmitPassUpdate
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
            isDisabled: isLoading,
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
            isDisabled: isLoading,
            value: updateUserFormik.values.lastName,
            onChange: updateUserFormik.handleChange
          }
        }
      }
    }
  }

  const updatePassInputsConfig: CustomFormInputProps<FormFieldProps> = {
    oldPass: {
      config: {
        labelText: 'Old Password',
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'oldPass',
            isDisabled: isLoading,
            value: updatePassFormik.values.oldPass,
            onChange: updatePassFormik.handleChange
          }
        }
      }
    },
    newPass: {
      config: {
        labelText: 'New Password',
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'newPass',
            isDisabled: isLoading,
            value: updatePassFormik.values.newPass,
            onChange: updatePassFormik.handleChange
          }
        }
      }
    },
    repeatPass: {
      config: {
        labelText: 'Repeat Password',
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'password',
            name: 'repeatPass',
            isDisabled: isLoading,
            value: updatePassFormik.values.repeatPass,
            onChange: updatePassFormik.handleChange
          }
        }
      }
    }
  }

  const updateUserButtons: ButtonGroupProps = {
    buttonList: [
      {
        text: 'Save changes',
        type: 'submit',
        isDisabled: false,
        color: 'is-success'
      },
      {
        text: 'Go back to Home',
        type: 'button',
        color: 'is-danger',
        isDisabled: false,
        onClick: () => navigate(APP_ROUTES.LOGIN)
      }
    ]
  }

  const updatePassButtons: ButtonGroupProps = {
    buttonList: [
      {
        text: 'Save changes',
        type: 'submit',
        color: 'is-success',
        isDisabled: false
      },
      {
        text: 'Go back to Home',
        type: 'button',
        color: 'is-danger',
        isDisabled: false,
        onClick: () => navigate(APP_ROUTES.LOGIN)
      }
    ]
  }

  return (
    <Column size="is-8" offset="is-offset-2">
      <Box>
        <Title main={{ text: 'Update user information', type: 'title' }} />

        <form onSubmit={updateUserFormik.handleSubmit}>
          <FormField {...updateUserInputsConfig.name} />
          <FormField {...updateUserInputsConfig.lastName} />

          <ButtonGroup {...updateUserButtons} />

          {updateUserError ? (
            <Message
              headerText={'updateUserError'}
              bodyText={updateUserError.message}
              color="is-danger"
            />
          ) : null}
        </form>
      </Box>

      <Box>
        <Title main={{ text: 'Update password', type: 'title' }} />

        <form onSubmit={updatePassFormik.handleSubmit}>
          <FormField {...updatePassInputsConfig.oldPass} />
          <FormField {...updatePassInputsConfig.newPass} />
          <FormField {...updatePassInputsConfig.repeatPass} />

          <ButtonGroup {...updatePassButtons} />

          {updatePassError ? (
            <Message
              headerText={'updatePassError'}
              bodyText={updatePassError.message}
              color="is-danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default SettingsPage
