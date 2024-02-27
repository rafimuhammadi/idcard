const RecordOwner = (props: any) => {
  return (
    <fieldset className='m-3'>
      <legend className='fs-3'>
        <b>
          &nbsp;
          <i className={` text-primary fs-2 ${props.icon}`}></i>&nbsp; {props.title}
        </b>
      </legend>
      {/* begin::Form row */}
      <div className='row m-1'>
        <div className='col-lg-12 row'>
          <div className='col-lg-2'>
            <label className='col-form-label label'>
              <i className='fa fa-user fs-4'></i>&nbsp;مسول ثبت ریکارد:
            </label>
            <br />
            <span>{props.first_name}</span>
          </div>
          <div className='col-lg-3'>
            <label className='col-form-label label'>
              <i className='fas fa-home fs-4'></i> &nbsp;ریاست ثبت ریکارد:
            </label>
            <br />
            <span>{props.directorateName}</span>
          </div>
          <div className='col-lg-2'>
            <label className='col-form-label label'>
              <i className='fa fa-map-marker-alt fs-4'></i>&nbsp;زون:
            </label>
            <br />
            <span>{props.zoneName}</span>
          </div>
          <div className='col-lg-3'>
            <label className='col-form-label label'>
              <i className='fa fa-archway fs-4'></i>
              &nbsp;مدیریت ثبت ریکارد:
            </label>
            <br />
            <span>{props.departmentName}</span>
          </div>
          <div className='col-lg-2'>
            <label className='col-form-label label'>
              <i className='fa 	fa-calendar-alt fs-4'></i>&nbsp; تاریخ و وقت ثبت:
            </label>
            <br />
            <span>{props.regDate}</span>
          </div>
        </div>
      </div>
      {/* end::Form row */}
    </fieldset>
  )
}
export default RecordOwner
