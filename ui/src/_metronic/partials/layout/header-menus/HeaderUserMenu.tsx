/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {toAbsoluteUrl} from '../../../helpers'
import {useTranslation} from 'react-i18next'

const HeaderUserMenu: FC = () => {
  const {logout, currentUser} = useAuth()
  const {t} = useTranslation()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            <img
              alt='Logo'
              src={currentUser?.image !== '' ? '' : toAbsoluteUrl('/media/images/user_male.png')}
            />
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.name}
              <span className='badge badge-light-success fw-bolder fs-8 px-2 py-1 ms-2'>Pro</span>
            </div>
            <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>
      <div className='menu-item px-5 my-1'>
        <Link to='/crafted/account/overview' className='menu-link px-5'>
          <i className='fas fa-user-cog text-primary fs-3'></i> &nbsp;
          {t('user.setting')}
        </Link>
      </div>
      <div className='separator my-2'></div>

      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          <i className='fas fs-2 fa-sign-out-alt text-danger'></i>&nbsp;
          {t('user.sign-out')}
        </a>
      </div>
    </div>
  )
}
export default HeaderUserMenu
