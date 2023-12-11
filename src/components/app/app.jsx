import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// CONTEXT
import { UserContext } from '../../context'
// COMPONENTS
import UserHeader from '../pages/UserHeader'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NewUser from '../pages/NewUser'
import UpdatePet from '../pages/UpdatePet'
import AddPet from '../pages/AddPet'
import ListMyPets from '../pages/ListMyPets'
import SettingsPage from '../pages/Settings'
import AddEvent from '../pages/AddEvent'
import SeeEvents from '../pages/SeeEvents'
// CONSTANTS
import ROUTES from '../../constants/routes.json'

const { APP_ROUTES } = ROUTES

const App = () => {
  const { userData } = useContext(UserContext)
  const renderHeader = () => userData && <UserHeader name={userData.name} />

  return (
    <BrowserRouter>
      {renderHeader()}
      <Routes>
        <Route exact path={APP_ROUTES.HOME} element={<Home />} />
        <Route exact path={APP_ROUTES.LOGIN} element={<Login />} />
        <Route exact path={APP_ROUTES.NEW_USER} element={<NewUser />} />
        <Route exact path={`${APP_ROUTES.UPDATE_PET}/:petId`} element={<UpdatePet />} />
        <Route exact path={APP_ROUTES.ADD_PET} element={<AddPet />} />
        <Route exact path={APP_ROUTES.LIST_MY_PETS} element={<ListMyPets />} />
        <Route exact path={APP_ROUTES.SETTINGS} element={<SettingsPage />} />
        <Route exact path={`${APP_ROUTES.ADD_EVENT}/:petId`} element={<AddEvent />} />
        <Route exact path={`${APP_ROUTES.SEE_EVENTS}/:petId`} element={<SeeEvents />} />
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
