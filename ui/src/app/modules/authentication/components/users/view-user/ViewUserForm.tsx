import {Link} from 'react-router-dom'
import userImage from '../../../../../../_metronic/assets/images/no_image.jpg'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {useState} from 'react'
import PasswordChangeModal from '../PasswordChangeModal'
import CustomModal from '../../../../../customes/CustomModal'
const ViewUserForm = ({t, userData, changeUserStatus, id, printCard}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const content = <PasswordChangeModal onClose={closeModal} id={id} />
  const status = userData.record.deleted_at === null ? 1 : 2

  return (
    <div className='card' id='kt_profile_details_view'>
      <div className='card-header cursor-pointer'>
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>{t('global.add', {name: t('global.users')})}</h3>
        </div>
        <div>
          <div className='d-none d-lg-flex mt-5'>
            <div className='d-flex align-items-center'>
              <button
                className='btn btn-sm btn-flex btn-primary fw-bolder me-2'
                onClick={printCard}
              >
                <i className='fa-solid fa-print'></i>
                {t('global.print')}
              </button>

              <button
                className='btn btn-sm btn-flex btn-primary fw-bolder me-2'
                onClick={changeUserStatus}
              >
                {status === 1 ? (
                  <>
                    <i className='fa-solid fa-user-slash'></i>
                    {t('global.deactive')}
                  </>
                ) : (
                  <>
                    <i className='fa-solid fa-lock-open'></i>
                    {t('global.active')}
                  </>
                )}
              </button>

              <button
                className='btn btn-sm btn-flex btn-primary fw-bolder me-2'
                onClick={openModal}
              >
                <i className='fa-solid fa-key'></i>

                {t('global.change')}
              </button>

              <Link className='btn btn-sm btn-flex btn-danger fw-bold' to='/authentication/users'>
                <b>
                  <i className='fa-solid fa-reply-all'></i>
                </b>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='card-body p-0 m-0'>
        <div className='card-body'>
          {/* begin::Form row */}
          <div className='row background-fa'>
            <div className='col-lg-3 col-md-4 col-sm-12'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('global.name')}:
              </label>
              <div className='fs-4 m-0 p-0'>{userData.record.name}</div>
            </div>
            <div className='col-lg-3 col-md-4 col-sm-12'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('global.username')}:
              </label>
              <div className='fs-4 m-0 p-0'>{userData.record.username}</div>
            </div>

            <div className='col-lg-3 col-md-4 col-sm-12'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('global.email')}:
              </label>
              <div className='fs-4 m-0 p-0'>{userData.record.email}</div>
            </div>

            <div className='col-lg-3 col-md-4 col-sm-12 mb-2'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('global.status')}:
              </label>
              <div className='fs-4 m-0 p-0'>
                {userData.record.deleted_at === null ? (
                  <>
                    <span className='badge badge-success fs-5'>
                      <i className='fa-solid fa-user me-2 text-white'></i>
                      {t('global.active')}
                    </span>
                  </>
                ) : (
                  <>
                    <span className='badge badge-danger fs-5'>
                      <i className='fa-solid fa-user-slash me-2 text-white'></i>
                      {t('global.deactive')}
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className='col-lg-3 col-md-4 col-sm-12 mb-2'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('user.system')}:
              </label>
              <div className='fs-4 m-0 p-0'>
                {userData.userSystem.map((item: any, i: number) => {
                  return (
                    <span className='badge badge-primary me-2 fs-5' key={i}>
                      {item.name}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className='col-lg-3 col-md-4 col-sm-12 mb-2'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('user.role')}:
              </label>
              <div className='fs-4 m-0 p-0'>
                {userData.role.map((item: any, i: number) => {
                  return (
                    <span className='badge badge-primary fs-5 me-2' key={i}>
                      {item.name}
                    </span>
                  )
                })}
              </div>
            </div>

            <div className='col-lg-3 col-md-4 col-sm-12 mb-2'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('global.job')}:
              </label>
              <div className='fs-4 m-0 p-0'>{userData.record.job}</div>
            </div>

            <div className='col-lg-3 col-md-4 col-sm-12 mb-2'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('global.department')}:
              </label>
              <div className='fs-4 m-0 p-0'>{userData.record.department}</div>
            </div>
          </div>

          <div className='row background-fa'>
            <div className='col-lg-6 col-md-6 col-sm-6'>
              <label className='col-form-label label fw-bold fs-5 m-0 p-0 pt-2'>
                {t('global.image')}:
              </label>
              <br />
              <img
                src={
                  userData.record.image !== ''
                    ? process.env.REACT_APP_API_URL + 'storage/' + userData.record.image
                    : userImage
                }
                className='img-fluid img-thumbnail image-view h-200px'
                alt='user-profile'
              />
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        modalContent={content}
        show={isModalOpen}
        onClose={closeModal}
        modalSize='lg'
        modalTile='تجدید رمز'
      />
    </div>
  )
}

export default ViewUserForm
