# Змінні
DOCKER_COMPOSE = docker-compose
NODE = node
NPM = npm

# Кольори для виводу
CYAN = \033[0;36m
NC = \033[0m # No Color

# Docker команди
.PHONY: up
up: ## Запустити всі контейнери
	@echo "$(CYAN)Starting docker containers...$(NC)"
	$(DOCKER_COMPOSE) up -d

.PHONY: down
down: ## Зупинити всі контейнери
	@echo "$(CYAN)Stopping docker containers...$(NC)"
	$(DOCKER_COMPOSE) down

.PHONY: build
build: ## Зібрати всі контейнери
	@echo "$(CYAN)Building docker containers...$(NC)"
	$(DOCKER_COMPOSE) build

.PHONY: rebuild
rebuild: down build up ## Перезібрати і перезапустити всі контейнери

.PHONY: logs
logs: ## Показати логи контейнерів
	$(DOCKER_COMPOSE) logs -f

.PHONY: ps
ps: ## Показати статус контейнерів
	$(DOCKER_COMPOSE) ps

# NPM команди
.PHONY: install
install: ## Встановити залежності
	@echo "$(CYAN)Installing dependencies...$(NC)"
	$(NPM) install

.PHONY: start
start: ## Запустити додаток
	@echo "$(CYAN)Starting application...$(NC)"
	$(NPM) start

.PHONY: dev
dev: ## Запустити додаток в режимі розробки
	@echo "$(CYAN)Starting application in development mode...$(NC)"
	$(NPM) run dev

# Команди для міграцій
.PHONY: migrate
migrate: ## Запустити міграції
	@echo "$(CYAN)Running migrations...$(NC)"
	$(NPM) run migrate

.PHONY: migrate-undo
migrate-undo: ## Відкатити останню міграцію
	@echo "$(CYAN)Undoing last migration...$(NC)"
	$(NPM) run migrate:undo

.PHONY: migrate-undo-all
migrate-undo-all: ## Відкатити всі міграції
	@echo "$(CYAN)Undoing all migrations...$(NC)"
	$(NPM) run migrate:undo:all

# Команди для тестів
.PHONY: test
test: ## Запустити всі тести
	@echo "$(CYAN)Running all tests...$(NC)"
	$(NPM) test

.PHONY: test-unit
test-unit: ## Запустити unit тести
	@echo "$(CYAN)Running unit tests...$(NC)"
	$(NPM) run test:unit

.PHONY: test-integration
test-integration: ## Запустити інтеграційні тести
	@echo "$(CYAN)Running integration tests...$(NC)"
	$(NPM) run test:integration

# Docker + NPM комбіновані команди
.PHONY: docker-test
docker-test: ## Запустити тести в Docker
	@echo "$(CYAN)Running tests in Docker...$(NC)"
	$(DOCKER_COMPOSE) run --rm app npm test

.PHONY: docker-migrate
docker-migrate: ## Запустити міграції в Docker
	@echo "$(CYAN)Running migrations in Docker...$(NC)"
	$(DOCKER_COMPOSE) run --rm app npm run migrate

# Очистка
.PHONY: clean
clean: down ## Очистити проект (зупинити контейнери і видалити node_modules)
	@echo "$(CYAN)Cleaning project...$(NC)"
	rm -rf node_modules

# Допомога
.PHONY: help
help: ## Показати цю довідку
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(CYAN)%-15s$(NC) %s\n", $$1, $$2}'

# За замовчуванням
.DEFAULT_GOAL := help 