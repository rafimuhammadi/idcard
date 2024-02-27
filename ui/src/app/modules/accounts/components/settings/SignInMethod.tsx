/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import {IUpdatePassword, updatePassword} from './SettingsModel'
import {toast} from 'react-toastify'
import axios from 'axios'
const passwordFormValidationSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .min(3, 'رمز از 3 حرف کمتر نباشد')
    .max(50, 'رمز از 50 حرف کمتر نباشد')
    .required('درج رمز قبلی ضروری میباشد!'),
  newPassword: Yup.string()
    .min(3, 'رمز از 3 حرف کمتر نباشد')
    .max(50, 'رمز از 50 حرف کمتر نباشد')
    .required('درج رمز جدید ضروری میباشد!'),
  passwordConfirmation: Yup.string()
    .min(3, 'رمز از 3 حرف کمتر نباشد')
    .max(50, 'رمز از 50 حرف کمتر نباشد')
    .required('درج تایید رمز جدید ضروری میباشد!')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const SignInMethod: React.FC = (props: any) => {
  const [passwordUpdateData, setPasswordUpdateData] = useState<IUpdatePassword>(updatePassword)
  const [showPasswordForm, setPasswordForm] = useState<boolean>(false)
  const [loading2, setLoading2] = useState(false)

  const formik2 = useFormik<IUpdatePassword>({
    initialValues: {
      ...passwordUpdateData,
    },
    validationSchema: passwordFormValidationSchema,
    onSubmit: async (values, {resetForm}) => {
      setLoading2(true)
      try {
        await axios
          .post(`api/user/change-password`, {
            newPassword: values.newPassword,
            confirmPassword: values.passwordConfirmation,
          })
          .then((response) => {
            const message = response.data.message
            toast.success(<p className='fs-4 fw-bold'>{message}</p>)
          })
          .catch((error) => {
            if (error.response && error.response.status === 422) {
              const validationErrors = error.response.data.errors
              Object.values(validationErrors).forEach((errorArray: unknown) => {
                if (Array.isArray(errorArray)) {
                  errorArray.forEach((errorMessage: string) => {
                    toast.error(<p className='fs-4 fw-bold'>{errorMessage}</p>)
                  })
                }
              })
            }
          })
        setLoading2(false)
        setPasswordForm(false)
        resetForm()
      } catch (error) {
        console.log(error)
        setLoading2(false)
        setPasswordForm(false)
      }
      setTimeout((values) => {
        setPasswordUpdateData(values)
        setLoading2(false)
        setPasswordForm(false)
      }, 1000)
    },
  })
  return (
    <div className='card mb-5 mb-xl-10'>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#kt_account_signin_method'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>تغیر رمز ورود</h3>
        </div>
      </div>

      <div id='kt_account_signin_method' className='collapse show'>
        <div className='card-body border-top p-9'>
          <div className='separator separator-dashed my-6'></div>

          <div className='d-flex flex-wrap align-items-center mb-10'>
            <div id='kt_signin_password' className={' ' + (showPasswordForm && 'd-none')}>
              <div className='fs-6 fw-bolder mb-1'>رمز ورود</div>
              <div className='fw-bold text-gray-600'>************</div>
            </div>

            <div
              id='kt_signin_password_edit'
              className={'flex-row-fluid ' + (!showPasswordForm && 'd-none')}
            >
              <form
                onSubmit={formik2.handleSubmit}
                id='kt_signin_change_password'
                className='form'
                noValidate
              >
                <div className='row mb-1 p-2' style={{backgroundColor: '#fafafa'}}>
                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='currentpassword' className='form-label fs-5 fw-bolder mb-3'>
                        رمز قبلی:
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-sm '
                        id='currentpassword'
                        {...formik2.getFieldProps('currentPassword')}
                      />
                      {formik2.touched.currentPassword && formik2.errors.currentPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block fs-5 fw-bolder text-danger'>
                            {formik2.errors.currentPassword}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='newpassword' className='form-label fs-5 fw-bolder mb-3'>
                        رمز جدید:
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-sm '
                        id='newpassword'
                        {...formik2.getFieldProps('newPassword')}
                      />
                      {formik2.touched.newPassword && formik2.errors.newPassword && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block fs-5 fw-bolder text-danger'>
                            {formik2.errors.newPassword}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className='col-lg-4'>
                    <div className='fv-row mb-0'>
                      <label htmlFor='confirmpassword' className='form-label fs-5 fw-bolder mb-3'>
                        تایید رمز جدید:
                      </label>
                      <input
                        type='password'
                        className='form-control form-control-sm '
                        id='confirmpassword'
                        {...formik2.getFieldProps('passwordConfirmation')}
                      />
                      {formik2.touched.passwordConfirmation && formik2.errors.passwordConfirmation && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block fs-5 fw-bolder text-danger'>
                            {formik2.errors.passwordConfirmation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='form-text mb-5'>
                  Password must be at least 8 character and contain symbols
                </div>

                <div className='d-flex'>
                  <button
                    id='kt_password_submit'
                    type='submit'
                    className='btn btn-primary btn-sm me-2 px-6 fw-bold'
                  >
                    {!loading2 && 'تغیر رمز'}
                    {loading2 && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        لطفآ منتظر باشید...
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setPasswordForm(false)
                    }}
                    id='kt_password_cancel'
                    type='button'
                    className='btn  btn-danger btn-sm px-6 fw-bold'
                  >
                    برگشت
                  </button>
                </div>
              </form>
            </div>

            <div
              id='kt_signin_password_button'
              className={'ms-auto ' + (showPasswordForm && 'd-none')}
            >
              <button
                onClick={() => {
                  setPasswordForm(true)
                }}
                className='btn btn-primary fw-bold btn-sm'
              >
                <i className='fas fa-edit'></i> تغیر رمز
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInMethod
