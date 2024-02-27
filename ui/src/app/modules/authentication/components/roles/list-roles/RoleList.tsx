import {Fragment} from 'react'
import {Link} from 'react-router-dom'
import DataTable from './DataTable'
import {Dropdown, DropdownButton} from 'react-bootstrap'
import {useTranslation} from 'react-i18next'

const RoleList = () => {
  const {t} = useTranslation()
  return (
    <>
      <Fragment>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>{t('global.list', {name: t('user.roles')})}</h3>
            </div>
            <div>
              <div className='d-none d-lg-flex mt-5'>
                <div className='d-flex align-items-center'>
                  <Link
                    className='btn btn-sm btn-flex btn-primary fw-bolder'
                    to={'/authentication/create-role'}
                  >
                    <i className='fa-solid fa-plus'></i>

                    {t('global.add', {name: t('user.role')})}
                  </Link>

                  <div className='me-2 ms-2'>
                    <button
                      className='btn btn-sm btn-flex btn-primary fw-bolder'
                      data-bs-toggle='collapse'
                      data-bs-target='#movementSearch'
                      aria-expanded='true'
                      aria-controls='movementSearch'
                    >
                      <span className='svg-icon svg-icon-5 svg-icon-gray-500 me-1'>
                        <i className='fa-solid fa-arrow-down-short-wide'></i>
                      </span>
                      جستجو
                    </button>
                  </div>

                  <Link className='btn btn-sm btn-flex btn-danger fw-bold' to='/dashboard'>
                    <b>
                      <i className='fa-solid fa-reply-all'></i>
                    </b>
                  </Link>
                </div>
              </div>

              <div className='dropdown d-lg-none mt-5'>
                <DropdownButton
                  id='dropdown-item-button'
                  size='sm'
                  title={<i className='fas fa-ellipsis-v fw-bold fs-3'></i>}
                >
                  <>
                    <Dropdown.Item as='button'>
                      <Link className='fw-bolder text-primary' to={'/authentication/create-role'}>
                        <i className='fa-solid fa-plus  text-primary me-2'></i>

                        {t('global.add', {name: t('user.role')})}
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as='button'>
                      <span
                        className='fw-bolder text-primary'
                        data-bs-toggle='collapse'
                        data-bs-target='#movementSearch'
                        aria-expanded='true'
                        aria-controls='movementSearch'
                      >
                        <span className='svg-icon svg-icon-5 svg-icon-gray-500 me-1'>
                          <i className='fa-solid fa-arrow-down-short-wide text-primary'></i>
                        </span>
                        {t('global.search')}
                      </span>
                    </Dropdown.Item>

                    <Dropdown.Item as='button'>
                      <Link className='fw-bold' to='/dashboard'>
                        <b>
                          <i className='fa-solid fa-reply-all text-danger'></i>
                        </b>
                      </Link>
                    </Dropdown.Item>
                  </>
                </DropdownButton>
              </div>
            </div>
          </div>
          <div className='card-body p-9 table-responsive'>
            <DataTable
              fetchUrl='/api/role/index'
              headers={[
                {
                  headerName: `${t('global.URN')}`,
                  sort: 'role.id',
                },
                {
                  headerName: `${t('user.roleName')}`,
                  sort: 'roles.id',
                },
                {
                  headerName: `${t('user.system')}`,
                  sort: 'roles.system_id',
                },
                {
                  headerName: `${t('user.permission')}`,
                  sort: 'roles.id',
                },
                {
                  headerName: 'عمل',
                  sort: '',
                },
              ]}
              columns={['id', 'name_fa', 'name_pa', 'directorate_id', 'created_by', 'action']}
            />
          </div>
        </div>
      </Fragment>
    </>
  )
}
export default RoleList
