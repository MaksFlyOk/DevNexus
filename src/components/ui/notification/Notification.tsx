import { useActions, useTypedSelector } from '@hooks/redux-hooks'

export const Notification = () => {
  const { items } = useTypedSelector(state => state.notificationState)

  const { removeNotificationState } = useActions()

  return (
    <div className='position-fixed bottom-0 end-0' style={{ zIndex: 100000 }}>
      <div className='d-flex flex-column justify-content-end pe-4 pb-4'>
        <div className='d-flex flex-column gap-2'>
          {items.map(notification => (
            <div
              className={`alert alert-${notification.type}`}
              role='alert'
              key={notification.id}
            >
              <div className='d-flex justify-content-between gap-2'>
                {notification.message}
                <button
                  className='btn btn-close'
                  onClick={() => removeNotificationState(notification.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
