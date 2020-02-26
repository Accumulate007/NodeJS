### 玩转进程
JavaScript运行在单个进程的单个线程上。
- 一个Node进程只能利用一个核，如何提高多核CPU的使用率呢？
- 由于Node运行在单线程上，一旦单线程上抛出的错误异常没有被捕获，会引起整个进程奔溃。如何保证进程的健壮性和稳定性？

每个线程都拥有自己独立的堆栈，这个堆栈都需要占用一定的内存空间。


**child_process**

复制进程
```javascript
const fork = require('child_process').fork()
const cpus = require('os').cpus()   // 获取当前机器CPU的数量

for(let i=0; i<cpus.length; i++) {
    fork('./index.js')
}
```

创建子进程的4中方法
```javascript
const cp = require('child_process')

cp.spawn('node', ['index.js'])

cp.exec('node index.js', function(err, stdout, stderr) {
    // some code
})

cp.execFile('index.js', function(err, stdout, stderr) {
    // some code
})

cp.fork('./index.js')

```

#### 进程间通信
前端浏览器中，JavaScript主线程与UI渲染公用同一个线程。执行JavaScript的时候UI渲染是停滞的，渲染UI时，JavaScript是停滞的，两者互相阻塞。

Node中线程间通信
```javascript
// parent.js
const cp = require('child_process')
const n = cp.fork(__dirname + './sub.js')

n.on('message', function(m) {
    console.log(`This message send from parent.js: ${m}`)
})

n.send({hello: 'HELLO'})

// sub.js
process.on('message', function(m) {
    console.log(`Child get message: ${m}`)
})

process.send({
    foo: 'bar'
})
```
父进程和子进程会创建IPC(Inter-Process Communication)通道。

Node中实现IPC通道的是管道(pipe)技术。具体细节由libuv提供。

父进程在创建子进程之前，会创建IPC通道并监听它，然后才真正创建出子进程。并通过变量环境(NODE_CHANNEL_FD)告诉子进程这个IPC通道的文件描述符。子进程在成功创建后，根据文件夹描述符去连接这个已存在的IPC通道，从而完成父子间的连接。


进程的自动重启
```javascript
// master.js
const fork = require('child_process').fork
const cpuNumber = require('os').cpus()

const server = require('net').createServer()
sever.listen(1337)

const workers = {}
const createWorkder = function() {
    const worker = fork(__dirname, '/worker.js')

    // 退出一个进程，则重新启动一个
    worker.on('exist', function() {
        console.log(`Worker ${worker.pid} is exited!`)
        delete workers[worker.pid]
        createWorker()  // 重新创建一个进程
    })

    // 句柄转发
    worker.send('server', server)
    workers[worker.pid] = worker
    console.log(`The new create Worker pid is ${worker.pid}`)
}

// 根据CUP数量创建进程
for(let i=0; i<cpuNumber.length; i++) {
    createWorker()
}

// 进程自己退出时，让所有工作进程退出
process.on('exit', function() {
    for(let pid in workers) {
        workers[pid].kill()
    }
})
```


#### Cluster模块
Cluster模块用于解决CPU的利用率问题，同时也提供了较为完善的API，用于处理进程的健壮性问题。

创建Node进程集群
```javascript
const cluster = require('cluster')

cluster.setupMaster({
    exec: "worker.js"
})

const cpus = require('os').cpus()
for(let i=0; i<cpus.length; i++) {
    cluster.fork()
}
```
