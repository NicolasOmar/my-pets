// CORE
import React, { useEffect, useContext, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useMutation } from '@apollo/client/react'
import { UPDATE_USER, UPDATE_PASS } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Title } from 'reactive-bulma'
import ErrorMessage from '@templates/ErrorMessage'
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
import {
  PASS_UPDATE_FORM_LABELS,
  PASS_UPDATE_FORM_TEST_IDS,
  USER_UPDATE_FORM_LABELS,
  USER_UPDATE_FORM_TEST_IDS
} from '@constants/forms'
// FUNCTIONS
import { getLoggedUser, setLoggedUser } from '@functions/local-storage'
import { encryptPass } from '@functions/encrypt'

const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
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
    if (updateUserData?.updateUser) {
      const { name, lastName } = updateUserData.updateUser
      const loggedUser = getLoggedUser()

      setLoggedUser({ ...loggedUser, name, lastName })
      userContext?.setUserData({ name: `${name} ${lastName}` })
    }
  }, [updateUserData, userContext])

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
    getLoggedUser() as UserUpdateFormData,
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
        testId: USER_UPDATE_FORM_TEST_IDS.SUBMIT_BTN,
        text: COMMON_LABELS.SAVE_CHANGES,
        type: 'submit',
        isDisabled: false,
        color: 'success'
      },
      {
        testId: USER_UPDATE_FORM_TEST_IDS.GO_BACK_BTN,
        text: COMMON_LABELS.GO_BACK,
        type: 'button',
        color: 'danger',
        isDisabled: false,
        onClick: () => navigate(APP_ROUTES.HOME)
      }
    ]
  }

  const updatePassButtons: ButtonGroupProps = {
    buttonList: [
      {
        testId: PASS_UPDATE_FORM_TEST_IDS.SUBMIT_BTN,
        text: COMMON_LABELS.SAVE_CHANGES,
        type: 'submit',
        color: 'success',
        isDisabled: false
      },
      {
        testId: PASS_UPDATE_FORM_TEST_IDS.GO_BACK_BTN,
        text: COMMON_LABELS.GO_BACK,
        type: 'button',
        color: 'danger',
        isDisabled: false,
        onClick: () => navigate(APP_ROUTES.HOME)
      }
    ]
  }

  return (
    <Column size="8" offset="2">
      <Box>
        <Title main={{ text: USER_UPDATE_FORM_LABELS.TITLE, type: 'title' }} />

        <form onSubmit={updateUserFormik.handleSubmit}>
          <FormField {...updateUserInputsConfig.name} />
          <FormField {...updateUserInputsConfig.lastName} />

          <ButtonGroup {...updateUserButtons} />

          <ErrorMessage
            title={USER_UPDATE_FORM_LABELS.ERROR_TITLE}
            message={updateUserError?.message ?? null}
          />
        </form>
      </Box>

      <Box>
        <Title main={{ text: PASS_UPDATE_FORM_LABELS.TITLE, type: 'title' }} />

        <form onSubmit={updatePassFormik.handleSubmit}>
          <FormField {...updatePassInputsConfig.oldPass} />
          <FormField {...updatePassInputsConfig.newPass} />
          <FormField {...updatePassInputsConfig.repeatPass} />

          <ButtonGroup {...updatePassButtons} />

          <ErrorMessage
            title={PASS_UPDATE_FORM_LABELS.ERROR_TITLE}
            message={updatePassError?.message ?? null}
          />
        </form>
      </Box>
    </Column>
  )
}

export default SettingsPage
