production-pull:
	git checkout main -f
	git pull origin main

staging-pull:
	git checkout develop -f
	git pull origin develop

deploy:
	docker-compose up --build -d
	docker-compose exec -T client yarn && docker-compose exec -T client yarn build
	echo 'restarting the pm2 server after a successful build'
	docker-compose exec -T client pm2 reload all --update-env
	sudo /var/www/html/nginx_clear_cache.sh
