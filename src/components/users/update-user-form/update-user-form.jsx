import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// MODELS
import { updateUserFormBase, updateUserFormHeader } from '../../../configs/update-user.configs.json'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPER FUNCTIONS
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'
import { mergeGraphObj } from '../../../functions/parsers'

const UpdateUserForm = () => {
  let history = useHistory()
  const [formObject, setFormObject] = useState(updateUserFormBase)
  const [updateUser, result] = useMutation(UPDATE_USER)

  useEffect(() => {
    const user = result.data
      ? mergeGraphObj(result.data.updateUser, getLoggedUser())
      : getLoggedUser()

    result.data && setLoggedUser(user)

    Object.keys(user).forEach(key => formObject[key] && (formObject[key].value = user[key]))
    setFormObject(() => ({ ...formObject }))
  }, [result.data])

  const onSubmitUpdate = async formData => {
    updateUser({
      variables: formData
    })
      .then(() => history.push(ROUTES.HOME))
      .catch(error => console.error(error))
  }

  // const renderErrorMsg = () =>
  //   hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null

  return (
    <GridLayout header={updateUserFormHeader}>
      <Form
        isLoading={result.loading}
        formObject={updateUserFormBase}
        formButtons={{
          saveButton: {
            type: 'submit',
            label: 'Save'
          },
          goBackButton: {
            type: 'button',
            label: 'Go Back',
            onClick: () => history.push(ROUTES.HOME)
          }
        }}
        onFormSubmit={data => onSubmitUpdate(data)}
      />
    </GridLayout>
  )
}

export default UpdateUserForm
