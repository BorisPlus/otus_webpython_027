# Docker

## Frontend

### My own frontend `nginx_nano` container

Make my own temporary container for all potential NGINX-projects (just add `nano` to `nginx` - `nginx_nano` named).

Docker file content:
```text
FROM nginx
COPY docker/nginx_nano/cfg /etc/nginx/conf.d/
RUN apt-get clean && apt-get update
RUN apt-get install -qy nano
RUN export TERM=xterm
```

Nginx `content.d/default.conf` file content:
```text
server {
  listen 80;
  server_name 127.0.0.1;
  root /usr/share/nginx/html;
  index index.html;
  # Other config you desire (TLS, logging, etc)...
  location / {
    try_files $uri /index.html;
  }
}
```
Ensure you are at project root dir.

Build `nginx_nano`:
```bash
docker build -t nginx_nano -f docker/nginx_nano/Dockerfile .
```

**Just for test:** Run `nginx_nano` and upload check:
```bash
docker run --name nginx_nano -p 80:8080 -d nginx_nano
docker exec -it nginx_nano cat /etc/nginx/conf.d/default.conf
```

**Just for my memory:** frontend development debug:
```bash
# containers list
docker ps -a
# check container running by its name
docker ps -aqf "name=nginx_nano"
# force remove container
docker rm -f nginx_nano

# images list
docker images
# force remove image
docker rmi -f nginx_nano
# stop TCP port
fuser -k 8080/tcp

# force remove container
docker rm -f wp027_frontend
# force remove image
docker rmi -f wp027_frontend
# stop TCP port
fuser -k 80/tcp
#
service docker restart
# will show used space, similar to the unix tool df
docker system df 
# will remove all unused data
docker system prune 
```

### Production frontend container

Frontend Docker file content:
```text
FROM nginx_nano
COPY myapp/build /usr/share/nginx/html
```

Build and run frontend image:
```bash
# pre build React-app for deploy
cd myapp/
npm run build 
cd ../
# React-app frontend image
docker build -t wp027_frontend -f docker/frontend/Dockerfile .
# run React-app frontend image
docker run --name wp027_frontend -p 80:80 -d wp027_frontend
```

**Just for test:** of file deploy:
```bash
docker exec -it wp027_frontend ls -l /usr/share/nginx/html/
docker exec -it wp027_frontend bash
```

**QUESTION:** Why `access.log` and `error.log` could not be `tail` or `cat`:

```bash
docker exec -it wp027_frontend cat /etc/nginx/conf.d/default.conf
docker exec -it wp027_frontend cat /var/log/nginx/access.log
docker exec -it wp027_frontend cat /var/log/nginx/error.log
```
**Just for my memory:** common Docker commands:
Remove single image
```bash

# remove all images
docker rmi $(docker images -qf "dangling=true")
# kill containers and remove them
# Note: Replace kill with stop for graceful shutdown
docker rm $(docker kill $(docker ps -aq))

# remove all images except "nginx" and "some"
# use grep to remove all except nginx and some
docker rmi $(docker images | grep -v 'some\|nginx' | awk {'print $3'})
docker rmi $(docker images --quiet | grep -v $(docker images --quiet some:nginx))
# remove "dangling" images 
docker rmi $(docker images -qf "dangling=true")
# remove "dead" containers 
docker rm $(docker ps --all -q -f status=dead)
# remove all
docker rm -f $(docker ps --all -q)
docker rmi -f $(docker images -q)
```

Build and run backend image:
```bash
# React-app frontend image
docker build -t wp027_backend -f docker/backend/Dockerfile .
# run React-app frontend image
docker run --name wp027_backend -p 80:8000 -d wp027_backend
```

```bash
docker-compose run web django-admin startproject composeexample .
```

## Backend

Docker file content:
```text
FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
COPY requirements.txt /code/
RUN pip install -r /code/requirements.txt
COPY ./django_admin_features /code/django_admin_features
COPY ./core_app /code/core_app
COPY ./flood_app /code/flood_app
COPY ./mysite /code/mysite
COPY ./db.sqlite3 /code/db.sqlite3
COPY ./manage.py /code/manage.py
ENTRYPOINT [ "python3", "/code/manage.py", "runserver", "0.0.0.0:8000" ]
```

Ensure you are at project root dir.

Build `nginx_nano`:
```bash
docker build -t wp027_backend -f docker/backend/Dockerfile .
docker run --name wp027_backend -p 8000:8000 -d wp027_backend
```

**Just for test:** of file deploy:
```bash
# React-app backend image
docker exec -it wp027_backend ls -l /code/
# run React-app backend image
docker exec -it wp027_backend bash
```

**Remark:** of SQLite:
```text
For demo I use sqlite database within Backend container, 
so database became the primordial after container restart.
```

## One touch (docker-compose)

```bash
fuser -k 8080/tcp
fuser -k 80/tcp
fuser -k 8000/tcp

cd docker
docker-compose up --build
```

```text
version: '2'

services:
  first_of_frontend:
    image:
      nginx_nano
    build:
      context: ../
      dockerfile: ./docker/nginx_nano/Dockerfile
  frontend:
    image:
      wp027_frontend
    build:
      context: ../
      dockerfile: ./docker/frontend/Dockerfile
    ports:
      - "80:80"
    depends_on:
      - first_of_frontend
  backend:
    image:
      wp027_backend
    build:
      context: ../
      dockerfile: ./docker/backend/Dockerfile
    command: python3 ./code/manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - "8000:8000"
```