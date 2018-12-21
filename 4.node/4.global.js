/*
* global全局对象
* windows里也有全局对象，但是不能直接访问，我们在浏览器访问global是通过
* window实现的
*
* 1.global的变量都是全局变量
* 2.所有的全局变量都是global的属性
* console
* process  当前进程
* chdir
* cwd
* nextTick
* stdout stderr stdin
* Buffer
* clearImmediate clearInterval clearTimeout
* setImmediate setInterval setTimeout
* */

//argv 如何写一个vue-cli脚手架
//chdir cwd  memoryUsage
console.log(process);
//chdir是change direcotry 改变当前的工作目录
process.chdir('..');
console.log(process.cwd());

//V8引擎最大使用内存量是1.7个G
console.log(process.memoryUsage());  //内存使用量
/*
* {rss: 21872640,  常驻内存
  heapTotal: 7684096, 堆内存的总申请量
  heapUsed: 4782640,  已经使用的量
  external: 8224 }   外部内存的使用量
* */
