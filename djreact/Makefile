.DEFAULT_GOAL := test
NODE_BIN=$(CURDIR)/node_modules/.bin

.PHONY:static

requirements: ## install development environment requirements
	pip install -qr requirements.txt --exists-action w

update_db: ## Install migrations
	python manage.py migrate

static: ## Gather all static assets for production
	npm install
	python manage.py collectstatic -v 0 --noinput

run: requirements update_db ## Runs django development server
	npm run dev
	python manage.py runserver 127.0.0.1:8004

help: ## display this help message
	@echo "Please use \`make <target>' where <target> is one of"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | sort | awk -F ':.*?## ' 'NF==2 {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'

test: ## Run unit tests for Trips app
	python manage.py test djangoapps/trips/tests
