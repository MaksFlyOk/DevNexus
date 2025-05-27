import { AccentColorsType, TagType, UserType } from '@types'
import { MemberCard } from '@ui'

export type TagTypeWithPrimaryColor = Omit<TagType, 'color'> & {
  color: AccentColorsType | 'primary'
}

export const useMembersSearch = (mapping = true) => {
  return function (
    inputValue: string,
    memberListData:
      | (UserType & { tags: TagTypeWithPrimaryColor[] })[]
      | undefined
  ) {
    if (!memberListData) return memberListData

    if (inputValue.charAt(0) === '@') {
      const value = inputValue.substring(1, inputValue.length)

      return mapping
        ? memberListData
            .filter(member =>
              member.tags.find(tag =>
                tag.name.toLowerCase().includes(value.toLowerCase())
              )
            )
            .map((member, iter: number) => (
              <MemberCard
                name={member.username}
                tags={member.tags}
                key={'User card ' + iter}
              />
            ))
        : memberListData.filter(member =>
            member.tags.find(tag =>
              tag.name.toLowerCase().includes(value.toLowerCase())
            )
          )
    }

    return mapping
      ? memberListData
          .filter(member =>
            member.username.toLowerCase().includes(inputValue.toLowerCase())
          )
          .map((member, iter: number) => (
            <MemberCard
              name={member.username}
              tags={member.tags}
              key={'User card ' + iter}
            />
          ))
      : memberListData.filter(member =>
          member.username.toLowerCase().includes(inputValue.toLowerCase())
        )
  }
}
