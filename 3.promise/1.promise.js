const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

function Promise(exeuctor){
    let self = this;
    self.status = PENDING;
    self.onResolvedCallbacks = [];
    self.onRejectedCallbacks = [];
    function resolve(value){
        if(self.status === PENDING){
            self.status =FULFILLED;
            self.value = value;
            self.onResolvedCallbacks.forEach(cb=>cb(self.value));
        }
    }
    function reject(value){
        if(self.status === PENDING){
            self.status =REJECTED;
            self.value = value;
            self.onRejectedCallbacks.forEach(cb => cb(value));
        }
    }


    try{
        exeuctor(resolve,reject);
    }catch (e) {
        reject(e);
    }
}

function resolvePromise(promise2,x,resolve,reject){
    if(x === promise2){
        return reject(new TypeError("循环引用"))
    }
    let called = false;
    if(x!==null&&((typeof x ==='object')||(typeof x ==='function'))) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, function (y) {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, function (err) {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }

    }else{
        resolve(x);
    }

}

Promise.prototype.then = function(onFulfilled,onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled :value=>value;
    onRejected = typeof onRejected === 'function' ? onRejected :function (value) {throw value}
    let self = this;
    let promise2;
    if(self.status === FULFILLED ){
        return promise2 = new Promise(function(resolve,reject){
          setTimeout(function(){
              try{
                  let x = onFulfilled(self.value);
                  resolvePromise(promise2,x,resolve,reject);
              }catch (e) {
                  reject(e);
              }
          })
        })
    }
    if(self.status === REJECTED ){
        return promise2 = new Promise(function(resolve,reject){
            setTimeout(function(){
                try{
                    let x = onRejected(self.value);
                    resolvePromise(promise2,x,resolve,reject);
                }catch (e) {
                    reject(e);
                }
            })
        })
    }
    if(self.status === PENDING ){
        return promise2 = new Promise(function(resolve,reject){
           self.onResolvedCallbacks.push(function(){
               setTimeout(function(){
                   try{
                       let x = onFulfilled(self.value);
                       resolvePromise(promise2,x,resolve,reject);
                   }catch (e) {
                       reject(e);
                   }
               })
           })
           self.onRejectedCallbacks.push(function(){
               setTimeout(function(){
                   try{
                       let x = onRejected(self.value);
                       resolvePromise(promise2,x,resolve,reject);
                   }catch (e) {
                       reject(e);
                   }
               })
           })
        })
    }
}

Promise.prototype.catch = function(onRejected){
    this.then(null,onRejected)
}
Promise.deferred = Promise.defer = function(){
    let defer = {};
    defer.promise = new Promise(function(resolve,reject){
        defer.resolve = resolve;
        defer.reject = reject;
    })
    return defer;
}
module.exports = Promise;