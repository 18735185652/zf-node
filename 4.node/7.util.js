let util = require('util');

//console.dir(util)

let obj = {name:'zfpx',home:{
    city:{name:'北京'}
}}

console.log(util.inspect(obj)); //
console.log(util.inspect(obj,{depth:1})); //depth层级为1 隐藏
console.log(util.inspect(obj,{depth:2})); //depth2 展开


// util还可以判断数据类型