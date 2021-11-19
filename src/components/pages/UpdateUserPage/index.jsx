import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { inputs, header, saveButton, goBackButton } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'
import { mergeGraphObj } from '../../../functions/parsers'

const UpdateUserPage = () => {
  let history = useHistory()
  const [formObject, setFormObject] = useState(inputs)
  const [updateUser, { data, loading, error }] = useMutation(UPDATE_USER)
  const dispatch = useDispatch()

  useEffect(() => {
    const user = data ? mergeGraphObj(data.updateUser, getLoggedUser()) : getLoggedUser()

    if (data) {
      setLoggedUser(user)
      dispatch({ type: 'UPDATE', payload: user })
    }

    Object.keys(user).forEach(key => formObject[key] && (formObject[key].value = user[key]))
    setFormObject({ ...formObject })
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onSubmitUpdate = async formData => {
    updateUser({
      variables: formData
    })
      .then(() => history.push(APP_ROUTES.HOME))
      .catch(error => console.error(error))
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
          onClick: () => history.push(APP_ROUTES.HOME)
        }
      ]}
      onFormSubmit={data => onSubmitUpdate(data)}
    />
  )
}

export default UpdateUserPage
