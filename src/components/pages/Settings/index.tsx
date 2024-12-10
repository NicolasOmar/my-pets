import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { UPDATE_USER, UPDATE_PASS } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context/userContext'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
import Divider from '../../atoms/Divider'
import Notification from '../../molecules/Notification'
// FORM CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes'
// FUNCTIONS
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'
import { parseGraphToObj } from '../../../functions/parsers'
import { encryptPass } from '../../../functions/encrypt'

const { updateUserConfig, updatePassConfig } = CONFIG
const { APP_ROUTES } = ROUTES

const SettingsPage = () => {
  let navigate = useNavigate()
  const { setUserData } = useContext(UserContext)
  const [formObject, setFormObject] = useState(updateUserConfig.inputs)
  const [updateUser, { data: updateUserData, loading: updateUserLoading, error: updateUserError }] =
    useMutation(UPDATE_USER)
  const [updatePass, { loading, error }] = useMutation(UPDATE_PASS)
  const [showNotification, setShowNotification] = useState(null)

  const buildNotification = text => ({
    text,
    color: 'primary',
    onDeleteClick: () => setShowNotification(null)
  })

  useEffect(() => {
    const userInfo = updateUserData
      ? parseGraphToObj(updateUserData.updateUser, getLoggedUser())
      : getLoggedUser()

    if (updateUserData) {
      setLoggedUser(userInfo)
      setUserData(userInfo)
    }

    Object.keys(userInfo).forEach(key => formObject[key] && (formObject[key].value = userInfo[key]))
    setFormObject({ ...formObject })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateUserData])

  const onSubmitUserUpdate = async variables => {
    try {
      await updateUser({ variables })
      setShowNotification(buildNotification('User data sucessfully changed'))
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmitPassUpdate = async formData => {
    const variables = {
      oldPass: encryptPass(formData.oldPass),
      newPass: encryptPass(formData.newPass)
    }

    try {
      await updatePass({ variables })
      setShowNotification(buildNotification('Password sucessfully changed'))
    } catch (e) {
      console.error(e)
    }
  }

  const onUpdatePassBlurChange = formData => {
    const isValid =
      formData.oldPass.value !== formData.newPass.value &&
      formData.newPass.value === formData.repeatPass.value

    return {
      ...formData,
      oldPass: {
        ...formData.oldPass,
        hasCustomValidation: true,
        isValid
      },
      newPass: {
        ...formData.newPass,
        hasCustomValidation: true,
        isValid
      },
      repeatPass: {
        ...formData.repeatPass,
        hasCustomValidation: true,
        isValid
      }
    }
  }

  return (
    <>
      <FormTemplate
        header={updateUserConfig.header}
        isLoading={updateUserLoading}
        errors={updateUserError}
        inputs={updateUserConfig.inputs}
        formButtons={[
          updateUserConfig.saveButton,
          {
            ...updateUserConfig.goBackButton,
            onClick: () => navigate(APP_ROUTES.HOME)
          }
        ]}
        onFormSubmit={data => onSubmitUserUpdate(data)}
      />

      <Divider style={{ padding: '1em 0' }} />

      <FormTemplate
        header={updatePassConfig.header}
        isLoading={loading}
        errors={error}
        inputs={updatePassConfig.inputs}
        dividers={updatePassConfig.dividers}
        formButtons={[
          updatePassConfig.updateButton,
          {
            ...updatePassConfig.goBackButton,
            onClick: () => navigate(APP_ROUTES.HOME)
          }
        ]}
        onFormSubmit={passFormData => onSubmitPassUpdate(passFormData)}
        onInputBlurChange={onUpdatePassBlurChange}
      />

      {showNotification && <Notification {...showNotification} />}
    </>
  )
}

export default SettingsPage
