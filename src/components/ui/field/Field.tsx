import { AuthMutationParamsType } from '@types'
import { UseFormRegister } from 'react-hook-form'

type FieldTypesType = 'text' | 'password' | 'email'

interface FieldPropsType {
  register: UseFormRegister<AuthMutationParamsType>
  name: 'password' | 'email' | 'name'
  label: string
  placeholder: string
  error: string | undefined
  options: object
  disabled: boolean
  type: FieldTypesType
}

export const Field = ({
  register,
  name,
  label,
  placeholder,
  error,
  options,
  disabled,
  type
}: FieldPropsType) => {
  return (
    <div className='mb-3'>
      <label htmlFor={'validationServer_' + name} className='form-label'>
        {label}
      </label>
      <input
        {...register(name, options)}
        type={type}
        disabled={disabled}
        className={error ? 'form-control is-invalid' : 'form-control is-valid'}
        id={'validationServer_' + name}
        placeholder={placeholder}
        aria-describedby={'validationServer_' + name}
        required={false}
      />
      <div
        id={'validationServer_' + name + 'FeedBack'}
        className='invalid-feedback'
      >
        {error}
      </div>
    </div>
  )
}
