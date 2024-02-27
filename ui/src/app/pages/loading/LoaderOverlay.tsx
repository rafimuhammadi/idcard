// LoaderOverlay.tsx
import React from 'react'
import './LoaderOverlay.css'

const LoaderOverlay: React.FC = () => {
  return (
    <div className='loader-overlay'>
      <div className='loading d-flex justify-content-center'>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default LoaderOverlay
