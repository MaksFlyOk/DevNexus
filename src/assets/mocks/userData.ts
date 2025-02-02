import { UserType } from '@types'

export const userData: UserType = {
  name: 'Грейс',
  email: 'grays@example.com',
  about: 'Привет, я Грейс! Это моя страница пользователя.',
  tasks: [
    {
      name: 'К выполнению',
      color: 'red',
      sum: 1,
      tasks: [
        {
          name: 'Оптимизация производительности',
          column: 'К выполнению',
          worker: 'Грейс',
          description: 'Оптимизировать производительность приложения.',
          date: '2023-10-18',
          tags: [
            {
              tagText: 'Оптимизация',
              color: 'blue'
            },
            {
              tagText: 'Средний приоритет',
              color: 'yellow'
            }
          ]
        }
      ]
    },
    {
      name: 'В процессе',
      color: 'blue',
      sum: 1,
      tasks: [
        {
          name: 'Разработка новой функции',
          column: 'В процессе',
          worker: 'Грейс',
          description: 'Разработать новую функцию для приложения.',
          date: '2023-10-22',
          tags: [
            {
              tagText: 'Разработка',
              color: 'green'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'red'
            }
          ]
        }
      ]
    },
    {
      name: 'На проверке',
      color: 'green',
      sum: 1,
      tasks: [
        {
          name: 'Проверка документации',
          column: 'На проверке',
          worker: 'Грейс',
          description: 'Проверить обновленную документацию.',
          date: '2023-10-27',
          tags: [
            {
              tagText: 'Документация',
              color: 'blue'
            },
            {
              tagText: 'Низкий приоритет',
              color: 'green'
            }
          ]
        }
      ]
    },
    {
      name: 'Выполнено',
      color: 'yellow',
      sum: 1,
      tasks: [
        {
          name: 'Развертывание функции',
          column: 'Выполнено',
          worker: 'Грейс',
          description: 'Развернуть новую функцию в рабочей среде.',
          date: '2023-10-30',
          tags: [
            {
              tagText: 'Развертывание',
              color: 'blue'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'red'
            }
          ]
        }
      ]
    }
  ]
}
