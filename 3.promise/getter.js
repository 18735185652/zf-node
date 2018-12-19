let obj = {}
Object.defineProperty(obj,'then',{
    get(){
        throw Error('取then出错了');
        return function(onFulfilled,onReject){

        }
    }
})
console.log(obj.then);