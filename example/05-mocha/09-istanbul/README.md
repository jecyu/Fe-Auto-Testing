# 代码覆盖率

1. 首先需要安装代码覆盖率工具istanbul：`npm install --save-dev istanbul`，istanbul同样有命令行工具，在./node_modules/.bin/istanbul可以寻觅到它的身影。Node.js端做代码覆盖率测试很简单，只需要用`istanbul`启动`Mocha`即可

2. 运行./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha 

注意的是：istanbul cover 命令后面跟的是 `_mocha` 命令，前面的下划线是不能省略的。

因为，`mocha` 和 `_mocha` 是两个不同的命令，前者会新建一个进程执行测试，而后者是在当前进程（即 istanbul 所在的进程）执行测试，只有这样， istanbul 才会捕捉到覆盖率数据。其他测试框架也是如此，必须在同一个进程执行测试。

如果要向 mocha 传入参数，可以写成下面的样子。

```bash
$ istanbul cover _mocha -- tests/test.sqrt.js -R spec
```
上面命令中，两根连词线后面的部分，都会被当作参数传入 Mocha 。如果不加那两根连词线，它们就会被当作 istanbul 的参数

## coverage

1. 运行完成后，项目下会多出一个coverage文件夹，这里就是放代码覆盖率结果的地方

coverage.json和lcov.info：测试结果描述的json文件，这个文件可以被一些工具读取，生成可视化的代码覆盖率结果，这个文件后面接入持续集成时还会提到。

lcov-report：通过上面两个文件由工具处理后生成的覆盖率结果页面，打开可以非常直观的看到代码的覆盖率

2. 这里有四个指标，通过这些指标，可以量化代码覆盖情况：

行覆盖率（line coverage）：是否每一行都执行了？
函数覆盖率（function coverage）：是否每个函数都调用了？
分支覆盖率（branch coverage）：是否每个if代码块都执行了？
语句覆盖率（statement coverage）：是否每个语句都执行了？

3. 覆盖率门槛

`istanbul check-coverage`