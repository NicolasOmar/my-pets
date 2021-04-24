import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import FormInput from '../../shared/form-input/form-input'
// MODELS
import { updateUserFormBase, updateUserFormHeader } from '../../../configs/update-user.configs.json'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPER FUNCTIONS
import { getLoggedUser, setLoggedUser } from '../../../functions/local-storage'
import { checkEmptyValues, checkFormValidation } from '../../../functions/methods'
import Form from '../../shared/form/form'
import { useMutation } from '@apollo/client'
import { UPDATE_USER } from '../../../graphql/mutations'

const UpdateUserForm = () => {
  // let history = useHistory()
  const [formObject, setFormObject] = useState(updateUserFormBase)
  const [hasData, setHasData] = useState(false)
  const [updateUser, result] = useMutation(UPDATE_USER)
  // const [isLoading, setIsLoading] = useState(false)
  // const [hasErrors, setHasErrors] = useState(false)
  // const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    if (!hasData) {
      const user = getLoggedUser()
      Object.keys(user).forEach(key => formObject[key] && (formObject[key].value = user[key]))
      setFormObject({ ...formObject })
      console.error(user, formObject)
      setHasData(true)
    }
  }, [hasData])

  // useEffect(() => {
  //   const hasEmptyValues = checkEmptyValues(formObject)
  //   const isValidForm = checkFormValidation(formObject)

  //   setHasErrors(!isValidForm || !hasEmptyValues)
  //   !isValidForm && setErrorMsg('The form needs to fill required fields')
  // }, [formObject])

  // const onFormChange = (evt, prop) => {
  //   const { value } = evt.target
  //   const isValidValue = value !== ''

  //   setFormObject({
  //     ...formObject,
  //     [prop]: {
  //       ...formObject[prop],
  //       value: isValidValue ? value : null
  //     }
  //   })
  // }

  // const checkValidation = prop => {
  //   const { value, isRequired } = formObject[prop]

  //   setFormObject({
  //     ...formObject,
  //     [prop]: {
  //       ...formObject[prop],
  //       valid: isRequired ? value && value !== '' : true
  //     }
  //   })
  // }

  const onSubmitUpdate = async formData => {
    console.log(formData)
    // if (hasErrors) {
    //   return
    // }

    updateUser({
      variables: formData
    })
      .then(data => console.log(data))
      .catch(error => console.error(error))

    // setIsLoading(true)

    // const { name, lastName } = formObject
    // const payload = {
    //   name: name.value,
    //   lastName: lastName.value
    // }
    // const { data, message } = await USERSAPI.UPDATE(payload)

    // setIsLoading(false)

    // if (data) {
    //   setLoggedUser({
    //     ...getLoggedUser(),
    //     ...payload
    //   })
    //   onCancel()
    // } else {
    //   setHasErrors(true)
    //   setErrorMsg(message)
    // }
  }

  // const onCancel = () => history.push(ROUTES.HOME)

  // const renderErrorMsg = () =>
  //   hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null

  return (
    <GridLayout header={updateUserFormHeader}>
      <Form
        isLoading={false}
        formObject={updateUserFormBase}
        formButtons={[
          {
            type: 'submit',
            label: 'Save'
          }
        ]}
        onFormSubmit={data => onSubmitUpdate(data)}
      />
    </GridLayout>
  )
}

export default UpdateUserForm
