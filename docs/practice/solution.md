# 已有的解决方案

在以前，我也很难理解测试，觉得写测试也很难，现在优秀的测试工具很多，可以让我们马上就可以写测试了。先看下面流行的测试工具

- 测试框架：**Mocha**，**Jest**，Jesmine，Tape，Tyu，Ava
- 测试运行工具：Karam
- 断言库：Assert，Should，Chai
- 测试辅助工具：Sinon
- 测试覆盖率工具：Istanbul
- 无头浏览器：puppeteer

## 断言库

**所谓“断言”，就是判定源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误**。这也是测试原则里说给一个清晰的期望值。所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现。
- assert 
assert 模块是 Node 的内置模块，用于断言。
- should.js
should.js是个第三方断言库，常和Mocha联合使用。
- Chai
Chai是个断言库，常和Mocha结合使用。它有多种断言风格（assertion style）：assert， expect， should

```js
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
```

## 测试框架

### Mocha

[Mocha](https://mochajs.org/)即是测试框架，也是一个测试 runner，它主要用到 Node.js 环境，也可以用在浏览器端，不过得手动配置各种适配脚本。

特点：灵活，可扩展性好，可配合不同的断言库实用，但是自身集成度不高。

### Jest

[Jest](https://jestjs.io/zh-Hans/) 是一个基于 Node 的测试运行工具, 这意味着测试总是在 Node 环境中运行，而不是在真正的浏览器中。
Jest是一个“**零配置**”的前端测试工具，具有诸如模拟和代码覆盖之类的开箱即用特性，主要用于React和其他JavaScript框架。 我们团队对采用JEST做前端测试的结果非常满意。它提供了一种“零配置”的开发体验，并具备诸多开箱即用的功能，比如 Mock 和代码覆盖率等。你不仅可以将此测试框架应用于React.js应用程序，也可以应用于其他 JavaScript 框架。Jest 经常被炒作的功能之一是用户界面的快照测试。快照测试可以作为测试金字塔上层一个很好的补充，但请记住，单元测试仍然是坚实的基础。 引用自 [thoughtWorks](https://www.thoughtworks.com/radar/languages-and-frameworks/jest) 


## 测试运行工具：karma

这个框架我使用过的是结合 mocha。
对于前端而言，javaScript 和 node 就够了。所以 mocha 测试框架就够了。同时mocha也可以运行在浏览器上。对于mocha 而言，需要配置html，才能运行在各个浏览器上。配置 mocha 相对复杂，繁琐一点，所以我们选择框架是 karma + mocha；

## 测试辅助工具：Sinon

Sinon 的工作本质是“替身”，测试替身用来替换测试中国呢的部分代码，使得测试复杂代码变得简单。在做单元测试时，我们会发现测试的很多方法会引用很多外部依赖的对象。例如：前端项目通常是用 ajax 去服务端请求数据，得到数据之后进一步作处理。但是做单元测试的时候通常不需要真的去请求服务端数据，不仅麻烦，可能服务端接口还没做好。这种不确定的依赖使得测试变复杂，所以我们需要用`Sinon`模拟这个请求数据的过程。

## 选择 Jest 不选 Mocha

优点：
- 开箱即用，Mock（干掉 Sinon）、Test Runner（干掉 Karma）、Matcher（干掉 Chai）、Test -Coverage（内置 istanbul）
- Watch Mode 注重开发者体验，能够在编码的时候帮助我们快速获得测试结果的反馈。

具体对比：

1. jest 测试覆盖率时，针对 babel 或 webpack 编译后的文件，不需要额外处理对于 sourcemap 的处理。
2. chai和sinon提供的断言API就不如jest友好，体现在：

- expect(array).to.eql(array)出错的时候，只能报告说expect [Array (42)] to - - - equal [Array (42)]，具体是哪个数据不匹配，根本没报告
expect(sinonStub.calledWith(args)).to.be.true出错的时候，会报告说expect false to be true。废话，我还不知道挂了么，但是那个stub究竟被什么参数调用则没有报告
From `it` to `expect` - Jest has the entire toolkit in one place. Well documented, well maintained, well good.

## 测试用例的设计

### 两种写法

测试框架通常提供 TDD（测试驱动开发）或 BDD（行为驱动开发）的测试语法来编写测试用例。不同的测试框架支持不同的测试语法，BDD 提供了可读性更好的测试用例语法，像读句子一样（需求人员也能看懂），让你更加专注于功能而不是结果。

**测试驱动开发**
```js
suite('Test', function (){
    setup(function (){
        // Create any objects that we might need
    });

    suite('#factorial()', function (){
        test('equals 1 for sets of zero length', function (){
            assert.equal(1, factorial(0));
        });

        test('equals 1 for sets of length one', function (){
            assert.equal(1, factorial(1));
        });

        test('equals 2 for sets of length two', function (){
            assert.equal(2, factorial(2));
        });

        test('equals 6 for sets of length three', function (){
            assert.equal(6, factorial(3));
        });
    });
});
```
**行为驱动开发**
```js
describe('Test', function (){
    before(function(){
        // Stuff to do before the tests, like imports, what not
    });

    describe('#factorial()', function (){
        it('should return 1 when given 0', function (){
            factorial(0).should.equal(1);
        });

        it('should return 1 when given 1', function (){
            factorial(1).should.equal(1);
        });

        it('should return 2 when given 2', function (){
            factorial(2).should.equal(2);
        });

        it('should return 6 when given 3', function (){
            factorial(3).should.equal(6);
        });
    });

    after(function () {
        // Anything after the tests have finished
    });
});
```

### 黑盒测试和白盒测试

### 测试用例

```js
describe('My first Test', () => {
  it('adds 1 + 1 to equal 2', () => {
    expect(sum(1, 1)).toBe(2);
  });
})
```

首先我们看到的是一个由`it`包裹的测试主体最小单元，采用了`Given When Then`的经典格式，我们常常称之为测试三部曲，也可以解释为 3A 即：

GWT3A说明`GivenArrange`准备测试测试数据，有时可以抽取到`beforeEachWhenAct`采取行动，一般来说就是调用相应的模块执行对应的函数或方法`ThenAssert`断言，这时需要借助的就是`Matchers`的能力，Jest还可以扩展自己的Matcher
在expect后面的toBe称之为 Matcher，是断言时的判断语句以验证正确性 ✅，在后面的文章中我们还会接触更多 Matchers，甚至可以扩展一些特别定制的 Matchers。

## 测试的步骤

- Given 
- When
- Then

1. 安装 Jest 
```bash
yarn add jest --dev
```
2. 在 package.json 中配置测试脚本
```json
"scripts": {
    "serve": "webpack-dev-server --hot --open --config build/webpack.dev.config.js",
    "test": "jest"
  },
```
3. 首先我们针对下面的代码进行第一个单元测试，它没有调用任何其他的函数，简单的输入和输出。
```js
// 输出文字
exports.generateText = (name, age) => {
  return `${name} (${age} years old)`;
}
```
4. 创建一个 test 目录放置 test 脚本文件，这里放入 `base.spec.js`，jest 会自动检测这个文件
```js
// 第一个参数写测试的功能组描述 
// 第二个参数，添加测试代码
test('应该输出 name 和 age', () => {
  const text = generateText('Jecyu', 25);  // 对比手动测试，需要到浏览器点击
  expect(text).toBe('Jecyu (25 years old)')
})
```
5. 然后我们清晰地看到输出
<img :src="$withBase('/assets/test-terminal-log.png')">
6. 在说到**集成测试**时，我们作下处理,
```js
exports.generateText = (name, age) => {
  // return `${name} (${age} years old)`;
  return `Jecyu (25 years old)`;
}
```
并且添加第二个测试，但它总是成功的了。
```js
test('应该输出空文本', () => {
  const text = generateText('', null);
  expect(text).toBe(' ( years old) ');
})
```
7. 现在修复刚刚的更改，第二个测试却报错了
```js
exports.generateText = (name, age) => {
  return `${name} (${age} years old)`;
}
```
```yml
Expected: " ( years old) "
    Received: " (null years old)"
```
### 集成测试

可以看到这里选择了几个元素，对输入作验证，然后生成文本。
```js
const addUser = () => {
  // 基于用户的输入数据，创建一个新的 HTML 元素
  // 添加到 DOM 树中
  const newUserNameInput = document.querySelector('input#name');
  const newUserAgeInput = document.querySelector('input#age');

  if (
    !validateInput(newUserNameInput.value, true, false) ||
    !validateInput(newUserAgeInput.value, false, true)
  ) {
    return;
  }

  const userList = document.querySelector('.user-list');
  const outputText = generateText(newUserNameInput.value, newUserAgeInput.value);
  const element = createElement('li', outputText, 'user-item');
  userList.appendChild(element);
};
```
这里的验证输入函数已经抽离出来，现在可以新建一个函数，集成验证输入和生成文本两个功能。
```js
// 验证和生成
exports.checkAndGenerate = (name, age) => {
    if (
    !validateInput(name, true, false) ||
    !validateInput(age, false, true)
  ) {
    return;
  }
  return generateText(name, age);
}
```
测试文件，对源文件作任何改变，这里都能快速反馈
```js
test('应该输出一个有效的文本', () => {
  const text = checkAndGenerate('Jecyu', 25); // 这个函数集成了两个函数
  expect(text).toBe('Jecyu (25 years old)');
})
```
即使单元测试的函数正常运行，但是集成后的逻辑出现错误，一样会运行失败，因此集成测试是需要的。

### 端到端测试

addUser 的依赖很多，适合端到端的测试。现在我们需要安装另外一个工具 [puppeteer](https://pptr.dev/)
```bash
yarn add puppeter --dev 
```
首先我们需要创建一个浏览器实例，打开页面，然后实用 puppeteer 的 API 操作它们。
```js
test('应该正常点击', async() => {   
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 80,  // 可以让我们观察到操作
    args: ['--window-size=1920, 1080']
  })
  // 按照指定路径进行测试
  const page = await browser.newPage();
  await page.goto('http://localhost:9000/');
  await page.click('input#name'); 
  await page.type('input#name', 'Jecyu'); // 输入
  await page.click('input#age'); 
  await page.type('input#age', '25'); // 输入，这里要输入字符串形式 https://github.com/GoogleChrome/puppeteer/issues/2266
  // 进行点击
  await page.click('button#btnAddUser');
  // 检测是否生成指定样式的项目
  const finalText = await page.$eval('.user-item', el => el.textContent())
  expect(finalText).toBe('Jecyu (25 years old)')
})
运行测试，可能会出现测试超时的报错，这个时候可以使用钩子函数设置指定超时时间。
```bash
Timeout - Async callback was not invoked within the 5000ms timeout specified by jest.setTimeout.Error:
```
延长测试时间
```js
beforeEach(() => {  // 在每个测试用例跑之前运行
  jest.setTimeout(10000); // 设置 jest 测试超时时间
}) 
```
之后会有第二个异步导致的警告
```bash
Jest did not exit one second after the test run has completed.
This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.
```
解决：关闭浏览器即可
```js
await browser.close(); // 关闭连接
afterAll( async done => {
  done();
})
```