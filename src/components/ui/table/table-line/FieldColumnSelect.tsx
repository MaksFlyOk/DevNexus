import { AccentColorsType } from '@types'
import { convertBorderColor } from '@utils/convertBorderColor'
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
  columnValueList: Array<{ label: string; value: string }>
  columnColorList: Array<{
    name: string
    color: AccentColorsType
    columnIter: number
  }>
  handelChangeField(): void
  label?: string
  placeholder?: string
  disabled?: boolean
  error: string | undefined
  control: Control<T>
  defaultColor: AccentColorsType
  defaultValue: PathValue<T, Path<T>>
}

export const FieldColumnSelect = <T extends FieldValues>({
  name,
  columnValueList,
  columnColorList,
  handelChangeField,
  placeholder = 'ㅤ',
  disabled = false,
  error,
  control,
  defaultColor,
  defaultValue
}: SelectProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLInputElement>(null)

  const filteredOptions = columnValueList.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  useEffect(() => {
    // TODO
    console.log(error)
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
        setSearchTerm('')
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
          <div className='form-group position-relative'>
            <div
              className={`form-control ${convertBorderColor(defaultColor)}`}
              onClick={() => setIsOpen(prev => !prev)}
              onBlur={() => setIsOpen(false)}
            >
              {field.value ? field.value : placeholder}
            </div>
            {isOpen && (
              <div
                ref={dropdownRef}
                className='dropdown-menu show'
                style={{ width: '100%', top: 'inherit' }}
              >
                <input
                  type='text'
                  className='form-control mb-2'
                  placeholder='Search...'
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  ref={searchInputRef}
                />
                <div
                  className='overflow-scroll px-1'
                  style={{ maxHeight: '20vh' }}
                >
                  {filteredOptions.map(option => (
                    <button
                      key={option.label}
                      className={`dropdown-item border mb-1 rounded ${convertBorderColor(
                        columnColorList.find(
                          column => option.label === column.name
                        )?.color
                      )}`}
                      type='button'
                      onClick={() => {
                        field.onChange({ target: { value: option.value } })
                        handelChangeField()
                        setIsOpen(false)
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
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
