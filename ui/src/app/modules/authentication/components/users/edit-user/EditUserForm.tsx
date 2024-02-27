import {Link} from 'react-router-dom'
import LoaderOverlay from '../../../../../pages/loading/LoaderOverlay'
import CustomeSelect from '../../../../../customes/CustomeSelect'
import userImage from '../../../../../../_metronic/assets/images/no_image.jpg'
import CustomSelectMultiple from '../../../../../customes/CustomSelectMultiple'
const EditUserForm = ({
  formik,
  systems,
  renderErrorMessage,
  t,
  loading,
  systemChangeHandler,
  roles,
  provinces,
  departmentsOptions,
  onSelectFile,
  filePreviews,
  fileTypes,
  role,
  userSystem,
  pageLoader,
}: any) => {
  return (
    <div className='card' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{t('global.add', {name: t('global.users')})}</h3>
        </div>
      </div>
      <div className='card-body p-0 m-0'>
        <form
          className='form w-100 '
          id='kt_login_signup_form'
          onSubmit={formik.handleSubmit}
          noValidate
          autoComplete='off'
        >
          <div className='card-body'>
            {/* begin::Form row */}
            <div className='row background-fa'>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('global.name')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder={t('global.name')}
                  {...formik.getFieldProps('name')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('name') ? `validation-error` : ''
                  }`}
                />
                {renderErrorMessage('name')}
              </div>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('global.username')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder={t('global.username')}
                  {...formik.getFieldProps('username')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('username') ? `validation-error` : ''
                  }`}
                />
                {renderErrorMessage('username')}
              </div>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('global.job')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <input
                  type='job'
                  name='name'
                  placeholder={t('global.job')}
                  {...formik.getFieldProps('job')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('job') ? `validation-error` : ''
                  }`}
                />
                {renderErrorMessage('job')}
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('global.department')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <input
                  type='department'
                  name='name'
                  placeholder={t('global.department')}
                  {...formik.getFieldProps('department')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('department') ? `validation-error` : ''
                  }`}
                />
                {renderErrorMessage('department')}
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('global.email')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <input
                  type='email'
                  name='name'
                  placeholder={t('global.email')}
                  {...formik.getFieldProps('email')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('email') ? `validation-error` : ''
                  }`}
                  style={{direction: 'rtl'}}
                />
                {renderErrorMessage('email')}
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12 mb-2'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('user.system')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <CustomSelectMultiple
                  name='system_id'
                  onChange={(systems: any) => {
                    formik.setFieldValue(
                      'system_id',
                      systems.map((item: any) => item.value)
                    )
                    systemChangeHandler(systems.map((item: any) => item.value))
                  }}
                  options={systems}
                  placeholder={t('global.select', {name: t('user.system')})}
                  defaultValues={userSystem}
                  className={renderErrorMessage('system_id') ? `validation-error-select` : ''}
                />
                {renderErrorMessage('system_id')}
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12 mb-2'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('user.role')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <CustomSelectMultiple
                  name='role_id'
                  className='input'
                  onChange={(roles: any) => {
                    formik.setFieldValue(
                      'roles',
                      roles.map((item: any) => item.value)
                    )
                  }}
                  defaultValues={role}
                  options={roles}
                />
                {renderErrorMessage('roles')}
              </div>

              <div className='col-lg-3 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>{t('global.password')}:</label>
                <input
                  type='password'
                  name='password'
                  placeholder={t('global.password')}
                  {...formik.getFieldProps('password')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('password') ? `validation-error` : ''
                  }`}
                  autoComplete='off'
                />
                {renderErrorMessage('password')}
              </div>
              <div className='col-lg-3 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('global.password_confirmation')}:
                </label>
                <input
                  type='password'
                  name='password_confirmation'
                  placeholder={t('global.password_confirmation')}
                  {...formik.getFieldProps('password_confirmation')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('password_confirmation') ? `validation-error` : ''
                  }`}
                  autoComplete='off'
                />
                {renderErrorMessage('password_confirmation')}
              </div>
            </div>

            <div className='row background-fa'>
              <div className='col-lg-6 col-md-6 col-sm-6'>
                <label className='col-form-label label fw-bold fs-5'>{t('global.image')}:</label>
                <br />
                <label>
                  <input
                    type='file'
                    onChange={(e) => onSelectFile(e, 'image')}
                    name='file'
                    hidden
                    accept='image/*'
                    alt={fileTypes}
                  />
                  <img
                    src={
                      filePreviews.length > 0 && fileTypes[0] === 'image'
                        ? filePreviews[0]
                        : userImage
                    }
                    className='img-fluid img-thumbnail image-view h-200px'
                    alt='user-profile'
                  />
                </label>
              </div>
            </div>

            <div className='row background-f5'>
              <div className='d-flex flex-stack flex-wrap pt-10'>
                <div className='fs-6 fw-bold text-gray-700 mb-5'>
                  <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-sm btn-primary fw-bold me-2'
                    disabled={formik.isSubmitting || loading}
                  >
                    {!loading && (
                      <span className='indicator-label'>
                        <i className='fa-solid fa-plus'></i>
                        <b> {t('global.save')}</b>
                      </span>
                    )}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        <b> {t('global.please-waite')}</b>
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>

                  <Link
                    className='btn btn-sm btn-flex btn-danger fw-bold'
                    to='/authentication/users'
                  >
                    <b>
                      <i className='fa-solid fa-reply-all'></i>
                      {t('global.back')}
                    </b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {pageLoader && <LoaderOverlay />}
    </div>
  )
}

export default EditUserForm
