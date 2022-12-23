dev:
	docker-compose -f docker-compose.dev.yml up --build --attach server --attach client --attach admin

prod:
	docker-compose -f docker-compose.prod.yml up --build -d

staging:
	docker-compose -f docker-compose.staging.yml up --build -d

build: build-server build-client build-admin

push: push-server push-client push-admin

build-server:
	docker build\
		--target prod\
		-t card-game-server ./packages/server

build-client:
	docker build\
		--build-arg SERVER_URL=${SERVER_URL:-http://api.card.cfstcyr.com}\
		--target prod\
		-t card-game-client ./packages/client

build-admin:
	docker build\
		--build-arg SERVER_URL=${SERVER_URL:-http://api.card.cfstcyr.com}\
		--target prod\
		-t card-game-admin ./packages/admin

push-server:
	docker tag card-game-server cfstcyr/card-game-server
	docker push cfstcyr/card-game-server

push-client:
	docker tag card-game-client cfstcyr/card-game-client
	docker push cfstcyr/card-game-client

push-admin:
	docker tag card-game-admin cfstcyr/card-game-admin
	docker push cfstcyr/card-game-admin