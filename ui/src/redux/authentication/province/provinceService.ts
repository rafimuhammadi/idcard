import axios from 'axios'

// Get users
const getProvinces = async () => {
  const response = await axios.get(`api/zone/get-provinces`)
  return response.data
}

const provinceService = {
  getProvinces,
}

export default provinceService
