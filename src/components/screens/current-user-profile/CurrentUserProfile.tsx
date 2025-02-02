import { useParams } from 'react-router-dom'

export const CurrentUserProfile = () => {
  const params = useParams()

  return (
    <div className='container'>
      <h1>Profile user id {params.id}</h1>
    </div>
  )
}
