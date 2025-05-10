import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue
} from 'react-hook-form'

interface SelectProps<T extends FieldValues> {
  name: Path<T>
  list: { label: string; value: string }[]
  label?: string
  placeholder?: string
  disabled?: boolean
  error: string | undefined
  control: Control
  defaultValue?: PathValue<T, Path<T>>
}

export const FieldSelect = <T extends FieldValues>({
  name,
  list,
  label,
  placeholder = 'ㅤ',
  disabled = false,
  error,
  control,
  defaultValue
}: SelectProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isInputStart, setIsInputStart] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLInputElement>(null)

  const filteredOptions = list.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    if (!isInputStart) setIsInputStart(prev => !prev)
  }, [error])

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [dropdownRef])

  return (
    <Controller
      name={name}
      disabled={disabled}
      control={control}
      rules={{
        required: { value: true, message: 'Поле не может быть пустым' }
      }}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className='mb-3'>
          {label ? (
            <label htmlFor={'validationServer_' + name} className='form-label'>
              {label}
            </label>
          ) : null}
          <div className='form-group position-relative'>
            <div
              className={
                isInputStart
                  ? error
                    ? 'form-control is-invalid'
                    : 'form-control is-valid'
                  : 'form-control'
              }
              onClick={() => setIsOpen(prev => !prev)}
              onBlur={() => setIsOpen(false)}
            >
              {field.value ? field.value : placeholder}
            </div>
            {isOpen && (
              <div
                ref={dropdownRef}
                className='dropdown-menu show'
                style={{ width: '100%' }}
              >
                <input
                  type='text'
                  className='form-control mb-2'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  ref={searchInputRef}
                />
                {filteredOptions.map(option => (
                  <button
                    key={option.label}
                    className='dropdown-item'
                    type='button'
                    onClick={() => {
                      field.onChange({ target: { value: option.value } })
                      setIsOpen(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
            <div
              id={'validationServer_' + name + 'FeedBack'}
              className='invalid-feedback'
            >
              {error}
            </div>
          </div>
        </div>
      )}
    />
  )
}
