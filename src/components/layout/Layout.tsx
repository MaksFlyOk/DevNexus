import { WindowDimensionsView } from '@dev/window-dimensions-view'
import { useGetUser } from '@hooks/queries'
import { useActions, useTypedSelector } from '@hooks/redux-hooks'
import useWindowDimensions from '@hooks/useWindowDimensions'
import { GroupType } from '@types'
import { checkToken } from '@utils/checkToken'
import { FC, ReactElement, useEffect } from 'react'
import './Layout.scss'
import { SidebarMode } from './side-bar-mode'

interface LayoutProps {
  children: ReactElement
  isGroupPending: boolean
  isGroupError: boolean
  groupData: GroupType | undefined
}

export const Layout: FC<LayoutProps> = ({
  children,
  isGroupPending,
  isGroupError,
  groupData
}) => {
  const { setAuthState } = useActions()

  const { auth } = useTypedSelector(state => state.authState)

  const { width } = useWindowDimensions()

  const { isPending, isError, data } = useGetUser()

  useEffect(() => {
    if (!checkToken()) {
      setAuthState(false)
    }
  }, [auth, isPending])

  return (
    <>
      {/* <div
        className='position-absolute bottom-0 end-0'
        style={{ zIndex: 100000 }}
      >
        <div className='pe-3 pb-4'>
          <h1>3121212121212</h1>
          <h1>3121212121212</h1>
          <h1>3121212121212</h1>
        </div>
      </div> */}
      <div
        className={`${
          width <= 1440 ? 'container-fluid' : 'layout-container'
        } vh-100`}
      >
        <WindowDimensionsView />
        <SidebarMode
          isUserPending={isPending}
          isUserError={isError}
          userData={data}
          isGroupPending={isGroupPending}
          isGroupError={isGroupError}
          groupData={groupData}
          sideBarMode={width <= 1200}
        >
          {children}
        </SidebarMode>
      </div>
    </>
  )
}
