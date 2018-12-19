let MyPromise = require("./Promise");
let p1 = new MyPromise(function(resolve,reject){
    resolve('xx')
    // setTimeout(function(){
    //     let num = Math.random();
    //     if(num<.5){
    //         resolve(num);
    //     }else{
    //         reject('失败');
    //     }
    // })
})
let p2 = p1.then(function(data){
   return new MyPromise(function(resolve,reject){

   })
},function(err){
    console.log("then"+err);
})

p2.then(function(val){

},function(err){
    console.log(err)
})
// console.log(p2)





