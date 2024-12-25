import { useGetGroups } from '@hooks/queries'
import { CircleImg, Spinner } from '@ui'

export const GroupList = () => {
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
          <CircleImg
            img={group?.img}
            alt={'Group img ' + iter}
            key={'Group img ' + iter}
          />
        ))
      )}
    </div>
  )
}
