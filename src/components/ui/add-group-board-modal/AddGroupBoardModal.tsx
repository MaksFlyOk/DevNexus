import { Dispatch, SetStateAction } from 'react'

interface AddGroupBoardModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
}
export const AddGroupBoardModal = ({ setIsShow }: AddGroupBoardModalProps) => {
  return (
    <div className='modal-dialog'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            Добавление новой задачи
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Закрыть'
            onClick={() => setIsShow(false)}
          ></button>
        </div>
        <div className='modal-body'>
          <h1>body</h1>
        </div>
        <div className='modal-footer'>
          <button type='submit' form='column-form' className='btn btn-primary'>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
