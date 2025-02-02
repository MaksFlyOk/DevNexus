import { MemberType } from '@types'
import { MemberCard } from '@ui'

export const useMembersSearch = () => {
  return function (inputValue: string, memberListData: MemberType[]) {
    if (inputValue.charAt(0) === '@') {
      const value = inputValue.substring(1, inputValue.length)
      console.log('Search by tag: ', value)
      return memberListData
        .filter(member =>
          member.tags.find(tag =>
            tag.tagText.toLowerCase().includes(value.toLowerCase())
          )
        )
        .map((member, iter: number) => (
          <MemberCard
            name={member.name}
            img={member.img}
            tags={member.tags}
            key={'User card ' + iter}
          />
        ))
    }

    return memberListData
      .filter(member =>
        member.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((member, iter: number) => (
        <MemberCard
          name={member.name}
          img={member.img}
          tags={member.tags}
          key={'User card ' + iter}
        />
      ))
  }
}
