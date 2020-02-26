#### 异步I/O
I/O是昂贵的，分布式I/O是更昂贵的。只有后端能够快速响应资源，才能让前端有更好的体验。

多线程的代价在于创建线程和执行期线程上下文切换的开销较大。

操作系统内核对于I/O只有两种方式：阻塞与非阻塞。
- 在调用阻塞I/O时，应用程序需要等待I/O完成才能返回结果。阻塞I/O造成CPU等待I/O，CPU的处理能力不能得到充分利用。
- 非阻塞I/O在调用之后会不带数据立即返回，要获取数据，需要通过文件描述符再次读取。应用程序需要重复调用I/O操作来确认是否完成并获取数据，这叫轮询。

我们说Node是单线程的，这里的单线程仅仅是JavaScript执行在单线程中，在Node中，内部完成I/O任务的另有线程池。

**事件循环**

在启动Node时，会创建一个类似于while(true)的循环，每执行一次循环体的过程我们称为Tick。每个Tick的过程就是查看是否有事件待处理，如果有就取出事件及其相关的回调函数。如果不再有事件处理，就退出进程。

Node中事件主要来自于网络请求，I/O等，每个事件都有对应的观察者。事件循环从观察者那里取出事件并处理。

从JavaScript调用Node的核心模块，核心模块调用C++内建模块，内建模块通过libuv进行系统调用，这是Node里最经典的调用。

立即执行一个异步任务: process.nextTick()。每次调用process.nextTick()会将回调函数放入队列中，下下一轮Tick时取出执行。

setImmediate()与process.nextTick()类似，但是执行顺序优先级要低于process.nextTick()。


### 异步编程

#### 函数式编程
高阶函数
- 将函数作为参数输入，或是将函数作为返回值的函数

偏函数
- 指创建一个调用另外一个部分(参数或变量已经预置的函数)的函数的用法
```javascript
// 通过指定部分参数来产生一个新的定制函数的形式就是偏函数
let toString = Object.prototype.toString
let isType = function(type) {
    return function(obj) {
        return toString.call(obj) === `[object ${type}]`
    }
}
```

异步编程的优势
- 非阻塞I/O可以使CPU与I/O并不互相依赖，让资源得到更好的利用

异步编程的难点
- 异常处理。try-catch只能捕获当次事件循环内的异常，对于异步callback执行时的异常无能为力。
- 函数嵌套过深。
- 阻塞代码。
- 多线程编程。
- 异步转同步。

异步编程解决方案

1.事件发布/订阅模式(事件监听)。Node中的events模块是该模式的一个实现
```javascript
const emitter = require('events').EventEmitter()
// 订阅
emitter.on('event1', function(msg) {
    console.log(msg)
})

// 发布
emitter.emit('event1', "I am a message")
```

2.Promise/Deferred模式

3.流程控制库
- 流程控制模块async
- Step
- wind

