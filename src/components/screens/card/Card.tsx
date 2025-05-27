import { useDeleteCardColumnGroup } from '@hooks/mutations'
import { useGetCard } from '@hooks/queries'
import { DangerZone } from '@ui/danger-zone'
import { Modal } from '@ui/modal'
import { SecondaryNav } from '@ui/secondary-nav'
import { Spinner } from '@ui/spinner'
import { Tag } from '@ui/tag'
import { dateISOtoLocalString } from '@utils/dateISOtoLocalString'
import { dateSetTimezone } from '@utils/dateSetTimezone'
import { formatDateForDateTimeInput } from '@utils/formatDateForDateTimeInput'
import { formatTimeRemaining } from '@utils/formatTimeRemaining'
import { setPlaceholderFieldSelectTags } from '@utils/setPlaceholderFieldSelectTags'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateCardModal } from './update-card-modal'

export const Card = () => {
  const { group_id, card_title, card_code } = useParams()

  const navigate = useNavigate()

  const [isShow, setIsShow] = useState(false)
  const [deadlineTimer, setDeadlineTimer] = useState('')

  const { data, isPending, isError } = useGetCard(group_id, card_code)

  const { mutateAsync } = useDeleteCardColumnGroup(group_id, card_code, () => {
    navigate('/')
  })

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined
    console.log(timer)

    if (data && !timer) {
      const dead_line = new Date(data.end_date)
      console.log('start_line', new Date(data.start_date))
      console.log('dead_line', dead_line)
      console.log('dead_line timezone', new Date(dateSetTimezone(dead_line)))

      timer = setInterval(
        () => setDeadlineTimer(formatTimeRemaining(dead_line)),
        100
      )
    }

    return () => clearInterval(timer)
  }, [data])

  return (
    <>
      <SecondaryNav title={`Карточка - ${card_title}`} backLink={'/'} />
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
        <div className='container-fluid py-4'>
          <Modal isShow={isShow} setIsShow={setIsShow}>
            {group_id && card_code ? (
              <UpdateCardModal
                placeholders={{
                  title: data.title,
                  assignee: data.assignee,
                  description: data.description,
                  end_date: formatDateForDateTimeInput(data.end_date),
                  start_date: formatDateForDateTimeInput(data.start_date),
                  tags: setPlaceholderFieldSelectTags(data.tags)
                }}
                defaultDates={{
                  start_date: data.start_date,
                  end_date: data.end_date
                }}
                setIsShow={setIsShow}
                groupId={group_id}
                cardCode={card_code}
                columnName={data.column}
                defaultTags={data.tags}
              />
            ) : (
              <span className='badge text-bg-danger'>Error</span>
            )}
          </Modal>
          <div className='container pb-4'>
            <div className='card'>
              <div className='card-header d-flex align-items-center justify-content-between'>
                <div>
                  <h2 className='ps-2'>{data.title}</h2>
                </div>
                <h5>{deadlineTimer}</h5>
              </div>
              <div className='card-body px-5'>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>Исполнитель</h5>
                    <h4>{data.assignee}</h4>
                  </div>
                </div>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <div className='d-flex gap-2 align-items-center'>
                      <h5 className='text-secondary'>Статус</h5>{' '}
                    </div>
                    <div className='pt-2 d-flex flex-row gap-2 align-items-baseline'>
                      <h4>
                        <Tag tagName={data.column} color={data.column_color} />
                      </h4>
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>Описание задачи</h5>
                    <h4
                      className={data.description ? '' : 'text-body-secondary'}
                    >
                      <p className='text-break'>
                        {data.description
                          ? data.description
                          : 'Без ТЗ результат хз'}
                      </p>
                    </h4>
                  </div>
                </div>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <div className='d-flex gap-2 align-items-center'>
                      <h5 className='text-secondary'>Тэги</h5>{' '}
                    </div>
                    <div className='pt-2 d-flex flex-row gap-2 align-items-baseline'>
                      {data.tags.length === 0 ? (
                        <h4 className='text-body-secondary'>
                          Здесь пока пустовато
                        </h4>
                      ) : (
                        data.tags?.map((tag, iter) => (
                          <div key={'tag ' + iter + tag.code}>
                            <h4>
                              <Tag tagName={tag.name} color={tag.color} />
                            </h4>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-between pb-4'>
                  <div>
                    <h5 className='text-secondary'>Начальная дата</h5>
                    <h4>{dateISOtoLocalString(data.start_date)}</h4>
                  </div>
                </div>
                <div className='d-flex justify-content-between'>
                  <div>
                    <h5 className='text-secondary'>Дедлайн</h5>
                    <h4>{dateISOtoLocalString(data.end_date)}</h4>
                  </div>
                </div>
                <hr />
                <div className='d-flex w-100 flex-column'>
                  <button
                    type='submit'
                    className='btn btn-light'
                    onClick={() => setIsShow(true)}
                  >
                    Обновить
                  </button>
                </div>
              </div>
              <div className='card-footer'>
                <DangerZone buttonTitle='Delete' buttonFunction={mutateAsync} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
