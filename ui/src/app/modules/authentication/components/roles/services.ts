import axios from 'axios'

export interface Header {
  headerName: string
  sort: string
}

export interface DataItem {
  id: number
  name: string
  systemName: string
  permissions: any
}

export const storeDepartment = async (name_da: string, name_pa: string, directorate_id: string) => {
  return await axios.post('api/department/store', {
    name_da: name_da,
    name_pa: name_pa,
    directorate_id: directorate_id,
  })
}
export const updateDepartment = async (
  id: string,
  name_da: string,
  name_pa: string,
  directorate_id: string
) => {
  return await axios.post(`api/department/update/${id}`, {
    name_da: name_da,
    name_pa: name_pa,
    directorate_id: directorate_id,
  })
}

export const serverRequest = (fetchUrl: any, params: any, source: any) => {
  return axios.get(fetchUrl, {params, cancelToken: source})
}

export const getDirectorate = async (id: number) => {
  return await axios.get(`api/directorate/edit/${id}`)
}

export function editDirectorate(
  id: string,
  name_fa: string,
  name_pa: string,
  name_en: string,
  code: string
) {
  return axios.post(`api/directorate/update/` + id, {
    name_fa,
    name_pa,
    name_en,
    code,
  })
}
