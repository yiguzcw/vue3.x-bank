编码规范:
1.命名规范
  2.1) css命名

       使用-连接  sigle-title

  2.2) 文件夹命名

       尽量不使用缩写,缩写就使用约定俗成的缩写,驼峰式命名

  2.3) 函数命名

       命名最好可以体现函数的返回值类型
       eg: Boolean 返回值的  is/show/has/ ...
       尽量以动词作为前缀

  2.4) 变量命名
       let countNumber = 0;
       const CODE_NUMBER; // 常亮
       尽量以名次作为前缀

2.注释规范
  2.1) 文件顶部的注释(必写)

       /*
        * @description 入口文件
        * @ author
        * @ important
       */

  2.2) 模块注释

       存在参数
       /*
        * function: 函数说明
        * param: 参数说明
        ...
       */
       不存在参数
       /*函数说明*/

3.代码风格

  3.1) 语句结束不要省略分号;
  3.2) js 语句中使用双引号,css中使用单引号
  3.2) 函数声明在调用之前
  3.3) 使用后台回传的参数前 需判断参数是否存在,是否可用
  3.4) 凡涉及到输入需限定最大输入长度,注重为空的判断
  3.5) 大小写容错处理
  3.6) 尽量使用函数式编程 (map forEach filter 等)
  3.7) 尽量使用ES6语法或更高级的语法
  3.8) 善用v-if
  3.9) 复杂判断优化 new Map()
  3.10)检测属性推荐使用in  'number' in options
  3.11)检测数组推荐使用 Object.prototype.toString.call(value) === "[object Array]"
  3.12)检测函数 typeof func === "function"


