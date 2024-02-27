import axios from 'axios'

// Get users
const getDepartments = async () => {
  const response = await axios.get(`api/department/index`)
  return response.data
}
const store = async (params: any) => {
  const response = await axios.post(`api/department/store`, params)
  return response.data
}

const getALlDepartmentInToOption = async () => {
  const response = await axios.get(`api/department/get-all-department-in-option`)
  return response.data
}

const departmentService = {
  getDepartments,
  store,
  getALlDepartmentInToOption,
}

export default departmentService
