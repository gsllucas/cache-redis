FROM redis:7.2.4-alpine
COPY redis.conf /etc/redis/redis.conf
CMD ["redis-server", "/etc/redis/redis.conf"]