import LogDataTable from './LogDataTable'
const LogList = () => {
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>لاگ ورود به سیستم</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <LogDataTable
            fetchUrl='/system-logs/last-logins'
            headers={[
              {
                headerName: 'شماره مسلسل',
                sort: 'last_logins.id',
              },
              {
                headerName: 'نام و تخلص',
                sort: 'last_logins.first_name',
              },
              {
                headerName: 'آی پی آدرس',
                sort: 'last_logins.ip_address',
              },
              {
                headerName: 'بروزر',
                sort: 'last_logins.user_agent',
              },
              {
                headerName: ' سیستم عامل',
                sort: 'last_logins.user_operating_system',
              },
              {
                headerName: 'تاریخ و ساعت',
                sort: 'last_logins.last_date',
              },
            ]}
            columns={6}
          />
        </div>
      </div>
    </>
  )
}
//@ts-ignore
export default LogList
