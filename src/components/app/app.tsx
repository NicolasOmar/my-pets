import { Suspense, lazy, useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import UserHeader from '../pages/UserHeader'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'

const App = () => {
  const userContext = useContext(UserContext)
  const LazyHome = lazy(() => import('../pages/Home'))
  const LazyLogin = lazy(() => import('../pages/LoginForm'))
  const LazyNewUser = lazy(() => import('../pages/UserForm'))
  const LazyPetForm = lazy(() => import('../pages/PetForm'))
  // const LazyUpdatePet = lazy(() => import('../pages/UpdatePet'))
  const LazyListMyPets = lazy(() => import('../pages/PetList'))
  // const LazySettingsPage = lazy(() => import('../pages/Settings'))
  // const LazyAddEvent = lazy(() => import('../pages/AddEvent'))
  // const LazySeeEvents = lazy(() => import('../pages/SeeEvents'))

  return (
    <BrowserRouter>
      {userContext?.userData ? <UserHeader name={userContext.userData.name} /> : null}
      <Routes>
        <Route
          path={APP_ROUTES.HOME}
          element={
            <Suspense fallback="...">
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.LOGIN}
          element={
            <Suspense fallback="...">
              <LazyLogin />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.USER_FORM}
          element={
            <Suspense fallback="...">
              <LazyNewUser />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.PET_FORM}
          element={
            <Suspense fallback="...">
              <LazyPetForm />
            </Suspense>
          }
        />
        {/* <Route
          path={`${APP_ROUTES.PET_FORM}/:petId`}
          element={
            <Suspense fallback="...">
              <LazyUpdatePet />
            </Suspense>
          }
        /> */}
        <Route
          path={APP_ROUTES.PET_LIST}
          element={
            <Suspense fallback="...">
              <LazyListMyPets />
            </Suspense>
          }
        />
        {/* 
        <Route
          path={APP_ROUTES.SETTINGS}
          element={
            <Suspense fallback="...">
              <LazySettingsPage />
            </Suspense>
          }
        />
        <Route
          path={`${APP_ROUTES.EVENT_FORM}/:petId`}
          element={
            <Suspense fallback="...">
              <LazyAddEvent />
            </Suspense>
          }
        />
        <Route
          path={`${APP_ROUTES.EVENT_LIST}/:petId`}
          element={
            <Suspense fallback="...">
              <LazySeeEvents />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.PET_FORM}
          element={<Navigate replace to={APP_ROUTES.PET_LIST} />}
        /> */}
        <Route path={APP_ROUTES.BASE} element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
