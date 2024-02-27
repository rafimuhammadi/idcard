import React, {FC} from 'react'
import {KTSVG} from '../../../../../_metronic/helpers'
import {Link} from 'react-router-dom'

const Step5: FC = () => {
  return (
    <div className='w-100'>
      <div className='pb-8 pb-lg-10'>
        <h2 className='fw-bold text-dark'>Your Are Done!</h2>

        <div className='text-gray-400 fw-semibold fs-6'>
          If you need more info, please
          <Link to='/auth/login' className='link-primary fw-bold'>
            {' '}
            Sign In
          </Link>
          .
        </div>
      </div>

      <div className='mb-0'>
        <div className='fs-6 text-gray-600 mb-5'>
          Writing headlines for blog posts is as much an art as it is a science and probably
          warrants its own post, but for all advise is with what works for your great & amazing
          audience.
        </div>

        <div className='notice d-flex bg-light-warning rounded border-warning border border-dashed p-6'>
          <KTSVG
            path='/media/icons/duotune/general/gen044.svg'
            className='svg-icon-2tx svg-icon-warning me-4'
          />
          <div className='d-flex flex-stack flex-grow-1'>
            <div className='fw-semibold'>
              <h4 className='text-gray-800 fw-bold'>We need your attention!</h4>
              <div className='fs-6 text-gray-600'>
                To start using great tools, please, please
                <a href='/dashboard' className='fw-bold'>
                  {' '}
                  Create Team Platform
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {Step5}
