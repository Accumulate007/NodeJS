## 《Node.js 从零开发 web server博客项目》

### 服务端的注意点
- 1.服务稳定性
- 2.考虑内存和CPU
- 3.日志记录。使用stream写日志，使用redis存session
- 4.安全
- 5.集群和服务拆分


### 项目需求分析
目标：
- 开发一个博客系统，具有博客的基本功能
- 只开发server端，不关心前端
- 首页，作者主页，博客详情页，登录页，管理中心，新建页，编辑页


### 技术方案
- 数据如何存储
- 如何与前端对接，即接口设计

http请求概述：
- 1.DNS解析，建立TCP链接，发送http请求
- 2.服务端接收到http请求，处理，并返回结果
- 3.客户端接收到返回的数据，处理数据(渲染页面，执行JS代码等)

### 目录介绍
- blog-01使用原生NodeJS开发博客项目



```javascript
1.下载地址：https://dev.mysql.com/downloads/mysql
2.安装过程中需要输入root用户名和密码，要记住这个密码
3.安装可视化工具 mysql workbench。操作mysql的客户端，可视化操作，下载地址：https://dev.mysql.com/downloads/workbench 
```

```javascript
/**
 * MySQL
 * 
 * 密码 root@localhost: Kaoa?pHA+7eJ    // 密码是最后12位
 * 修改后的密码：chen123456
 * 
 * 1. cmd中进入到MySQL的安装目录 E:\MySQL\mysql-8.0.18-winx64\bin，执行命令 mysqld --initialize --console
 * 2.执行完命令后，会获取到root密码(Kaoa?pHA+7eJ)
 * 3.然后执行命令 mysqld install
 * 4.执行完install命令后，在  任务管理器 -> 服务，中找到MySQL并开启
 * 5.然后在命令行执行 mysql -u root -p，执行后会出现Enter password，输入第二步获取的密码
 * 
 * 6.要退出mysql的话，只需要在mysql>后输入exit即可
 * 
 */
```

### Session
用户名和用户ID之间的映射

session产生的问题
- 1.目前session直接是JS变量，存储在NodeJS的进程中
- 2.进程的内存大小有限，访问量过大，内存暴增
- 3.线上环境中，运行是多线程的，进程之间无法共享


### Redis
- 1.web server最常用的缓存数据库，数据存放在内存中
- 2.相比mysql，因为数据存储在内存中，访问速度更快
- 3.但是成本更高，可存储的数据量更小

Windows安装redis：www.runoob.com/redis/redis-install.html


### Nginx
- 1.高性能的web服务器，开源免费
- 2.一般用于静态服务，负载均衡
- 3.反向代理

Nginx下载: http://nginx.org/en/download.html

windows下Nginx配置文件: C:\nginx\conf\nginx.conf

```javascript
// 测试配置文件是否正确
nginx -t

// 启动nginx
start nginx

// 重启nginx()
nginx.exe -s reload

// 停止
nginx.exe -s stop
```

### 日志
1.访问日志(access log)
2.自定义日志(包括自定义事件、错误记录等)

日志相关
- NodeJS文件操作，NodeJS stream
- 日志功能开发和使用
- 日志文件拆分，日志内容分析

日志为什么要存储在文件中，而不是存储在MySQL或者是Redis中？
日志文件非常庞大，而Redis是内存数据库，无法支持如此大的数据量存储。而且日志的读写对性能要求不高，没必要使用Redis
日志的数据结构只是单条的记录数据，不存在MySQL数据中各种属性，排序，查询的需求


日志的拆分
- 按时间拆分日志，例如 2019-12-25.access.log

日志拆分实现方式
linux 下的 crontab 

日志的分析
- 日志是按行存储的，一行就是一条日志
- 使用NodeJS的readline(基于stream, 效率高)

### 安全
- 1.sql注入：窃取数据库内容
攻击方式：输入一个sql片段，最终拼接成一段攻击代码
预防措施：使用mysql的escape函数处理输入即可

- 2.XSS攻击：窃取前端cookie的内容
攻击方式：在页面展示内容中参杂JS代码，以获取网页信息
预防措施：转化生成JS的特殊字符。转义后的字符，在HTML页面中浏览器解析后，会作为字符串显示
例如: '<script>alert(1)</sciprt>' 在浏览器中解析，会作为JavaScript代码执行
而： '&lt;script&gt;alert(1)&lt;/script&gt;'在浏览器中解析后，会作为字符串'<script>alert(1)</sciprt>'显示

- 3.密码加密：保障用户信息安全


### Express

```javascript
// 安装express辅助工具
npm install express-generator -g

// 初始化一个项目目录
express express-blog

// 安装依赖
npm install

// 运行项目
npm start
```

**express中间件**
```javascript
const express = require('express')
const app = express()

app.use((req, res, next) => {
    // use/get/post等express方法的回调函数就是Express的中间件
    next()  // next的执行用于串联起前后的中间。如果不手动执行 next()，中间件是不会往下一个执行的
})

// 需要搞清楚，访问一个路由地址的时候，哪些中间件会执行，哪些不会执行
```

中间件原理
- app.use用来注册中间件，先收集起来
- 遇到http请求，根据path和mehod判断触发哪些中间件
- 实现next机制，即上一个中间件通过next触发下一个中间件

### KOA
- express中间件是异步回调，koa2原生支持async/await
- 新开发的框架和系统，都开始基于koa2，例如egg.js
- koa2肯定是未来的趋势

安装KOA2脚手架工具
```javascript
// 安装脚手架
npm install koa-generator -g

// 创建项目
koa2 blog-koa

// 安装依赖
npm install

// 启动项目
npm run dev
```









