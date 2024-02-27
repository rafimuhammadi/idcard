import {useTranslation} from 'react-i18next'

const RecordOwnerView = (props: any) => {
  const {t} = useTranslation()
  return (
    <div className='row background-f5 p-1'>
      <fieldset className='m-0 p-0 fieldSetBorder'>
        <legend className='fs-3 text-primary'>
          <b>
            &nbsp;
            <i className={` text-primary fs-2 ${props.icon} ms-1`}></i> {props.title}
          </b>
        </legend>
        {/* begin::Form row */}
        <div className='row m-1'>
          <div className='col-lg-12 row'>
            <div className='col-lg-3 col-md-3 col-sm-6'>
              <label className='col-form-label label fs-4 fw-bold me-2'>
                <i className='fa fa-user fs-4 text-primary me-1'></i> {t('global.departmentName')}:
              </label>
              <span className='label fs-4'>{props.departmentName}</span>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6'>
              <label className='col-form-label label fs-4 fw-bold me-2'>
                <i className='fa  fa-archway fs-4 fw-bold text-primary me-1'></i>
                {t('global.recordLocation')}:
              </label>
              <span className='fs-4'>{props.province}</span>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6'>
              <label className='col-form-label label fs-4 fw-bold me-2'>
                <i className='fa fa-user text-primary fs-4 me-1'></i>
                {t('global.recordOwner')}:
              </label>
              <span className='fs-4'>{props.ownerName}</span>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-6'>
              <label className='col-form-label label fs-4 fw-bold me-2'>
                <i className='fa 	fa-calendar-alt fs-4 text-primary'></i>&nbsp; {t('global.regDate')}
                :
              </label>
              <span className='fs-4'>{props.created_at}</span>
            </div>
          </div>
        </div>
        {/* end::Form row */}
      </fieldset>
    </div>
  )
}
export default RecordOwnerView
