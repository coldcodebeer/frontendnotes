### Class
- 类的内部所有定义的方法，都是不可枚举的（non-enumerable）
- 派生类的 constructor 必须调用 super()。否则 "this" 不会被定义。
#### 私有方法和私有属性
- 是只能在类的内部访问的方法和属性，外部不能访问。
- [类私有域](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/Private_class_fields)
#### 静态方法和静态属性
- 不能在类的实例上调用静态方法，而应该通过类本身调用。
- 非静态方法中，不能直接使用 this 关键字来访问静态方法。
- 静态属性和方法是可被继承的
- 静态方法可以与非静态方法重名
- 静态方法也是可以从super对象上调用的

```javascript
class ClassWithStaticMethod {

  static staticProperty = 'someValue';
  static staticMethod() {
    return 'static method has been called.';
  }

}
```

### [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
#### 创建对象的方法
- 使用字面量
- 使用构造函数
- 使用Object.create()
  - Object.create(null)可创建一个没有原型的对象
- 使用 class 关键字
#### 性能
在原型链上查找属性比较耗时，对性能有副作用，这在性能要求苛刻的情况下很重要。另外，试图访问不存在的属性时会遍历整个原型链。
#### 原型链继承
- New-initialization（将构造函数的prototype属性赋值为要被继承的构造函数的实例对象）
- Object.create(）
- Object.setPrototypeOf()
  - 这个方式表现并不好，应该被弃用。
  - 如果你在生产环境中使用这个方法，那么快速运行 Javascript 就是不可能的。
  - 因为许多浏览器优化了原型，尝试在调用实例之前猜测方法在内存中的位置，但是动态设置原型干扰了所有的优化，甚至可能使浏览器为了运行成功，使用完全未经优化的代码进行重编译。
- 设置__proto__
  - 这个方式表现并不好，应该被弃用。
  - 和Object.setPrototypeOf一样动态设置原型链，致使JS代码执行效率低下