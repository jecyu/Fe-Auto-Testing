# Karma

对于前端而言，javaScript 和 node 就够了。所以 mocha 测试框架就够了。同时mocha也可以运行在浏览器上。对于mocha 而言，需要配置html，才能运行在各个浏览器上。配置mocha 相对复杂，繁琐一点，所以我们选择框架是 karma + mocha；、

karma 是一个典型的 C/S 程序，包含 client 和 server ，通讯方式基于 Http ，通常情况下，客户端和服务端基本都运行在开发者本地机器上。

一个服务端实例对应一个项目，假如想同时运行多个项目，得同时开启多个服务端实例。

Karma是一个测试集成工具，可以方便地以插件的形式集成测试框架、测试环境、覆盖率工具等等。Karma已经有了一套相当完善的插件体系。

## 安装，运行 Karma

```bash
// 安装karma
npm install karma --save-dev
```

```bash
// 在package.json文件中添加测试命令
scripts: {
  test:unit: "karma start"
}
```

通过Karma测试项目, 需要在项目中添加配置karam.conf.js的文件。推荐使用`karam init`命令生成初始化的配置文件。下面是, karam init 命令的配置项。生成配置文件之后, 就可以通过"npm run test:unit"命令进行单元测试了。


karma：框架本体

karma-mocha：Mocha测试框架

karma-coverage：覆盖率测试

karma-spec-reporter：测试结果输出

karma-phantomjs-launcher：PhantomJS环境

phantomjs-prebuilt: PhantomJS最新版本

karma-chrome-launcher：Chrome环境

karma-firefox-launcher：Firefox环境

Karma首先会在9876端口开启一个本地服务，然后分别启动PhantomJS、FireFox、Chrome去加载这个页面，收集到测试结果信息之后分别输出，这样跨浏览器测试就解决啦。如果要新增浏览器就安装对应的浏览器插件，然后在browsers里指定一下即可，非常灵活方便。

那如果我的mac电脑上没有IE，又想测IE，怎么办呢？可以直接运行./node_modules/karma/bin/karma start启动本地服务器，然后使用其他机器开对应浏览器直接访问本机的9876端口（当然这个端口是可配置的）即可，同样移动端的测试也可以采用这个方法。这个方案兼顾了前两个方案的优点，弥补了其不足，是目前看到最优秀的前端代码测试方案了

## 添加断言库

```bash
// 安装
npm install --save-dev chai karma-chai 
```

## 注意

1. 如果测试发送在浏览器环境, `Karma`会将测试文件, 模拟运行在浏览器环境中。所以推荐使用`webpack`, `babel`, 对测试文件进行编译操作。`Karma`中提供了处理文件中间件的配置。ps: 之前由于浏览器环境不支持require, 而我在test文件中使用了`require`, 并且我没有将测试文件进行编译, 耽误了我半天的时间:(

解决：一开始下载 `require` 插件或者通过 babel，让浏览器可以正常的解析测试文件中的 `require`

```bash
// 安装babel
npm install --save-dev karma-webpack webpack babel-core babel-loader babel-preset-env @babel/core
```

2. babel 的解析失败
Module build failed (from ./node_modules/babel-loader/lib/index.js): TypeError: Cannot read property 'bindings' of null

执行安装
```bash
npm install @babel/core @babel/preset-env
```
然后更新 babel 配置
```js
"presets": [
  "@babel/preset-env"
]
```
详情见https://stackoverflow.com/questions/52087421/module-build-failed-from-node-modules-babel-loader-lib-index-js-typeerror
babel 的具体配置

## 使用 karma 的开源库

iview 源码中 karma 配置文件

```bash
// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.config.js');

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['ChromeHeadless'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec', 'coverage'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    // 不需要输出 webpack 编译时那一大串信息
    webpackMiddleware: {
      noInfo: true,
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
      ]
    },
  });
};

```

## 小结

如果代码要运行到浏览器中，就直接使用 karma 集成的 mocha 来使用。