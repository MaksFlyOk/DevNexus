import { UserProfileType } from '@types'
import { Tag } from '@ui/tag'
import { convertTextColor } from '@utils/convertTextColor'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface UserTasksListProps {
  groups: UserProfileType['groups']
}

export const UserTasksList = ({ groups }: UserTasksListProps) => {
  const [isShowListGroups, setIsShowListGroups] = useState<{
    [key: string]: boolean
  }>(
    groups.reduce((acc, group) => {
      acc[group.name] = false

      return acc
    }, {} as { [key: string]: boolean })
  )

  const navigate = useNavigate()

  return (
    <div
      className='overflow-y-scroll overflow-x-hidden d-flex p-2 flex-column gap-3'
      style={{ maxHeight: '70dvh' }}
    >
      {groups.map(group => (
        <>
          {group.cards.length > 0 ? (
            <div
              key={group.id}
              className='d-flex flex-column gap-1 rounded-4 bg-light-subtle'
            >
              <div
                className={`d-flex justify-content-between gap-1 py-2 px-3 bg-light-subtle' ${
                  isShowListGroups[group.name] ? 'rounded-top-4' : ''
                }`}
              >
                <div>
                  <h4 className='text-break text-wrap'>{group.name}</h4>
                  <h6>Sum: {group.cards?.length}</h6>
                </div>
                <button
                  type='button'
                  className='btn btn-outline-light'
                  onClick={() =>
                    setIsShowListGroups(prev => {
                      return { ...prev, [group.name]: !prev[group.name] }
                    })
                  }
                >
                  &#8595;
                </button>
              </div>
              <div
                className={`d-flex p-2 flex-column gap-3 ${
                  isShowListGroups[group.name] ? 'd-block' : 'd-none'
                }`}
              >
                {group.cards.length !== 0 ? (
                  group.cards?.map(card => (
                    <div
                      key={card.title + card.code}
                      onClick={() =>
                        navigate(
                          `/card/g/${group.group_uuid}/c/${card.title}/${card.code}`
                        )
                      }
                      className='p-2 rounded-3 border border-2 bg-dark'
                    >
                      <div className='d-flex justify-content-between'>
                        <h4 className='fw-bold text-wrap text-break'>
                          {card?.title}
                        </h4>
                      </div>
                      <h5 className='pb-1'>{card?.assignee}</h5>
                      <div className='d-flex flex-wrap gap-2 pb-2'>
                        {card?.tags?.map((tag, iter) => (
                          <Tag
                            tagName={tag.name}
                            color={tag.color}
                            key={card.title + ' tag ' + iter}
                          />
                        ))}
                      </div>
                      <p className='description'>{card?.description}</p>
                      <div className='d-flex flex-column gap-3 align-items-baseline'>
                        <Tag color={card.column_color} tagName={card.column} />
                        <h6
                          className={
                            'fw-bold ' + convertTextColor(card.column_color)
                          }
                        >
                          {dateISOtoLocalString(card.end_date)}
                        </h6>
                      </div>
                    </div>
                  ))
                ) : (
                  <h6>Отдых</h6>
                )}
              </div>
            </div>
          ) : null}
        </>
      ))}
    </div>
  )
}
