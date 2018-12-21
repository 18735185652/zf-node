//把标准输出流输出到文件 1
// node 3.console.js 1> a.log
console.log(1);
console.info(1);
//错误输出 2
//把错误输出2 重定向到标准输出1中  node 3.console.js 1> a.log 2>&1

console.warn(2);
console.error(2);
//用来统计二段代码直接执行时间的
console.time('cost');
let i = 0;
while(i++<100000){

}
console.timeEnd('cost'); // 输出时间差  cost名字开始结束必须对上

//高手进阶的非常重要标志就是写代码会有完善的测试，包括单元测试 集成测试 持续集成
// TDD 测试驱动开发  BDD 行为驱动开发
//以后会让大家造轮子，写开源项目，写项目的时候要严格按照开源的项目规范来做，其中一个就是要有严格的单元测试
// CMMI5级水平 检测软件开发是否规范

//断言
//如果表达式表达为真的话就什么也不发生
//如果表达式结果为假的话会报错 nagios 监控服务器的
console.assert(1===1,'报错');

function sum(a,b){
    return a + b;
}

console.assert(sum(1,2)===3,'报错');


let a = {name:'zfpx',home:{name:'北京'}};
//可以列出对象的结构
console.dir(global);
//跟踪当前代码的调用栈
console.trace();

/*
* 程序执行从上往下执行
* 栈是先进后出的
*
* */