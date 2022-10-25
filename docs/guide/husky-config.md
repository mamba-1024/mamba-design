---
title: Husky(哈士奇🐶 )
nav:
  path: /guide
  title: 积累
  order: 1
group:
  path: /guide/env-config
  order: 6
  title: 配置
---

## 为什么需要 Husky

引用 [Husky](https://typicode.github.io/husky/#/?id=manual)官方文档的接受：

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push

## 如何使用？

本文依据个人使用过程，记录配置哈士奇的全过程。

搭配 `commitlint`、`lint-staged`，在 `git commit` 的时候进行前置的校验，来约束项目的 `commit` 规范，检查提交的代码的规范性。

### Husky

1. install husky

```
npm install husky --save-dev
```

2. 启动 Git hooks

```
npx husky install
```

3. install 后自动开启 Git hooks，可以在 `package.json` 中加入 `script`:

终端执行 `npm set-scripts prepare "husky install`，或者是手动加入均可。

```
// package.json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

### commitlint

1. install commitlint

```
npm install --save-dev @commitlint/{config-conventional,cli}
```

2. 配置 commitlint 规则在项目的根目录下创建 `commitlint.config.js`，文件内容如下

```
module.exports = { extends: ['@commitlint/config-conventional'] };
```

3. 搭配 `Husky`，设置 `commit-msg` git hooks 运行 commitlint

在根目录下的 `.husky` 创建 `commit-msg` 文件， 文件内容如下：

```
npx --no -- commitlint --edit "$1"
```

### lint-staged

1. install lint-staged

```
npm install --save-dev lint-staged
```

2. 在 `package.json` 中配置 `lint-staged`

```
// package.json
"lint-staged": {
    "./src/**/*.{js,ts,tsx,jsx}": [
      "eslint --fix",
      "prettier --write",
      "git add"
    ],
    "./src/**/*.{css,less,scss}": [
      "stylelint --syntax less --fix",
      "git add"
    ]
  },
```

3. 安装 `ESLint` 、 `Prettier` 、 `stylelint`

```
npm install --save-dev @hkt/prettier-rules @hkt/eslint-rules stylelint
```

4. 搭配 `Husky`，设置 `pre-commit` git hooks 运行 lint-staged

在根目录下的 `.husky/pre-commit` 中加入

```
npx lint-staged
```

## 现成的项目配置实战

[项目实战配置参考](https://github.com/mamba-1024/react-admin-vite)
