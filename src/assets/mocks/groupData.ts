import { GroupType } from '@types'

export const groupData: GroupType = {
  id: 1,
  group_uuid: 'f81e7af3-fcf4-4cdd-b3a3-14a8087aa191',
  name: 'Основная группа',
  icon: null,
  members: [
    {
      email: 'all.random@devnexus.com',
      username: 'Все совпадения случайны',
      description: 'Разработчик с опытом работы в различных проектах.',
      tags: [
        { name: 'Разработка', color: 'blue', code: '000003' },
        { name: 'Senior', color: 'red', code: '000001' }
      ]
    },
    {
      email: 'i.ivanov@devnexus.com',
      username: 'Иван Иванов',
      description: 'Тестировщик с опытом работы в различных проектах.',
      tags: [
        { name: 'Тестирование', color: 'green', code: '000004' },
        { name: 'Middle', color: 'yellow', code: '000002' }
      ]
    },
    {
      email: 'a.petorva@devnexus.com',
      username: 'Анна Петрова',
      description: 'Дизайнер с опытом работы в различных проектах.',
      tags: [
        { name: 'Дизайн', color: 'blue', code: '000005' },
        { name: 'Senior', color: 'red', code: '000001' }
      ]
    },
    {
      email: 'd.smiron@devnexus.com',
      username: 'Дмитрий Смирнов',
      description: 'Менеджер проектов с опытом работы в различных проектах.',
      tags: [
        { name: 'Менеджмент', color: 'green', code: '000006' },
        { name: 'Middle', color: 'yellow', code: '000002' }
      ]
    },
    {
      email: 'e.kuznecova@devnexus.com',
      username: 'Елена Кузнецова',
      description: 'Аналитик с опытом работы в различных проектах.',
      tags: [
        { name: 'Аналитика', color: 'blue', code: '000007' },
        { name: 'Senior', color: 'red', code: '000001' }
      ]
    },
    {
      email: 'a.sokolov@devnexus.com',
      username: 'Алексей Соколов',
      description: 'Разработчик с опытом работы в различных проектах.',
      tags: [
        { name: 'Разработка', color: 'green', code: '000008' },
        { name: 'Middle', color: 'yellow', code: '000002' }
      ]
    },
    {
      email: 'm.fedorova@devnexus.com',
      username: 'Мария Федорова',
      description: 'Тестировщик с опытом работы в различных проектах.',
      tags: [
        { name: 'Тестирование', color: 'blue', code: '000009' },
        { name: 'Senior', color: 'red', code: '000001' }
      ]
    },
    {
      email: 's.lebedev@devnexus.com',
      username: 'Сергей Лебедев',
      description: 'Дизайнер с опытом работы в различных проектах.',
      tags: [
        { name: 'Дизайн', color: 'green', code: '000010' },
        { name: 'Middle', color: 'yellow', code: '000002' }
      ]
    },
    {
      email: '0.morozova@devnexus.com',
      username: 'Ольга Морозова',
      description: 'Менеджер проектов с опытом работы в различных проектах.',
      tags: [
        { name: 'Менеджмент', color: 'blue', code: '000011' },
        { name: 'Senior', color: 'red', code: '000001' }
      ]
    },
    {
      email: 'p.nikovaev@devnexus.com',
      username: 'Павел Николаев',
      description: 'Аналитик с опытом работы в различных проектах.',
      tags: [
        { name: 'Аналитика', color: 'blue', code: '000007' },
        { name: 'Middle', color: 'yellow', code: '000002' }
      ]
    },
    {
      email: 'u.vasileva@devnexus.com',
      username: 'Юлия Васильева',
      description: 'Разработчик с опытом работы в различных проектах.',
      tags: [
        { name: 'Разработка', color: 'blue', code: '000003' },
        { name: 'Senior', color: 'red', code: '000001' }
      ]
    }
  ],
  description: 'Основная группа разработки',
  admin: {
    username: 'Павел Николаев',
    email: 'p.nikovaev@devnexus.com',
    description: 'Тимлид с огромный ОПЫТОМ.'
  },
  board: {
    columns: [
      {
        code: 0,
        name: 'К выполнению',
        color: 'red',
        tasks: [
          {
            code: '000001',
            title: 'Разработка дизайна главной страницы',
            column: 'К выполнению',
            column_color: 'red',
            assignee: 'Анна Петрова',
            description:
              'Создать современный и адаптивный дизайн для главной страницы.',
            start_date: '2023-09-01',
            end_date: '2023-10-01',
            tags: [
              {
                name: 'Дизайн',
                code: '000005',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                code: '000001',
                color: 'red'
              }
            ]
          },
          {
            code: '000002',
            title: 'Создание макета',
            column_color: 'red',
            column: 'К выполнению',
            assignee: 'Дмитрий Смирнов',
            description: 'Создать макет для новой страницы.',
            start_date: '2023-10-01',
            end_date: '2023-10-07',
            tags: [
              {
                name: 'Макет',
                code: '000006',
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
            code: '000003',
            title: 'Исправление багов',
            column: 'К выполнению',
            column_color: 'red',
            assignee: 'Алексей Соколов',
            description: 'Исправить найденные баги в приложении.',
            start_date: '2023-10-03',
            end_date: '2023-10-15',
            tags: [
              {
                name: 'Баги',
                code: '000007',
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
            code: '000004',
            title: 'Оптимизация производительности',
            column: 'К выполнению',
            column_color: 'red',
            assignee: 'Алексей Соколов',
            description: 'Оптимизировать производительность приложения.',
            start_date: '2023-10-10',
            end_date: '2023-10-18',
            tags: [
              {
                name: 'Оптимизация',
                code: '000009',
                color: 'blue'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
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
            code: '000005',
            title: 'Разработка API',
            column: 'В процессе',
            column_color: 'blue',
            assignee: 'Алексей Соколов',
            description: 'Разработать бэкенд API для новой функции.',
            start_date: '2023-09-10',
            end_date: '2023-10-10',
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
            code: '000006',
            title: 'Тестирование интерфейса',
            column: 'В процессе',
            column_color: 'blue',
            assignee: 'Дмитрий Смирнов',
            description:
              'Провести тестирование удобства использования нового интерфейса.',
            start_date: '2023-10-15',
            end_date: '2023-10-25',
            tags: [
              {
                name: 'Тестирование',
                code: '000013',
                color: 'blue'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'yellow'
              }
            ]
          },
          {
            code: '000007',
            title: 'Разработка новой функции',
            column: 'В процессе',
            column_color: 'blue',
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
            code: '000008',
            title: 'Написание блога',
            column: 'В процессе',
            column_color: 'blue',
            assignee: 'Сергей Лебедев',
            description: 'Написать блог о новых функциях продукта.',
            start_date: '2023-10-03',
            end_date: '2023-10-25',
            tags: [
              {
                name: 'Контент',
                code: '000004',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'yellow'
              }
            ]
          },
          {
            code: '000009',
            title: 'Обновление документации',
            column: 'В процессе',
            column_color: 'blue',
            assignee: 'Ольга Морозова',
            description: 'Обновить документацию для новой функции.',
            start_date: '2023-05-30',
            end_date: '2023-10-30',
            tags: [
              {
                name: 'Документация',
                code: '000015',
                color: 'yellow'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
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
            code: '000010',
            title: 'Проверка кода',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Мария Федорова',
            description: 'Проверить изменения кода для новой функции.',
            start_date: '2023-10-17',
            end_date: '2023-10-20',
            tags: [
              {
                name: 'Проверка кода',
                code: '000018',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                code: '000001',
                color: 'red'
              }
            ]
          },
          {
            code: '000011',
            title: 'Проверка дизайна',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Анна Петрова',
            description: 'Проверить изменения дизайна для главной страницы.',
            start_date: '2023-09-25',
            end_date: '2023-10-25',
            tags: [
              {
                name: 'Проверка дизайна',
                code: '000017',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'yellow'
              }
            ]
          },
          {
            code: '000012',
            title: 'Проверка документации',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Павел Николаев',
            description: 'Проверить обновленную документацию.',
            start_date: '2023-10-25',
            end_date: '2023-10-27',
            tags: [
              {
                name: 'Документация',
                code: '000015',
                color: 'yellow'
              },
              {
                name: 'Низкий приоритет',
                code: '000003',
                color: 'green'
              }
            ]
          },
          {
            code: '000013',
            title: 'Проверка макета',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Мария Федорова',
            description: 'Проверить созданный макет для новой страницы.',
            start_date: '2023-10-04',
            end_date: '2023-10-30',
            tags: [
              {
                name: 'Макет',
                code: '000006',
                color: 'blue'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'red'
              }
            ]
          },
          {
            code: '000014',
            title: 'Проверка блога',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Дмитрий Смирнов',
            description: 'Проверить написанный блог о новых функциях продукта.',
            start_date: '2023-11-01',
            end_date: '2023-11-02',
            tags: [
              {
                name: 'Контент',
                code: '000004',
                color: 'green'
              },
              {
                name: 'Высокий приоритет',
                code: '000001',
                color: 'blue'
              }
            ]
          },
          {
            code: '000015',
            title: 'Проверка API',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Иван Иванов',
            description:
              'Проверить разработанный бэкенд API для новой функции.',
            start_date: '2023-10-05',
            end_date: '2023-11-05',
            tags: [
              {
                name: 'API',
                code: '000008',
                color: 'yellow'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'red'
              }
            ]
          },
          {
            code: '000016',
            title: 'Проверка интерфейса',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Сергей Лебедев',
            description:
              'Проверить тестирование удобства использования нового интерфейса.',
            start_date: '2023-11-01',
            end_date: '2023-11-07',
            tags: [
              {
                name: 'Тестирование',
                code: '000013',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                code: '000001',
                color: 'green'
              }
            ]
          },
          {
            code: '000017',
            title: 'Проверка оптимизации',
            column: 'На проверке',
            column_color: 'green',
            assignee: 'Алексей Соколов',
            description: 'Проверить оптимизацию производительности приложения.',
            start_date: '2023-10-25',
            end_date: '2023-11-10',
            tags: [
              {
                name: 'Оптимизация',
                code: '000009',
                color: 'blue'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
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
            code: '000018',
            title: 'Развертывание функции',
            column: 'Выполнено',
            column_color: 'yellow',
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
          },
          {
            code: '000019',
            title: 'Мониторинг производительности',
            column: 'Выполнено',
            column_color: 'yellow',
            assignee: 'Юлия Васильева',
            description:
              'Мониторить производительность новой функции после развертывания.',
            start_date: '2023-10-25',
            end_date: '2023-11-05',
            tags: [
              {
                name: 'Мониторинг',
                code: '000014',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'yellow'
              }
            ]
          },
          {
            code: '000019',
            title: 'Обновление базы данных',
            column: 'Выполнено',
            column_color: 'yellow',
            assignee: 'Алексей Соколов',
            description: 'Обновить базу данных для поддержки новой функции.',
            start_date: '2023-11-01',
            end_date: '2023-11-07',
            tags: [
              {
                name: 'База данных',
                code: '000012',
                color: 'blue'
              },
              {
                name: 'Высокий приоритет',
                code: '000001',
                color: 'red'
              }
            ]
          },
          {
            code: '000020',
            title: 'Обновление интерфейса',
            column: 'Выполнено',
            column_color: 'yellow',
            assignee: 'Елена Кузнецова',
            description: 'Обновить интерфейс для поддержки новой функции.',
            start_date: '2023-11-04',
            end_date: '2023-11-10',
            tags: [
              {
                name: 'Интерфейс',
                code: '000010',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'yellow'
              }
            ]
          },
          {
            code: '000021',
            title: 'Обновление API',
            column: 'Выполнено',
            column_color: 'yellow',
            assignee: 'Алексей Соколов',
            description: 'Обновить API для поддержки новой функции.',
            start_date: '2023-10-22',
            end_date: '2023-11-12',
            tags: [
              {
                name: 'API',
                code: '000008',
                color: 'yellow'
              },
              {
                name: 'Высокий приоритет',
                code: '000001',
                color: 'red'
              }
            ]
          },
          {
            code: '000022',
            title: 'Обновление макета',
            column: 'Выполнено',
            column_color: 'yellow',
            assignee: 'Сергей Лебедев',
            description: 'Обновить макет для новой страницы.',
            start_date: '2023-11-12',
            end_date: '2023-11-17',
            tags: [
              {
                name: 'Макет',
                code: '000006',
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
            code: '000023',
            title: 'Обновление блога',
            column: 'Выполнено',
            column_color: 'yellow',
            assignee: 'Елена Кузнецова',
            description: 'Обновить блог о новых функциях продукта.',
            start_date: '2023-11-10',
            end_date: '2023-11-20',
            tags: [
              {
                name: 'Контент',
                code: '000004',
                color: 'green'
              },
              {
                name: 'Средний приоритет',
                code: '000002',
                color: 'red'
              }
            ]
          }
        ]
      }
    ]
  }
}
