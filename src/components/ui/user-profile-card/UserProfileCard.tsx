import { UserProfileType } from '@types'
import { CircleImg } from '@ui/circle-img'
import { Spinner } from '@ui/spinner'
import { useNavigate } from 'react-router-dom'

interface UserProfileCardProps {
  isPending: boolean | undefined
  isError: boolean | undefined
  userData: UserProfileType | undefined
}
export const UserProfileCard = ({
  isPending,
  isError,
  userData
}: UserProfileCardProps) => {
  const navigate = useNavigate()

  return (
    <div className='d-flex align-items-center'>
      {isPending ? (
        <div className='d-flex w-100 justify-content-center py-3'>
          <Spinner />
        </div>
      ) : isError ? (
        <div className='d-flex w-100 justify-content-center py-3'>
          <h1 className='h1'>
            <span className='badge text-bg-danger'>Error</span>
          </h1>
        </div>
      ) : (
        <div className='userDataContainer' onClick={() => navigate('/profile')}>
          <CircleImg alt='User img' />
          <h2 className='userNameText'>{userData?.user.username}</h2>
        </div>
      )}
    </div>
  )
}
