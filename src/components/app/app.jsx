import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
// COMPONENTS
import UserHeader from '../templates/UserHeader'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import NewUserPage from '../pages/NewUserPage'
import UpdateUserPage from '../pages/UpdateUserPage'
import UpdatePasswordPage from '../pages/UpdatePassPage'
import AddPetPage from '../pages/AddPetPage'
// CONSTANTS
import { APP_ROUTES } from '../../constants/routes.json'

const App = () => {
  const userData = useSelector(({ userState }) => userState)
  const renderHeader = userState => userState && <UserHeader name={userState.name} />
  return (
    <BrowserRouter>
      {renderHeader(userData)}
      <Routes>
        <Route exact path={APP_ROUTES.HOME} element={<HomePage />} />
        <Route exact path={APP_ROUTES.LOGIN} element={<LoginPage />} />
        <Route exact path={APP_ROUTES.NEW_USER} element={<NewUserPage />} />
        <Route exact path={APP_ROUTES.UPDATE_USER} element={<UpdateUserPage />} />
        <Route exact path={APP_ROUTES.UPDATE_PASS} element={<UpdatePasswordPage />} />
        <Route exact path={APP_ROUTES.ADD_PET} element={<AddPetPage />} />
        <Route exact path={APP_ROUTES.BASE} element={<Navigate replace to={APP_ROUTES.LOGIN} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
