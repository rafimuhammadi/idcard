import {debounce} from 'lodash'
import {useEffect, useRef, useState, useCallback, useMemo} from 'react'
import Paginator from '../../../../../customes/Paginator'
import UnAuthorized from '../../../../../customes/UnAuthorized'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import Loader from '../../../../../pages/loading/Loader'
import {Link} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks'
import {getUser} from '../../../../../../redux/authentication/user/userManagementSlice'
import {userManagementType} from '../../../../../../redux/authentication/user/userService'
import {useTranslation} from 'react-i18next'

const SORT_ASC = 'asc'
const SORT_DESC = 'desc'

const DataTable: React.FC<any> = ({headers, columns}) => {
  const [data, setData] = useState<any>([])
  const [perPage, setPerPage] = useState<number>(10)
  const [sortColumn, setSortColumn] = useState<string>(columns[0])
  const [sortOrder, setSortOrder] = useState<string>(SORT_ASC)
  const [search, setSearch] = useState<string>('')
  const [searchByDepartment, setSearchByDepartment] = useState('')
  const [searchByEmail, setSearchByEmail] = useState('')
  const [searchByJob, setSearchByJob] = useState('')
  const [isAuthorized, setIsAuthorized] = useState<boolean>(true)
  const [pagination, setPagination] = useState<any>({})
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const {t} = useTranslation()
  const dispatch = useAppDispatch()

  const {user} = useAppSelector((state) => state.userManagement)
  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder((prevSortOrder) => (prevSortOrder === SORT_ASC ? SORT_DESC : SORT_ASC))
    } else {
      setSortColumn(column)
      setSortOrder(SORT_ASC)
    }
  }

  const handleSearch = useRef(
    debounce((query: string) => {
      setLoading(true)
      setSearch(query)
      setCurrentPage(1)
      setSortOrder(SORT_ASC)
      setSortColumn(columns[0])
    }, 500)
  ).current

  const handleSearchByDepartment = useRef(
    debounce((query: string) => {
      setLoading(true)
      setSearchByDepartment(query)
      setCurrentPage(1)
      setSortOrder(SORT_ASC)
      setSortColumn(columns[0])
    }, 500)
  ).current

  const handleSearchByEmail = useRef(
    debounce((query: string) => {
      setLoading(true)
      setSearchByEmail(query)
      setCurrentPage(1)
      setSortOrder(SORT_ASC)
      setSortColumn(columns[0])
    }, 500)
  ).current

  const handleSearchByJob = useRef(
    debounce((query: string) => {
      setLoading(true)
      setSearchByJob(query)
      setCurrentPage(1)
      setSortOrder(SORT_ASC)
      setSortColumn(columns[0])
    }, 500)
  ).current

  const handlePerPage = useCallback(
    (newPerPage: number) => {
      setLoading(true)

      setCurrentPage(1)
      setPerPage(newPerPage)
    },
    [setCurrentPage, setPerPage]
  )
  useEffect(() => {
    const params = {
      search,
      searchByDepartment,
      searchByEmail,
      searchByJob,
      sort_field: sortColumn,
      sort_order: sortOrder,
      per_page: perPage,
      page: currentPage,
    }

    dispatch(getUser(params)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setLoading(true)
      } else if (res.meta.requestStatus === 'rejected') {
        setIsAuthorized(false)
      }
      setLoading(false)
    })
  }, [
    dispatch,
    currentPage,
    perPage,
    search,
    searchByDepartment,
    searchByEmail,
    searchByJob,
    sortColumn,
    sortOrder,
  ])

  useEffect(() => {
    setData(user.data)
    setPagination(user.meta)
  }, [user])

  const memoizedData = useMemo(() => data, [data])
  const memoizedLoading = useMemo(() => loading, [loading])
  return (
    <div>
      {isAuthorized ? (
        <>
          <div className='form collapse' id='movementSearch'>
            <div className='row mb-3'>
              <div className='row mb-8 col-lg-12'>
                <div className='col-lg-3 col-md-3 col-sm-12'>
                  <input
                    type='search'
                    placeholder='جستجو به اساس نام...'
                    className='form-control form-control-sm'
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <div className='col-lg-3 col-md-3 col-sm-12'>
                  <input
                    type='search'
                    placeholder='جستجو به اساس دیپارتمنت...'
                    className='form-control form-control-sm'
                    onChange={(e) => handleSearchByDepartment(e.target.value)}
                  />
                </div>
                <div className='col-lg-3 col-md-3 col-sm-12'>
                  <input
                    type='search'
                    placeholder='جستجو به اساس ایمیل آدرس...'
                    className='form-control form-control-sm'
                    onChange={(e) => handleSearchByEmail(e.target.value)}
                  />
                </div>
                <div className='col-lg-3 col-md-3 col-sm-12'>
                  <input
                    type='search'
                    placeholder='جستجو به اساس وظیفه...'
                    className='form-control form-control-sm'
                    onChange={(e) => handleSearchByJob(e.target.value)}
                  />
                </div>
                <div className='col-lg-3 col-md-6 col-sm-12 mt-2'>
                  <div className='input-group'>
                    <label className='mt-2 me-2'>تعداد ریکارد صفحه</label>
                    <select
                      className='form-select form-select-sm'
                      value={perPage}
                      onChange={(e) => handlePerPage(Number(e.target.value))}
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
          </div>

          <div className='tableFixHead  table-responsive' dir='rtl'>
            <table className='table table-hover table table-striped gy-4 gs-5  gy-4 gs-4'>
              <thead className='bg-gray-500'>
                <tr>
                  {headers.map((header: any) => (
                    <th
                      key={header.headerName}
                      onClick={(e) => handleSort(header.sort)}
                      className='fs-6 fw-bold '
                    >
                      {header.headerName.toUpperCase().replace('_', ' ')}
                      {header.sort === sortColumn ? (
                        <span>
                          {sortOrder === SORT_ASC ? (
                            <i className='ms-1 fa fa-arrow-up text-white' aria-hidden='true'></i>
                          ) : (
                            <i className='ms-1 fa fa-arrow-down text-white' aria-hidden='true'></i>
                          )}
                        </span>
                      ) : null}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {!memoizedLoading &&
                  memoizedData.map((item: any, index: number) => (
                    <tr key={index} className='fs-5'>
                      <td className='fw-bolder'>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.department}</td>
                      <td>{item.job}</td>
                      <td>
                        {item.deleted_at === null ? (
                          <>
                            <span className='badge badge-success fs-6'>
                              <i className='fa-solid fa-user me-2 text-white'></i>
                              {t('global.active')}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className='badge badge-danger fs-6'>
                              <i className='fa-solid fa-user-slash me-2 text-white'></i>
                              {t('global.deactive')}
                            </span>
                          </>
                        )}
                      </td>
                      <td>{item.created_at}</td>

                      <td>
                        <DropdownButton
                          id='dropdown-item-button'
                          size='sm'
                          title={<i className='fas fa-ellipsis-v fw-bold fs-3'></i>}
                        >
                          <>
                            <Dropdown.Item as='button'>
                              <Link
                                to={'/authentication/view-user/' + item.id}
                                className='fw-bold text-primary'
                              >
                                <i className='fas fa-eye fs-5 text-primary me-2'></i>
                                {t('global.view', {name: t('global.user')})}
                              </Link>
                            </Dropdown.Item>

                            {item.deleted_at === null ? (
                              <>
                                <Dropdown.Item as='button'>
                                  <Link
                                    to={'/authentication/edit-user/' + item.id}
                                    className='fw-bold text-primary'
                                  >
                                    <i className='fas fa-edit fs-5 text-primary me-2'></i>
                                    {t('global.edit', {name: t('global.user')})}
                                  </Link>
                                </Dropdown.Item>
                              </>
                            ) : (
                              ''
                            )}
                          </>
                        </DropdownButton>
                      </td>
                    </tr>
                  ))}

                {memoizedData.length === 0 && !memoizedLoading && (
                  <tr>
                    <td colSpan={9}>
                      <p className='fs-2 text-center text-danger fw-bolder'>
                        {t('global.noRecordFound')}
                      </p>
                    </td>
                  </tr>
                )}
                {memoizedLoading && (
                  <tr>
                    <td colSpan={9}>
                      <Loader />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {!memoizedLoading && memoizedData.length > 0 && (
            <Paginator
              pagination={pagination}
              pageChanged={(page: number) => {
                setLoading(true)
                setCurrentPage(page)
              }}
              totalItems={data.length}
            />
          )}
        </>
      ) : (
        <UnAuthorized />
      )}
    </div>
  )
}

export default DataTable
