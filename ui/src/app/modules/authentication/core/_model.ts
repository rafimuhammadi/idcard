import {Response} from './../../../../_metronic/helpers/crud-helper/models'
export interface diretorateData {
  current_page: number
  data: Array<any>
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<any>
  next_page_url: string
  path: string
  per_page: number
  to: number
  total: number
}

export default diretorateData

export type directorate = {
  current_page: number
  data: Array<any>
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Array<any>
  next_page_url: string
  path: string
  per_page: number
  to: number
  total: number
}
export type DirectorateQueryResponse = Response<Array<directorate>>
export class DepartmentData {
  id: number
  name_fa: string
  name_pa: string
  name_en: string
  directorateName: string
  departmentCode: string
  constructor(
    id = 0,
    name_fa = '',
    name_pa = '',
    name_en = '',
    directorateName = '',
    departmentCode = ''
  ) {
    this.id = id
    this.name_fa = name_fa
    this.name_pa = name_pa
    this.name_en = name_en
    this.directorateName = directorateName
    this.departmentCode = departmentCode
  }
}

export class DirectorateType {
  id: any
  name_fa: string
  name_pa: string
  name_en: string
  constructor(id = '', name_fa = '', name_pa = '', name_en = '') {
    this.id = id
    this.name_fa = name_fa
    this.name_pa = name_pa
    this.name_en = name_en
  }
}
export class PermissionsType {
  id: number
  name: string
  constructor(id = 0, name = '') {
    this.id = id
    this.name = name
  }
}

export class Role {
  id: number
  name: string
  PermissionsType: PermissionsType[]
  constructor(id = 0, name = '', PermissionsType = []) {
    this.id = id
    this.name = name
    this.PermissionsType = PermissionsType
  }
}

export interface provinceType {
  id: string
  name: string
}
// export interface password {
//   password: string
//   confirmPassword: string
// }
// export interface ICreateAppData {
//   passwordType: password
//   name: string
// }
// export const defaultCreateAppData: ICreateAppData = {
//   passwordType: {password: '', confirmPassword: 'Quick Online Courses'},
//   name: '',
// }

export interface IAppBasic {
  appName: string
  appType: 'Quick Online Courses' | 'Face to Face Discussions' | 'Full Intro Training'
}

export type TAppFramework = 'HTML5' | 'ReactJS' | 'Angular' | 'Vue'

export interface IAppDatabase {
  databaseName: string
  databaseSolution: 'MySQL' | 'Firebase' | 'DynamoDB'
}

export type TAppStorage = 'Basic Server' | 'AWS' | 'Google'

export interface ICreateAppData {
  password: string
  confirmPassword: string
}

export const defaultCreateAppData: ICreateAppData = {
  password: '',
  confirmPassword: '',
}

export type StepProps = {
  data: ICreateAppData
  updateData: (fieldsToUpdate: Partial<ICreateAppData>) => void
  hasError: boolean
}
export interface IUpdatePassword {
  newPassword: string
  passwordConfirmation: string
}
export const updatePassword: IUpdatePassword = {
  newPassword: '',
  passwordConfirmation: '',
}
export interface CreateUserData {
  id: number
  first_name: string
  last_name: string
  email: string
  phone: number
  rank: string
  createdBy: number
  created_at: string
  roleName: string
  isBlocked: number
  directorateName: string
  departmentName: string
  zoneName: string
  image: string
  signature: string
}
export const defaultCreateUserData: CreateUserData = {
  id: 0,
  first_name: '',
  last_name: '',
  email: '',
  phone: 0,
  rank: '',
  createdBy: 0,
  created_at: '',
  roleName: '',
  isBlocked: 0,
  directorateName: '',
  departmentName: '',
  zoneName: '',
  image: '',
  signature: '',
}
export interface data {
  data: Array<any>
  links: Array<any>
  page: number
  last_page: number
  total: number
}
export const defaultDataSetting: data = {
  data: [],
  links: [],
  page: 1,
  last_page: 0,
  total: 0,
}
export interface recordOwner {
  first_name: string
  directorateName: string
  departmentName: string
  zoneName: string
  id: number
}
export const defaultRecordOWner: recordOwner = {
  first_name: '',
  directorateName: '',
  departmentName: '',
  zoneName: '',
  id: 0,
}

export interface MetaModel {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
  first: string
  previous: string
  next: string
  last: string
  pageIndex: number
  pageSize: number
}
export const defualtMetaMode: MetaModel = {
  totalItems: 0,
  itemCount: 0,
  itemsPerPage: 0,
  totalPages: 0,
  currentPage: 0,
  first: '',
  previous: '',
  next: '',
  last: '',
  pageIndex: 0,
  pageSize: 10,
}

export interface UserSearch {
  name: string
  lastName: string
  phone: number
  directorateId: number
  departmentId: number
  location: number
  status: number
  roleId: number
}
export const DefaultUserSearch: UserSearch = {
  name: '',
  lastName: '',
  phone: 0,
  directorateId: 0,
  departmentId: 0,
  location: 0,
  status: 0,
  roleId: 0,
}
export interface dropdownData {
  directorate: []
  zones: []
  roles: []
}
export const userDropdownDataDefalt: dropdownData = {
  directorate: [],
  zones: [],
  roles: [],
}

export interface userStoreType {
  first_name: ''
  father_name: ''
  last_name: ''
  email: ''
  phone: ''
  rank: ''
  directorateId: ''
  departmentId: ''
  zoneId: ''
  password: ''
  confirmPassword: ''
  status: ''
  image: ''
  signature: ''
  roleId: ''
}
