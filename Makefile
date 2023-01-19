dev:
	docker-compose -f docker-compose.dev.yml up --build --attach server --attach client --attach admin

prod:
	docker-compose -f docker-compose.yml up --build -d