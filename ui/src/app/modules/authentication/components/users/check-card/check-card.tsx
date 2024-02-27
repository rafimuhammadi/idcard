import {Fragment, useRef, useState} from 'react'
import userImage from '../../../../../../_metronic/assets/images/no_image.jpg'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {debounce} from 'lodash'
import {checkUser, checkUserDefault} from '../../../../../../redux/authentication/user/userService'
import axios from 'axios'

const CheckCard = () => {
  const {t} = useTranslation()
  const [search, setSearch] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [userData, setUserData] = useState<checkUser>(checkUserDefault)

  //get data from server for options

  const handleSearch = useRef(
    debounce((query: string) => {
      setLoading(true)
      setSearch(query)
    }, 500)
  ).current

  const checkCard = async () => {
    setLoading(true)
    if (search !== '') {
      const response = await axios.get('api/user/check/' + search)
      setUserData((setUserData) => ({...setUserData, ...response.data.record}))
      setLoading(false)
    } else {
      alert('درج نام شخص ضروری میباشد!')
    }
    setLoading(false)
  }
  return (
    <>
      <Fragment>
        <div className='card mb-5 mb-xl-10' id='kt_profile_details_view'>
          <div className='card-header cursor-pointer'>
            <div className='card-title m-0'>
              <h3 className='fw-bolder m-0'>
                <i className='fas fa-users fs-4 text-primary'></i> {t('global.check')}
              </h3>
            </div>
            <div>
              <div className='d-none d-lg-flex mt-5'>
                <div className='d-flex align-items-center'>
                  <Link className='btn btn-sm btn-flex btn-danger fw-bold' to='/dashboard'>
                    <b>
                      <i className='fa-solid fa-reply-all'></i>
                    </b>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className='card-body p-9 table-responsive row'>
            <div className='col-lg-3 col-md-3 col-sm-12'>
              <input
                type='search'
                autoFocus
                placeholder='جستجو به اساس نام...'
                className='form-control form-control-sm'
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12'>
              <button className='btn btn-sm btn-primary fw-bold' onClick={checkCard}>
                <i className='fas fa-print'></i>
                {t('global.check')}
              </button>
            </div>
          </div>
          {userData !== null && (
            <div className='row'>
              <div className='col-lg-4 col-md-6 mx-auto mt-5'>
                <div className='card'>
                  <div className='card-header bg-primary text-white fs-3 '>کارت اجازه دخول</div>
                  <div className='card-body'>
                    <div className='text-center'>
                      <img
                        src={
                          userData.image !== ''
                            ? process.env.REACT_APP_API_URL + 'storage/' + userData.image
                            : userImage
                        }
                        alt='Avatar'
                        className='rounded-circle img-fluid mb-3'
                        style={{width: '150px', height: '150px'}}
                      />
                      <h4>{userData.name}</h4>
                      <p className='text-primary fw-bold'>{userData.job}</p>
                    </div>
                    <hr />
                    <div className='row'>
                      <div className='col'>
                        <p className='font-weight-bold fw-bold'>مدیریت</p>
                        <p>{userData.department}</p>
                      </div>
                      <div className='col'>
                        <p className='font-weight-bold fw-bold'>ایمیل:</p>
                        <p>{userData.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Fragment>
    </>
  )
}
export default CheckCard
