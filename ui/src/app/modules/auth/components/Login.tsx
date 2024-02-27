/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {getUserByToken, login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'
import {useTranslation} from 'react-i18next'

const initialValues = {
  email: '',
  password: '',
}

export function Login() {
  const {t} = useTranslation()
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Wrong email format')
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(t('validation.required', {name: t('global.email')})),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(t('validation.required', {name: t('global.password')})),
  })
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.email, values.password)
        saveAuth(auth)
        const {data: user} = await getUserByToken(auth.api_token)
        setCurrentUser(user)
      } catch (error) {
        console.error(error)
        saveAuth(undefined)
        setStatus('The login details are incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center'>
        <h1 className='text-dark fw-bolder '>{t('global.login-title')}</h1>
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-lg-5 bg-light-info p-5 rounded'>
          <div className='text-info'>
            <strong>کاربر گرامی</strong> با استفاده ایمیل آدرس و رمز عبور خویش وارد سیستم شوید.
          </div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fs-6 fw-bolder text-dark'>{t('global.email')}:</label>
        <input
          placeholder={t('global.email')}
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
          type='email'
          name='email'
          autoComplete='off'
          style={{direction: 'rtl'}}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <span role='alert' className='text-danger fw-bold'>
              {formik.errors.email}
            </span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>{t('global.password')}:</label>
        <input
          type='password'
          placeholder={t('global.password')}
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert' className='text-danger fw-bold'>
                {formik.errors.password}
              </span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>ورود به سیستم</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              لطفآ منتظر باشید...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}
