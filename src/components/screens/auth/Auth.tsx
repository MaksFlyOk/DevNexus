import { useAuth } from '@hooks/mutations'
import { useTypedSelector } from '@hooks/redux-hooks'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { AuthMutationParamsType } from '@types'
import { Field } from '@ui/field'
import { Spinner } from '@ui/spinner'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  const { auth } = useTypedSelector(state => state.authState)

  const navigate = useNavigate()
  const { width } = useWindowDimensions()

  const [authOrRegState, setAuthOrRegState] = useState('login')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AuthMutationParamsType>({
    mode: 'onChange'
  })

  const { mutateAsync, isPending, error } = useAuth(reset, setAuthOrRegState)

  useEffect(() => {
    if (auth) {
      navigate('/')
    }
  }, [auth])

  const onSubmit: SubmitHandler<AuthMutationParamsType> = data => {
    mutateAsync(data)
  }

  return (
    <div className='container-fluid container-xxl d-flex justify-content-center vh-100'>
      <div className='col-md-6 col-10 d-flex align-items-center'>
        <div className='row w-100 m-0 d-flex'>
          <h1 className='text-center'>
            {authOrRegState === 'login' ? 'Авторизация' : 'Регистрация'}
          </h1>
          {error ? <h1>{error.message}</h1> : null}
          {isPending ? (
            <Spinner />
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Field
                  register={register}
                  disabled={false}
                  error={errors?.name?.message}
                  name='name'
                  type='text'
                  label='Имя'
                  placeholder='example'
                  options={{
                    required: 'Выберите другое имя',
                    minLength: {
                      value: 4,
                      message: 'Минимальное число знаков в имени 4'
                    },
                    maxLength: {
                      value: 20,
                      message: 'Максимальное число знаков в имени 20'
                    }
                  }}
                />
                <div
                  className={`${
                    authOrRegState === 'login' ? 'd-none' : 'd-block'
                  }`}
                >
                  <Field
                    register={register}
                    disabled={false}
                    error={errors?.email?.message}
                    name='email'
                    type='email'
                    label='Емаил'
                    placeholder='example@example.com'
                    options={{
                      required: 'Выберите другой Емаил',
                      disabled: authOrRegState === 'login' ? true : false
                    }}
                  />
                </div>
                <Field
                  register={register}
                  disabled={false}
                  error={errors?.password?.message}
                  name='password'
                  type='password'
                  label='Пароль'
                  placeholder='example'
                  options={{
                    required: 'Выберите другой пароль',
                    minLength: {
                      value: 6,
                      message: 'Минимальное число знаков в пароле 6'
                    }
                  }}
                />
                <div
                  className={`${
                    width <= 576 ? 'btn-group-vertical' : 'btn-group'
                  } mb-3 w-100`}
                  role='group'
                  aria-label='AuthOrRegGroup'
                >
                  <button
                    type='button'
                    disabled={authOrRegState === 'login'}
                    className={
                      authOrRegState === 'login'
                        ? 'btn btn-primary'
                        : 'btn btn-outline-primary'
                    }
                    onClick={() => setAuthOrRegState('login')}
                  >
                    Авторизация
                  </button>
                  <button
                    type='button'
                    disabled={authOrRegState === 'registration'}
                    className={
                      authOrRegState === 'registration'
                        ? 'btn btn-primary'
                        : 'btn btn-outline-primary'
                    }
                    onClick={() => setAuthOrRegState('registration')}
                  >
                    Регистрация
                  </button>
                </div>
                <div className='mb-3'>
                  <button type='submit' className='btn btn-primary w-100'>
                    {authOrRegState === 'login'
                      ? 'Авторизироваться'
                      : 'Зарегистрироваться'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
