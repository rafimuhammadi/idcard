import {useState, useRef} from 'react'
import AvatarEditor from 'react-avatar-editor'
import {Modal} from 'react-bootstrap'

interface ImageCropperModalProps {
  isOpen: boolean
  onRequestClose: () => void
  onCropComplete: (croppedImage: string) => void
  image: string
}

function ImageCropperModal({
  isOpen,
  onRequestClose,
  onCropComplete,
  image,
}: ImageCropperModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [rotateDegrees, setRotateDegrees] = useState(0)

  // const [croppedImage, setCroppedImage] = useState<string>('')
  const [scale, setScale] = useState<number>(1)
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }
  const handleScaleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(event.target.value))
  }

  const handleCropComplete = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas()
      //setCroppedImage(canvas.toDataURL()))
      onCropComplete(canvas.toDataURL())
      onRequestClose()
    }
  }
  // const handleSave = () => {
  //   onCropComplete(croppedImage)
  //   onRequestClose()
  // }
  const handleRotate = () => {
    setRotateDegrees(rotateDegrees + 90) // Rotate the image by 90 degrees clockwise
  }

  const editorRef = useRef<AvatarEditor | null>(null)
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <div className='card mb-5 mb-xl-10 mt-0' id='kt_profile_details_view'>
        <div className='card-header cursor-pointer'>
          <div className='card-title m-0'>
            <h3 className='fw-bolder m-0'>تنظیم عکس</h3>
          </div>
          <div className='d-flex align-items-center py-1'>
            <i
              className='fas fa-times text-danger fs-4'
              onClick={() => {
                onRequestClose()
              }}
            ></i>
          </div>
        </div>
        <div className='card-body p-9'>
          <input
            type='file'
            className='form-control form-control-sm mb-2'
            onChange={handleImageChange}
          />
          {imageFile && (
            <>
              <div className='row shadow-sm m-2 p-5 mt-0'>
                <div className='d-flex flex-stack flex-wrap justify-content-center'>
                  <div className='fs-6 fw-bold text-gray-700'>
                    <AvatarEditor
                      image={URL.createObjectURL(imageFile)}
                      ref={editorRef}
                      scale={scale}
                      rotate={rotateDegrees}
                    />
                    <br />
                    <input
                      type='range'
                      min='1'
                      max='10'
                      step='0.1'
                      value={scale}
                      onChange={handleScaleChange}
                    />
                    <div />
                  </div>
                </div>
              </div>
              <div className='row mb-8 shadow-sm m-2 p-5 mt-0'>
                <div className='d-flex flex-stack flex-wrap justify-content-center'>
                  <div className='fs-6 fw-bold text-gray-700'>
                    <button
                      type='button'
                      id='kt_sign_in_submit'
                      className='btn btn-sm btn-primary me-2 fw-bold'
                      onClick={handleCropComplete}
                    >
                      قطع کردن
                      <i className='fas fa-crop ms-2'></i>
                    </button>
                    <button
                      type='button'
                      id='kt_sign_in_submit'
                      className='btn btn-sm btn-info me-2 fw-bold'
                      onClick={handleRotate}
                    >
                      چرخش
                      <i className='fas fa-undo ms-2'></i>
                    </button>
                    <div />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default ImageCropperModal
