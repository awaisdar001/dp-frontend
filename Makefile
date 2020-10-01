.DEFAULT_GOAL := test
NODE_BIN=$(CURDIR)/node_modules/.bin

.PHONY:static run

help: ## display this help message
	@echo "Please use \`make <target>' where <target> is one of"
	@grep '^[a-zA-Z]' $(MAKEFILE_LIST) | sort | awk -F ':.*?## ' 'NF==2 {printf "\033[36m  %-25s\033[0m %s\n", $$1, $$2}'

build: _build
	find . -type p -delete
	docker-compose build
_build: 
	find . -type p -delete
	docker-compose build

stop:  ## Stop all services
	docker-compose stop
run:
	docker-compose up -d --remove-orphans

restart:
	docker restart mfe

attach: ## Attach to the specified service container process to use the debugger & see logs.
	## make app-attach
	docker attach mfe

logs:
	docker-compose -f docker-compose.yml logs -f --tail=100 mfe

shell: ## Run a shell on the specified service container
	docker exec -it mfe /bin/bash

destroy: stop ## Remove all devstack-related containers, networks, and volumes
	docker-compose -f ./docker-compose.yml down