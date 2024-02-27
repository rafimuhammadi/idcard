import React from 'react'
import {useTranslation} from 'react-i18next'

const CustomePagination = (props: any) => {
  const {t} = useTranslation()

  const next = async () => {
    if (props.page === props.last_page) {
      return
    }
    props.onsetPage(props.page++)
    props.function(props.page++)
  }
  const prevoius = async () => {
    var pageDecrease = props.page - 1
    if (pageDecrease === 0) {
      return
    }
    props.onsetPage(pageDecrease)
    await props.function(pageDecrease)
  }
  return (
    <div className='d-flex flex-stack flex-wrap pt-10'>
      <div className='fs-6 fw-bold text-gray-700'>
        <span className='pagination-total pagination__desc'>
          {t('global.PAGINATIONTOTALRECORD')}
          <span>
            <b>{props.length}</b>
          </span>
          &nbsp; {t('global.PAGINATIONFROM')}
          <span>
            <b>{props.total}</b>&nbsp;&nbsp;
          </span>
          {t('global.PAGINATIONPAGE')}
          <span>
            <b>{props.page}</b>
          </span>
        </span>
      </div>
      <ul className='pagination'>
        <li className='page-item previous'>
          <a href='#' className='page-link' onClick={() => prevoius()}>
            <i className='fa fa-angle-double-right'></i>
          </a>
        </li>
        {props.links.map((link: any) => {
          return (
            <li className='page-item ' key={link.label}>
              <a
                className={link.label == props.page ? 'page-link active disabled' : 'page-link '}
                onClick={() => props.function(link.label)}
              >
                {link.label}
              </a>
            </li>
          )
        })}
        <li className='page-item next'>
          <a className='page-link' onClick={() => props.next()}>
            <i className='fa fa-angle-double-left'></i>
          </a>
        </li>
      </ul>
    </div>
  )
}
export default CustomePagination
