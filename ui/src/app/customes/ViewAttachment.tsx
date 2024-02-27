import axios from 'axios'
const ViewAttachment = ({data, formCode}: any) => {
  const downloadAtt = async (id = 0, file_name = '') => {
    try {
      axios({
        url: `movement/download-attachment/${id}/${formCode}`,
        method: 'GET',
        responseType: 'blob',
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', `${file_name}`)
        document.body.appendChild(link)
        link.click()
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <fieldset className='mt-5'>
      <legend className='fs-3'>
        <b>
          &nbsp;
          <i className={`fas fa-solid fa-paperclip text-primary fs-2 `}></i>&nbsp; نمایش ضمایم
        </b>
      </legend>
      {/* begin::Form row */}
      <div className='row mb-8 m-10'>
        <div className='col-lg-12'>
          <table className='table table-hover table table-striped gy-4 gs-5'>
            <thead className='table-dark'>
              <tr>
                <th>#</th>
                <th>نام ضمیمه</th>
                <th>دانلود</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <td colSpan={3}>
                    <p className='fs-2 text-red message-color'>ضمیه در سیستم موجود نمیباشد!</p>
                  </td>
                </tr>
              ) : (
                ''
              )}
              {data.map((d: any, i: number) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{d.file_name}</td>
                    <td>
                      <button
                        className='btn btn-primary btn-sm'
                        onClick={() => downloadAtt(d.id, d.file_name)}
                      >
                        <i className='fas fa-download fs-2'></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </fieldset>
  )
}
export default ViewAttachment
