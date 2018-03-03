DOCKER_TEST = "./docker-compose-test.yml"
install:
	docker-compose build
start: 
	docker-compose up
test:
	docker-compose -f $(DOCKER_TEST) run app npm run test
test-unit:
	docker-compose -f $(DOCKER_TEST) run app npm run test-unit
test-system:
	docker-compose -f $(DOCKER_TEST) run app npm run test-system