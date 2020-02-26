### Vue面试题集合


#### 1、如何理解MVVM原理
双向绑定的方式

数据改变驱动视图更新

视图改变也会更新数据

#### 2、响应式数据的原理是什么
Object.defineProperty()

Vue在默认初始化的时候会给data中的数据使用 Object.defineProperty() 重新定义所有属性


#### 3、Vue中是如何检测数组变化的
使用函数劫持的方式，重写了数组的方法

vue将data中的数组，进行了原型链重写，指向了自己定义的数组原型方法。

#### 4、为何Vue采用异步渲染
每个数据都会收集依赖，每个数据的变动，都可能修改同一个组件，这样组件会有频繁更新的问题

采用异步更新，多个数据同时被改了，等全部修改都完成了，可以统一更新视图

#### 5、nextTick实现原理
主要是使用了宏任务和微任务，定义了一个异步方法(nextTick)

确保视图更新之后获取到最新的DOM


#### 6、Vue组件的生命周期
beforeCreate
created         实例创建完毕
beforeMount
mounted         操作DOM
beforeUpdate    数据更新时调用，更新状态
updated         
beforeDestory   清除定时器和缓存的事件
destroyed


#### 7、Ajax请求放在哪个生命周期中
crated      DOM并未渲染出来

mounted     可以操作DOM(推荐)

#### 8、何时需要使用beforeDestory

#### 9、Vue中父子组件生命周期调用顺序

#### 10、Vue中computed的特点
计算缓存

只有数据更新变化之后才会执行

#### 11、Watch中的deep:true是如何实现的



#### 12、Vue中事件绑定的原理

#### 14、Vue中v-html会导致哪些问题

#### 15、为什么v-for和v-if不能连用

#### 16、v-model的实现原理以及如何自定义v-model

#### 17、组件中的data为什么是一个函数

#### 18、Vue组件如何通信


#### 19、什么是作用域插槽

#### 20、如何用vnode来描述一个DOM结构




#### 21、diff算法的时间复杂度




#### 22、简述Vue中diff算法原理
先同级比较，再比较子节点
先判断一方有chidren一方没有children的情况
比较都有children的情况
递归比较子节点


#### 23、v-for中为什么要用key

#### 24、描述组件渲染和更新过程

#### 25、Vue中模板编译原理





#### 26、Vue中常见的性能优化方案

#### 27、Vue中相同的逻辑如何抽离

#### 28、为什么要使用异步组件

#### 29、谈谈对keep-alive的理解

#### 30、如何实现hash路由和history路由

#### 31、Vue-Router中导航守卫有哪些

#### 32、action和mutation的区别


#### 33、简述Vuex的工作原理

#### 34、Vue3.0有哪些改进






