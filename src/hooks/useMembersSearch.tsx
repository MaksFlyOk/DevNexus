import { TagType, UserType } from '@types'
import { MemberCard } from '@ui'

// TODO:
export const useMembersSearch = () => {
  return function (
    inputValue: string,
    memberListData: (UserType & { tags: TagType[] })[] | undefined
  ) {
    return memberListData
      ? memberListData
          .filter(member =>
            member.username.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((member, iter: number) => (
            <MemberCard
              tags={member.tags}
              name={member.username}
              key={'User card ' + iter}
            />
          ))
      : memberListData
  }
}
