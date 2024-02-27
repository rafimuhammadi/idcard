import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const CustomeHeader = (props: any) => {
  return (
    <div className='card-header cursor-pointer'>
      <div className='card-title m-0'>
        <h3 className='fw-bolder m-0'>{props.title}</h3>
      </div>
      <div className='d-flex align-items-center py-1'>
        <div className='me-4'>
          <a
            href='#'
            className='btn btn-sm btn-flex btn-light btn-active-primary fw-bolder'
            data-bs-toggle='collapse'
            data-bs-target='#kt_account_profile_details'
            aria-expanded='true'
            aria-controls='kt_account_profile_details'
          >
            <span className='svg-icon svg-icon-5 svg-icon-gray-500 me-1'>
              <i className='fa-solid fa-arrow-down-short-wide'></i>
            </span>
            جستجو
          </a>
        </div>
        {props.user.canAdd('directorate') ? (
          <Link className='btn btn-primary align-self-center' to={props.link}>
            {' '}
            <b>{props.buttonTitle}</b>
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
//@ts-ignore
export default connect((state) => ({user: state.user}))(CustomeHeader)
