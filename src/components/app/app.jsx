import React, { Suspense, lazy, useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// CONTEXT
import { UserContext } from '../../context'
// COMPONENTS
import UserHeader from '../pages/UserHeader'
// CONSTANTS
import ROUTES from '../../constants/routes.json'

const { APP_ROUTES } = ROUTES

const App = () => {
  const { userData } = useContext(UserContext)
  const LazyHome = lazy(() => import('../pages/Home'))
  const LazyLogin = lazy(() => import('../pages/Login'))
  const LazyNewUser = lazy(() => import('../pages/NewUser'))
  const LazyUpdatePet = lazy(() => import('../pages/UpdatePet'))
  const LazyAddPet = lazy(() => import('../pages/AddPet'))
  const LazyListMyPets = lazy(() => import('../pages/ListMyPets'))
  const LazySettingsPage = lazy(() => import('../pages/Settings'))
  const LazyAddEvent = lazy(() => import('../pages/AddEvent'))
  const LazySeeEvents = lazy(() => import('../pages/SeeEvents'))

  return (
    <BrowserRouter>
      {userData ? <UserHeader name={userData.name} /> : null}
      <Routes>
        <Route exact path={APP_ROUTES.HOME} element={
          <Suspense fallback='...'>
            <LazyHome />
          </Suspense>
        } />
        <Route exact path={APP_ROUTES.LOGIN} element={
          <Suspense fallback='...'>
            <LazyLogin />
          </Suspense>
        } />
        <Route exact path={APP_ROUTES.NEW_USER} element={
          <Suspense fallback='...'>
            <LazyNewUser />
          </Suspense>
        } />
        <Route exact path={`${APP_ROUTES.UPDATE_PET}/:petId`} element={
          <Suspense fallback='...'>
            <LazyUpdatePet />
          </Suspense>
        } />
        <Route exact path={APP_ROUTES.ADD_PET} element={
          <Suspense fallback='...'>
            <LazyAddPet />
          </Suspense>
        } />
        <Route exact path={APP_ROUTES.LIST_MY_PETS} element={
          <Suspense fallback='...'>
            <LazyListMyPets />
          </Suspense>
        } />
        <Route exact path={APP_ROUTES.SETTINGS} element={
          <Suspense fallback='...'>
            <LazySettingsPage />
          </Suspense>
        } />
        <Route exact path={`${APP_ROUTES.ADD_EVENT}/:petId`} element={
          <Suspense fallback='...'>
            <LazyAddEvent />
          </Suspense>
        } />
        <Route exact path={`${APP_ROUTES.SEE_EVENTS}/:petId`} element={
          <Suspense fallback='...'>
            <LazySeeEvents />
          </Suspense>
        } />
        <Route exact path={APP_ROUTES.BASE} element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
        <Route
          exact
          path={APP_ROUTES.UPDATE_PET}
          element={<Navigate replace to={APP_ROUTES.LIST_MY_PETS} />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
