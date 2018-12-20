function read(){
    console.log(1);
    setTimeout(function(){
        console.log(2);
        setTimeout(function(){
            console.log(4);
        })
    })
    setTimeout(function(){
        console.log(5);
    })
    console.log(3);
}
read(); // 1 3 2 5 4

//event loop事件循环
//1.先将同步代码放到执行栈里面执行，执行的过程中遇到异步代码，放放到任务队列里面，当所有执行栈里面的同步任务全部执行完毕
//后，执行任务队列里面的异步代码，先放进去的先执行，第一个定时器执行 打印2，然后发现里面嵌套了一个异步代码，继续放到任务
// 队列等待执行，此时任务队列最前面的是打印的定时器5，然后在执行4  所以结果为 1 3 2 5 4

/*
function eventLoop(){
    console.log(3);
    ajax() //执行ajax需要4s 返回 5
    setTimeout(function(){
        console.log(4)
    },1000)
}
eventLoop() // 2 4 5

*/

//添加任务队列的时候不是谁在前面谁就先进入任务队列，不是先打印ajax的5 然后打印
// 定时器的4

//事件是什么时候加入队列的？
// 异步成功之后放进任务队列的
//异步的回调函数才会放入任务队列，普通的回调不会

function aa(filename,cb){
    cb(filename)  //普通回调不会放入任务队列
}

aa(6,function(num){
    console.log("num",num+5)
})



