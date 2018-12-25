function Clock(){
    this.listener;
    //process.nextTick同步代码的最后一个执行
    process.nextTick(()=>{
        this.listener();
    })
}
Clock.prototype.add = function(listener){
    this.listener = listener;
}

let c = new Clock;

c.add(()=>{console.log('ok')});