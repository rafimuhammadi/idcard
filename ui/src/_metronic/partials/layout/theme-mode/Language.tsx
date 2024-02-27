import clsx from 'clsx'
import {toAbsoluteUrl} from '../../../helpers'
import {setLanguage, useLang} from '../../../i18n/Metronici18n'
import {useTranslation} from 'react-i18next'

/* eslint-disable jsx-a11y/anchor-is-valid */
type Props = {
  toggleBtnClass?: string
  toggleBtnIconClass?: string
  menuPlacement?: string
  menuTrigger?: string
}

const Language = ({
  toggleBtnClass = '',
  menuPlacement = 'bottom-end',
  menuTrigger = "{default: 'click', lg: 'hover'}",
}: Props) => {
  // const languages = [
  //   {
  //     lang: 'da',
  //     name: 'دری',
  //     flag: toAbsoluteUrl('/media/images/emirate-flag.png'),
  //   },
  //   {
  //     lang: 'pa',
  //     name: 'پشتو',
  //     flag: toAbsoluteUrl('/media/images/emirate-flag.png'),
  //   },
  // ]
  // const lang = useLang()

  const languages = [
    {
      lang: 'da',
      name: 'دری',
      flag: toAbsoluteUrl('/media/images/emirate-flag.png'),
    },
    {
      lang: 'pa',
      name: 'پشتو',
      flag: toAbsoluteUrl('/media/images/emirate-flag.png'),
    },
    // {
    //   lang: 'en',
    //   name: 'انگلیسی',
    //   flag: toAbsoluteUrl('/media/flags/united-states.svg'),
    // },
  ]

  const {i18n} = useTranslation()

  const handleChangeLanguage = (lang: any) => {
    i18n.changeLanguage(lang)
    console.log(lang)
  }

  const currentLanguage = languages.find((x) => x.lang === i18n.language)

  return (
    <>
      {/* begin::Menu toggle */}
      <a
        href='#'
        className={clsx('btn btn-icon ', toggleBtnClass)}
        data-kt-menu-trigger={menuTrigger}
        data-kt-menu-attach='parent'
        data-kt-menu-placement={menuPlacement}
      >
        <span className='menu-title position-relative'>
          <span className='fs-8 rounded px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
            <div className='d-flex align-items-center fs-6 fw-bold'>
              {currentLanguage?.name}
              <img
                className='w-20px h-20px rounded-1 ms-2'
                src={currentLanguage?.flag}
                alt='metronic'
              />
            </div>
          </span>
        </span>
      </a>

      {/* begin::Menu toggle */}

      {/* begin::Menu */}
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-primary fw-semibold py-4 fs-base w-175px'
        data-kt-menu='true'
      >
        {languages.map((l) => (
          <div
            className='menu-item px-3 my-0'
            key={l.lang}
            onClick={() => {
              handleChangeLanguage(l.lang)
            }}
          >
            <a
              href='#'
              className={clsx('menu-link d-flex px-5', {active: l.lang === currentLanguage?.lang})}
            >
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={l.flag} alt='metronic' />
              </span>
              {l.name}
            </a>
          </div>
        ))}
        {/* end::Menu item */}
      </div>
      {/* end::Menu */}
    </>
  )
}

export default Language
