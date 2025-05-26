import { AccentColorsType, UserType } from '@types'

export const membersDataList: Array<
  UserType & {
    tags: Array<{ name: string; color: AccentColorsType; code: string }>
  }
> = [
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
]
