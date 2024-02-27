import {Routes, Route, Outlet} from 'react-router-dom'
import RoleList from './components/roles/list-roles/RoleList'
import AddRoles from './components/roles/create-roles/AddRoles'
import EditRoles from './components/roles/edit-roles/EditRoles'
import UserList from './components/users/list-user/UserList'
import AddUser from './components/users/create-user/AddUser'
import EditUser from './components/users/edit-user/EditUser'
import ViewUser from './components/users/view-user/ViewUser'
import CheckCard from './components/users/check-card/check-card'

const AuthManagementModuleRoute = () => (
  <Routes>
    <Route element={<Outlet />}>
      <Route path='users' element={<UserList />} />
      <Route path='view-user/:id' element={<ViewUser />} />
      <Route path='create-user' element={<AddUser />} />
      <Route path='edit-user/:id' element={<EditUser />} />
      <Route path='roles' element={<RoleList />} />
      <Route path='create-role' element={<AddRoles />} />
      <Route path='edit-roles/:id' element={<EditRoles />} />
      <Route path='check-card' element={<CheckCard />} />
    </Route>
  </Routes>
)

export default AuthManagementModuleRoute
