---
title: Husky(åå£«å¥ð¶ )
nav:
  path: /guide
  title: ç§¯ç´¯
  order: 1
group:
  path: /guide/env-config
  order: 6
  title: éç½®
---

## ä¸ºä»ä¹éè¦ Husky

å¼ç¨ [Husky](https://typicode.github.io/husky/#/?id=manual)å®æ¹ææ¡£çæ¥åï¼

You can use it to lint your commit messages, run tests, lint code, etc... when you commit or push

## å¦ä½ä½¿ç¨ï¼

æ¬æä¾æ®ä¸ªäººä½¿ç¨è¿ç¨ï¼è®°å½éç½®åå£«å¥çå¨è¿ç¨ã

æ­é `commitlint`ã`lint-staged`ï¼å¨ `git commit` çæ¶åè¿è¡åç½®çæ ¡éªï¼æ¥çº¦æé¡¹ç®ç `commit` è§èï¼æ£æ¥æäº¤çä»£ç çè§èæ§ã

### Husky

1. install husky

```
npm install husky --save-dev
```

2. å¯å¨ Git hooks

```
npx husky install
```

3. install åèªå¨å¼å¯ Git hooksï¼å¯ä»¥å¨ `package.json` ä¸­å å¥ `script`:

ç»ç«¯æ§è¡ `npm set-scripts prepare "husky install`ï¼æèæ¯æå¨å å¥åå¯ã

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

2. éç½® commitlint è§åå¨é¡¹ç®çæ ¹ç®å½ä¸åå»º `commitlint.config.js`ï¼æä»¶åå®¹å¦ä¸

```
module.exports = { extends: ['@commitlint/config-conventional'] };
```

3. æ­é `Husky`ï¼è®¾ç½® `commit-msg` git hooks è¿è¡ commitlint

å¨æ ¹ç®å½ä¸ç `.husky` åå»º `commit-msg` æä»¶ï¼ æä»¶åå®¹å¦ä¸ï¼

```
npx --no -- commitlint --edit "$1"
```

### lint-staged

1. install lint-staged

```
npm install --save-dev lint-staged
```

2. å¨ `package.json` ä¸­éç½® `lint-staged`

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

3. å®è£ `ESLint` ã `Prettier` ã `stylelint`

```
npm install --save-dev @hkt/prettier-rules @hkt/eslint-rules stylelint
```

4. æ­é `Husky`ï¼è®¾ç½® `pre-commit` git hooks è¿è¡ lint-staged

å¨æ ¹ç®å½ä¸ç `.husky/pre-commit` ä¸­å å¥

```
npx lint-staged
```

## ç°æçé¡¹ç®éç½®å®æ

[é¡¹ç®å®æéç½®åè](https://github.com/mamba-1024/react-admin-vite)
