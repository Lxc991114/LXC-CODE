function add(a, b) {
    return a + b;
}
/* 1.导出方法1:导出的是一个带方法和属性的对象 */
exports.add1 = add;
exports.minus = function (a, b) {
    return a - b;
}
exports.add2 = add(5, 6)
/* 2.导出方法2：导出的就是这个方法 */
/*module.exports = function (a, b) {
    return a + b;
  };
*/

