/* eslint-disable jsx-a11y/anchor-is-valid */
import {Link} from 'react-router-dom'
import {useAuth} from '../../auth'
import {useTranslation} from 'react-i18next'

const Overview = () => {
  const {currentUser} = useAuth()
  const {t} = useTranslation()
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>{t('user.view-details')}</h3>
          </div>

          <Link
            to='/crafted/account/settings'
            className='btn btn-primary btn-sm align-self-center fw-bold'
          >
            <i className='fas fa-edit'></i> {t('user.setting')}
          </Link>
        </div>

        <div className='card-body p-9'>
          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-primary'>{t('user.name-and-surname')}</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.name}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-primary'>{t('user.department')}</label>

            <div className='col-lg-8 d-flex align-items-center'>
              <span className='fw-bolder fs-6 me-2'>{currentUser?.departmentName}</span>
            </div>
          </div>

          <div className='row mb-7'>
            <label className='col-lg-4 fw-bold text-primary'>{t('user.location')}</label>

            <div className='col-lg-8'>
              <span className='fw-bolder fs-6 text-dark'>{currentUser?.provinceName}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Overview
