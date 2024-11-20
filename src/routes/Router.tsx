import { NotFound } from '@screens'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes.ts'

const Router = () => {
  const isAuth = true // Заглушка, т.к. пока нету сессии авторизации

  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map(route => {
          if (route.isAuth && !isAuth) {
            return
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
    </BrowserRouter>
  )
}

export default Router
