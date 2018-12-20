 let MyPromise  = require('./1.promise')

let p1 = new MyPromise(function(resolve,reject){
    let num = Math.random()
    if(num>.5){
        resolve(num)
    }else{
        reject('失败')
    }

})
p1.then(function(data){
    console.log(data);
},function(err){
    console.log(err);
})