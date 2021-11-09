class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }

    sayHello(){

    }
}
/* 1.导出方法1：导出的是包含类的对象 */
// exports.Person = Person;
/* 2.导出方法2：导出的是该类 */
module.exports = Person;