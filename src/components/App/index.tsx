import { Suspense, lazy, useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// CONTEXT
import { UserContext } from '@context/userContext'
// COMPONENTS
import UserHeader from '../pages/UserHeader'
// CONSTANTS
import { APP_ROUTES } from '@constants/routes'
import { Column, ProgressBar } from 'reactive-bulma'

const ProgressStructure = () => (
  <Column size="10" offset="1">
    <ProgressBar isLoading />
  </Column>
)

const App = () => {
  const userContext = useContext(UserContext)
  const LazyHomePage = lazy(() => import('../pages/HomePage'))
  const LazyLoginForm = lazy(() => import('../pages/LoginForm'))
  const LazyUserForm = lazy(() => import('../pages/UserForm'))
  const LazyPetForm = lazy(() => import('../pages/PetForm'))
  const LazyPetList = lazy(() => import('../pages/PetList'))
  const LazySettingsPage = lazy(() => import('../pages/SettingsPage'))
  const LazyEventForm = lazy(() => import('../pages/EventForm'))
  const LazyEventList = lazy(() => import('../pages/EventList'))

  return (
    <BrowserRouter>
      {userContext?.userData ? <UserHeader name={userContext.userData.name} /> : null}
      <Routes>
        {/* HOME PAGE */}
        <Route
          path={APP_ROUTES.HOME}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyHomePage />
            </Suspense>
          }
        />
        {/* LOGIN PAGE/FORM */}
        <Route
          path={APP_ROUTES.LOGIN}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyLoginForm />
            </Suspense>
          }
        />
        {/* USER CREATION PAGE/FORM */}
        <Route
          path={APP_ROUTES.USER_FORM}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyUserForm />
            </Suspense>
          }
        />
        {/* PET CREATION PAGE/FORM */}
        <Route
          path={APP_ROUTES.PET_FORM}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyPetForm />
            </Suspense>
          }
        />
        {/* PET UPDATE PAGE/FORM */}
        <Route
          path={`${APP_ROUTES.PET_FORM}/:petId`}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyPetForm />
            </Suspense>
          }
        />
        {/* PET LIST PAGE */}
        <Route
          path={APP_ROUTES.PET_LIST}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyPetList />
            </Suspense>
          }
        />
        {/* SETTINGS PAGE */}
        <Route
          path={APP_ROUTES.SETTINGS}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazySettingsPage />
            </Suspense>
          }
        />
        {/* EVENT CREATION PAGE/FORM WITHOUT PET ID */}
        <Route
          path={`${APP_ROUTES.EVENT_FORM}`}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyEventForm />
            </Suspense>
          }
        />
        {/* EVENT LIST PAGE */}
        <Route
          path={`${APP_ROUTES.EVENT_LIST}/:petId`}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyEventList />
            </Suspense>
          }
        />
        {/* EVENT CREATION PAGE/FORM WITH PET ID */}
        <Route
          path={`${APP_ROUTES.EVENT_FORM}/:petId`}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyEventForm />
            </Suspense>
          }
        />
        {/* EVENT UPDATE PAGE/FORM */}
        <Route
          path={`${APP_ROUTES.EVENT_FORM}/:petId/:eventId`}
          element={
            <Suspense fallback={<ProgressStructure />}>
              <LazyEventForm />
            </Suspense>
          }
        />
        <Route path={APP_ROUTES.PET_FORM} element={<Navigate replace to={APP_ROUTES.PET_LIST} />} />
        <Route path={APP_ROUTES.BASE} element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
