// eslint-disable-next-line react-hooks/exhaustive-deps
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from '../../../../../../redux/hooks'
import {
  changeStatus,
  viewUser,
} from '../../../../../../redux/authentication/user/userManagementSlice'
import Loader from '../../../../../pages/loading/Loader'
import ViewUserForm from './ViewUserForm'
import {defaultViewData, userView} from '../../../../../../redux/authentication/user/userService'
import Swal from 'sweetalert2'
import {toast} from 'react-toastify'
import {useTranslation} from 'react-i18next'
import axios from 'axios'

const ViewUser = () => {
  const {t} = useTranslation()
  const [loader, setLoader] = useState(true)

  const [userData, setUserData] = useState<userView>(defaultViewData)

  //get data from server for options
  const dispatch = useAppDispatch()
  const {userView} = useAppSelector((state) => state.userManagement)

  const {id} = useParams()

  useEffect(() => {
    dispatch(viewUser(id)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setLoader(false)
      }
      setLoader(false)
    }) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  useEffect(() => {
    setUserData((setUserData) => ({...setUserData, ...userView}))
  }, [userView])
  const status = userData.record.deleted_at === null ? 1 : 2

  const changeUserStatus = async () => {
    Swal.fire({
      title: `${
        status === 1
          ? t('global.changeStatus', {name: t('global.deactive')})
          : t('global.changeStatus', {name: t('global.active')})
      } `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${t('global.yes')}`,
      cancelButtonText: `${t('global.no')}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await dispatch(changeStatus({id, status}))
        if (changeStatus.fulfilled.match(response)) {
          console.log(result)
          toast.success(<p className='fs-4 fw-bold'>{response.payload}</p>)

          const viewUserResponse = await dispatch(viewUser(id))

          if (viewUser.fulfilled.match(viewUserResponse)) {
            setLoader(false)
          } else {
            console.log(viewUserResponse)
          }
        } else {
          console.log(response)
        }
      }
    })
  }

  const printCard = async () => {
    try {
      axios({
        url: `api/user/print/${id}`,
        method: 'GET',
      }).then((response) => {
        // console.log(response)
        let blob: any = new Blob([response.data.html], {type: 'text/html'})
        const blobUrl = URL.createObjectURL(blob)
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = blobUrl
        document.body.appendChild(iframe)
        iframe.contentWindow?.print()
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!loader ? (
        <ViewUserForm
          t={t}
          userData={userData}
          changeUserStatus={changeUserStatus}
          id={id}
          printCard={printCard}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default ViewUser
