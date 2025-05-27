import { useTypedSelector } from '@hooks/index.ts'
import { Landing, NotFound } from '@screens'
import { Notification } from '@ui/notification/Notification.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes.ts'

const Router = () => {
  const { auth } = useTypedSelector(state => state.authState)

  return (
    <BrowserRouter
      basename={import.meta.env.VITE_APP_BASE_URL}
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true
      }}
    >
      <div>
        <Notification />
        <Routes>
          {ROUTES.map(route => {
            if (route.isAuth && !auth) {
              return (
                <Route
                  key={'/landing'}
                  path={'/landing'}
                  element={<Landing />}
                />
              )
            }

            return (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            )
          })}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default Router
