import { defineConfig } from 'dumi';

const repo = 'mamba-design';

export default defineConfig({
  title: repo,
  favicon: 'https://raw.githubusercontent.com/mamba-1024/mamba-design/main/images/icon.png',
  logo: 'https://raw.githubusercontent.com/mamba-1024/mamba-design/main/images/icon.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // Because of using GitHub Pages
  base: `/${repo}/`,
  publicPath: `/${repo}/`,
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
    {
      title: 'GitHub',
      path: 'https://github.com/mamba-1024/mamba-design',
    },
  ],
  // 按需引入 antd
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
