# TypeScript

## 配置

1. 安装 `typeScript`，把 `.ts` 文件编译成 js 文件
```bash
npm install typescript
```
2. 安装 `@type/mocha` 和 `ts-node`， `ts-node` 它提供了TypeScript的运行环境，让我们免去了麻烦的编译这一步骤。最简单的例子，在注册ts-node之后，我们就可以直接加载并运行ts文件。
```bash
npm install @type/mocha && ts-node
```
3. 在 `mocharc.js` 中添加上 ts 的处理
```json
{
  "extension": ["ts"],
  "spec": "src/**/*.test.ts", // 制定测试文件
  "require": "ts-node/register"
}
```