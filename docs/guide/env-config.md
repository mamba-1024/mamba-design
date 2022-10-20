---
title: 日常配置
nav:
  path: /guide
  title: 积累
  order: 1
group:
  path: /guide/env-config
  order: 2
  title: 日常配置
---

> 本文环境配置均在 `Mac` 环境下

### 数据库环境变量

```
vim ~/.zshrc

<!-- 新增 -->
export PATH=${PATH}:/usr/local/mysql/bin/

<!-- 生效 ~/.zshrc -->
source ~/.zshrc
```

### 修改本地数据的密码

```
<!-- 修改 root 密码 -->

~ mysqladmin -u root -p password "新密码"
```

然后直接使用 “新密码” 登录

```
~ mysql -u root -p

~ Enter password: 新密码
```

### mac 通过终端命令查看端口号

命令 `lsof -i tcp:port` （`port` 替换成端口号，比如 `8081`）可以查看该端口被什么程序占用，并显示 `PID`，方便 `KILL（kill pid）`

1. 查看端口被哪个程序占用 `sudo lsof -i tcp:port` 如： `sudo lsof -i tcp:8081`
2. 看到进程的 `PID`，可以将进程杀死。 `sudo kill -9 PID` 如：`sudo kill -9 6767`
