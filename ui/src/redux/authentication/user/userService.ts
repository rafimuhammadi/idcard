import axios from 'axios'

// Get users
const getUsers = async (params: any) => {
  const response = await axios.get(`api/user/index`, {params})
  return response.data
}
// Get roles by system id.
const getRolesBySystemId = async (systems_id: any) => {
  const response = await axios.post(`api/role/get-roles-by-system-id`, {systems_id: systems_id})
  return response.data
}

const store = async (formData: any) => {
  const response = await axios.post('api/user/store', formData)
  return response.data
}

// Get record by id.
const edit = async (id: number) => {
  const response = await axios.get(`api/user/edit/${id}`)
  return response.data
}

const update = async (id: any, formData: any) => {
  const response = await axios.post(`api/user/update/${id}`, formData)
  return response.data
}
const view = async (id: number) => {
  const response = await axios.get(`api/user/view/${id}`)
  return response.data
}
const checkCard = async (search: number) => {
  const response = await axios.get(`api/user/check/${search}`)
  return response.data
}

const changePassword = async (id: any, formData: any) => {
  const response = await axios.post(`api/user/change-user-password/${id}`, formData)
  return response.data
}

const changeStatus = async (id: any, status: any) => {
  const response = await axios.get(`api/user/change-status/${id}/${status}`)
  return response.data
}
const userService = {
  getUsers,
  getRolesBySystemId,
  store,
  edit,
  update,
  view,
  changePassword,
  changeStatus,
  checkCard,
}

export interface userManagementType {
  id: string
  name: string
  username: string
  email: string
  status: string
  created_at: string
  deleted_at: string
  department: string
  job: string
}
export default userService

export interface userView {
  record: {
    name: string
    username: string
    job: string
    email: string
    department: string
    image: string
    signature: string
    deleted_at: string
  }
  role: []
  userSystem: []
}
export const defaultViewData: userView = {
  record: {
    name: '',
    username: '',
    job: '',
    email: '',
    department: '',
    image: '',
    signature: '',
    deleted_at: '',
  },
  role: [],
  userSystem: [],
}

export interface checkUser {
  name: string
  username: string
  job: string
  email: string
  department: string
  image: string
  signature: string
  deleted_at: string
}
export const checkUserDefault: checkUser = {
  name: '',
  username: '',
  job: '',
  email: '',
  department: '',
  image: '',
  signature: '',
  deleted_at: '',
}
