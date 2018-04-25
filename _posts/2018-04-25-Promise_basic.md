---
layout: post
title:  "Promise基础"
categories: JS
tags:  ES6 学习笔记 JS
author: 陈超文
---

* content
{:toc}





1.  [Promise 的含义](http://es6.ruanyifeng.com/#docs/promise#Promise %E7%9A%84%E5%90%AB%E4%B9%89)
2.  [基本用法](http://es6.ruanyifeng.com/#docs/promise#%E5%9F%BA%E6%9C%AC%E7%94%A8%E6%B3%95)
3.  [Promise.prototype.then()](http://es6.ruanyifeng.com/#docs/promise#Promise.prototype.then())
4.  [Promise.prototype.catch()](http://es6.ruanyifeng.com/#docs/promise#Promise.prototype.catch())
5.  [Promise.prototype.finally()](http://es6.ruanyifeng.com/#docs/promise#Promise.prototype.finally())
6.  [Promise.all()](http://es6.ruanyifeng.com/#docs/promise#Promise.all())
7.  [Promise.race()](http://es6.ruanyifeng.com/#docs/promise#Promise.race())
8.  [Promise.resolve()](http://es6.ruanyifeng.com/#docs/promise#Promise.resolve())
9.  [Promise.reject()](http://es6.ruanyifeng.com/#docs/promise#Promise.reject())
10.  [应用](http://es6.ruanyifeng.com/#docs/promise#%E5%BA%94%E7%94%A8)
11.  [Promise.try()](http://es6.ruanyifeng.com/#docs/promise#Promise.try())

# 1.Promise的含义

就是通过承诺的方式，按顺序编写异步函数，避免了回调函数的混乱写法。抑郁维护和解读

# 2.基本用法
```javascript
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(value=>do something,err=>do something)
```
## 注意：
1.  promise在实例化的时候会立刻执行
2.  resolve和reject是js内置的function
3.  promise跟回调函数一样，是异步的，resolve和reject后面如果还有代码，这回先调用后面的代码

4.  then会吧返回值传给下一个then，可以链式书写，如
```javascript
promise.then(value=>value,err=>err).then(value=>{console.log(value);},err=>{console.log(err)})
```
        但是value只会传给下一个value，err只会传给下一个err，即对会一直对，错会一直错。
        如果想要在then中吧错的改回对，那可以返回promise然后在下一个then的err中改正，如：
```javascript
promise.then(value=>value,err=>{
    console,log(err);
    return new Promise(resolve,reject){
       // ... some code

       if (/* 异步操作成功 */){
            resolve(value);
          } else {
            reject(error);
          }
    }
}).then(value=>{console.log(value);},err=>{console.log(err)})
```

# 3.Promise.prototype.then()

就是上面**注意**的第**4**点

# 4.Promise.prototype.catch()

`Promise.prototype.catch`方法是`.then(null, rejection)`的别名，用于指定发生错误时的回调函数。

    <font color="#333333" face="Verdana, Arial">唯一一点不同是catch()会捕捉前面所有then的错误，而。then(null,rejection)只会捕捉前一个then通过reject(err)传递过来的错误</font>
    <font color="#333333" face="Verdana, Arial">一般建议使用catch()来处理错误</font>

# 5.Promise.prototype.finally()
finally顾名思义就是最后一定会执行的代码块，finally不接收任何参数，因为他和前一个then的状态无关
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
# 6.Promise.all([p1,p2,p3])
参数会自动调用Promise.resolve()
Promise.all()就是对多个promise进行**&操作**，只有所有promise都执行完才会进行下一个then，只有所有promise的状态都是fulfilled才为true（fulfilled），只要有一个状态为rejected则为rejected
```javascript
// 生成一个Promise对象的数组,getJSON是一个promise
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});
```
# 7.Promise.race([p1,p2,p3])
参数会自动调用Promise.resolve()

Promise.race()就是对多个promise进行 **| ****操作**，只要其中一个promise执行完就会把结果传给then，其余作废

# 8.Promise.resolve()
Promise.resolve(arg)会把一个非Promise对象转换为Promise对像
**1、参数是一个Promise实例**
不做任何修改
**2、参数是一个有then方法的对象**
会马上执行该对象的then方法，其他属性和方法忽略，如：
```javascript
let thenable = {
  name:'ccw' // 这个会忽略
  useless_method: function(){console.log('会忽略');} // 这个会忽略
  then: function(resolve, reject) {
    resolve(42);
  }
};

let p1 = Promise.resolve(thenable);
p1.then(function(value) {
  console.log(value);  // 42
});
```
**3、参数不是具有then方法的对象，或者根本不是对象的时候**
Promise.resolve()会把生成一个Promise，状态为resolved，并将该对象作为参数在resolve内传递
**4、不带任何参数**
不带任何参数会直接返回一个resovle状态的Promise对象

# 9.Promise.reject()

Promise.reject(arg)会返回一个状态为rejected的promise
**1、如果arg不是一个有then方法的对象，arg就是被catch的参数**
```javascript
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'))

p.then(null, function (s) {
  console.log(s)
});
// 出错了
```
**2、如果arg是一个有then方法的对象，then方法中reject(err)中的err就是被catch的参数**
```javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};

Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)
})
// true
```
# 10.Promise.try()

实际开发中，经常遇到一种情况：不知道或者不想区分，函数`f`是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管`f`是否包含异步操作，都用`then`方法指定下一步流程，用`catch`方法处理`f`抛出的错误。一般就会采用下面的写法。
```javascript
Promise.resolve().then(f)
```
Promise.try()可以自动区分执行
```javascript
const f = () => console.log('now');
Promise.try(f);
console.log('next');
// now
// next
```
# 11.Promise使用小技巧
构建顺序执行异步任务的小技巧
```javascript
var sequence = Promise.resolve();
array.forEach(function(item) {
sequence = sequence.then(//deal item)
});
```