import {useEffect} from 'react'
import {Outlet, useLocation} from 'react-router-dom'
import {ScrollTop} from './components/scroll-top'
import {Content} from './components/content'
import {PageDataProvider} from './core'
import {reInitMenu} from '../helpers'
import HeaderWrapper from './components/header/HeaderWrapper'

const MasterLayout = (props: any) => {
  const location = useLocation()

  useEffect(() => {
    reInitMenu()
  }, [location.key])
  return (
    <PageDataProvider>
      <div className='d-flex flex-column flex-root app-root' id='kt_app_root'>
        <div className='app-page flex-column flex-column-fluid' id='kt_app_page'>
          <HeaderWrapper />
          <div className='app-wrapper flex-column flex-row-fluid' id='kt_app_wrapper'>
            <div className='app-main flex-column flex-row-fluid' id='kt_app_main'>
              <div className='d-flex flex-column flex-column-fluid'>
                <Content>
                  <Outlet />
                </Content>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* begin:: Drawers */}
      <ScrollTop />
    </PageDataProvider>
  )
}

export default MasterLayout
