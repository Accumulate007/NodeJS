#### Node简介
高性能Web的要点
- 事件驱动
- 非阻塞IO

单线程的弱点
- 无法利用多核CPU
- 错误会引起整个应用退出，应用的健壮性值得考验
- 大量计算占用CPU导致无法继续调用异步I/O

Node通过 child_process 来解决单线程中大计算量的问题。通过将计算分发到各个子进程，可以将大量计算分解。然后通过进程之间的事件消息来传递结果。

I/O密集和CPU密集
- Node面向网络且擅长并行I/O
- Node可以通过两种方式充分利用CPU：1.编写C/C++扩展来高效利用CPU；2.通过子进程的方式，将一部分Node进程当作常驻服务进程用于计算，利用进程间的消息传递结果，将计算与I/O分离

Node通过libuv兼容层实现了对lunix，windows等平台的跨平台兼容。


### 模块机制
CommonJS制定的愿望就是希望JavaScript能够在任何地方运行，可以具备跨宿主环境执行的能力。

CommonJS对模块的定义主要分为模块引用、模块定义和模块标识
- 模块引用，通过require()方法接受模块标识，引入一个模块
- 模块定义，使用exports导出当前模块的方法或者变量，并且是唯一导出的出口。模块中还存在一个module对象，它代表模块本身。exports是module的属性。Node中一个文件就是一个模块。
- 模块标识，其实就是传递给require()方法的参数

Node中引入模块的三个步骤
- 路径分析
- 文件定位
- 编译执行

并且在Node中模块分为两类：1.Node提供的模块，称为核心模块；2.用户编写的模块，称为文件模块。
- 核心模块部分在Node源代码的编译过程中，编译进了二进制执行文件。启动Node的时候，部分核心模块就被直接加载进内存中。
- 文件模块则是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程

模块加载过程
- Node对于引入过的模块都会进行缓存，以减小二次引入的开销。并且Node缓存的是编译和执行之后的对象，不论是核心模块还是文件模块，require()方法对于相同模块的二次加载都是采用缓存优先的方式。
- 核心模块的优先级仅次于缓存加载。Node不允许加载一个与核心模块标识符相同的自定义模块。
- 以 .、..和/开始的标识符，这里都被当做文件模块来处理。分析文件模块时，require()方法会将路径转为真实路径，以真实路径为索引，将编译执行后的结果存放到缓存中。
- 自定义模块加载速度最慢。

Node文件扩展名分析：Node会按照.js、.json、.node的次序补足扩展名，依次尝试。

**模块编译**

在编译的过程中，Node对获取的JavaScript文件内容进行了头尾包装，一个正常的JavaScript文件会被包装成如下：
```javascript
(function(exports, require, module, __filename, __dirname) {
    var math = require('math')
    exports.sum = function(a, b) {
        return a + b
    }
})
```
这样每个模块文件之间都进行了作用域隔离。所以，即使exports,require,module,__filename,__dirname没有定义在模块中，却可以使用。


**核心模块**
- 核心模块分为纯粹由C/C++编写的模块，称为内建模块，属于最底层的模块。主要提供API给JavaScript核心模块调用
- 核心模块还包含由C/C++以及JavaScript混合编写的模块，称为JavaScript核心模块

Node在启动时会生成一个全局变量process。

**包**

CommonJS为package.json文件定义了一些必要的字段
- name 包名
- description 包简介
- version 版本
- keywords 关键词数组
- maintainers 包维护者列表
- contributors 贡献者列表
- bug 可以反馈bug的地址
- licenses 包使用的许可证列表
- repositories 源代码位置列表
- dependencies 当前包所需要的依赖包列表
- homepage 包网站地址
- os 操作系统支持列表
- engine 支持的JavaScript引擎列表
- scripts 脚本说明对象
- author 包作者
- mian 包的入口文件
- devDependencies 一些模块只需要在开发时依赖，配置在这个属性里


**AMD规范**

AMD全名Asynchronous Module Definition，异步模块定义。

AMD规范是CommonJS规范的一个延申，它的模块定义如下：define(id?, dependencies?, factory)
- id和dependencies是可选的
- factory的内容就是模块实际代码的内容

一个简单的模块
```javascript
define(function() {
    var exports = {}
    exports.sayHello = function() {
        console.log('hello')
    }
    return exports
})
```
AMD需要使用define来明确定义一个模块，而在Node中模块是隐式包装的。


**CMD规范**

CMD与AMD的主要区别在于定义模块和依赖引入的部分。
- AMD需要在声明模块的时候指定所有的依赖，通过形参传递依赖到模块内部:define(['dep1', 'dep2'], function() {})
- CMD支持依赖的动态引入，define(function(require, exports, module) {})，require，exports和module通过形参传递给模块，在需要依赖模块时，随时调用require()引入即可

**兼容多种模块**

为了让同一个模块可以运行在前后端，需要能够兼容Node、AMD、CMD以及常见浏览器环境
```javascript
(function(name, definition) {
    // 检测上下文环境是否为AMD或CMD
    var hasDefine = typeof define === 'function'
    // 检测上下文环境是否为Node
    var hasExports = typeof module !== 'undefined' && module.exports

    if(hasDefine) {
        define(definition)
    } else if(hasExports) {
        module.exports = definition()
    } else {
        // 将模块执行结果挂在window上
        this[name] = definition()
    }
})('hello', function() {
    var hello = function() {}
    return hello
})
```

