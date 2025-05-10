import { UserType } from '@types'
import { MemberCard } from '@ui'

// TODO
export const useMembersSearch = () => {
  return function (inputValue: string, memberListData: UserType[] | undefined) {
    return memberListData
      ? memberListData
          .filter(member =>
            member.username.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((member, iter: number) => (
            <MemberCard name={member.username} key={'User card ' + iter} />
          ))
      : memberListData
  }
}
