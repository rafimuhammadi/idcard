// eslint-disable-next-line react-hooks/exhaustive-deps
import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FormikErrors, FormikTouched, useFormik} from 'formik'
import * as Yup from 'yup'
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks'
import {getSystems} from '../../../../../../redux/authentication/roles/roleSlice'
import {toast} from 'react-toastify'
import AddUserForm from './AddUserForm'
import {
  getRolesBySystemId,
  storeUser,
} from '../../../../../../redux/authentication/user/userManagementSlice'
import {getProvinces} from '../../../../../../redux/authentication/province/provinceSlice'
import {getALlDepartmentInToOption} from '../../../../../../redux/authentication/department/departmentSlice'
import Loader from '../../../../../pages/loading/Loader'
import {useTranslation} from 'react-i18next'

type FileType = 'image' | 'signature'

const AddUser = () => {
  const [loading, setLoading] = useState(false)
  const [pageLoader, setPageLoader] = useState(false)
  const [loader, setLoader] = useState(true)
  const [selectedRoles, setSelectedRoles] = useState([])

  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [filePreviews, setFilePreviews] = useState<string[]>([])
  const [fileTypes, setFileTypes] = useState<FileType[]>([])

  const navigate = useNavigate()

  //get data from server for options
  const dispatch = useAppDispatch()
  const {systems} = useAppSelector((state) => state.systems)
  const {roles} = useAppSelector((state) => state.userManagement)
  const {provinces} = useAppSelector((state) => state.province)
  const {departmentsOptions} = useAppSelector((state) => state.departments)
  const {t} = useTranslation()
  const validationMessages = {
    required: (name: string) => t('validation.required', {name: t(name)}),
    max: (name: string) => t('validation.max', {name: t(name)}),
    required_select: (name: string) => t('validation.select-required', {name: t(name)}),
    min: (name: string) => t('validation.min-selection', {name: t(name)}),
  }

  const FormSchema = Yup.object().shape({
    username: Yup.string()
      .max(64, validationMessages.max('user.roleName'))
      .required(validationMessages.required('user.roleName')),
    name: Yup.string().required(validationMessages.required('global.name')),
    email: Yup.string()
      .required(validationMessages.required('global.email'))
      .email('نوعیت ایمیل اشتباه است!'),
    password: Yup.string().required(validationMessages.required('global.password')),
    password_confirmation: Yup.string()
      .required(validationMessages.required('global.password_confirmation'))
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], 'رمز ورود و تایید رمز ورود یکسان نمیباشد!'),
      }),
    department: Yup.string().required(validationMessages.required('global.department')),
    job: Yup.string().required(validationMessages.required('global.job')),
    system_id: Yup.array()
      .required(validationMessages.required_select('user.system'))
      .min(1, validationMessages.min('user.system'))
      .of(Yup.string()),
    roles: Yup.array()
      .required(validationMessages.required_select('user.roles'))
      .min(1, validationMessages.min('user.roles'))
      .of(Yup.string()),
  })

  const initialValues = {
    username: '',
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    department: '',
    job: '',
    system_id: [],
    roles: [],
  }

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading(true)
      try {
        const formData = createFormData(values)
        const response = await dispatch(storeUser(formData) as any)
        if (storeUser.fulfilled.match(response)) {
          handleFulfilledResponse(response)
          resetForm()
        } else {
          handleRejectedResponse(response)
        }
      } catch (error) {
        handleError(error)
      } finally {
        setLoading(false)
      }
    },
  })

  const createFormData = (values: any) => {
    const {
      username,
      name,
      email,
      password,
      password_confirmation,
      department,
      job,
      system_id,
      roles,
    } = values
    const formData = new FormData()
    formData.append('name', name)
    formData.append('username', username)
    formData.append('password', password)
    formData.append('email', email)
    formData.append('password_confirmation', password_confirmation)
    formData.append('password', password)
    formData.append('department', department)
    formData.append('job', job)

    system_id.forEach((item: any) => {
      formData.append('system_id[]', item)
    })

    roles.forEach((item: any) => {
      formData.append('roles[]', item)
    })
    formData.append('image', selectedFiles[0] as Blob)
    return formData
  }

  const handleFulfilledResponse = (response: any) => {
    const {meta, payload} = response
    if (meta.requestStatus === 'fulfilled') {
      toast.success(<p className='fs-4 fw-bold'>{payload.message}</p>)
      navigate('/authentication/users')
    } else {
      toast.error(<p className='fs-4 fw-bold'>{t('validation.required')}</p>)
    }
    setLoading(false)
  }

  const handleRejectedResponse = (response: any) => {
    const {payload} = response
    toast.error(<p className='fs-4 fw-bold'>{payload}</p>)
    setLoading(false)
  }

  const handleError = (error: any) => {
    console.error('Error creating department:', error.message)
    setLoading(false)
  }

  const renderErrorMessage = (fieldName: keyof typeof initialValues) => {
    const errors = formik.errors as FormikErrors<typeof initialValues>
    const touched = formik.touched as FormikTouched<typeof initialValues>
    if (errors[fieldName] && touched[fieldName]) {
      return (
        <div className='fv-plugins-message-container'>
          <span role='alert' className='text-danger fw-bold'>
            {errors[fieldName]}
          </span>
        </div>
      )
    }
    return null
  }

  useEffect(() => {
    dispatch(getSystems()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setLoader(false)
      }
      setLoader(false)
    })
  }, [dispatch])

  const systemChangeHandler = async (system_id: any) => {
    if (system_id.length > 0) {
      setPageLoader(true)
      dispatch(getRolesBySystemId(system_id)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          setPageLoader(false)
        }
        setPageLoader(false)
      })
    } else {
      setSelectedRoles([])
    }
  }
  useEffect(() => {
    setSelectedRoles(roles)
  }, [roles])

  const isValidImageFile = (file: File | null) => {
    if (!file) {
      return false
    }

    const allowedExtensions = ['.png', '.jpg', '.jpeg']
    const extension = file.name
      .toLowerCase()
      .slice((Math.max(0, file.name.lastIndexOf('.')) || Infinity) + 1)
    return allowedExtensions.includes('.' + extension)
  }

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>, type: FileType) => {
    const newFiles = e.target.files
    if (newFiles) {
      const validNewFiles = Array.from(newFiles).filter(isValidImageFile)
      if (type === 'image') {
        setFilePreviews(validNewFiles.map((file) => URL.createObjectURL(file)))
        setSelectedFiles(validNewFiles)
        setFileTypes(validNewFiles.map(() => 'image'))
      }
      if (validNewFiles.length === 0) {
        // Handle invalid file type (e.g., show an error message)
        toast.error('Invalid file type. Please select .png, .jpg, or .jpeg images.')
      }
    }
  }

  useEffect(() => {
    const currentFilePreviews = fileTypes.map((type, index) =>
      type === 'image' ? filePreviews[index] : ''
    )
    return () => {
      currentFilePreviews.forEach((objectUrl) => URL.revokeObjectURL(objectUrl))
    }
  }, [filePreviews, fileTypes])

  return (
    <>
      {!loader ? (
        <AddUserForm
          formik={formik}
          systems={systems}
          renderErrorMessage={renderErrorMessage}
          t={t}
          loading={loading}
          systemChangeHandler={systemChangeHandler}
          roles={selectedRoles}
          onSelectFile={onSelectFile}
          filePreviews={filePreviews}
          fileTypes={fileTypes}
          pageLoader={pageLoader}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default AddUser
