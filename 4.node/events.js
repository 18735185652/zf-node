function EventEmitter(){
    this.events = {}; //会把所有的事件监听函数放在这个对象里保存
    this._maxListeners = 2;  //给一个事件类型增加的监听数量最多有多少个，默认10个
}

//给指定的事件绑定事件处理函数， 1参数是事件类型 2参数是事件监听函数
EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(type,listener){
    if(this.events[type]){
        console.log(this._maxListeners)
        //参数为0时候表示不设置监听大小
        if(this._maxListeners && this.events[type].length>this._maxListeners){
            console.error(`超过最大监听数量${this._maxListeners},可能会造成内存泄漏,请通过setMaxListeners方法设置最大监听数量`)
        }
        this.events[type].push(listener)
    }else{
        //如果以前没有添加到此事件的监听函数，则赋一个数组
        this.events[type] = [listener];
    }
}
EventEmitter.prototype.emit = function(type,...rest){
    this.events[type] && this.events[type].forEach(listener=>listener.apply(this,rest));
}
EventEmitter.prototype.once = function(type,listener){
   //用完即焚
   let wrapper = (...rest) =>{ //先让原始的监听函数执行  这边的...rest是由emit
        listener.apply(this,rest);
        this.removeListener(type,wrapper);
   } 
   this.on(type,wrapper);
}
EventEmitter.prototype.removeListener = function(type,listener){
   if(this.events[type]){
     this.events[type] =  this.events[type].filter(l => l!=listener);
   }
}
//移出某个事件的所有监听函数
EventEmitter.prototype.removeAllListener = function(type){
    delete this.events[type];
 }

 //设置最大监听数量
 EventEmitter.prototype.setMaxListeners = function(num){
    this._maxListeners = num;
 }


module.exports = EventEmitter;