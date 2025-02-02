import { Nav } from '@layout/nav'
import { GroupList, Logo, MemberList } from '@ui'
import { FC, ReactElement } from 'react'

interface LayoutProps {
  membersListId: number
  children?: ReactElement
}

export const Layout: FC<LayoutProps> = ({ children, membersListId }) => {
  return (
    <div className='container-fluid vh-100'>
      <div
        className='row position-relative'
        style={{ height: 'calc(100vh - 95px)' }}
      >
        <div className='col-1 h-100 overflow-y-scroll border-end border-2 border-primary bg-light-subtle'>
          <div className='sticky-top bg-light-subtle py-3 border-bottom border-2 border-primary'>
            <Logo />
          </div>
          <GroupList />
        </div>
        <div className='col-2 h-100 overflow-y-scroll border-end border-2 border-primary bg-light-subtle'>
          <MemberList memberListId={membersListId} />
        </div>
        <div className='col h-100 w-75 px-4 py-3'>{children}</div>
      </div>
      <div
        className='row position-relative'
        style={{ height: 'calc(100vh - (100vh - 95px))' }}
      >
        <Nav />
      </div>
    </div>
  )
}
