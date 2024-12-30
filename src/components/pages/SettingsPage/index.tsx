// CORE
import React, { useEffect, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useMutation } from '@apollo/client'
import { UPDATE_USER, UPDATE_PASS } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
import useUserUpdateFormik from './userForm'
import usePassUpdateFormik from './passForm'
// INTERFACES
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { PassUpdateFormData, UserUpdateFormData } from '@interfaces/forms'
import {
  UserPassUpdateResponse,
  UserPassUpdatePayload,
  UserUpdatePayload,
  UserUpdateResponse
} from '@interfaces/graphql'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { COMMON_LABELS } from '@constants/common'
import { PASS_UPDATE_FORM_LABELS, USER_UPDATE_FORM_LABELS } from '@constants/forms'
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

  const { updateUserFormik, updateUserInputsConfig } = useUserUpdateFormik(
    getLoggedUser(),
    isLoading,
    onSubmitUserUpdate
  )

  const { updatePassFormik, updatePassInputsConfig } = usePassUpdateFormik(
    isLoading,
    onSubmitPassUpdate
  )

  const updateUserButtons: ButtonGroupProps = {
    buttonList: [
      {
        text: COMMON_LABELS.SAVE_CHANGES,
        type: 'submit',
        isDisabled: false,
        color: 'is-success'
      },
      {
        text: COMMON_LABELS.GO_BACK_HOME,
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
        text: COMMON_LABELS.SAVE_CHANGES,
        type: 'submit',
        color: 'is-success',
        isDisabled: false
      },
      {
        text: COMMON_LABELS.GO_BACK_HOME,
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
        <Title main={{ text: USER_UPDATE_FORM_LABELS.TITLE, type: 'title' }} />

        <form onSubmit={updateUserFormik.handleSubmit}>
          <FormField {...updateUserInputsConfig.name} />
          <FormField {...updateUserInputsConfig.lastName} />

          <ButtonGroup {...updateUserButtons} />

          {updateUserError ? (
            <Message
              headerText={USER_UPDATE_FORM_LABELS.ERROR_TITLE}
              bodyText={updateUserError.message}
              color="is-danger"
            />
          ) : null}
        </form>
      </Box>

      <Box>
        <Title main={{ text: PASS_UPDATE_FORM_LABELS.TITLE, type: 'title' }} />

        <form onSubmit={updatePassFormik.handleSubmit}>
          <FormField {...updatePassInputsConfig.oldPass} />
          <FormField {...updatePassInputsConfig.newPass} />
          <FormField {...updatePassInputsConfig.repeatPass} />

          <ButtonGroup {...updatePassButtons} />

          {updatePassError ? (
            <Message
              headerText={PASS_UPDATE_FORM_LABELS.ERROR_TITLE}
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
