---

title: redis
tags: 
  - 数据库

---

# Redis概念
遵循[BSD](https://en.wikipedia.org/wiki/Berkeley_Software_Distribution)协议的高性能`key-value`(松散型)数据库

特性：
- 持久化
- 多数据结构`set,hashMap...`
- 事务原子性
- 数据备份

应用场景：
- 高速缓存
- 计数&消息系统（高并发，发布/订阅阻塞）
- 分布式会话`session`&分布式锁（商城秒杀）

[🚀docker镜像](https://hub.docker.com/_/redis)
```yml
# docker-compose.yml
version: "3"
services: 
  redis1:
  image: "redis"
  rester: "always"
  container_name: "redis1"
  port: 
    - 15001:6379
  volumes:
    - ~/redistest:/data
  command: ["redis-server","--requirepass","666666"]
```
## Redis Cli
[https://redis.io/commands/](https://redis.io/commands/)...

常用
- Script(`auth`)
- CRUD(`String`,`Hash`,`List`,`Set`)
- 发布/订阅
- Server(`SLOWLOG`)


### 备份/恢复
```bash
SAVE
# 同步快照操作
BGSAVE
# 子进程快照
```


## GUI工具
brew安装
`brew install --cask another-redis-desktop-manager`

## Node-Redis
[https://github.com/redis/node-redis](https://github.com/redis/node-redis)
