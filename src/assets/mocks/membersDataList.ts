import { AccentColorsType, UserType } from '@types'

export const membersDataList: Array<
  UserType & { tags: Array<{ name: string; color: AccentColorsType }> }
> = [
  {
    email: 'all.random@devnexus.com',
    username: 'Все совпадения случайны',
    description: 'Разработчик с опытом работы в различных проектах.',
    tags: [
      { name: 'Разработка', color: 'blue' },
      { name: 'Высокий приоритет', color: 'red' }
    ]
  },
  {
    email: 'i.ivanov@devnexus.com',
    username: 'Иван Иванов',
    description: 'Тестировщик с опытом работы в различных проектах.',
    tags: [
      { name: 'Тестирование', color: 'green' },
      { name: 'Средний приоритет', color: 'yellow' }
    ]
  },
  {
    email: 'a.petorva@devnexus.com',
    username: 'Анна Петрова',
    description: 'Дизайнер с опытом работы в различных проектах.',
    tags: [
      { name: 'Дизайн', color: 'blue' },
      { name: 'Высокий приоритет', color: 'red' }
    ]
  },
  {
    email: 'd.smiron@devnexus.com',
    username: 'Дмитрий Смирнов',
    description: 'Менеджер проектов с опытом работы в различных проектах.',
    tags: [
      { name: 'Менеджмент', color: 'green' },
      { name: 'Средний приоритет', color: 'yellow' }
    ]
  },
  {
    email: 'e.kuznecova@devnexus.com',
    username: 'Елена Кузнецова',
    description: 'Аналитик с опытом работы в различных проектах.',
    tags: [
      { name: 'Аналитика', color: 'blue' },
      { name: 'Высокий приоритет', color: 'red' }
    ]
  },
  {
    email: 'a.sokolov@devnexus.com',
    username: 'Алексей Соколов',
    description: 'Разработчик с опытом работы в различных проектах.',
    tags: [
      { name: 'Разработка', color: 'green' },
      { name: 'Средний приоритет', color: 'yellow' }
    ]
  },
  {
    email: 'm.fedorova@devnexus.com',
    username: 'Мария Федорова',
    description: 'Тестировщик с опытом работы в различных проектах.',
    tags: [
      { name: 'Тестирование', color: 'blue' },
      { name: 'Высокий приоритет', color: 'red' }
    ]
  },
  {
    email: 's.lebedev@devnexus.com',
    username: 'Сергей Лебедев',
    description: 'Дизайнер с опытом работы в различных проектах.',
    tags: [
      { name: 'Дизайн', color: 'green' },
      { name: 'Средний приоритет', color: 'yellow' }
    ]
  },
  {
    email: '0.morozova@devnexus.com',
    username: 'Ольга Морозова',
    description: 'Менеджер проектов с опытом работы в различных проектах.',
    tags: [
      { name: 'Менеджмент', color: 'blue' },
      { name: 'Высокий приоритет', color: 'red' }
    ]
  },
  {
    email: 'p.nikovaev@devnexus.com',
    username: 'Павел Николаев',
    description: 'Аналитик с опытом работы в различных проектах.',
    tags: [
      { name: 'Аналитика', color: 'green' },
      { name: 'Средний приоритет', color: 'yellow' }
    ]
  },
  {
    email: 'u.vasileva@devnexus.com',
    username: 'Юлия Васильева',
    description: 'Разработчик с опытом работы в различных проектах.',
    tags: [
      { name: 'Разработка', color: 'blue' },
      { name: 'Высокий приоритет', color: 'red' }
    ]
  }
]
