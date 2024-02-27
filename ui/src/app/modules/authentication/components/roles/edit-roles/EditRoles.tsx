import {useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {FormikErrors, FormikTouched, useFormik} from 'formik'
import * as Yup from 'yup'
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks'
import {
  editRole,
  getPermissionsBySystemId,
  getSystems,
  updateRole,
} from '../../../../../../redux/authentication/roles/roleSlice'
import {toast} from 'react-toastify'
import EditRolesForm from './EditRolesForm'
import Loader from '../../../../../pages/loading/Loader'
import {useTranslation} from 'react-i18next'

const EditRoles = () => {
  const {t} = useTranslation()
  const {id} = useParams()
  const [permissions, setPermission] = useState([])
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<any[]>([])
  const {roleData} = useAppSelector((state: any) => state.role)
  const [loading, setLoading] = useState(false)
  const [pageLoader, setPageLoader] = useState(false)
  const [loader, setLoader] = useState(true)

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {systems} = useAppSelector((state) => state.systems)

  const validationMessages = {
    required: (name: string) => t('validation.required', {name: t(name)}),
    max: (name: string) => t('validation.max', {name: t(name)}),
    required_select: (name: string) => t('validation.select-required', {name: t(name)}),
  }

  const FormSchema = Yup.object().shape({
    name: Yup.string()
      .max(64, validationMessages.max('user.roleName'))
      .required(validationMessages.required('user.roleName')),
    system_id: Yup.number().required(validationMessages.required_select('user.system')),
  })

  const initialValues = {
    name: '',
    system_id: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading(true)

      setLoading(true)
      try {
        const formData = createFormData(values)
        const response = await dispatch(updateRole(formData) as any)
        if (updateRole.fulfilled.match(response)) {
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
    const {name, system_id} = values
    const formData = new FormData()
    formData.append('name', name)
    formData.append('system_id', system_id)
    formData.append('id', id as string)
    formData.append('permissions', selectedCheckboxes as any)
    return formData
  }

  const handleFulfilledResponse = (response: any) => {
    const {meta, payload} = response
    if (meta.requestStatus === 'fulfilled') {
      // console.log(meta)
      toast.success(<p className='fs-4 fw-bold'>{payload.message}</p>)
      navigate('/authentication/roles')
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

  //get permissions by system id
  const systemChangeHandler = async (system: any) => {
    if (system.value) {
      setPageLoader(true)
      formik.setFieldValue('system_id', system.value)
      dispatch(getPermissionsBySystemId(system.value)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          setPageLoader(false)
          setPermission(response.payload)
        } else if (response.meta.requestStatus === 'rejected') {
          setPageLoader(false)
        }
      })
    }
  }

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // Select all checkboxes
      const allCheckboxIds = permissions.map((data: any) => data.id)
      setSelectedCheckboxes(allCheckboxIds)
    } else {
      // Deselect all checkboxes
      setSelectedCheckboxes([])
    }
  }

  type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>
  const handleCheckboxChange = (event: CheckboxChangeEvent, recordId: number) => {
    if (event.target.checked) {
      setSelectedCheckboxes([...selectedCheckboxes, recordId])
    } else {
      setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== recordId))
    }
  }

  useEffect(() => {
    // setLoader(true)
    dispatch(getSystems())
    dispatch(editRole(id))
    // setLoader(false)
    const {name, system_id} = roleData
    formik.setValues({name, system_id})

    dispatch(editRole(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setLoader(true)
        setSelectedCheckboxes(res.payload.permissions.map((p: any) => p.id))
        const {name, system_id} = res.payload.roles
        formik.setValues({name, system_id})
        setPermission(res.payload.rolePermissions)
      } else if (res.meta.requestStatus === 'rejected') {
        setLoader(false)
      }
      setLoader(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      {!loader ? (
        <EditRolesForm
          formik={formik}
          systems={systems}
          renderErrorMessage={renderErrorMessage}
          t={t}
          loading={loading}
          systemChangeHandler={systemChangeHandler}
          permissions={permissions}
          handleSelectAll={handleSelectAll}
          handleCheckboxChange={handleCheckboxChange}
          selectedCheckboxes={selectedCheckboxes}
          pageLoader={pageLoader}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default EditRoles
