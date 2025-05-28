# DevNexus - Система совместной работы

[![DevNexus Preview](./src/assets/images/Logo.svg)](https://maksflyok.github.io/DevNexus/)

DevNexus - это современная система управления проектами для команд разработчиков, предоставляющая все необходимые инструменты для эффективной совместной работы.

## 🚀 Возможности

- 📊 Управление проектами через канбан-доску, список или таблицу
- ✅ Гибкая система задач с тегами и приоритетами
- 🔐 Ролевая модель доступа и безопасность
- 📅 Управление сроками выполнения задач
- 🏷️ Система тегов для организации задач

## 🛠 Технологии

- **Frontend**: React, TypeScript, Bootstrap 5
- **Backend**: Python, Django, PostgreSQL
- **State Management**: Redux Toolkit
- **API & Mocks**: Axios, Mock Service Worker
- **Routing**: React Router
- **Build Tool**: Vite

## ⚙️ Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/MaksFlyOk/DevNexus.git
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите приложение:

```bash
npm run dev
```

4. Откройте в браузере:

```
http://localhost:5173
```

## 📂 Структура проекта

```
devnexus/
├── public/            # Статические файлы
├── src/
    ├── assets/        # Ресурсы (стили, изображения)
    ├── components/    # Компоненты
        ├── layout/    # Layout компоненты
        ├── screens/   # Экраны
        └── ui/        # UI компоненты
    ├── hooks/         # Кастомные хуки
        ├── mutations/ # Мутации
        └── queries/   # Запросы
    ├── mock/          # Данные для Mock Service Worker
    ├── redux/         # Redux store
    ├── services/      # Сервисы
    ├── types/         # Типы TypeScript
    ├── utils/         # Вспомогательные функции
    ├── api.tsx        # Экхемпляр Axios и интерсепторы
    └── main.tsx       # Точка входа
├── .gitignore
├── .env
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🌐 Онлайн-демонстрация

Доступна живая демонстрация проекта, где вы можете протестировать основные функции без необходимости установки:

[![Live Demo](https://img.shields.io/badge/Demo-DevNexus-%23007bff?style=for-the-badge&logo=react)](https://maksflyok.github.io/DevNexus/)

### Что можно протестировать в демо:

- 📌 Создание и управление задачами
- 👥 Добавление участников в проект
- 🏷️ Работу с системой тегов
- 🔄 Перетаскивание задач между статусами (drag-and-drop)
- 🔍 Поиск и фильтрация задач

### Особенности демо-версии:

- Использует мокированные данные (Mock Service Worker)
- Доступны все основные функции интерфейса
- Работает непосредственно в браузере
- Адаптировано для мобильных устройств

> **Примечание**: Демо-версия использует тестовые данные и не требует авторизации. Все изменения сохраняются только в localStorage вашего браузера.

Для доступа к полной версии пожалуйста, разверните локальную версию проекта согласно инструкциям ниже.
