//在JS里，函数是一等公民，可以作为函数的返回值，也可以作为函数的参数使用

//判断一个参数是否是字符串
function isString(param){
    return Object.prototype.toString.call(param)=='[object String]';
}
console.log(isString("aa")); //true

//判断一个参数是否是数组
function isArray(param){
    return Object.prototype.toString.call(param)=='[object Array]'
}
console.log(isArray([1,2,3])); //true

//判断数据类型函数
function isType(type){
    return function(param){
        return Object.prototype.toString.call(param)=="[object "+type+"]";
    }
}

let string = isType("String");
let isarray = isType("Array");
console.log(string("hello"));
console.log(isarray({}));

//lodash after 指定一个函数被调用多少次才会真正执行
//函数可以作为参数传到另外一个函数里面
function eat(){
    console.log("吃完了");
}

function after(times,fn){
    let count = 0;
    return function(){
        if(++count===times){
            fn();
        }
    }
}

let newAfter = after(3,eat);
newAfter();
newAfter();
newAfter();










