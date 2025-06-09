# Vue Accounts Manager для SaaSoft

Форма управления учетными записями на Vue 3

## Стек

- Vue 3
- TypeScript
- Pinia
- Element Plus
- Vite

## Установка

```bash
npm install
npm run dev
```

## Скрипты

```bash
npm run dev          # запуск dev сервера
npm run build        # сборка для production
npm run lint         # проверка .ts/ .vue файлов
npm run lint:style   # проверка CSS стилей
npm run lint:all     # запуск всех линтеров
```

## Что реализовано

- Добавление/удаление учетных записей
- Валидация полей (красная обводка при ошибках)
- Метки через точку с запятой
- Скрытие пароля для LDAP аккаунтов
- Сохранение в localStorage