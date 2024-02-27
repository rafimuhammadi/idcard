import ActivityLogDataTable from './ActivityLogDataTable'
const ActivityLogList = () => {
  return (
    <>
      <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>لاگ ورود به سیستم</h3>
          </div>
        </div>
        <div className='card-body p-9'>
          <ActivityLogDataTable
            fetchUrl='/system-logs/activity-logs'
            headers={[
              {
                headerName: 'شماره مسلسل',
                sort: 'activities_logs.id',
              },
              {
                headerName: 'نام و تخلص',
                sort: 'users.first_name',
              },
              {
                headerName: 'بخش',
                sort: 'activities_logs.section',
              },
              {
                headerName: 'نوعیت کار',
                sort: 'activities_logs.action_type',
              },
              {
                headerName: 'آی  دی نمبر ریکارد',
                sort: 'activities_logs.record_id',
              },
              {
                headerName: 'تاریخ و ساعت',
                sort: 'activities_logs.action_date',
              },
            ]}
            columns={7}
          />
        </div>
      </div>
    </>
  )
}
//@ts-ignore
export default ActivityLogList
