FROM nginx
COPY docker/nginx_nano/cfg /etc/nginx/conf.d/
RUN apt-get clean && apt-get update
RUN apt-get install -qy nano
RUN export TERM=xterm