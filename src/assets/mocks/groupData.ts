import { GroupType } from '@types'

export const groupData: GroupType = {
  id: 1,
  group_uuid: 'UUID',
  name: 'Основная группа',
  icon: null,
  members: [
    {
      email: 'all.random@devnexus.com',
      username: 'Все совпадения случайны'
    },
    {
      email: 'i.ivanov@devnexus.com',
      username: 'Иван Иванов'
    },
    {
      email: 'a.petorva@devnexus.com',
      username: 'Анна Петрова'
    },
    {
      email: 'd.smiron@devnexus.com',
      username: 'Дмитрий Смирнов'
    },
    {
      email: 'e.kuznecova@devnexus.com',
      username: 'Елена Кузнецова'
    },
    {
      email: 'a.sokolov@devnexus.com',
      username: 'Алексей Соколов'
    },
    {
      email: 'm.fedorova@devnexus.com',
      username: 'Мария Федорова'
    },
    {
      email: 's.lebedev@devnexus.com',
      username: 'Сергей Лебедев'
    },
    {
      email: '0.morozova@devnexus.com',
      username: 'Ольга Морозова'
    },
    {
      email: 'p.nikovaev@devnexus.com',
      username: 'Павел Николаев'
    },
    {
      email: 'u.vasileva@devnexus.com',
      username: 'Юлия Васильева'
    }
  ],
  description: 'Основная группа разработки',
  admin: {
    username: 'Павел Николаев',
    email: 'p.nikovaev@devnexus.com'
  },
  board: {
    columns: [
      {
        code: 0,
        name: 'К выполнению',
        color: 'red',
        tasks: [
          {
            title: 'Разработка дизайна главной страницы',
            column: 'К выполнению',
            assignee: 'Алиса',
            description:
              'Создать современный и адаптивный дизайн для главной страницы.',
            start_date: '2023-09-01',
            end_date: '2023-10-01',
            tags: [
              {
                name: 'Дизайн',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                color: 'red'
              }
            ]
          },
          {
            title: 'Создание макета',
            column: 'К выполнению',
            assignee: 'Чарли',
            description: 'Создать макет для новой страницы.',
            start_date: '2023-10-01',
            end_date: '2023-10-07',
            tags: [
              {
                name: 'Макет',
                color: 'blue'
              },
              {
                name: 'Низкий приоритет',
                color: 'green'
              }
            ]
          },
          {
            title: 'Исправление багов',
            column: 'К выполнению',
            assignee: 'Фрэнк',
            description: 'Исправить найденные баги в приложении.',
            start_date: '2023-10-03',
            end_date: '2023-10-15',
            tags: [
              {
                name: 'Баги',
                color: 'green'
              },
              {
                name: 'Высокий приоритет',
                color: 'red'
              }
            ]
          },
          {
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
          }
        ]
      },
      {
        code: 1,
        name: 'В процессе',
        color: 'blue',
        tasks: [
          {
            title: 'Разработка API',
            column: 'В процессе',
            assignee: 'Чарли',
            description: 'Разработать бэкенд API для новой функции.',
            start_date: '2023-09-10',
            end_date: '2023-10-10',
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
            title: 'Тестирование интерфейса',
            column: 'В процессе',
            assignee: 'Дэвид',
            description:
              'Провести тестирование удобства использования нового интерфейса.',
            start_date: '2023-10-15',
            end_date: '2023-10-25',
            tags: [
              {
                name: 'Тестирование',
                color: 'blue'
              },
              {
                name: 'Средний приоритет',
                color: 'yellow'
              }
            ]
          },
          {
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
            title: 'Написание блога',
            column: 'В процессе',
            assignee: 'Хейди',
            description: 'Написать блог о новых функциях продукта.',
            start_date: '2023-10-03',
            end_date: '2023-10-25',
            tags: [
              {
                name: 'Контент',
                color: 'blue'
              },
              {
                name: 'Средний приоритет',
                color: 'yellow'
              }
            ]
          },
          {
            title: 'Обновление документации',
            column: 'В процессе',
            assignee: 'Джон',
            description: 'Обновить документацию для новой функции.',
            start_date: '2023-05-30',
            end_date: '2023-10-30',
            tags: [
              {
                name: 'Документация',
                color: 'yellow'
              },
              {
                name: 'Средний приоритет',
                color: 'red'
              }
            ]
          }
        ]
      },
      {
        code: 2,
        name: 'На проверке',
        color: 'green',
        tasks: [
          {
            title: 'Проверка кода',
            column: 'На проверке',
            assignee: 'Ева',
            description: 'Проверить изменения кода для новой функции.',
            start_date: '2023-10-17',
            end_date: '2023-10-20',
            tags: [
              {
                name: 'Проверка кода',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                color: 'red'
              }
            ]
          },
          {
            title: 'Проверка дизайна',
            column: 'На проверке',
            assignee: 'Фрэнк',
            description: 'Проверить изменения дизайна для главной страницы.',
            start_date: '2023-09-25',
            end_date: '2023-10-25',
            tags: [
              {
                name: 'Проверка дизайна',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                color: 'yellow'
              }
            ]
          },
          {
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
            title: 'Проверка макета',
            column: 'На проверке',
            assignee: 'Хейди',
            description: 'Проверить созданный макет для новой страницы.',
            start_date: '2023-10-04',
            end_date: '2023-10-30',
            tags: [
              {
                name: 'Макет',
                color: 'yellow'
              },
              {
                name: 'Средний приоритет',
                color: 'red'
              }
            ]
          },
          {
            title: 'Проверка блога',
            column: 'На проверке',
            assignee: 'Иван',
            description: 'Проверить написанный блог о новых функциях продукта.',
            start_date: '2023-11-01',
            end_date: '2023-11-02',
            tags: [
              {
                name: 'Контент',
                color: 'green'
              },
              {
                name: 'Высокий приоритет',
                color: 'blue'
              }
            ]
          },
          {
            title: 'Проверка API',
            column: 'На проверке',
            assignee: 'Джон',
            description:
              'Проверить разработанный бэкенд API для новой функции.',
            start_date: '2023-10-05',
            end_date: '2023-11-05',
            tags: [
              {
                name: 'API',
                color: 'yellow'
              },
              {
                name: 'Средний приоритет',
                color: 'red'
              }
            ]
          },
          {
            title: 'Проверка интерфейса',
            column: 'На проверке',
            assignee: 'Алиса',
            description:
              'Проверить тестирование удобства использования нового интерфейса.',
            start_date: '2023-11-01',
            end_date: '2023-11-07',
            tags: [
              {
                name: 'Тестирование',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                color: 'green'
              }
            ]
          },
          {
            title: 'Проверка оптимизации',
            column: 'На проверке',
            assignee: 'Боб',
            description: 'Проверить оптимизацию производительности приложения.',
            start_date: '2023-10-25',
            end_date: '2023-11-10',
            tags: [
              {
                name: 'Оптимизация',
                color: 'yellow'
              },
              {
                name: 'Средний приоритет',
                color: 'red'
              }
            ]
          }
        ]
      },
      {
        code: 3,
        name: 'Выполнено',
        color: 'yellow',
        tasks: [
          {
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
          },
          {
            title: 'Мониторинг производительности',
            column: 'Выполнено',
            assignee: 'Хейди',
            description:
              'Мониторить производительность новой функции после развертывания.',
            start_date: '2023-10-25',
            end_date: '2023-11-05',
            tags: [
              {
                name: 'Мониторинг',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                color: 'yellow'
              }
            ]
          },
          {
            title: 'Обновление базы данных',
            column: 'Выполнено',
            assignee: 'Иван',
            description: 'Обновить базу данных для поддержки новой функции.',
            start_date: '2023-11-01',
            end_date: '2023-11-07',
            tags: [
              {
                name: 'База данных',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                color: 'red'
              }
            ]
          },
          {
            title: 'Обновление интерфейса',
            column: 'Выполнено',
            assignee: 'Джон',
            description: 'Обновить интерфейс для поддержки новой функции.',
            start_date: '2023-11-04',
            end_date: '2023-11-10',
            tags: [
              {
                name: 'Интерфейс',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                color: 'yellow'
              }
            ]
          },
          {
            title: 'Обновление API',
            column: 'Выполнено',
            assignee: 'Алиса',
            description: 'Обновить API для поддержки новой функции.',
            start_date: '2023-10-22',
            end_date: '2023-11-12',
            tags: [
              {
                name: 'API',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                color: 'red'
              }
            ]
          },
          {
            title: 'Обновление макета',
            column: 'Выполнено',
            assignee: 'Чарли',
            description: 'Обновить макет для новой страницы.',
            start_date: '2023-11-12',
            end_date: '2023-11-17',
            tags: [
              {
                name: 'Макет',
                color: 'blue'
              },
              {
                name: 'Низкий приоритет',
                color: 'green'
              }
            ]
          },
          {
            title: 'Обновление блога',
            column: 'Выполнено',
            assignee: 'Дэвид',
            description: 'Обновить блог о новых функциях продукта.',
            start_date: '2023-11-10',
            end_date: '2023-11-20',
            tags: [
              {
                name: 'Контент',
                color: 'yellow'
              },
              {
                name: 'Средний приоритет',
                color: 'red'
              }
            ]
          }
        ]
      }
    ]
  }
}
