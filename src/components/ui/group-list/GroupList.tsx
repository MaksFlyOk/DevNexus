import { useGetGroups } from '@hooks/queries'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import DefaultCircleImg from '@images/DefaultCircleImg.svg'
import { Spinner } from '@ui'

export const GroupList = () => {
  const { setGroupId } = useActions()
  const { groupId } = useTypedSelector(state => state.groupState)
  const { isPending, isError, data: groupListData } = useGetGroups()

  return (
    <div className='d-flex flex-column py-3 gap-1'>
      {isPending ? (
        <Spinner />
      ) : isError ? (
        <div className='d-flex justify-content-center py-3'>
          <h1>
            <span className='badge text-bg-danger'>Error</span>
          </h1>
        </div>
      ) : (
        groupListData.map((group, iter: number) => (
          <button
            key={'Group img ' + iter}
            type='button'
            className={`btn rounded-circle p-0 ${
              group.id === groupId ? 'border-primary border-3' : ''
            }`}
            onClick={() =>
              setGroupId(group.id === groupId ? undefined : group.id)
            }
          >
            <div className='d-flex justify-content-center rounded-circle'>
              <img
                draggable={false}
                className='w-100'
                src={group?.img ? group?.img : DefaultCircleImg}
                alt={'Group image ' + group.id}
              />
            </div>
          </button>
        ))
      )}
    </div>
  )
}
