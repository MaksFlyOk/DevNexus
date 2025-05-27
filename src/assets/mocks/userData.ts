import { UserProfileType } from '@types'

export const userData: UserProfileType = {
  user: {
    username: 'Павел Николаев',
    email: 'p.nikovaev@devnexus.com',
    description: 'Менеджер проектов с опытом работы в различных проектах.'
  },
  groups: [
    {
      id: 1,
      group_uuid: 'f81e7af3-fcf4-4cdd-b3a3-14a8087aa191',
      name: 'group1',
      icon: null,
      cards: [
        {
          code: '000007',
          column_color: 'blue',
          title: 'Разработка новой функции',
          column: 'В процессе',
          assignee: 'Павел Николаев',
          description: 'Разработать новую функцию для приложения.',
          start_date: '2023-10-11',
          end_date: '2023-10-22',
          tags: [
            {
              name: 'Разработка',
              code: '000011',
              color: 'green'
            },
            {
              name: 'Высокий приоритет',
              code: '000001',
              color: 'red'
            }
          ]
        },
        {
          code: '000012',
          column_color: 'green',
          title: 'Проверка документации',
          column: 'На проверке',
          assignee: 'Павел Николаев',
          description: 'Проверить обновленную документацию.',
          start_date: '2023-10-25',
          end_date: '2023-10-27',
          tags: [
            {
              name: 'Документация',
              code: '000015',
              color: 'blue'
            },
            {
              name: 'Низкий приоритет',
              code: '000003',
              color: 'green'
            }
          ]
        },
        {
          code: '000018',
          column_color: 'yellow',
          title: 'Развертывание функции',
          column: 'Выполнено',
          assignee: 'Павел Николаев',
          description: 'Развернуть новую функцию в рабочей среде.',
          start_date: '2023-10-30',
          end_date: '2023-10-30',
          tags: [
            {
              name: 'Развертывание',
              code: '000016',
              color: 'blue'
            },
            {
              name: 'Высокий приоритет',
              code: '000001',
              color: 'red'
            }
          ]
        }
      ]
    }
  ]
}
