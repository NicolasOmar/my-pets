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
import { Box, ButtonGroup, Column, FormField } from 'reactive-bulma'
import { CustomFormInputProps } from '@interfaces/components'
import { FormFieldProps } from 'reactive-bulma/dist/interfaces/organismProps'
import { ButtonGroupProps, FormFieldType } from 'reactive-bulma/dist/interfaces/moleculeProps'
import { useFormik } from 'formik'
import { PassUpdateFormData, UserUpdateFormData } from '@interfaces/forms'

const { updateUserConfig, updatePassConfig } = CONFIG
const { APP_ROUTES } = ROUTES

const SettingsPage: React.FC = () => {
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

  const onSubmitUserUpdate = async (variables: UserUpdateFormData) => {
    try {
      await updateUser({ variables })
      setShowNotification(buildNotification('User data sucessfully changed'))
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmitPassUpdate = async (formData: PassUpdateFormData) => {
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

  const updateUserFormik = useFormik<UserUpdateFormData>({
    initialValues: {
      name: '',
      lastName: ''
    },
    onSubmit: formData => console.warn(formData)
  })

  const updatePassFormik = useFormik<PassUpdateFormData>({
    initialValues: {
      oldPass: '',
      newPass: '',
      repeatPass: ''
    },
    onSubmit: formData => console.warn(formData)
  })

  const updateUserInputsConfig: CustomFormInputProps<FormFieldProps> = {
    name: {
      config: {
        labelText: 'Name',
        type: FormFieldType.INPUT,
        input: {
          inputConfig: {
            type: 'text',
            name: 'name'
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
            name: 'lastName'
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
            name: 'oldPass'
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
            name: 'newPass'
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
            name: 'repeatPass'
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
        <form onSubmit={updateUserFormik.handleSubmit}>
          <FormField {...updateUserInputsConfig.name} />
          <FormField {...updateUserInputsConfig.lastName} />

          <ButtonGroup {...updateUserButtons} />
        </form>
      </Box>

      <Divider />

      <Box>
        <form onSubmit={updatePassFormik.handleSubmit}>
          <FormField {...updatePassInputsConfig.oldPass} />
          <FormField {...updatePassInputsConfig.newPass} />
          <FormField {...updatePassInputsConfig.repeatPass} />

          <ButtonGroup {...updatePassButtons} />
        </form>
      </Box>
    </Column>
  )
}

export default SettingsPage
