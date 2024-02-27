import {Link} from 'react-router-dom'
import unAuthorizedImage from '../../../src/_metronic/assets/images/restricted.jpg'
import {useTranslation} from 'react-i18next'
const UnAuthorized = () => {
  const {t} = useTranslation()
  return (
    <div className='text-center'>
      <div className='me-7 mb-4'>
        <div className='symbol symbol-100px symbol-lg-200px symbol-fixed position-relative'>
          <img src={unAuthorizedImage} alt='Metronic' />
        </div>
      </div>
      <div className='mb-lg-8 alert alert-danger'>
        <div className='alert-text font-weight-bolder fs-1'>{t('global.UNAUTHTITLE')}</div>
        <div className='alert-text font-weight-bolder fs-1'>{t('global.UNAUTHTEXT')}</div>
        <div className='alert-text font-weight-bolder fs-1'>
          <Link to={'/'}>{t('global.UNAUTHBACK')}</Link>
        </div>
      </div>
    </div>
  )
}
export default UnAuthorized
