# Travis CI 

`Travis CI` 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

Travis CI 目前有两个网站，一个是 travis-ci.com，另一个是 travis-ci.org. 前者用于企业级和私有仓库，后者用于开源的公有仓库。实际上 free plan 也可以使用 travis-ci.com，但优先级很低，跑个自动化动辄两个小时，因此我们使用 travis-ci.org.


## 步骤

要在github项目上设置Travis-CI，您所要做的就是

- 在项目的根目录下，添加一个 [.travis.yml](http://docs.travis-ci.com/user/customizing-the-build/) 文件
- 进入 [travis-ci.com]() 创建一个账号，然后激活你的 github 项目

首先打开 [Travis CI 官网](https://travis-ci.org/)，并用 GitHub 账号登录，授权后 Travis CI 会同步你的仓库信息。接下来把需要做自动化的工程授权给 Travis CI.

<img :src="$withBase('/assets/travis.png')">

最好有一台 Linux 的服务器，我的是 Cent OS 7.6.x 64bit.

我们点开一个工程，再切到设置，可以看到在 push 代码和 PR 时都会触发持续集成，当然可以根据需求手动配置

<img :src="$withBase('/assets/travis-setting.png')">

## 持续集成

我们先在 master 上切一个 develop 分支，再在 test 上切一个 featur/ci 分支。

然后我们在工程的根目录下新建一个文件 .travis.yml，并复制下面的代码。

接着我们再用 Jest 写几个测试用例，注意如果项目中没有测试脚本而 .travis.yml 文件里面包含 yarn test，自动化 一定 报错。下面是展示例子
```js
module.exports = bu => {
  return new Promise((resolve, reject) => {
    if (!bu) {
      reject("Empty string");
      return;
    }
    setTimeout(() => {
      resolve(`Hello ${bu}`);
    }, 1000);
  });
};
```

然后我们在工程的根目录下新建一个文件 `.travis.yml`
```yml
language: node_js
node_js:
  - 11
branchs:
  only:
    - master
cache:
  directories:
    - node_modules
install:
  - yarn install
scripts:
  - yarn test
  - yarn build
```

工程使用 Node.js 11.x，并且只在 `master` 分支有变动时触发 自动化部署（正常的提交、PR 都会正常走持续集成），接着将 node_modules 缓存起来（你懂的），最后安装依赖、跑测试脚本、在沙箱部署。

这里：可以设置依赖包的资源，否则下载会比较慢。

交一下代码，并 pull request 到 test 分支。在此过程中我们触发了 push 和 PR，所以会跑两个 CI。待到两个都成功跑完后，我们就可以放心的合到`test`分支了。

因此，理论上只要跑通这套流程，我们就可以放心的部署到真实环境了。

<img :src="$withBase('/assets/travis-ci-github.png')">


最后我们回到 Travis CI 的官网，可以看到一套完整的构建流程：安装依赖 -> 测试 -> 沙箱部署

<img :src="$withBase('/assets/travis-build-process.png')">

## 持续部署

见：https://juejin.im/post/5c9b3934f265da60d429046d#comment

## 走一遍正式的流程

1. 我们先在 feature/ci 分支修改一段代码，提交分支，并 PR 到 develop，此时会运行两个 CI。当两个 CI 都跑通了，我们可以放心的 merge request 到 develop 分支。

2. 接下来让 develop PR 到 master，此时会运行两个 CI（一个是 develop 分支，一个是测试合并到 master 的 CI）。当两个 CI 都跑通了，我们可以放心的 merge request 到 master 分支。

3. merge request 之后会跑最后一个流程, 也就是自动部署，部署成功后线上代码就会更新了

## 加入徽章

<img :src="$withBase('/assets/travis-icon.png')">

## 总结

