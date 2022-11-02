---
title: 常用的Git命令
nav:
  path: /guide
  title: 积累
  order: 1
group:
  path: /guide/git-help
  order: 1
  title: 常用的Git命令
---

# 常用的 Git 命令

## git commit 规范

作为一个程序开发者，`git` 是我们常用的一个代码托管工具，它的功能还是很丰富的，所以 Git 的相关操作和命令还是比较多的，可以参看之前的一篇文章：[常用的 Git 命令](https://juejin.cn/post/6997369695548473358)。

### 为什么要对 Git 提交日志（message）的格式进行规约约束？

- 更方便、快捷地浏览和了解项目的历史信息
- 有利于保证提交内容的独立性，避免把所有改动都放在一个提交里面
- 便于通过脚本自动化生成 `CHANGELOG`

### Commit message 的基本格式

```
<type>[optional scope]: <subject>

[optional body]

[optional footer(s)]
```

其中 message header（即首行）必选，scope、body 和 footer 可选。

**字数限制**

- header（首行）：只有一行，不超过 50 个字符
- body：每行不超过 72 个字符
- footer：每行不超过 72 个字符

### Header

#### type

type 用来描述本次提交的改动类型，有如下值可以选择：

- feat: 新增功能
- fix: 修复 bug
- docs: 文档相关的改动
- style: 对代码的格式化改动，代码逻辑并未产生任何变化(例如代码缩进，分号的移除和添加。`css` 样式文件的修改一般属于 `feat` 或者 `fix`，并不是 `style`)
- test: 新增或修改测试用例
- refactor: 重构代码或其他优化举措
- chore: 项目工程方面的改动，代码逻辑并未产生任何变化
- revert: 恢复之前的提交

#### scope

`scope` 用来描述本次提交所涉及到的改动范围（例如：模块、功能或其他任何限定的范围）。

```
chore(request-utils): add npmignore
```

#### subject

subject 用来概括和描述本次提交的改动内容

- 以动词开头，使用第一人称现在时，比如: change，而不是 changed 或 changes

```
// good
docs: change docs

// bad
docs: changed docs
```

- 第一个字母小写
- 结尾不加句号（.）

## git commit -m 后想要撤销当前 commit

> `HEAD^` 的意思是上一个版本，也可以写成`HEAD~1`， 如果要撤回 2 次`commit`,使用`HEAD~2`

- **--soft** 仅撤销`commit`操作，代码还会保留 `git reset --soft HEAD^ `

- **--mixed** 不删除工作空间改动代码，撤销`commit`，并且撤销`git add . `操作 `git reset HEAD^ === git reset --mixed HEAD^ （--mixed默认参数）`

- **--hard** 删除工作空间改动代码，撤销`commit`，撤销`git add .`,恢复到了上一次的 commit 状态 `git reset --hard HEAD^ `

## git 强制提交，不进行规则校验

`git commit --no-verify -m ''`

## 删除本地分支

`git origin -d feature/test1`

## 删除远程分支

`git push origin -d feature/test1`

## 请在合并前提交或贮藏您的修改

当出现该提示的时候，就是说明本地修改的文件和远程的不一致

1. 使用 `git stash` 本地工作区备分，放入 git 栈中。然后，工作区内容恢复到仓库 head 最后一次提交的内容
2. 然后 `git pull`
3. 最后 `git stash pop` ,这个过程自动合并。
   1. 如果成功，则自动此备分从`git stash`中删除。
   2. 如果有冲突，则你需要手动解决冲突。然后 `git stash drop`

## git rebase

如果我们有 3 个 commit，假如说我们要合并最后两个 commit

- 方法 1： `HEAD~` + `number`(需要合并的个数)

```
git rebase -i HEAD~2
```

- 方法 2： `git rebase -i` + `commitID`(需要合并的 2 个 commit 前面一个 commitID)

```
git rebase -i eaa0cee6aae764faa090218ddd085de70c4dae0d
```

合并 commit

1. 在执行 `git rebase` 后，在命令行中会出现需要合并的提交信息，如下信息

```
pick 6c8eac8 Update README.md
pick 0664a5a Update README.md

# Rebase 2fb781e..0664a5a onto 2fb781e (2 commands)
```

2. 按键盘 `i` 进行输入，然后修改 `pick` 为 `s`（**关键步骤**）

```
pick 6c8eac8 Update README.md
s 0664a5a Update README.md

# Rebase 2fb781e..0664a5a onto 2fb781e (2 commands)
```

3. `esc` 然后 `:wq` 保存并退出，然后弹出提交信息

```
# 这是一个 2 个提交的组合。
# 这是第一个提交说明：

Update README.md
# 这是提交说明 #2：

Update README.md
```

4. 将 commit 说明修改为最终的提交信息

```
# 这是一个 2 个提交的组合。
# 这是第一个提交说明：

Update README.md 信息合并
```

5. `esc` 然后 `:wq` 保存并退出

## git format-patch 生产 patch 和 打 patch

[如何用 git 命令生成 Patch 和打 Patch](https://www.huaweicloud.com/articles/5730a4be6c5ce16b823f9f9e0e9ecf1e.html)

## npm 发布

1. npm login
2. npm version 版本号
3. npm publish
4. git push

## npm link 使用和卸载

> 在同一个 node 版本下使用

1. 在需要调试的 npm 开发包下执行 `npm link`，生成的包名就是 `package.json` 下的 `"name": "packageName"`
2. 在项目中使用 `npm link packageName`，这样项目本地的 npm 包就是正在调试的包了
3. 卸载正在调试的 npm 包，同事恢复线上包 `npm unlink --no-save package && npm install`

## 查看某个 npm 包的历史版本号

```
npm view *** versions
```

## git 中 SSL certificate problem: unable to get local issuer certificate 的解决方案

### 问题原因

通过`HTTPS`访问`Git`远程仓库的时候，如果服务器上的`SSL`证书未经过第三方机构认证，`git`就会报错。原因是因为未知的没有签署过的证书意味着可能存在很大的风险

### 如何解决

将**系统当前用户**范围 `git` 中的 `sslverify` 关掉

```
git config --global http.sslverify false
```

或者是将**全局所有用户**范围 `git` 中的 `sslverify` 关掉

```
git config --system http.sslverify false
```
