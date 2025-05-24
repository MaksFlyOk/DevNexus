import userService from '@services/userService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { UseFormReset } from 'react-hook-form'

interface UserProfileDataParams {
  new_data: {
    name: string
    email: string
    description: string
    old_password: string
    new_password: string
  }
  old_data: { username: string; email: string; description: string }
}

export const useUpdateUserProfile = (
  reset: UseFormReset<{
    name: string
    email: string
    description: string
    old_password: string
    new_password: string
  }>,
  setIsShow: Dispatch<SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isPending, isError, error } = useMutation<
    unknown,
    unknown,
    UserProfileDataParams,
    unknown
  >({
    mutationKey: ['auth'],
    mutationFn: async ({
      new_data: {
        name: newUsername,
        email: newEmail,
        description: newDescription,
        old_password,
        new_password
      },
      old_data: {
        username: oldUsername,
        email: oldEmail,
        description: oldDescrioption
      }
    }: UserProfileDataParams) => {
      if (newUsername || newEmail || newDescription) {
        await userService.putUpdateUserProfile({
          username: newUsername ? newUsername : oldUsername,
          email: newEmail ? newEmail : oldEmail,
          description: newDescription ? newDescription : oldDescrioption
        })
      }

      if (old_password && new_password) {
        await userService.putUpdateUserPassword({ old_password, new_password })
      }

      return name
    },
    onError: error => {
      console.log(error)
    },
    onSuccess: () => {
      console.log('success')

      queryClient.invalidateQueries({ queryKey: [`get user`] })

      setIsShow(false)
      reset()
    }
  })

  return {
    mutateAsync,
    isPending,
    isError,
    error
  }
}
