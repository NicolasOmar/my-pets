// CORE
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '@graphql/mutations'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import { Box, ButtonGroup, Column, FormField, Message, Title } from 'reactive-bulma'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
// INTERFACES
import { InputProps } from '@interfaces/components'
import { TitleProps } from 'reactive-bulma/dist/interfaces/atomProps'
import { ButtonGroupProps } from 'reactive-bulma/dist/interfaces/moleculeProps'
// FUNCTIONS
import { encryptPass } from '@functions/encrypt'
import { setLoggedUser } from '@functions/local-storage'

const NewUser = () => {
  let navigate = useNavigate()
  const [createUser, { loading: isLoadingUser, error: userErrors }] = useMutation(CREATE_USER)
  const userContext = useContext(UserContext)

  const userFormik = useFormik({
    initialValues: {
      name: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      repeatPass: ''
    },
    onSubmit: async formData => {
      const newUser = {
        ...formData,
        repeatPass: undefined,
        password: encryptPass(formData.password)
      }

      try {
        const response = await createUser({ variables: { newUser } })
        setLoggedUser(response.data?.createUser)
        userContext?.setUserData(response.data?.createUser)
        navigate(APP_ROUTES.HOME)
      } catch (e) {
        console.error(e)
      }
    },
    enableReinitialize: true
  })

  const userFormHeader: TitleProps = {
    main: {
      text: 'Sign up',
      type: 'title'
    }
  }

  const userFormInputs: InputProps = {
    name: {
      labelText: 'Name',
      inputControlConfig: {
        inputConfig: {
          type: 'text',
          name: 'name',
          isDisabled: isLoadingUser,
          onChange: userFormik.handleChange
        }
      }
    },
    lastName: {
      labelText: 'Last Name',
      inputControlConfig: {
        inputConfig: {
          type: 'text',
          name: 'lastName',
          isDisabled: isLoadingUser,
          onChange: userFormik.handleChange
        }
      }
    },
    userName: {
      labelText: 'User Name',
      inputControlConfig: {
        inputConfig: {
          type: 'text',
          name: 'userName',
          isDisabled: isLoadingUser,
          onChange: userFormik.handleChange
        }
      }
    },
    email: {
      labelText: 'Email',
      inputControlConfig: {
        inputConfig: {
          type: 'email',
          name: 'email',
          isDisabled: isLoadingUser,
          onChange: userFormik.handleChange
        }
      }
    },
    password: {
      labelText: 'Password',
      inputControlConfig: {
        inputConfig: {
          type: 'password',
          name: 'password',
          isDisabled: isLoadingUser,
          onChange: userFormik.handleChange
        }
      }
    },
    repeatPass: {
      labelText: 'Repeat Password',
      inputControlConfig: {
        inputConfig: {
          type: 'password',
          name: 'repeatPass',
          isDisabled: isLoadingUser,
          onChange: userFormik.handleChange
        }
      }
    }
  }

  const userFormButtons: ButtonGroupProps = {
    buttonList: [
      {
        type: 'submit',
        color: 'is-success',
        text: 'Sign up',
        isDisabled: isLoadingUser
      },
      {
        type: 'button',
        color: 'is-danger',
        text: 'You can log in with your account',
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

          {userFormButtons ? <ButtonGroup {...userFormButtons} /> : null}
          {userErrors ? (
            <Message headerText={'User errors'} bodyText={userErrors.message} color="is-danger" />
          ) : null}
        </form>
      </Box>
    </Column>
  )
}

export default NewUser
