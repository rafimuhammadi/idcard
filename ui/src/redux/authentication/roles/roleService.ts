import axios from 'axios'

// Get users
const getRoles = async (params: any) => {
  const response = await axios.get(`api/role/index`, {params})
  return response.data
}
const getSystems = async () => {
  const response = await axios.get(`api/role/get-systems`)
  return response.data
}

const getPermissionBySystemId = async (id: number) => {
  const response = await axios.get(`api/permission/get-permission-by-system-id/${id}`)
  return response.data
}

const store = async (params: any) => {
  const response = await axios.post(`api/role/store`, params)
  return response.data
}

const edit = async (id: number) => {
  const response = await axios.get(`api/role/edit/${id}`)
  return response.data
}
const update = async (params: any) => {
  const response = await axios.post(`api/role/update`, params)
  return response.data
}

const roleService = {
  getRoles,
  getSystems,
  getPermissionBySystemId,
  store,
  edit,
  update,
}

export default roleService
