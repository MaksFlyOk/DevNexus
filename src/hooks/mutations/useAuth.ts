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
  const { setAuthState } = useActions()

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationKey: ['auth'],
    mutationFn: async ({ name, email, password }: AuthMutationParamsType) => {
      if (!email) {
        const { data } = await authService.auth(name, password)

        setToken(data)
      } else {
        await authService.register(name, password, email)

        reset()
      }

      return name
    },
    onError: () => {
      reset()
    },
    onSuccess: () => {
      if (checkToken()) setAuthState(true)

      setAuthOrRegState(prev =>
        prev === 'registration' ? 'login' : 'registration'
      )
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
