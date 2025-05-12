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
          code: '000004',
          title: 'Оптимизация производительности',
          column: 'К выполнению',
          assignee: 'Павел Николаев',
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
          code: '000007',
          title: 'Разработка новой функции',
          column: 'В процессе',
          assignee: 'Павел Николаев',
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
          code: '000012',
          title: 'Проверка документации',
          column: 'На проверке',
          assignee: 'Павел Николаев',
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
          code: '000018',
          title: 'Развертывание функции',
          column: 'Выполнено',
          assignee: 'Павел Николаев',
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
