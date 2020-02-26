#### Buffer
Buffer是二进制数据，一个像Array的对象，但是它主要用于操作字节。

Buffer的基本使用
```javascript
const str = '武汉加油'
cosnt buf = new Buffer(str, 'utf-8')

// 获取Buffer的长度(长度单位为字节)
buf.length
```

Buffer的元素为16进制两位数，即0到255的数值
- 如果给元素的赋值小于0，就将该值逐次加256，直到得到一个0-255之间的整数
- 如果给元素的赋值大于255，就逐次减255，直到得到一个0-255区间内的数值
- 如果是小数，舍弃小数部分，只保留整数部分

```javascript
cosnt buf = new Buffer(50)

buf[5] = -150   // 则buf[5]会被改为 106
buf[12] = 300   // 则buf[12]会被改为 45
buf[30] = 5.66  // 则buf[30]会被改为 5
```

**Buffer内存分配**

Buffer对象的内存分配不是V8的堆内存，而是在Node的C++层面实现内存的申请的。是C++申请，在JavaScript中分配内存的策略。

Node以8KB为大小来区分Buffer是大对象还是小对象
- 进行小而频繁的Buffer操作时，采用slab的机制进行预先申请和事后分配
- 对于大块的Buffer而言，直接使用C++层面提供的内存

**Buffer的转换**

Buffer对象可以与字符串之间相互转换，支持的字符串编码类型有
- ASCⅡ
- UTF-8
- UTF-16LE/UCS-2
- Base64
- Binary
- Hex

字符串转Buffer
```javascript
const a = new Buffer('abc', [encoding])
```

Buffer转字符串
```javascript
const buf = new Buffer('abc')

buf.toString([encoding], [start], [end])
```

检测Buffer是否支持某编码类型
```javascript
Buffer.isEncoding('utf-8')      // true

Buffer.isEncoding('GBK')        // false
```

通过预先转换静态内容为Buffer对象的方式，可以有效减少CPU的重复使用。

