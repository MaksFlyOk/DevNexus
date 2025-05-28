import {
  TagTypeWithPrimaryColor,
  useMembersSearch
} from '@hooks/useMembersSearch'
import { UserType } from '@types'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useRef, useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue
} from 'react-hook-form'
import { MemberCardSelect } from './member-card-select/MemberCardSelect'

interface FieldSelectMemberListProps<T extends FieldValues> {
  name: Path<T>
  memberList: UserType[] | null
  label: string
  placeholder?: string
  disabled?: boolean
  mandatory?: boolean
  error: string | undefined
  control: Control<T>
  defaultValue?: PathValue<T, Path<T>>
}

export const FieldSelectMemberList = <T extends FieldValues>({
  name,
  memberList,
  label,
  placeholder = 'ㅤ',
  disabled = false,
  mandatory = true,
  error,
  control,
  defaultValue
}: FieldSelectMemberListProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isInputStart, setIsInputStart] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [filteredMembers, setFilteredMembers] = useState<
    (UserType & { tags: TagTypeWithPrimaryColor[] })[] | undefined
  >(undefined)

  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLInputElement>(null)

  const searchMembersFunction = useMembersSearch(false)

  useEffect(() => {
    if (memberList) {
      console.log(searchMembersFunction(searchTerm, memberList))

      setFilteredMembers(
        searchMembersFunction(searchTerm, memberList) as
          | (UserType & { tags: TagTypeWithPrimaryColor[] })[]
          | undefined
      )
    }
  }, [memberList, searchTerm])

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
        validate: mandatory
          ? fieldValue => {
              if (!isInputStart) setIsInputStart(prev => !prev)

              if (fieldValue === '' || fieldValue === undefined) {
                return `Поле не может быть пустым`
              }
            }
          : undefined
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
                  onFocus={e => (e.target.value = '')}
                  ref={searchInputRef}
                />
                <div className='overflow-scroll' style={{ maxHeight: '30vh' }}>
                  {memberList?.length === 0 || !memberList ? (
                    <button className='dropdown-item' type='button' disabled>
                      Здесь пока никого нет
                    </button>
                  ) : (
                    filteredMembers?.map((member, iter) => (
                      <button
                        key={`${member.username}_${iter}`}
                        className='dropdown-item p-1'
                        type='button'
                        onClick={() => {
                          field.onChange({ target: { value: member.username } })
                          setIsOpen(false)
                        }}
                      >
                        <MemberCardSelect
                          name={member.username}
                          tags={member.tags}
                        />
                      </button>
                    ))
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
