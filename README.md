# TODO List API

REST API для управління списками завдань з можливістю групування та відстеження статусу.

## Технології

- Node.js 22
- Express.js
- PostgreSQL
- Sequelize ORM
- Docker & Docker Compose
- Swagger для документації API
- Jest для тестування

## Структура проекту 

```plaintext
student-doto-list/
├── src/
│   ├── controllers/    # Контролери для обробки запитів
│   ├── models/         # Моделі даних Sequelize
│   ├── routes/         # Маршрути API
│   ├── config/         # Конфігураційні файли
│   ├── migrations/     # Міграції бази даних
│   ├── swagger/        # Документація Swagger
│   └── tests/          # Тести
├── docker-compose.yml  # Конфігурація Docker Compose
├── Dockerfile          # Конфігурація Docker
├── Makefile            # Команди для управління проектом
├── babel.config.js     # Конфігурація Babel
├── .gitignore          # Файли, які не слід публікувати в репозиторій
├── .prettierrc         # Конфігурація Prettier
├── .sequelizerc        # Конфігурація Sequelize
├── package.json        # Залежності та конфігурація npm
└── README.md           # Цей файл
```

## Передумови

- Docker
- Docker Compose
- Make (опціонально)

## Встановлення та запуск

1. Клонуйте репозиторій:
```bash
git clone git@github.com:AlexandrBursak/student-doto-list.git
cd student-doto-list
```

## Troubleshooting

### Поширені проблеми

1. Якщо порт 3000 зайнятий:
   - Змініть порт в `docker-compose.yml`
   - Або зупиніть сервіс, що використовує цей порт

2. Проблеми з підключенням до бази даних:
   - Перевірте логи: `make logs`
   - Переконайтеся, що PostgreSQL контейнер запущений: `make ps`
   - Спробуйте перезапустити контейнери: `make rebuild`

## API Endpoints

### Групи (Groups)
- `POST /api/groups` - Створити нову групу
- `GET /api/groups` - Отримати всі групи
- `DELETE /api/groups/:id` - Видалити групу
- `GET /api/groups/:id/tasks` - Отримати всі завдання групи

### Завдання (Tasks)
- `POST /api/tasks` - Створити нове завдання
- `GET /api/tasks?group_id=1&status=active` - Отримати завдання за статусом

### Перевірка здоров'я (Health Check)
- `GET /health` - Перевірити статус API

## Документація API

Swagger документація доступна за адресою: http://localhost:3000/api-docs

## Приклади використання

### Створення нової групи

```bash
curl -X POST http://localhost:3000/api/groups \
  -H "Content-Type: application/json" \
  -d '{"name": "Робочі завдання"}'
```

### Створення нового завдання
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "groupId": 1,
    "title": "Написати документацію",
    "description": "Створити README.md для проекту"
  }'
```

### Отримання активних завдань групи
```bash
curl "http://localhost:3000/api/tasks?group_id=1&status=active"
```

## Розробка

1. Встановіть залежності:
```bash
make install
```

2. Запустіть в режимі розробки:
```bash
make dev
```

3. Запустіть тести:
```bash
make test
```

## Тестування

```bash
# Запустити всі тести
make test

# Запустити unit тести
make test-unit

# Запустити інтеграційні тести
make test-integration
```


## База даних
```bash
### Застосувати міграції
make migrate

### Відкатити останню міграцію
make migrate-undo

### Відкатити всі міграції
make migrate-undo-all
```

## Ліцензія

[MIT](LICENSE)
