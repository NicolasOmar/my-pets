import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
// COMPONENTS
import UserHeader from '../templates/UserHeader'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NewUser from '../pages/NewUser'
import UpdateUser from '../pages/UpdateUser'
import UpdatePassword from '../pages/UpdatePassword'
import UpdatePet from '../pages/UpdatePet'
import AddPet from '../pages/AddPet'
import ListMyPets from '../pages/ListMyPets'
// CONSTANTS
import { APP_ROUTES } from '../../constants/routes.json'

const App = () => {
  const userData = useSelector(({ userState }) => userState)
  const renderHeader = userState => userState && <UserHeader name={userState.name} />
  return (
    <BrowserRouter>
      {renderHeader(userData)}
      <Routes>
        <Route exact path={APP_ROUTES.HOME} element={<Home />} />
        <Route exact path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route exact path={APP_ROUTES.NEW_USER} element={<NewUser />} />
        <Route exact path={APP_ROUTES.UPDATE_USER} element={<UpdateUser />} />
        <Route exact path={APP_ROUTES.UPDATE_PASS} element={<UpdatePassword />} />
        <Route path={`${APP_ROUTES.UPDATE_PET}/:petName`} element={<UpdatePet />} />
        <Route exact path={APP_ROUTES.ADD_PET} element={<AddPet />} />
        <Route exact path={APP_ROUTES.LIST_MY_PETS} element={<ListMyPets />} />
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
