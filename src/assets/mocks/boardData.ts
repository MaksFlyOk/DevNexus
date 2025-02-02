import { BoardType } from '@types'

export const boardData: BoardType = {
  columns: [
    {
      name: 'К выполнению',
      color: 'red',
      sum: 4, // !! Убрать
      tasks: [
        {
          name: 'Разработка дизайна главной страницы',
          column: 'К выполнению',
          worker: 'Алиса',
          description:
            'Создать современный и адаптивный дизайн для главной страницы.',
          date: '2023-10-01',
          tags: [
            {
              tagText: 'Дизайн',
              color: 'blue'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'red'
            }
          ]
        },
        {
          name: 'Создание макета',
          column: 'К выполнению',
          worker: 'Чарли',
          description: 'Создать макет для новой страницы.',
          date: '2023-10-07',
          tags: [
            {
              tagText: 'Макет',
              color: 'blue'
            },
            {
              tagText: 'Низкий приоритет',
              color: 'green'
            }
          ]
        },
        {
          name: 'Исправление багов',
          column: 'К выполнению',
          worker: 'Фрэнк',
          description: 'Исправить найденные баги в приложении.',
          date: '2023-10-15',
          tags: [
            {
              tagText: 'Баги',
              color: 'green'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'red'
            }
          ]
        },
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
      sum: 5,
      tasks: [
        {
          name: 'Разработка API',
          column: 'В процессе',
          worker: 'Чарли',
          description: 'Разработать бэкенд API для новой функции.',
          date: '2023-10-10',
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
        },
        {
          name: 'Тестирование интерфейса',
          column: 'В процессе',
          worker: 'Дэвид',
          description:
            'Провести тестирование удобства использования нового интерфейса.',
          date: '2023-10-15',
          tags: [
            {
              tagText: 'Тестирование',
              color: 'blue'
            },
            {
              tagText: 'Средний приоритет',
              color: 'yellow'
            }
          ]
        },
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
        },
        {
          name: 'Написание блога',
          column: 'В процессе',
          worker: 'Хейди',
          description: 'Написать блог о новых функциях продукта.',
          date: '2023-10-25',
          tags: [
            {
              tagText: 'Контент',
              color: 'blue'
            },
            {
              tagText: 'Средний приоритет',
              color: 'yellow'
            }
          ]
        },
        {
          name: 'Обновление документации',
          column: 'В процессе',
          worker: 'Джон',
          description: 'Обновить документацию для новой функции.',
          date: '2023-10-30',
          tags: [
            {
              tagText: 'Документация',
              color: 'yellow'
            },
            {
              tagText: 'Средний приоритет',
              color: 'red'
            }
          ]
        }
      ]
    },
    {
      name: 'На проверке',
      color: 'green',
      sum: 8,
      tasks: [
        {
          name: 'Проверка кода',
          column: 'На проверке',
          worker: 'Ева',
          description: 'Проверить изменения кода для новой функции.',
          date: '2023-10-20',
          tags: [
            {
              tagText: 'Проверка кода',
              color: 'blue'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'red'
            }
          ]
        },
        {
          name: 'Проверка дизайна',
          column: 'На проверке',
          worker: 'Фрэнк',
          description: 'Проверить изменения дизайна для главной страницы.',
          date: '2023-10-25',
          tags: [
            {
              tagText: 'Проверка дизайна',
              color: 'green'
            },
            {
              tagText: 'Средний приоритет',
              color: 'yellow'
            }
          ]
        },
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
        },
        {
          name: 'Проверка макета',
          column: 'На проверке',
          worker: 'Хейди',
          description: 'Проверить созданный макет для новой страницы.',
          date: '2023-10-30',
          tags: [
            {
              tagText: 'Макет',
              color: 'yellow'
            },
            {
              tagText: 'Средний приоритет',
              color: 'red'
            }
          ]
        },
        {
          name: 'Проверка блога',
          column: 'На проверке',
          worker: 'Иван',
          description: 'Проверить написанный блог о новых функциях продукта.',
          date: '2023-11-02',
          tags: [
            {
              tagText: 'Контент',
              color: 'green'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'blue'
            }
          ]
        },
        {
          name: 'Проверка API',
          column: 'На проверке',
          worker: 'Джон',
          description: 'Проверить разработанный бэкенд API для новой функции.',
          date: '2023-11-05',
          tags: [
            {
              tagText: 'API',
              color: 'yellow'
            },
            {
              tagText: 'Средний приоритет',
              color: 'red'
            }
          ]
        },
        {
          name: 'Проверка интерфейса',
          column: 'На проверке',
          worker: 'Алиса',
          description:
            'Проверить тестирование удобства использования нового интерфейса.',
          date: '2023-11-07',
          tags: [
            {
              tagText: 'Тестирование',
              color: 'blue'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'green'
            }
          ]
        },
        {
          name: 'Проверка оптимизации',
          column: 'На проверке',
          worker: 'Боб',
          description: 'Проверить оптимизацию производительности приложения.',
          date: '2023-11-10',
          tags: [
            {
              tagText: 'Оптимизация',
              color: 'yellow'
            },
            {
              tagText: 'Средний приоритет',
              color: 'red'
            }
          ]
        }
      ]
    },
    {
      name: 'Выполнено',
      color: 'yellow',
      sum: 7,
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
        },
        {
          name: 'Мониторинг производительности',
          column: 'Выполнено',
          worker: 'Хейди',
          description:
            'Мониторить производительность новой функции после развертывания.',
          date: '2023-11-05',
          tags: [
            {
              tagText: 'Мониторинг',
              color: 'green'
            },
            {
              tagText: 'Средний приоритет',
              color: 'yellow'
            }
          ]
        },
        {
          name: 'Обновление базы данных',
          column: 'Выполнено',
          worker: 'Иван',
          description: 'Обновить базу данных для поддержки новой функции.',
          date: '2023-11-07',
          tags: [
            {
              tagText: 'База данных',
              color: 'blue'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'red'
            }
          ]
        },
        {
          name: 'Обновление интерфейса',
          column: 'Выполнено',
          worker: 'Джон',
          description: 'Обновить интерфейс для поддержки новой функции.',
          date: '2023-11-10',
          tags: [
            {
              tagText: 'Интерфейс',
              color: 'green'
            },
            {
              tagText: 'Средний приоритет',
              color: 'yellow'
            }
          ]
        },
        {
          name: 'Обновление API',
          column: 'Выполнено',
          worker: 'Алиса',
          description: 'Обновить API для поддержки новой функции.',
          date: '2023-11-12',
          tags: [
            {
              tagText: 'API',
              color: 'blue'
            },
            {
              tagText: 'Высокий приоритет',
              color: 'red'
            }
          ]
        },
        {
          name: 'Обновление макета',
          column: 'Выполнено',
          worker: 'Чарли',
          description: 'Обновить макет для новой страницы.',
          date: '2023-11-17',
          tags: [
            {
              tagText: 'Макет',
              color: 'blue'
            },
            {
              tagText: 'Низкий приоритет',
              color: 'green'
            }
          ]
        },
        {
          name: 'Обновление блога',
          column: 'Выполнено',
          worker: 'Дэвид',
          description: 'Обновить блог о новых функциях продукта.',
          date: '2023-11-20',
          tags: [
            {
              tagText: 'Контент',
              color: 'yellow'
            },
            {
              tagText: 'Средний приоритет',
              color: 'red'
            }
          ]
        }
      ]
    }
  ]
}
