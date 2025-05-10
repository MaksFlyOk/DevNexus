import { UserProfileType } from '@types'

export const userData: UserProfileType = {
  user: {
    username: 'Грейс',
    email: 'grays@example.com'
  },
  groups: [
    {
      id: 1,
      group_uuid: 'hWF6BiZ8pqkakpNhDfZcTo',
      name: 'group1',
      icon: null,
      cards: [
        {
          code: '000001',
          title: 'Оптимизация производительности',
          column: 'К выполнению',
          assignee: 'Грейс',
          description: 'Оптимизировать производительность приложения.',
          start_date: '2023-10-10',
          end_date: '2023-10-18',
          tags: [
            {
              name: 'Оптимизация',
              color: 'blue'
            },
            {
              name: 'Средний приоритет',
              color: 'yellow'
            }
          ]
        },
        {
          code: '000002',
          title: 'Разработка новой функции',
          column: 'В процессе',
          assignee: 'Грейс',
          description: 'Разработать новую функцию для приложения.',
          start_date: '2023-10-11',
          end_date: '2023-10-22',
          tags: [
            {
              name: 'Разработка',
              color: 'green'
            },
            {
              name: 'Высокий приоритет',
              color: 'red'
            }
          ]
        },
        {
          code: '000003',
          title: 'Проверка документации',
          column: 'На проверке',
          assignee: 'Грейс',
          description: 'Проверить обновленную документацию.',
          start_date: '2023-10-25',
          end_date: '2023-10-27',
          tags: [
            {
              name: 'Документация',
              color: 'blue'
            },
            {
              name: 'Низкий приоритет',
              color: 'green'
            }
          ]
        },
        {
          code: '000004',
          title: 'Развертывание функции',
          column: 'Выполнено',
          assignee: 'Грейс',
          description: 'Развернуть новую функцию в рабочей среде.',
          start_date: '2023-10-30',
          end_date: '2023-10-30',
          tags: [
            {
              name: 'Развертывание',
              color: 'blue'
            },
            {
              name: 'Высокий приоритет',
              color: 'red'
            }
          ]
        }
      ]
    }
  ]
}
