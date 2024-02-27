import clsx from 'clsx'
import {KTSVG} from '../../../helpers'
import {useLayout} from '../../core'
import HeaderUserMenu from '../../../partials/layout/header-menus/HeaderUserMenu'
import Language from '../../../partials/layout/theme-mode/Language'
import {useAppSelector} from '../../../../redux/hooks'
import {useAuth} from '../../../../app/modules/auth'
const itemClass = 'ms-1 ms-lg-3'
const userAvatarClass = 'symbol-35px symbol-md-40px'
const btnIconClass = 'svg-icon-1'
const Navbar = () => {
  const {config} = useLayout()
  const {currentUser} = useAuth()

  return (
    <div className='app-navbar flex-shrink-0'>
      <div className={clsx('app-navbar-item', itemClass)}>
        <Language toggleBtnClass={clsx('btn-sm btn-custom')} />
      </div>

      <div className={clsx('app-navbar-item', itemClass)}>
        <div
          className={clsx('cursor-pointer symbol', userAvatarClass)}
          data-kt-menu-trigger="{default: 'click'}"
          data-kt-menu-attach='parent'
          // data-kt-menu-placement='bottom-end'
          data-kt-menu-placement='bottom-start'
        >
          <p className='text-white mt-4 fw-bold fs-4'>{currentUser?.name}</p>
        </div>
        <HeaderUserMenu />
      </div>

      {config.app?.header?.default?.menu?.display && (
        <div className='app-navbar-item d-lg-none ms-2 me-n3' title='Show header menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-35px h-35px'
            id='kt_app_header_menu_toggle'
          >
            <KTSVG path='/media/icons/duotune/text/txt001.svg' className={btnIconClass} />
          </div>
        </div>
      )}
    </div>
  )
}
export default Navbar
