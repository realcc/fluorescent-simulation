DOCKER_COMPOSE := docker-compose

.PHONY: docker-up docker-down docker-restart docker-rebuild

docker-up:
	$(DOCKER_COMPOSE) up -d

docker-down:
	$(DOCKER_COMPOSE) down

docker-restart: docker-down docker-up

docker-rebuild:
	$(DOCKER_COMPOSE) down
	$(DOCKER_COMPOSE) build
	$(DOCKER_COMPOSE) up -d
