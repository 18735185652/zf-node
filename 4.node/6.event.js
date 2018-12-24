/*
学习一个node非常重要的模块叫events
在node里面，node是基于事件驱动


*/


/*
let EventEmitter = require('events');

let util = require('util');
//console.log(util)

//这是一个类
function Bell(){
    EventEmitter.call(this); //继承私有属性
}

//进行原型继承  继承公有
//Object.setPrototypeOf(ctor.prototype,superCtor.prototype);
//ctor.prototype.__proto__ = superCtor.prototype;
util.inherits(Bell,EventEmitter);

let bell = new Bell();

//学生要进教室
function studentInClassroom(){
    console.log('学生进教室')
}
function tercherInClassroom(){
    console.log('老师进教室')
}
bell.on('响',studentInClassroom);
bell.on('响',tercherInClassroom);
bell.emit('响'); 

*/



let EventEmitter = require('./events');
let util = require('util');
function Bell(){
    EventEmitter.call(this); //继承私有属性
}

util.inherits(Bell,EventEmitter);
let bell = new Bell();
//学生要进教室
function studentInClassroom(roomNumber,things){
    console.log(`学生带着${things}进${roomNumber}教室`);
}
function tercherInClassroom(roomNumber,things){
    console.log(`老师带着${things}进${roomNumber}教室`);
}
function masterInClassroom(roomNumber,things){
    console.log(`耿老师带着${things}进${roomNumber}教室`);
}

bell.setMaxListeners(0);
bell.on('响',studentInClassroom);
bell.on('响',tercherInClassroom);
bell.on('响',tercherInClassroom);

bell.once('响',masterInClassroom);

//第一个参数是事件类型，第二个参数和以后的参数会传递给监听函数
bell.emit('响','301','书'); 
console.log('=======================================')
bell.emit('响','301','书'); 










