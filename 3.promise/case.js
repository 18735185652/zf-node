let MyPromise = require("./Promise");
let p1 = new MyPromise(function(resolve,reject){
    resolve('xx')
    setTimeout(function(){
        let num = Math.random();
        if(num<.5){
            resolve(num);
        }else{
            reject('失败');
        }
    })
})


let p2 = p1.then(function(data){
    console.log(data)
},function(err){
    console.error(err);
})
