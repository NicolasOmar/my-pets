import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// FORM CONFIG
import {
  updateUserFormInputs,
  updateUserFormHeader,
  saveButton,
  goBackButton
} from './update-user.config.json'
// CONSTANTS
import { ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'
import { mergeGraphObj } from '../../../functions/parsers'

const UpdateUserForm = () => {
  let history = useHistory()
  const [formObject, setFormObject] = useState(updateUserFormInputs)
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
      .then(() => history.push(ROUTES.HOME))
      .catch(error => console.error(error))
  }

  return (
    <GridLayout header={updateUserFormHeader}>
      <Form
        isLoading={loading}
        errors={error}
        formObject={updateUserFormInputs}
        formButtons={{
          saveButton,
          goBackButton: {
            ...goBackButton,
            onClick: () => history.push(ROUTES.HOME)
          }
        }}
        onFormSubmit={data => onSubmitUpdate(data)}
      />
    </GridLayout>
  )
}

export default UpdateUserForm
