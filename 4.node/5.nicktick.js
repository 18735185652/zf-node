/*
* nextTick setImmediate 区别和联系
* nextTick  把回调函数放在当前执行栈的底部
* setImmediate 把回调函数放在事件队列的尾部
*
* */

function read(){
    setImmediate(function(){
        console.log(1);
        process.nextTick(function(){
            console.log(2);
            process.nextTick(function(){
                console.log(3);
            })
            setImmediate(function(){
                console.log(5)
            })
            setTimeout(function(){
                console.log(6);
            })
        })
        console.log(4)
    })
    process.nextTick(function(){
        console.log(0);
    })
}
read();  // 0 1 4 2 3 5

// console.log(process)


function fn(){
   setImmediate(function(){
       console.log(1);
       setImmediate(function(){
            console.log(2);
            process.nextTick(function(){
                console.log(0);
            })
           setImmediate(function(){
               console.log(3);
           })
       })
   })
}
fn()  // 1 2 0 3