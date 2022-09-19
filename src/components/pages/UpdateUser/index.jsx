import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes.json'
// FUNCTIONS
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'
import { parseGraphToObj } from '../../../functions/parsers'

const { inputs, header, saveButton, goBackButton } = CONFIG
const { APP_ROUTES } = ROUTES

const UpdateUser = () => {
  let navigate = useNavigate()
  const [formObject, setFormObject] = useState(inputs)
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = data ? parseGraphToObj(data.updateUser, getLoggedUser()) : getLoggedUser()

    if (data) {
      setLoggedUser(user)
      dispatch({ type: 'UPDATE', payload: user })
    }

    Object.keys(user).forEach(key => formObject[key] && (formObject[key].value = user[key]))
    setFormObject({ ...formObject })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onSubmitUpdate = async variables => {
    try {
      await updateUser({ variables })
      navigate(APP_ROUTES.HOME)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <FormTemplate
      header={header}
      isLoading={loading}
      errors={error}
      inputs={inputs}
      formButtons={[
        saveButton,
        {
          ...goBackButton,
          onClick: () => navigate(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={data => onSubmitUpdate(data)}
    />
  )
}

export default UpdateUser
