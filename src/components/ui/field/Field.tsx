import { useEffect, useState } from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

interface FieldPropsType<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>
  name: Path<TFieldValues>
  label: string
  placeholder?: string
  defaultValue?: string | undefined
  error: string | undefined
  options?: object
  disabled?: boolean
  type: string
}

export const Field = <TFieldValues extends FieldValues>({
  register,
  name,
  label,
  placeholder,
  error,
  defaultValue = undefined,
  options,
  disabled = false,
  type
}: FieldPropsType<TFieldValues>) => {
  const [isInputStart, setIsInputStart] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (!isInputStart && isFocused) setIsInputStart(prev => !prev)
  }, [error])

  console.log(defaultValue)

  return (
    <div className='mb-3'>
      <label htmlFor={'validationServer_' + name} className='form-label'>
        {label}
      </label>
      <input
        {...register(name, options)}
        type={type}
        onFocus={() => setIsFocused(true)}
        disabled={disabled}
        className={
          isInputStart
            ? error
              ? 'form-control is-invalid'
              : 'form-control is-valid'
            : 'form-control'
        }
        id={'validationServer_' + name}
        placeholder={placeholder}
        defaultValue={defaultValue}
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
