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

> 本文环境配置均在 Mac 环境下

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
