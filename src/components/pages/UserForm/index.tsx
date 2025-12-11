// CORE
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
// API
import { useMutation } from '@apollo/client/react'
import { CREATE_USER } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// HOOKS
import useUserFormik from './form'
// INTERFACES
import { UserCreateResponse, UserCreatePayload } from '@interfaces/graphql'
import { UserFormData } from '@interfaces/forms'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { USER_FORM_LABELS, USER_FORM_TEST_IDS } from '@constants/forms'
// FUNCTIONS
import { encryptPass } from '@functions/encrypt'
import { setLoggedUser } from '@functions/local-storage'

const UserForm: React.FC = () => {
  const navigate = useNavigate()
  const [createUser, { loading: isLoadingUser, error: userErrors }] = useMutation<
    UserCreateResponse,
    UserCreatePayload
  >(CREATE_USER)
  const userContext = useContext(UserContext)

  const handleSubmit = async (formData: UserFormData) => {
    const userResponse = await createUser({
      variables: {
        payload: {
          name: formData.name,
          lastName: formData.lastName,
          userName: formData.userName,
          email: formData.email,
          password: encryptPass(formData.password)
        }
      }
    })

    if (userResponse.data?.createUser) {
      setLoggedUser(userResponse.data?.createUser)
      userContext?.setUserData({ name: userResponse.data?.createUser.name })
      navigate(APP_ROUTES.HOME)
    }
  }

  const { userFormik, userFormInputs } = useUserFormik(isLoadingUser, handleSubmit)

  const userFormHeader: TitleProps = {
    main: {
      text: USER_FORM_LABELS.TITLE,
      type: 'title'
    }
  }

  const userFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        testId: USER_FORM_TEST_IDS.SUBMIT_BTN,
        text: USER_FORM_LABELS.SUBMIT_BTN,
        type: 'submit',
        color: 'success',
        isDisabled: isLoadingUser
      },
      {
        testId: USER_FORM_TEST_IDS.LOG_IN_BTN,
        text: USER_FORM_LABELS.LOG_IN_BTN,
        type: 'button',
        color: 'danger',
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
    <Column size="8" offset="2">
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
              headerText={USER_FORM_LABELS.ERROR_TITLE}
              bodyText={userErrors.message}
              color="danger"
            />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default UserForm
