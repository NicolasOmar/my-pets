import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGIN } from '../../../graphql/mutations'
// CONTEXT
import { UserContext } from '../../../context'
// COMPONENTS
import FormTemplate from '../../templates/FormTemplate'
// FORM CONFIG
import { LoginFormButtons, LoginFormHeader, LoginFormInputs } from './form'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { setLoggedUser } from '../../../functions/local-storage'

const Login = () => {
  let navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [login, { loading, error, data }] = useMutation(LOGIN)

  useEffect(() => {
    userContext?.userData && navigate(APP_ROUTES.HOME)
    return () => {}
  }, [navigate, userContext])

  useEffect(() => {
    if (data) {
      setLoggedUser(data.loginUser)
      userContext?.setUserData(data.loginUser)
      navigate(APP_ROUTES.HOME)
    }
  }, [data, userContext, navigate])

  const onSubmitLogin = async formData => {
    await login({
      variables: {
        ...formData,
        password: encryptPass(formData.password)
      }
    })
  }

  return (
    <FormTemplate
      header={LoginFormHeader}
      isLoading={loading}
      isFetching={false}
      errors={error?.message ?? undefined}
      inputs={LoginFormInputs}
      buttons={LoginFormButtons}
      onSubmit={data => onSubmitLogin(data)}
    />
  )
}

export default Login
