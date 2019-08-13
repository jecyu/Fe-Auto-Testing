# 页面测试

对于浏览器里跑的前端代码，做测试要比Node.js模块要麻烦得多。Node.js模块纯js代码，使用V8运行在本地，测试用的各种各样的依赖和工具都能快速的安装，而前端代码不仅仅要测试js，CSS等等，更麻烦的事需要模拟各种各样的浏览器，比较常见的前端代码测试方案有下面几种：

1. 构建一个测试页面，人肉直接到虚拟机上开各种浏览器跑测试页面。这个方案的缺点就是不好做代码覆盖率测试，也不好持续化集成，同时人肉工作较多

2. 使用PhantomJS构建一个伪造的浏览器环境跑单元测试，**好处是解决了代码覆盖率问题，也可以做持续集成**。这个方案的缺点是PhantomJS毕竟是Qt的webkit，并不是真实浏览器环境，PhantomJS也有各种各样兼容性坑

3. 通过Karma调用本机各种浏览器进行测试，好处是可以跨浏览器做测试，也可以测试覆盖率，但持续集成时需要注意只能开PhantomJS做测试，毕竟集成的Linux环境不可能有浏览器。这可以说是目前看到的最好的前端代码测试方式了.

## PhantomJS

> PhantomJS是一个可以用JavaScript编写脚本的无头web浏览器。它运行在Windows、macOS、Linux和FreeBSD上。https://phantomjs.org/

有时，我们需要浏览器处理网页，但并不需要浏览，比如生成网页的截图、抓取网页数据等操作。PhantomJS的功能，就是提供一个浏览器环境的命令行接口，你可以把它看作一个“虚拟浏览器”，除了不能浏览，其他与正常浏览器一样。它的内核是WebKit引擎，不提供图形界面，只能在命令行下使用，我们可以用它完成一些特殊的用途。

PhantomJS是一个模拟的浏览器，它能执行js，甚至还有webkit渲染引擎，只是没有浏览器的界面上渲染结果罢了。我们可以使用它做很多事情，比如对网页进行截图，写爬虫爬取异步渲染的页面，以及接下来要介绍的——对页面做测试。

当然，这里我们不是直接使用PhantomJS，而是使用`mocha-phantomjs`来做测试

## `mocha-phantomjs`使用命令行测试

对于习惯在终端敲命令行的程序员来说，用浏览器打开index.html去进行测试显得非常不合时宜。

还好，有所谓的headless的浏览器PhantomJS，它没有图形界面，却可以运行前端代码，方便用来测试。

mocha-phantomjs命令
安装`phantomjs`和`mocha-phantomjs`(phantomjs模块更名为phantomjs-prebuilt)：
```bash
npm install -g phantomjs-prebuilt mocha-phantomjs
```

将`Mocha`和`PhontomJS`结合起来的是`mocha-phantomjs`，在终端执行mocha-phantomjs命令，它会在PhantomJS中执行Mocha测试代码，并将结果展示在终端，非常方便

```bash
mocha-phantomjs --path ./node_modules/.bin/phantomjs ./test/index.html
```
--path选项指定了phantomjs的安装路径。这个必须指定，否则会报错"phantomjs terminated with signal SIGSEGV"。

指定一个版本来安装，否则一直加载中。

## node 安装phantomjs-prebuilt 报错解决方案

执行 `npm install phantomjs-prebuilt@2.1.16 --ignore-scripts`命令即可解决
执行 `npm install mocha-phantomjs --ignore-scripts`命令即可解决

## 废弃的方案

官方 phantomjs 仓库地址归档，mocha-phantomjs 同样废弃，不再有人维护。