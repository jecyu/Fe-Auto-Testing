# 用例的表示

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

可以按照 `Jest 扩展`，在 `vscode`的命令行面板写测试用例。