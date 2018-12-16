/*
* 比如我现在要读取一个文件，异步读取
* */
let fs = require('fs');
/*
* 回调的特点是error first
* 调用回调函数的时候第一个参数永远是错误的对象
*
* */

/*
fs.readFile('./1.txt','utf8',function(err,data){
    if(err){ //如果err有值，表示程序出错了
        console.log(err);
    }else{ //如果err为空，表示成功了，没有错误
        console.log(data);
    }
})
*/


/*
* 回调函数的问题
* 1.无法捕获错误 try catch
* 2.不能听return
* 3.回调地狱
* */

/*
function read(filename){
    fs.readFile(filename,'utf8',function(err,data){
        throw Error('出错了');
        if(err){ //如果err有值，表示程序出错了
            console.log(err);
        }else{ //如果err为空，表示成功了，没有错误
            console.log(data);
        }
    })
}
try{
    read('./1.txt')
}catch (e){
    console.log('err',e)
}
// let result = read('./2.txt');
*/

// console.log(2);


/*
* 当你访问服务器的时候，比如要请求一个HTML页面，比如是用户
* 列表，服务器一方面会去读取模板文件，可能是ejs pug
* jade handlebar,另外一方面还有读取数据(可能会放在文件里，
* 也可以回放在数据库里)，他们都很慢，所以都是异步的
* 这种恶魔金字塔有以下问题
* 1.非常难看
* 2.非常难以维护
* 3.效率比较低因为他们是串行的
* */

/*
fs.readFile('./template.txt','utf8',function(err,template){
    fs.readFile('./data.txt','utf8',function(err,data){
        console.log(template+'和'+data)
    })
})
*/

//如何解决回调这个嵌套的问题
//1.通过事件发布订阅来实现
//这是node核心模块中的一个类，通过它可以创建事件发射器的实例，
//里面有两个核心方法，一个叫on emit，on表示注册监听，emit表示发射事件


/*
let EventEmitter = require('events');
let eve = new EventEmitter();
//这个html对象是存放最终数据
let html = {}; //template data
//监听数据获取成功事件，当事件发生之后调用回调函数
eve.on('ready',function(key,value){
    html[key] = value;
    if(Object.keys(html).length==2){
        console.log(html)
    }
})
fs.readFile('./template.txt','utf8',function(err,template){
   //1事件名 2.参数往后是传递给回调函数的参数
    eve.emit('ready','template',template);
})
fs.readFile('./data.txt','utf8',function(err,data){
    eve.emit('ready','data',data);
})
*/

//通过一个哨兵函数来处理

/*
function render(length,callback){
    let html = {};
    return function(key,value){
        html[key]=value;
        if(Object.keys(html).length==length){
            callback(html)
        }
    }
}
let done =render(2,function(html){
    console.log(html);
});
fs.readFile('./template.txt','utf8',function(err,template){
    done('template',template)
})
fs.readFile('./data.txt','utf8',function(err,data){
    done('data',data)
})
*/



function render(length,callback){
    let html={};
    return function(key,value){
        html[key] = value;
        if(Object.keys(html).length === length){
            callback(html);
        }
    }
}
let done = render(2,function(data){
    console.log(data);
})
fs.readFile('./template.txt','utf8',function(err,template){
    done("template",template)
})
fs.readFile('./data.txt','utf8',function(err,data){
    done('data',data)
})