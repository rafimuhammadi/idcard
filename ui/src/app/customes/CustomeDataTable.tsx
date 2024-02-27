import axios from 'axios'
import {debounce} from 'lodash'
import React, {useEffect, useRef, useState} from 'react'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {KTSVG} from '../../_metronic/helpers'
import Paginator from './Paginator'
const SORT_ASC = 'asc'
const SORT_DESC = 'desc'
const CustomeDataTable = ({columns, fetchUrl, headers, inputsOne}: any) => {
  const [data, setData] = useState([])
  const [perPage, setPerPage] = useState(10)
  const [sortColumn, setSortColumn] = useState(columns[0])
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')
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
      setSortColumn(columns[0])
    }, 500)
  ).current
  console.log(columns[6])
  const handlePerPage = (perPage: any) => {
    setCurrentPage(1)
    setPerPage(perPage)
  }
  const action = {}
  const BasicButtons = () => {
    return (
      <>
        <Button variant='text'>Text</Button>
      </>
    )
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
      const {data} = await axios(fetchUrl, {params})
      setData(data.data)
      setPagination(data.meta)
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }

    fetchData()
  }, [perPage, sortColumn, sortOrder, search, currentPage])

  return (
    <div>
      {/* Search per page starts */}
      <div className='row mb-3'>
        <div className='col-md-3'>
          <div className='input-group'>
            <input
              className='form-control'
              placeholder='جستجو...'
              type='search'
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className='col-md-2'>
          <div className='input-group'>
            <label className='mt-2 me-2'>Per page</label>
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
      {/* Search per page ends  */}
      <div className='tableFixHead' dir='rtl'>
        <table className='table table-hover table table-striped gy-4 gs-5'>
          <thead className='table-dark'>
            <tr>
              {headers.map((header: any) => {
                return (
                  <th key={header} onClick={(e) => handleSort(header)}>
                    {header.toUpperCase().replace('_', ' ')}
                    {header === sortColumn ? (
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
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>No items found</td>
              </tr>
            ) : (
              ''
            )}

            {!loading ? (
              data.map((d: any, index) => {
                return (
                  <tr key={index}>
                    <td>{d.id}</td>
                    <td>{d.name_fa}</td>
                    <td>{d.name_pa}</td>
                    <td>{d.name_en}</td>
                    <td>{d.directorateName}</td>
                    <td>{d.departmentCode}</td>
                    <td>{d.created_at}</td>
                    <td>
                      <a
                        href='#'
                        className='btn btn-light btn-active-primary btn-sm'
                        data-kt-menu-trigger='hover'
                        data-kt-menu-placement='bottom-end'
                      >
                        عمل
                        <KTSVG
                          path='/media/icons/duotune/arrows/arr072.svg'
                          className='svg-icon-5 m-0'
                        />
                      </a>
                      <div
                        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-bold fs-7 w-125px py-4'
                        data-kt-menu='true'
                      >
                        {/* {props.user.canEdit('directorate') ? ( */}
                        <div className='menu-item px-3'>
                          <Link className='menu-link px-3' to={`${d.id}/edit-department`}>
                            <i className='fas fa-edit px-2'></i>تجدید کردن
                          </Link>
                        </div>
                        <div className='menu-item px-3'>
                          <a
                            className='menu-link px-3'
                            data-kt-users-table-filter='delete_row'
                            // onClick={() => deleteDirectorate(name.id)}
                          >
                            <i className='fas fa-trash px-2'></i>حذف کردن
                          </a>
                        </div>
                        {/* ) : (
                          ''
                        )}
                        {props.user.canEdit('department') ? (
                          <div className='menu-item px-3'>
                            <a
                              className='menu-link px-3'
                              data-kt-users-table-filter='delete_row'
                              // onClick={() => deleteDirectorate(name.id)}
                            >
                              <i className='fas fa-trash px-2'></i>حذف کردن
                            </a>
                          </div>
                        ) : (
                          ''
                        )} */}
                      </div>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={columns.length + 1}>
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
    </div>
  )
}

export default CustomeDataTable
