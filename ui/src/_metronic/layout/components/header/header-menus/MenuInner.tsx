import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useTranslation} from 'react-i18next'
import {useAuth} from '../../../../../app/modules/auth'

export function MenuInner() {
  const {t} = useTranslation()
  const {hasPermission} = useAuth()
  return (
    <>
      <MenuItem title={t('global.dashboard')} to='/dashboard' />

      {hasPermission('create_card') && (
        <MenuInnerWithSub
          title={t('global.SYSTEMANAGEMENT')}
          to='/authentication/directorates'
          menuPlacement='bottom-end'
          menuTrigger='click'
          hasArrow={true}
          fontIcon='fas fa-cogs'
        >
          <MenuItem
            to='/authentication/users'
            title={t('global.users')}
            fontIcon='fas fa-users text-white'
            hasBullet={false}
          />

          <MenuItem
            to='/authentication/roles'
            title={t('user.roles')}
            fontIcon='fas fa-sitemap text-white'
            hasBullet={false}
          />
        </MenuInnerWithSub>
      )}
    </>
  )
}
