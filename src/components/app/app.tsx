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
  const LazyNewUser = lazy(() => import('../pages/NewUser'))
  // const LazyUpdatePet = lazy(() => import('../pages/UpdatePet'))
  // const LazyAddPet = lazy(() => import('../pages/AddPet'))
  // const LazyListMyPets = lazy(() => import('../pages/ListMyPets'))
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
          path={APP_ROUTES.NEW_USER}
          element={
            <Suspense fallback="...">
              <LazyNewUser />
            </Suspense>
          }
        />
        {/* <Route
          path={`${APP_ROUTES.UPDATE_PET}/:petId`}
          element={
            <Suspense fallback="...">
              <LazyUpdatePet />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.ADD_PET}
          element={
            <Suspense fallback="...">
              <LazyAddPet />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.LIST_MY_PETS}
          element={
            <Suspense fallback="...">
              <LazyListMyPets />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.SETTINGS}
          element={
            <Suspense fallback="...">
              <LazySettingsPage />
            </Suspense>
          }
        />
        <Route
          path={`${APP_ROUTES.ADD_EVENT}/:petId`}
          element={
            <Suspense fallback="...">
              <LazyAddEvent />
            </Suspense>
          }
        />
        <Route
          path={`${APP_ROUTES.SEE_EVENTS}/:petId`}
          element={
            <Suspense fallback="...">
              <LazySeeEvents />
            </Suspense>
          }
        />
        <Route
          path={APP_ROUTES.UPDATE_PET}
          element={<Navigate replace to={APP_ROUTES.LIST_MY_PETS} />}
        /> */}
        <Route path={APP_ROUTES.BASE} element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
