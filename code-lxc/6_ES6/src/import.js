/* 1. 导入export导出的内容：解析的变量名应该一致，可用as起别名*/
import { a as aaa, fn1 } from "./export";

console.log(aaa);
console.log(fn1());

/* 2.导入export default导出的内容：需要起别名 */
import Person1 from './export'

let p1 = new Person1('wangwu');
p1.sleep();