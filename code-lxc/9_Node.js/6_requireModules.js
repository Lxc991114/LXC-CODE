let fun = require('./5_exportsModulesA')
console.log(fun.add1(1,2));
console.log(fun.minus(3,2));
console.log(fun.add2);

let Person = require('./5_exportsModulesB')
//let p1 = new obj.Person('lisi', 23);
//console.log(p1);
let p2 = new Person('lisi', 23);
console.log(p2);

let http = require('./5_exportsModulesC')
http.get('www.baidu.com');
console.log(http.post('http,goole.com'));


