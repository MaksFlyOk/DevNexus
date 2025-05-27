import { useActions, useTypedSelector } from '@hooks/redux-hooks'

const generateId = () => {
  return Math.random().toString(36).substring(2, 9)
}

export const Notification = () => {
  const { items } = useTypedSelector(state => state.notificationState)

  const { addTimedNotification, removeNotificationState } = useActions()

  return (
    <div
      className='position-absolute bottom-0 end-0'
      style={{ zIndex: 100000 }}
    >
      <div className='d-flex flex-column justify-content-end pe-3 pb-4'>
        <div className='d-flex flex-column gap-2'>
          {items.map(notification => (
            <div
              className={`alert alert-${notification.type}`}
              role='alert'
              key={notification.id}
            >
              <div className='d-flex justify-content-between gap-4'>
                {notification.message}
                <button
                  className='btn btn-close'
                  onClick={() => removeNotificationState(notification.id)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className='btn btn-primary'
          type='button'
          onClick={() => {
            const notificationId = generateId()
            const rnd = Math.random() * 10

            addTimedNotification({
              id: notificationId,
              message: String(notificationId).substring(0, 8),
              type:
                rnd <= 2
                  ? 'success'
                  : rnd > 2 && rnd <= 5
                  ? 'warning'
                  : rnd > 5 && rnd <= 8
                  ? 'danger'
                  : 'info'
            })
          }}
        >
          add new notification
        </button>
      </div>
    </div>
  )
}
