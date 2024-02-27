import {createRoot} from 'react-dom/client'
// Axios
import axios from 'axios'
import {QueryClient, QueryClientProvider} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
// Apps
import {MetronicI18nProvider} from './_metronic/i18n/Metronici18n'
/**
 * TIP: Replace this style import with rtl styles to enable rtl mode
 *
 **/
import './_metronic/assets/css/style.rtl.css'
import './_metronic/assets/css/font/font.css'
// import './_metronic/assets/sass/style.scss'
// import './_metronic/assets/sass/plugins.scss'
import './_metronic/assets/sass/style.react.scss'
import {AppRoutes} from './app/routing/AppRoutes'
import 'react-toastify/dist/ReactToastify.css'
import {AuthProvider, setupAxios} from './app/modules/auth'
import {Provider} from 'react-redux'
import {ToastContainer} from 'react-toastify'
import {store} from './redux/store'
import {I18nProvider} from './_metronic/i18n/i18nProvider'
import {I18nextProvider} from 'react-i18next'
import i18n from './i18n'
axios.defaults.baseURL = process.env.REACT_APP_API_URL

setupAxios(axios)
const queryClient = new QueryClient()
const container = document.getElementById('root')
if (container) {
  createRoot(container).render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </I18nextProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </Provider>
    // </Prvider>
  )
}
