// CORE
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
import useUserFormik from './form'
// INTERFACES
import { UserCreateResponse, UserCreatePayload } from '@interfaces/graphql'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { USER_FORM_LABELS } from '@constants/forms'
// FUNCTIONS

const UserForm = () => {
  let navigate = useNavigate()
  const [createUser, { loading: isLoadingUser, error: userErrors }] = useMutation<
    UserCreateResponse,
    UserCreatePayload
  >(CREATE_USER)
  const userContext = useContext(UserContext)
  const { userFormik, userFormInputs } = useUserFormik(isLoadingUser)

  const userFormHeader: TitleProps = {
    main: {
      text: USER_FORM_LABELS.TITLE,
      type: 'title'
    }
  }

  const userFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        text: USER_FORM_LABELS.SUBMIT_BTN,
        type: 'submit',
        color: 'is-success',
        isDisabled: isLoadingUser
      },
      {
        text: USER_FORM_LABELS.LOG_IN_BTN,
        type: 'button',
        color: 'is-danger',
        isDisabled: isLoadingUser,
        onClick: () => navigate(APP_ROUTES.LOGIN)
      }
    ]
  }

  // const onInputBlurChange = formData => {
  //   const isValid = formData.password.value === formData.repeatPass.value

  //   return {
  //     ...formData,
  //     password: {
  //       ...formData.password,
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

  return (
    <Column size="is-8" offset="is-offset-2">
      <Box>
        <Title {...userFormHeader} />

        <form onSubmit={userFormik.handleSubmit}>
          <FormField {...userFormInputs.name} />
          <FormField {...userFormInputs.lastName} />
          <FormField {...userFormInputs.userName} />
          <FormField {...userFormInputs.email} />
          <FormField {...userFormInputs.password} />
          <FormField {...userFormInputs.repeatPass} />

          <ButtonGroup {...userFormButtons} />

          {userErrors ? (
            <Message
              headerText={USER_FORM_LABELS.ERROR_MSG}
              bodyText={userErrors.message}
              color="is-danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default UserForm
