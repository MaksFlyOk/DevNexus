import { useGetCurrentUser } from '@hooks/queries'
import { CircleImg } from '@ui/circle-img'
import { Modal } from '@ui/modal'
import { SecondaryNav } from '@ui/secondary-nav'
import { Spinner } from '@ui/spinner'
import { Tag } from '@ui/tag'
import { convertTextColor } from '@utils/convertTextColor'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { hideEmailInfo } from '@utils/hideEmailInfo'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './CurrentUserProfile.scss'
import { UpdateUserTagsModal } from './update-user-tags-modal'

export const CurrentUserProfile = () => {
  const { group_id, username, admin } = useParams()

  const navigate = useNavigate()

  const [isShow, setIsShow] = useState(false)

  const { data, isPending, isError } = useGetCurrentUser(group_id, username)

  return (
    <>
      <SecondaryNav title={`Профиль ${username}`} backLink={'/'} />
      {isPending ? (
        <div className='d-flex w-100 justify-content-center py-3'>
          <Spinner />
        </div>
      ) : isError ? (
        <div className='d-flex w-100 justify-content-center py-3'>
          <h1>
            <span className='badge text-bg-danger'>Error</span>
          </h1>
        </div>
      ) : (
        <div className='current-user-profile-container py-4'>
          <Modal isShow={isShow} setIsShow={setIsShow}>
            {group_id ? (
              <UpdateUserTagsModal
                setIsShow={setIsShow}
                group_uuid={group_id}
                username={data.user.username}
                userTagList={data.user_tags}
              />
            ) : (
              <h1>ERROR</h1>
            )}
          </Modal>
          <div className='container-fluid pb-4'>
            <div className='card'>
              <div className='card-header d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <div className='user-profile-img'>
                    <CircleImg alt='User img' />
                  </div>
                  <h2 className='ps-2 text-wrap text-break'>
                    {data.user.username}
                  </h2>
                </div>
              </div>
              <div className='card-body'>
                <div className='pb-2'>
                  <h5 className='text-secondary'>О себе</h5>
                  <h4
                    className={
                      data.user.description ? '' : 'text-body-secondary'
                    }
                  >
                    <p className='text-break'>
                      {data.user.description
                        ? data.user.description
                        : 'Ничего не известно'}
                    </p>
                  </h4>
                </div>
                <div className='pb-2'>
                  <h5 className='text-secondary'>Email</h5>
                  <h4 className='text-break'>
                    {hideEmailInfo(data.user.email)}
                  </h4>
                </div>
                <div className='pb-2'>
                  <div className='d-flex gap-2 align-items-center'>
                    <h5 className='text-secondary'>Тэги</h5>
                    <button
                      type='button'
                      className='btn btn-sm btn-outline-light'
                      onClick={() => setIsShow(true)}
                    >
                      {data.user_tags.length === 0 ? 'Добавить' : 'Обновить'}
                    </button>
                  </div>
                  <div className='pt-2 d-flex flex-wrap gap-2 align-items-baseline'>
                    {data.user_tags.length === 0 ? (
                      <h4 className='text-body-secondary'>
                        Здесь пока пустовато
                      </h4>
                    ) : (
                      <>
                        {admin === 'true' ? (
                          <h5
                            className='text-truncate'
                            key={'tag Admin 000000'}
                          >
                            <Tag tagName={'Admin'} color={'primary'} />
                          </h5>
                        ) : null}
                        {data.user_tags?.map((tag, iter) => (
                          <h5
                            className='text-truncate'
                            key={'tag ' + iter + tag.tag_code}
                          >
                            <Tag tagName={tag.tag_name} color={tag.tag_color} />
                          </h5>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='container-fluid py-1 py-sm-4'>
            <div className='card'>
              <div className='card-header'>
                <h2 className='ps-2'>Задачи</h2>
              </div>
              <div className='card-body'>
                <div
                  className='overflow-y-scroll overflow-x-hidden d-flex p-2 flex-column gap-3'
                  style={{ maxHeight: '70dvh' }}
                >
                  {data.cards?.length !== 0 ? (
                    data.cards?.map(card => (
                      <div
                        key={card.title + card.code}
                        onClick={() =>
                          navigate(
                            `/card/g/${group_id}/c/${card.title}/${card.code}`
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
                          <Tag
                            color={card.column_color}
                            tagName={card.column}
                          />
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
            </div>
          </div>
        </div>
      )}
    </>
  )
}
