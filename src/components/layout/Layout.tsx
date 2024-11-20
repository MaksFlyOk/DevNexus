import { Nav } from '@layout/nav'
import { GroupType, MemberType, UserType } from '@types'
import { GroupList, Logo, MemberList } from '@ui'
import { FC, ReactElement } from 'react'

interface LayoutProps {
  groupsData: GroupType[]
  membersData: MemberType[]
  userData: UserType
  children?: ReactElement
}

export const Layout: FC<LayoutProps> = ({
  children,
  groupsData,
  membersData,
  userData
}) => {
  return (
    <div className='container-fluid vh-100'>
      <div
        className='row z-0 position-relative'
        style={{ height: 'calc(100vh - 95px)' }}
      >
        <div className='col-1 h-100 overflow-y-scroll border-end border-2 border-primary bg-light-subtle'>
          <div className='sticky-top bg-light-subtle pt-3 pb-3 border-bottom border-2 border-primary'>
            <Logo />
          </div>
          <GroupList groupListData={groupsData} />
        </div>
        <div className='col-2 h-100 overflow-y-scroll border-end border-2 border-primary bg-light-subtle'>
          <MemberList memberListData={membersData} />
        </div>
        <div className='col px-4 py-3'>{children}</div>
      </div>
      <div
        className='row z-1 position-relative'
        style={{ height: 'calc(100vh - (100vh - 95px))' }}
      >
        <Nav img={userData.img} name={userData.name} />
      </div>
    </div>
  )
}
