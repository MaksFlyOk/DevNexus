import { Spinner } from '@ui/spinner'
import { useState } from 'react'

interface DangerZoneProps {
  dangerZoneTitle?: string
  buttonTitle: string
  isPending?: boolean
  buttonFunction: () => void
}

export const DangerZone = ({
  dangerZoneTitle = 'Danger-zone',
  buttonTitle,
  isPending = false,
  buttonFunction
}: DangerZoneProps) => {
  const [danger, setDanger] = useState(false)

  return (
    <div className='d-flex w-100 flex-column gap-2'>
      <h4 className='text-danger'>{dangerZoneTitle}</h4>
      <button
        type='button'
        className='btn btn-outline-danger'
        onClick={() => (danger ? buttonFunction() : setDanger(true))}
        onMouseLeave={() => setDanger(false)}
      >
        {isPending ? <Spinner /> : danger ? `Confirm` : buttonTitle}
      </button>
    </div>
  )
}
