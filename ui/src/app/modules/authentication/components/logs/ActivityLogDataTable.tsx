import axios from 'axios'
import {debounce} from 'lodash'
import {useEffect, useRef, useState} from 'react'
import Paginator from '../../../../customes/Paginator'
import UnAuthorized from '../../../../customes/UnAuthorized'
const SORT_ASC = 'asc'
const SORT_DESC = 'desc'
const ActivityLogDataTable = (props: any) => {
  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState(props.columns[0])
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
  const [isAutorized, setIsAuthorized] = useState(true)
  const [pagination, setPagination] = useState({})
  const [currentPage, setCurrentPage] = useState(1)

  const [loading, setLoading] = useState(true)

  const handleSort = (column: any) => {
    if (column === sortColumn) {
      sortOrder === SORT_ASC ? setSortOrder(SORT_DESC) : setSortOrder(SORT_ASC)
    } else {
      setSortColumn(column)
      setSortOrder(SORT_ASC)
    }
  }

  const handleSearch = useRef(
    debounce((query) => {
      setSearch(query)
      setCurrentPage(1)
      setSortOrder(SORT_ASC)
      setSortColumn(props.columns[0])
    }, 500)
  ).current
  const handlePerPage = (perPage: any) => {
    setCurrentPage(1)
    setPerPage(perPage)
  }
  const loaderStyle = {width: '4rem', height: '4rem'}
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const params = {
        search,
        sort_field: sortColumn,
        sort_order: sortOrder,
        per_page: perPage,
        page: currentPage,
      }
      try {
        const {data} = await axios(props.fetchUrl, {params})
        setData(data.data)
        setPagination(data.meta)
      } catch (error) {
        console.log(error)
        setIsAuthorized(false)
      }
      setTimeout(() => {
        setLoading(false)
      }, 100)
    }
    fetchData()
  }, [props.fetchUrl, perPage, sortColumn, sortOrder, search, currentPage])
  return (
    <div>
      {isAutorized && (
        <>
          {/* Search per page starts */}
          <div className='row mb-3'>
            <div className='row mb-8'>
              <div className='col-lg-3'>
                <input
                  type='search'
                  placeholder='جستجو به اساس نام و تخلص...'
                  className={'form-control'}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className='col-md-3'>
                <div className='input-group'>
                  <label className='mt-2 me-2'>تعداد ریکارد صفحه</label>
                  <select
                    className='form-select'
                    value={perPage}
                    onChange={(e) => handlePerPage(e.target.value)}
                  >
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='20'>20</option>
                    <option value='50'>50</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* Search per page ends  */}
          <div className='tableFixHead' dir='rtl'>
            <table className='table table-hover table table-striped gy-4 gs-5'>
              <thead className='table-dark'>
                <tr>
                  {props.headers.map((header: any) => {
                    return (
                      <th key={header.headerName} onClick={(e) => handleSort(header.sort)}>
                        {header.headerName.toUpperCase().replace('_', ' ')}
                        {header.sort === sortColumn ? (
                          <span>
                            {sortOrder === SORT_ASC ? (
                              <i className='ms-1 fa fa-arrow-up' aria-hidden='true'></i>
                            ) : (
                              <i className='ms-1 fa fa-arrow-down' aria-hidden='true'></i>
                            )}
                          </span>
                        ) : null}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={6}>
                      <p className='fs-2 text-red message-color'>ریکارد در سیستم موجود نمیباشد!</p>
                    </td>
                  </tr>
                ) : (
                  ''
                )}

                {!loading ? (
                  data.map((d: any, index) => {
                    return (
                      <tr key={index}>
                        <td>{d.id}</td>
                        <td>
                          {d.first_name} {d.last_name}
                        </td>
                        <td>{d.section}</td>
                        <td>{d.action_type}</td>
                        <td>{d.record_id}</td>
                        <td>{d.action_date + ' ' + d.action_time}</td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className='d-flex justify-content-center'>
                        <div className='spinner-border' style={loaderStyle} role='status'>
                          <span className='sr-only'>Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {data.length > 0 && !loading ? (
            <div className='mt-2'>
              <Paginator
                pagination={pagination}
                pageChanged={(page: number) => setCurrentPage(page)}
                totalItems={data.length}
              />
            </div>
          ) : null}
        </>
      )}
      {!isAutorized && <UnAuthorized />}
    </div>
  )
}
//@ts-ignore
export default ActivityLogDataTable
