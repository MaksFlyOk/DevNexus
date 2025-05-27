import { Dispatch, FC, ReactElement, SetStateAction } from 'react'
import './Modal.scss'

import './Modal.scss'
interface ModalProps {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  children: ReactElement
}

export const Modal: FC<ModalProps> = ({ isShow, setIsShow, children }) => {
  return (
    <div
      className={`custom-modal ${
        isShow ? 'custom-modal-show' : 'custom-modal-hide'
      } vh-100 vw-100 p-0 m-0`}
      tabIndex={-1}
    >
      <div className='d-flex justify-content-center pt-5'>
        <div className='d-block modal' aria-hidden='true'>
          <div
            className='position-fixed top-0 bg-dark opacity-75 vh-100 vw-100'
            onClick={() => setIsShow(false)}
          ></div>
          {isShow ? <>{children}</> : <></>}
        </div>
      </div>
    </div>
  )
}
