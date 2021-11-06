/* 1.export导出：可以有多个 */

//(1)直接导出
// export let a = 'hello';
// export let fn1 = () => 'word';

//(2)导出对象
let a = 'hello';
let fn1 = () => 'word';
export { a, fn1 }

/* 2.export default ：一个文件只能有一个*/
class Person {
  constructor(name) {
    this.name = name
  }
  sleep() {
    console.log('sleep');
  }
}

export default Person