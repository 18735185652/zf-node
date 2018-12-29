let school = require('./school');

// console.log(school);

/*
在node.js里通过require方法加载其他模块
这个加载是同步的
1.找到这个文件
2.读取此文件模块的内容
3.把它封装在一个函数里执行  
dirname 取得当前模块文件的所有的目录的绝对路径  

当前模块的导出对象  require方法  当前模块(this) 当前文件的绝对路径  当前文件夹的绝对路径
var args = [this.exports,require,this,filename,dirname]
在模块内部  this.exports等于当前模块导出对象，就等于this
4.执行后把模块的module。exports




*/

// !function(exports,require,module,__filename,dirname){
//     let name = 'zfpx';
//     let age = 9;
//     module.exports = {name,age};
//     return module.exports
// }()

/*
因为模块实现缓存，当第一次加载这个模块之后，会缓存这个模块的exports对象，以后再次加载这个模块的话，直接
从缓存取，不需要再加载了
缓存的key是什么？ //是加载文件所在的绝对路径，所以不同目录下加载同一模块是可以缓存的

*/
// console.log(Object.keys(require.cache));

console.log(global);

/*
resolve  //只想知道模块的路径，但又不想加载这个模块
main     //
extensions
cache

*/





// console.log(module);

/*
id: '.',  模块id  入口模块 入口模块的ID永远为.
exports: {},  导出对象，默认是一个空对象
parent: null, 父模块，此模块是谁哪个模块加载的
filename: 'C:\\Users\\gaopeng\\Desktop\\node\\zf-node\\5.module\\useschool.js', 当前文件的绝对路径
loaded: false, 是否加载完成
children:[], 此模块加载了那些模块
paths: 第三方模块的查找路径
*/