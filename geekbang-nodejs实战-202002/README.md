### NodeJS实战(2020-02-11)

#### 课程内容综述
1.课程背景介绍(立项，开发，调优，维护)

2.技术预研

3.项目开发

4.性能调优

5.框架和工程化

#### 认识NodeJS
NodeJS和和浏览器的区别
- NodeJS没有浏览器API，比如documment,window等
- NodeJS添加了许多NodeJS API，让你有能力控制整个计算机

NodeJS现阶段主要用于什么
- Web服务
- 构建工具
- 开发工具，例如Visual Studio Code
- 游戏开发
- 客户端应用开发

前后端同构

同一套HTML代码，可能即能在服务端渲染，也可以在前端渲染，前后端的代码是可以公用的。这就是前后端的同构。

#### 课程项目介绍：NodeJS版极客时间
NodeJS版极客时间
- 列表页
- 详情页
- 播放页

#### 技术预研
- 分析要做的需求，找出技术难点
- 针对每个技术难点进行攻克

**BFF层(Backend for Fronend)**

介于浏览器和后台服务之间的一个中间渲染层。负责组装后台返回的数据，组装成前端所需要的数据，返回给浏览器。
- 对用户侧提供HTTP服务
- 使用后端RPC服务

#### CommonJS

**script加载脚本的问题**
- 脚本变多时，需要手动管理加载顺序
- 不同脚本之间逻辑调用，需要通过全局变量的方式
- 脱离了html如何执行JS标签？

**CommonJS模块规范**
- JavaScript社区发起，在NodeJS上应用并推广
- 反向影响了浏览器端的JavaScript

#### npm

#### NodeJS内置模块

#### 异步

**非阻塞IO**
- I/O，即一个系统的输入和输出
- 阻塞I/O和非阻塞I/O的区别在于系统接收输入再到输出期间，能不能接收其它输入

**callback**
- error-first callback，回调函数的第一个参数是error，后面的参数才是结果

**事件循环**

**Promise**

是一个状态机
- pending
- fulfilled/resolved
- rejected

then和catch
- resolved状态的Promise会回调后面的第一个then
- rejected状态的Promise会回调后面的第一个catch
- 任何一个rejected状态且后面没有.catch的Promise，都会造成浏览器或者Node环境的全局错误
- 执行then和catch都会返回一个新的Promise，该Promise的最终状态根据then和catch的回调函数的执行结果决定：如果回调函数的最终结果是throw，该Promise是rejected状态；如果回调函数的结果是return，该Promise是resolved状态；如果回调函数最终return了一个Promise，该Promise会和回调函数return的Promise状态保持一致

**async/await**
- async function是Promise的语法糖封装


#### HTTP

服务器上的HTTP服务，需要负责将浏览器传输过来的HTTP协议报文解析出来，理解浏览器的需求。


#### RCP(Remote Procedure Call)
RPC，远程过程调用
- 都是两个计算机之间的网络通信
- 需要双方约定一个数据格式
- RPC通信一般是内网间的互相请求，基于TCP或者UDP协议
- RPC使用二进制格式传输数据，替代HTTP
- NodeJS通过RPC通信从后台服务获取数据

**NodeJS net模块搭建多路复用的RPC通道**


#### 项目整体需求分析

API服务：RESTful
- 简单易懂
- 可以快速搭建
- 在数据的聚合方面有很大劣势

#### 前后端同构

#### 性能优化
HTTP压力测试工具
- ab(apache)
- webbench

找到计算机的性能瓶颈
- top
- iostat

NodeJS性能分析工具
- NodeJS自带的profile。启动Node服务'node --prof index.js'
- Chrome Devtool。启动Node服务'node --inspect-brk index.js'

代码性能优化的本质
- 减少不必要的计算
- 空间换时间

内存管理优化
- 垃圾回收

进程
- 操作系统挂载运行程序的单元
- 拥有一些独立的资源，如内存等

线程
- 进行运算调度的单元
- 进程内的线程共享进程内的资源

NodeJS的事件循环
- 主线程运行V8与JavaScript
- 多个子线程通过事件循环被调度

NodeJS cluster模块

