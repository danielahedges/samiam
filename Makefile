ci:
	make docker-build	\
		clean \
		install \
		staging \
		staging-down

docker-build:
	docker build -t monocot .

clean:
	docker-compose run --rm clean

install:
	docker-compose run --rm install

staging:
	docker-compose up -d staging-deps
	docker-compose run --rm staging

staging-down:
	docker-compose down
