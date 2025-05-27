import { useDeleteGroup } from '@hooks/mutations'
import { GroupType } from '@types'
import { CircleImg } from '@ui/circle-img'
import { DangerZone } from '@ui/danger-zone'
import { MemberList } from '@ui/member-list'
import { Dispatch, SetStateAction } from 'react'

interface AddGroupBoardModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>
  isGroupPending: boolean
  isGroupError: boolean
  groupData: GroupType | undefined
}

export const BoardInfoModal = ({
  setIsShow,
  isGroupError,
  isGroupPending,
  groupData
}: AddGroupBoardModalProps) => {
  const { mutateAsync, isPending } = useDeleteGroup({
    optionFunction: () => {
      setIsShow(false)
    }
  })

  return (
    <div className='modal-dialog modal-lg'>
      <div className='modal-content'>
        <div className='modal-header'>
          <h1 className='modal-title fs-5' id='exampleModalLabel'>
            {groupData?.name}
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Закрыть'
            onClick={() => setIsShow(false)}
          ></button>
        </div>
        <div className='modal-body position-relative '>
          <div className='card-header d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center'>
              <div className='user-profile-img'>
                <CircleImg
                  img={groupData?.icon}
                  alt={groupData?.name + ' img'}
                />
              </div>
              <h5 className='ps-2 text-wrap text-break'>
                {groupData?.description}
              </h5>
            </div>
          </div>
          <div
            className='overflow-y-scroll overflow-x-hidden bg-light-subtle px-2 mt-2 rounded-3'
            style={{ height: '50vh' }}
          >
            {/* TODO: */}
            <MemberList
              isGroupError={isGroupError}
              isGroupPending={isGroupPending}
              groupData={groupData}
            />
          </div>
        </div>
        <div className='modal-footer'>
          <DangerZone
            buttonTitle='Delete group'
            buttonFunction={mutateAsync}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  )
}
