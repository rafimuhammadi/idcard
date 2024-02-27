import {Link} from 'react-router-dom'
import CustomeSelect from '../../../../../customes/CustomeSelect'
import LoaderOverlay from '../../../../../pages/loading/LoaderOverlay'
type CheckboxChangeEvent = React.ChangeEvent<HTMLInputElement>

const AddRolesForm = ({
  formik,
  systems,
  renderErrorMessage,
  t,
  loading,
  systemChangeHandler,
  permissions,
  handleSelectAll,
  handleCheckboxChange,
  selectedCheckboxes,
  pageLoader,
}: any) => {
  return (
    <div className='card' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>ثبت صلاحیت جدید</h3>
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
              <div className='col-lg-4 col-md-4 col-sm-12'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('user.roleName')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <input
                  type='text'
                  name='name'
                  placeholder={t('user.roleName')}
                  {...formik.getFieldProps('name')}
                  className={`form-control form-control-sm ${
                    renderErrorMessage('name') ? `validation-error` : ''
                  }`}
                />
                {renderErrorMessage('name')}
              </div>
              <div className='col-lg-4 col-md-4 col-sm-12 mb-2'>
                <label className='col-form-label label fw-bold fs-5'>
                  {t('user.system')}:
                  <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                </label>
                <CustomeSelect
                  name='system_id'
                  onChange={systemChangeHandler}
                  options={systems}
                  placeholder={t('global.select', {name: t('user.system')})}
                  className={renderErrorMessage('system_id') ? `validation-error-select` : ''}
                />
                {renderErrorMessage('system_id')}
              </div>
            </div>

            <div className='row background-fa'>
              {permissions.length > 0 && (
                <div className='col-lg-12'>
                  <label className='col-form-label label fw-bold fs-5'>
                    {t('user.rolePermission')}:
                    <i className='fa-solid fa-star-of-life text-danger align-text-top fs-9'></i>
                  </label>
                  <br />
                  <label className='col-form-label label fw-bold fs-5'>
                    {t('global.selectAll')}:
                    <input
                      className='form-check-input me-3'
                      type='checkbox'
                      onChange={handleSelectAll}
                      checked={selectedCheckboxes.length === permissions.length}
                    />
                  </label>
                  <br />
                  {permissions.map((p: any) => {
                    return (
                      <div
                        className='form-check form-check-inline col-lg-3 col-md-3 col-sm-6'
                        key={p.id}
                      >
                        <label className='form-check form-check-inline form-check-solid me-5'>
                          <input
                            {...formik.getFieldProps('permissionId')}
                            type='checkbox'
                            className='form-check-input me-3'
                            id={p.id}
                            checked={selectedCheckboxes.includes(p.id)}
                            onChange={(event: CheckboxChangeEvent) =>
                              handleCheckboxChange(event, p.id)
                            }
                          />
                          <span className='fw-bold ps-2 fs-6'>{p.name}</span>
                        </label>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            <div className='row background-f5'>
              <div className='d-flex flex-stack flex-wrap pt-10'>
                <div className='fs-6 fw-bold text-gray-700 mb-5'>
                  <button
                    type='submit'
                    id='kt_sign_in_submit'
                    className='btn btn-sm btn-primary fw-bold me-2'
                    disabled={
                      formik.isSubmitting ||
                      !formik.isValid ||
                      loading ||
                      selectedCheckboxes.length <= 1
                    }
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
                    to='/authentication/roles'
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

export default AddRolesForm
