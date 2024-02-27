import {useState} from 'react'
import * as Yup from 'yup'
import {FormikErrors, FormikTouched, useFormik} from 'formik'
import {toast} from 'react-toastify'
import {changeUserPassword} from '../../../../../redux/authentication/user/userManagementSlice'
import {useAppDispatch} from '../../../../../redux/hooks'
import {useTranslation} from 'react-i18next'

const PasswordChangeModal = ({onClose, id}: any) => {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)
  const {t} = useTranslation()
  const validationMessages = {
    required: (name: string) => t('validation.required', {name: t(name)}),
  }

  const FormSchema = Yup.object().shape({
    password: Yup.string().required(validationMessages.required('global.password')),
    password_confirmation: Yup.string()
      .required(validationMessages.required('global.password_confirmation'))
      .when('password', {
        is: (val: string) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], 'رمز ورود و تایید رمز ورود یکسان نمیباشد!'),
      }),
  })

  const initialValues = {
    password: '',
    password_confirmation: '',
  }

  const formik = useFormik({
    initialValues,
    validationSchema: FormSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading(true)
      try {
        const formData = createFormData(values)
        const response = await dispatch(changeUserPassword({id, formData}) as any)
        if (changeUserPassword.fulfilled.match(response)) {
          handleFulfilledResponse(response)
          resetForm()
          onClose()
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
    const {password, password_confirmation} = values
    const formData = new FormData()
    formData.append('password', password)
    formData.append('password_confirmation', password_confirmation)
    return formData
  }

  const handleFulfilledResponse = (response: any) => {
    const {meta, payload} = response
    if (meta.requestStatus === 'fulfilled') {
      toast.success(<p className='fs-4 fw-bold'>{payload.message}</p>)
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
  return (
    <>
      <form
        className='form m-0 p-0'
        id='kt_login_signup_form'
        onSubmit={formik.handleSubmit}
        noValidate
        autoComplete='off'
      >
        <div className='row background-fa'>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <label className='col-form-label label fw-bold fs-5'>
              {t('global.password')}:
              <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
            </label>
            <input
              type='password'
              placeholder={t('global.password')}
              {...formik.getFieldProps('password')}
              className={`form-control form-control-sm ${
                renderErrorMessage('password') ? `validation-error` : ''
              }`}
              name='password'
            />
            {renderErrorMessage('password')}
          </div>

          <div className='col-lg-6 col-md-6 col-sm-12 mb-2'>
            <label className='col-form-label label fw-bold fs-5'>
              {t('global.email')}:
              <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
            </label>
            <input
              type='password'
              placeholder={t('global.password_confirmation')}
              {...formik.getFieldProps('password_confirmation')}
              className={`form-control form-control-sm ${
                renderErrorMessage('password_confirmation') ? `validation-error` : ''
              }`}
              name='password_confirmation'
            />
            {renderErrorMessage('password_confirmation')}
          </div>
        </div>
        <div className='row background-f5'>
          <div className='d-flex flex-stack flex-wrap pt-10'>
            <div className='fs-6 fw-bold text-gray-700 mb-5'>
              <button
                type='submit'
                id='kt_sign_in_submit'
                className='btn btn-sm btn-primary fw-bold me-2'
                disabled={formik.isSubmitting || !formik.isValid || loading}
              >
                {!loading && (
                  <span className='indicator-label'>
                    <i className='fa-solid fa-key'></i>
                    <b> {t('global.change')}</b>
                  </span>
                )}
                {loading && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    <b> {t('global.please-waite')}</b>
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>

              <button
                type='button'
                className='btn btn-sm btn-flex btn-danger fw-bold'
                onClick={onClose}
              >
                <b>
                  <i className='fa-solid fa-times'></i>
                </b>
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
export default PasswordChangeModal
