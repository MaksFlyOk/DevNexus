import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { handleAdaptiveButton } from '@utils/handleAdaptiveButton'

interface BoardViewButtonsGroupProps {
  minimizeMode: boolean
}

export const BoardViewButtonsGroup = ({
  minimizeMode
}: BoardViewButtonsGroupProps) => {
  const { setBoardViewState } = useActions()

  const { groupId } = useTypedSelector(state => state.groupState)

  const { width } = useWindowDimensions()

  return minimizeMode ? (
    <div className='d-flex gap-2'>
      <button
        type='button'
        className='btn btn-primary btn-lg'
        disabled={groupId === undefined}
        onClick={() => setBoardViewState('kanban')}
      >
        Kanban
      </button>
      <button
        type='button'
        className='btn btn-primary btn-lg'
        disabled={groupId === undefined}
        onClick={() => setBoardViewState('list')}
      >
        List
      </button>
      <button
        type='button'
        className='btn btn-primary btn-lg'
        disabled={groupId === undefined}
        onClick={() => setBoardViewState('table')}
      >
        Table
      </button>
    </div>
  ) : (
    <div className='dropup-center'>
      <button
        type='button'
        className={`btn btn-primary ${handleAdaptiveButton(width)}`}
        data-bs-toggle='dropdown'
        aria-expanded='false'
        disabled={groupId === undefined}
      >
        View
      </button>
      <ul className='dropdown-menu'>
        <li
          className='dropdown-item'
          onClick={() => setBoardViewState('kanban')}
        >
          Kanban
        </li>
        <li className='dropdown-item' onClick={() => setBoardViewState('list')}>
          List
        </li>
        <li
          className='dropdown-item'
          onClick={() => setBoardViewState('table')}
        >
          Table
        </li>
      </ul>
    </div>
  )
}
