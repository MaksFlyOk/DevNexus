import { AccentColorsType, TagType } from '@types'
import { Tag } from '@ui/tag'
import { convertBgColor } from '@utils/convertBgColor'
import { convertButtonOutlineColor } from '@utils/convertButtonOutlineColor'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue
} from 'react-hook-form'
import { AddNewTagForm } from './AddNewTagForm'

interface FieldSelectTagListProps<T extends FieldValues> {
  name: Path<T>
  deleteTagFunction?: (code: string) => void
  createTagFunctionWithGroupId?: (
    name: string,
    color: AccentColorsType,
    groupId: string
  ) => void
  createTagFunctionWithoutGroupId?: (
    name: string,
    color: AccentColorsType
  ) => void
  createIsPending: boolean
  maxTags?: number
  groupId?: string
  withGroupId?: boolean
  tagList: TagType[]
  label: string
  placeholder?: string
  disabled?: boolean
  error: string | undefined
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
}

export const FieldSelectTagList = <T extends FieldValues>({
  name,
  deleteTagFunction,
  createTagFunctionWithGroupId,
  createTagFunctionWithoutGroupId,
  createIsPending,
  maxTags = 3,
  groupId,
  withGroupId = false,
  tagList,
  label,
  placeholder = 'ㅤ',
  disabled = false,
  error,
  control,
  defaultValue
}: FieldSelectTagListProps<T>) => {
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
    if (!isInputStart && isOpen) setIsInputStart(prev => !prev)
  }, [error, isOpen])

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
        validate: fieldValues => {
          if (fieldValues?.length > maxTags) {
            return `Максимальное количество тэгов ${maxTags}`
          }
        }
      }}
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
                        <AddNewTagForm
                          groupId={groupId}
                          createTagFunction={(
                            name: string,
                            color: AccentColorsType,
                            groupId?: string
                          ) => {
                            if (groupId && withGroupId) {
                              if (createTagFunctionWithGroupId)
                                createTagFunctionWithGroupId(
                                  name,
                                  color,
                                  groupId
                                )
                            } else {
                              if (createTagFunctionWithoutGroupId)
                                createTagFunctionWithoutGroupId(name, color)
                            }
                          }}
                          createIsPending={createIsPending}
                          setIsOpen={setIsOpen}
                          newTagName={searchTerm}
                          setSearchTerm={setSearchTerm}
                        />
                      </div>
                    ) : (
                      <button className='dropdown-item' type='button' disabled>
                        Тэги отсутствуют
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
                        <div
                          className='mb-2 px-2 d-flex gap-2 justify-content-between'
                          key={`${tag.name}${tag.code}`}
                        >
                          <button
                            className={`btn w-100 p-1 ${convertButtonOutlineColor(
                              tag.color
                            )}`}
                            type='button'
                            onClick={() => {
                              field.onChange({
                                target: {
                                  value:
                                    field.value?.length < maxTags
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
                            <Tag color={tag.color} tagName={tag.name} />
                          </button>
                          {deleteTagFunction === undefined ||
                          groupId === undefined ? null : (
                            <button
                              className='btn btn-outline-light'
                              type='button'
                              onClick={() => deleteTagFunction(tag.code)}
                            >
                              -
                            </button>
                          )}
                        </div>
                      ))
                  ) : (
                    <div className='p-1'>
                      <AddNewTagForm
                        groupId={groupId}
                        createTagFunction={(
                          name: string,
                          color: AccentColorsType,
                          groupId?: string
                        ) => {
                          if (groupId && withGroupId) {
                            if (createTagFunctionWithGroupId)
                              createTagFunctionWithGroupId(name, color, groupId)
                          } else {
                            if (createTagFunctionWithoutGroupId)
                              createTagFunctionWithoutGroupId(name, color)
                          }
                        }}
                        createIsPending={createIsPending}
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
