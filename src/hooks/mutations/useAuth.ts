import { useActions } from '@hooks/redux-hooks'
import authService from '@services/authService'
import { useMutation } from '@tanstack/react-query'
import { AuthMutationParamsType } from '@types'
import { checkToken } from '@utils/checkToken'
import { setToken } from '@utils/setToken'
import { UseFormReset } from 'react-hook-form'

interface AuthMutateParams {
  reset: UseFormReset<AuthMutationParamsType>
  setAuthOrRegState: React.Dispatch<React.SetStateAction<string>>
}

export const useAuth = (
  reset: AuthMutateParams['reset'],
  setAuthOrRegState: AuthMutateParams['setAuthOrRegState']
) => {
  const { setAuthState, addTimedNotification } = useActions()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ['auth'],
    mutationFn: async ({ name, email, password }: AuthMutationParamsType) => {
      if (!email) {
        const { data } = await authService.auth(name, password)

        setToken(data)
        return 'auth'
      } else {
        await authService.register(name, password, email)

        reset()
        return 'register'
      }
    },
    onError: error => {
      reset()

      addTimedNotification({
        message: error.message,
        type: 'danger'
      })
    },
    onSuccess: data => {
      if (checkToken()) setAuthState(true)

      setAuthOrRegState(prev =>
        prev === 'registration' ? 'login' : 'registration'
      )

      if (data === 'register') {
        addTimedNotification({
          message: 'Вы успешно зарегестрировались',
          type: 'success'
        })
      }
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
