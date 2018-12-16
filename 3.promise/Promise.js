/* 初版promise的实现 */

/*
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise(exeuctor){
    let self = this;
    self.status = PENDING;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value){ //2.1.1
        if(self.status === PENDING){
            self.status = FULFILLED;
            self.value=value;
            self.onResolvedCallbacks.forEach(cb=>cb(self.value))
        }
    }
    function reject(reason){//2.1.2
        //如果是初始态，转换为失败态
        if(self.status ===PENDING){
            self.status = REJECTED;
            self.value = reason;
            self.onRejectedCallbacks.forEach(cb=>cb(self.value));
        }
    }
    try{
        exeuctor(resolve,reject);
    }catch(e){
        reject(e);
    }
}
Promise.prototype.then = function(onFulfilled,onRejected){
    onFulfilled = typeof onFulfilled=='function' ? onFulfilled : value => value;
    onRejected = typeof onRejected=='function' ? onRejected : reson =>{throw reason};
    let self = this;
    let promise2;
    if(self.status == FULFILLED){
        let x = onFulfilled(self.value);
    }
    if(self.status == REJECTED){
        let x = onRejected(self.value);
    }
    if(self.status == PENDING){
        self.onResolvedCallbacks.push(onFulfilled)
        self.onRejectedCallbacks.push(onRejected)
    }
}
module.exports = Promise;

*/

const PENDING = 'pending'; //初始态
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';
function Promise(exeuctor){
    let self = this; //先缓存当前promise实例
    self.status = PENDING; //设置状态
    //定义存放成功的回调的数组
    self.onResolvedCallbacks = [];
    //定义存放失败的回调的数组
    self.onRejectedCallbacks = [];
    //当调用此方法的时候，如果promise状态为pending，转换为成功态，如果是成功或者失败了，则什么都不做
    //2.1
    function resolve(value){ //2.1.1
        //如果是初始态，则转成成功态
        if(self.status ===PENDING){
            self.status = FULFILLED;
            self.value=value; //成功后会得到一个值，这个值不能改
            //调用所有成功的回调
            self.onResolvedCallbacks.forEach(cb=>cb(self.value))
        }
    }
    function reject(reason){//2.1.2
        //如果是初始态，转换为失败态
        if(self.status ===PENDING){
            self.status = REJECTED;
            self.value = reason;
            self.onRejectedCallbacks.forEach(cb=>cb(self.value));
        }
    }
    try{
        //因为此函数执行可能会异常，所以需要捕获，如果出错了，需要用错误 reject
        exeuctor(resolve,reject);
    }catch(e){
        //如果这个函数执行失败了，则用失败的原因reject这个promise
        reject(e);
    }
}

function resolvePromise(promise2,x,resolve,reject){
    if(promise2 === x){
        return reject(new TypeError('循环引用'));
    }
    if(x instanceof Promise){
        if(x.status=='pending'){

        }
    }
}


//onFulfilled 是用来接收promise成功的值或者失败的原因
Promise.prototype.then = function(onFulfilled,onRejected){
    //如果成功和失败的回调没有传，则表示这个then没有任何逻辑，只会把值往后抛
    //2.2.1
    onFulfilled = typeof onFulfilled=='function' ? onFulfilled : value => value;
    onRejected = typeof onRejected=='function' ? onRejected : reson =>{throw reason};
    //如果当前promise状态已经是成功态，onFulfilled直接取值
    let self = this;
    let promise2;
    if(self.status == FULFILLED){
       return promise2 =  new Promise(function(resolve,reject){
            try{
                let x = onFulfilled(self.value);
                //如果获取到了返回值x，会走解析promise的过程
                resolvePromise(promise2,x,resolve,reject);
            }catch (e){
                //如果执行成功的过程中出错了，用错误原因把promise2reject
                reject(e)
            }

        })

    }
    if(self.status == REJECTED){
        try{
            let x = onRejected(self.value);
            resolvePromise(promise2,x,resolve,reject);
        }catch (e){
            reject(e)
        }

    }
    if(self.status == PENDING){
        self.onResolvedCallbacks.push(function(){
            try{
                let x = onFulfilled(self.value);
                resolvePromise(promise2,x,resolve,reject);
            }catch (e){
                reject(e)
            }

        })
        self.onRejectedCallbacks.push(function(){
            try{
                let x = onRejected(self.value);
                resolvePromise(promise2,x,resolve,reject);
            }catch (e){
                reject(e)
            }

        })
    }

}

module.exports = Promise;

