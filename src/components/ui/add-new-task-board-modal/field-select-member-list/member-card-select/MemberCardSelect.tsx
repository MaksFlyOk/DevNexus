interface MemberCardSelectProps {
  name: string
}

export const MemberCardSelect = ({ name }: MemberCardSelectProps) => {
  return (
    <div className='card p-2 position-relative'>
      <h5 className='w-auto text-wrap'>{name}</h5>
      <div className='d-flex flex-wrap gap-2'></div>
    </div>
  )
}
