/*
 1.如何把一个unicode码转成utf8编码
    传进去一个unicode码返回一个utf8编码  万  7E07
Unicode符号范围      |        UTF-8编码方式
(十六进制)           |              （二进制）
----------------------+---------------------------------------------
0000 0000-0000 007F | 0xxxxxxx
0000 0080-0000 07FF | 110xxxxx 10xxxxxx
0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
*/

//utf8是unicode的一种存储方式，是一种实现
function transfer(number){
    let arr = ['1110','10','10'];
    let str = number.toString(2); //100 111000 000111
    arr[2]+= str.substring(str.length-6);
    arr[1]+= str.substring(str.length-12,str.length-6);
    arr[0]+= str.substring(0,str.length-12).padStart(4,0);
    return arr.map(item=>parseInt(item,2).toString(16));
}

//0x表示十六进制，所有的汉字都是三个字节
let r = transfer(0x4E07);
// let b = parseInt(0x4E07).toString(2)
console.log(r); //100 111000 000111
// 11100100 10111000 10000111

// console.log(0b11100100.toString(16)) //e4
// console.log(0b10111000.toString(16)) //b8
// console.log(0b10000111.toString(16)) //87

// console.log(Buffer.from('万'));
