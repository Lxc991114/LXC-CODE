/* 模拟Promise对象的then()、catch()方法 */
class myPromise {
    then() {
        console.log('then方法被调用了');
        return this;//因为只new了一个类的实例对象，所以此处的this指向该实例对象
        //不手动写return的话，返回值就是undefined
    }

    catch() {
        console.log('catch方法被调用了');
        return this;
    }

}

let promise = new myPromise();//创建类的实例对象
promise.then().then().catch()
//打印出
/*
then方法被调用了
then方法被调用了 
catch方法被调用了
*/
//只有Promise对象有then()、catch()方法，因此更能证明返回的this是该promise对象
