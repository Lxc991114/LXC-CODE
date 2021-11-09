/* 模拟http的get请求和post请求 */
exports.get = function (url) {
    console.log(`向${url}发送了get请求`);
}
exports.post = function (url) {
    return `向${url}发送了post请求`
}
