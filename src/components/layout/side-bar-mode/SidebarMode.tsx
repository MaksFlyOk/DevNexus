import { Nav } from '@layout/nav'
import { GroupType, UserProfileType } from '@types'
import { GroupList } from '@ui/group-list'
import { Logo } from '@ui/logo'
import { MemberList } from '@ui/member-list'
import { UserProfileCard } from '@ui/user-profile-card'
import { FC, ReactElement, useEffect, useRef, useState } from 'react'
import './SidebarMode.scss'

interface SideBarModeProps {
  isUserPending: boolean
  isUserError: boolean
  userData: UserProfileType | undefined
  sideBarMode: boolean
  isGroupPending: boolean
  isGroupError: boolean
  groupData: GroupType | undefined
  children: ReactElement
}

function findAllElementsUpwards(
  element: HTMLElement,
  selector: string
): HTMLElement[] {
  const elements: HTMLElement[] = []
  let current: HTMLElement | null = element

  while (current) {
    if (current.matches(selector)) {
      elements.push(current)
    }
    current = current.parentElement
  }

  return elements
}

export const SidebarMode: FC<SideBarModeProps> = ({
  isUserPending,
  isUserError,
  userData,
  sideBarMode,
  isGroupPending,
  isGroupError,
  groupData,
  children
}) => {
  const sideBarContainer = useRef<HTMLDivElement>(null)

  const [isShowSideBar, setIsShowSideBar] = useState<boolean | undefined>(
    undefined
  )

  const handleClickOutside = (e: MouseEvent) => {
    if (sideBarContainer.current && e.target) {
      if (
        findAllElementsUpwards(e.target as HTMLElement, '.custom-modal-hide')[0]
      ) {
        setIsShowSideBar(false)
      }
    }
  }

  useEffect(() => {
    if (sideBarContainer.current === null) {
      setIsShowSideBar(undefined)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [sideBarMode])

  // Decompose to components
  return !sideBarMode ? (
    <>
      <div className='row position-relative main-container-without-sidebar'>
        <div className='col-1 h-100 overflow-y-scroll border-end border-2 border-primary bg-light-subtle'>
          <div className='sticky-top bg-light-subtle py-3 border-bottom border-2 border-primary'>
            <Logo />
          </div>
          <GroupList
            isUserPending={isUserPending}
            isUserError={isUserError}
            userData={userData}
          />
        </div>
        <div className='col-2 h-100 overflow-y-scroll overflow-x-hidden border-end border-2 border-primary bg-light-subtle'>
          {groupData ? (
            <MemberList
              isGroupPending={isGroupPending}
              isGroupError={isGroupError}
              groupData={groupData}
            />
          ) : (
            <div className='d-flex h-100 justify-content-center align-items-center'>
              <p
                style={{ rotate: '90deg' }}
                className='fs-2 text-body-secondary text-nowrap'
              >
                Здесь пока ничего нету
              </p>
            </div>
          )}
        </div>
        <div className='col h-100 w-75 px-4 py-3'>{children}</div>
      </div>
      <div className='row position-relative nav-container-without-sidebar'>
        <Nav
          isUserPending={isUserPending}
          isUserError={isUserError}
          userData={userData}
          minimizeMode={true}
        />
      </div>
    </>
  ) : (
    <>
      <div className='row position-relative main-container-with-sidebar'>
        <div
          className={`${
            isShowSideBar ? 'd-block' : 'd-none'
          } position-fixed w-100 h-100 bg-dark-subtle opacity-50`}
          style={{ zIndex: 1030 }}
        ></div>
        <div
          className={`offcanvas offcanvas-start px-0 border-end border-2 border-primary overflow-x-hidden ${
            isShowSideBar === undefined
              ? 'hidden'
              : isShowSideBar
              ? 'show'
              : 'hiding'
          }`}
          tabIndex={-1}
          data-bs-keyboard
          ref={sideBarContainer}
        >
          <div className='offcanvas-header pt-1 pb-0'>
            <div className='d-flex align-items-center gap-2'>
              <Logo />
              <h5 className='offcanvas-title' id='sidebarLabel'>
                DevNexus
              </h5>
            </div>
            <button
              type='button'
              className='btn-close'
              onClick={() => setIsShowSideBar(false)}
              aria-label='Закрыть'
            ></button>
          </div>
          <div className='offcanvas-body pt-0 mt-2 pb-0 px-2 border-top border-2 border-primary overflow-x-hidden'>
            <div className='row position-relative d-flex sidebar-main'>
              <div className='col-3 h-100 overflow-y-scroll border-end border-2 border-primary bg-light-subtle'>
                <GroupList
                  isUserPending={isUserPending}
                  isUserError={isUserError}
                  userData={userData}
                />
              </div>
              <div className='col-9 h-100 overflow-y-scroll overflow-x-hidden bg-light-subtle'>
                {groupData ? (
                  <MemberList
                    isGroupPending={isGroupPending}
                    isGroupError={isGroupError}
                    groupData={groupData}
                  />
                ) : (
                  <div className='d-flex h-100 justify-content-center align-items-center'>
                    <p
                      style={{ rotate: '90deg' }}
                      className='fs-2 text-body-secondary text-nowrap'
                    >
                      Здесь пока ничего нету
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className='row position-relative border-top border-2 border-primary sidebar-profile'>
              <UserProfileCard
                isPending={isUserPending}
                isError={isUserError}
                userData={userData}
              />
            </div>
          </div>
        </div>
        <div className='col h-100 px-4 pt-3'>{children}</div>
        <div className='row position-relative mx-0 nav-container-with-sidebar'>
          <Nav setIsShowSideBar={setIsShowSideBar} />
        </div>
      </div>
    </>
  )
}
