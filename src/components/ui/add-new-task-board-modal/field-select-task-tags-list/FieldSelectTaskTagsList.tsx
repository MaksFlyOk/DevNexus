import { TagType } from '@types'
import { convertBgColor } from '@utils/convertBgColor'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue
} from 'react-hook-form'
import { AddNewCardTagForm } from './AddNewCardTagForm'
import { TaskTagCardSelect } from './task-tag-card-select/TaskTagCardSelect'

interface SelectTaskTagListProps<T extends FieldValues> {
  name: Path<T>
  tagList: TagType[]
  label: string
  placeholder?: string
  disabled?: boolean
  error: string | undefined
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
}

export const FieldSelectTaskTagList = <T extends FieldValues>({
  name,
  tagList,
  label,
  placeholder = 'ㅤ',
  disabled = false,
  error,
  control,
  defaultValue
}: SelectTaskTagListProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isInputStart, setIsInputStart] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [filteredTags, setFilteredTags] = useState<TagType[] | null>(null)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (tagList) {
      const filterTagFunction = () => {
        if (searchTerm.charAt(0) === '@') {
          const term = searchTerm.substring(1, searchTerm.length)

          return tagList.filter(tag =>
            tag.color.toLowerCase().includes(term.toLowerCase())
          )
        }

        return tagList.filter(tag =>
          tag.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      setFilteredTags(filterTagFunction())
    }
  }, [tagList, searchTerm])

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
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className='mb-3'>
          <label htmlFor={'validationServer_' + name} className='form-label'>
            {label}
          </label>
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
              <div className='d-flex gap-1'>
                {field.value?.length !== 0
                  ? field.value.map((tag: TagType) => (
                      <span
                        key={`${tag.name}${tag.code}`}
                        className={`badge mw-100 ${convertBgColor(
                          tag.color
                        )} d-flex gap-2 align-items-center `}
                      >
                        {tag.name}
                        <button
                          type='button'
                          className='btn btn-close'
                          onClick={() => {
                            field.onChange([
                              ...field.value.filter(
                                (fieldTag: TagType) =>
                                  fieldTag.code !== tag.code
                              )
                            ])
                          }}
                        />
                      </span>
                    ))
                  : placeholder}
              </div>
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
                  onFocus={e => (e.target.value = '')}
                  ref={searchInputRef}
                />
                <div className='overflow-scroll' style={{ maxHeight: '50vh' }}>
                  {tagList?.length === 0 || !tagList ? (
                    searchTerm ? (
                      <div className='p-1'>
                        <AddNewCardTagForm
                          setIsOpen={setIsOpen}
                          newTagName={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </div>
                    ) : (
                      <button className='dropdown-item' type='button' disabled>
                        Тэги отсутсвуют
                      </button>
                    )
                  ) : filteredTags?.filter(tag => {
                      const arr: Array<string | undefined> = []

                      field.value?.forEach((fieldTag: TagType) =>
                        arr.push(fieldTag.code)
                      )

                      return !arr.includes(tag.code)
                    }).length !== 0 ? (
                    filteredTags
                      ?.filter(tag => {
                        const arr: Array<string | undefined> = []

                        field.value?.forEach((fieldTag: TagType) =>
                          arr.push(fieldTag.code)
                        )

                        return !arr.includes(tag.code)
                      })
                      ?.map(tag => (
                        <button
                          key={`${tag.name}${tag.code}`}
                          className='dropdown-item p-1'
                          type='button'
                          onClick={() => {
                            field.onChange({
                              target: {
                                value:
                                  field.value?.length < 3
                                    ? [
                                        ...field.value,
                                        {
                                          name: tag.name,
                                          color: tag.color,
                                          code: tag.code
                                        }
                                      ]
                                    : field.value
                              }
                            })
                            setIsOpen(false)
                          }}
                        >
                          <TaskTagCardSelect
                            tagName={tag.name}
                            color={tag.color}
                          />
                        </button>
                      ))
                  ) : (
                    <div className='p-1'>
                      <AddNewCardTagForm
                        setIsOpen={setIsOpen}
                        newTagName={searchTerm}
                        setSearchTerm={setSearchTerm}
                      />
                    </div>
                  )}
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
