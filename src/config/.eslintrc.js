/**
 * ESLint 规则
 * 使用 babel-eslint 作为解析器
 * Eslint详细规则： http://eslint.cn/docs/rules/
 * eslint-plugin-vue详细规则： https://eslint.vuejs.org/rules/
 *
 * "0"表示忽略问题，等同于"off";
 * "1"表示给出警告，等同于"warn";
 * "2"表示直接报错，等同于"error"。
 *
 * @fixable 表示此配置支持 --fix
 */
module.exports = {
	root: true,
	// parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module',
		parser: 'babel-eslint',
		ecmaVersion: 6,
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: false,
			modules: true
		},
		// ignore eslint error: 'import' and 'export' may only appear at the top level
		allowImportExportEverywhere: true
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		commonjs: true
	},
	extends: [
		'plugin:vue/recommended',
		'@vue/standard'
	],
	plugins: [
		'vue',
		'standard'
	],
	globals: {
		winApp: true,
		Device: true,
		UrlApi: true,
		Store: true,
		Ui: true,
		App: true,
		Core: true,
		Router: true
	},
	// Eslint详细规则： http://eslint.cn/docs/rules/
	// eslint-plugin-vue详细规则： https://eslint.vuejs.org/rules/
	rules: {
		// eslint-plugin-vue自定义规则
		//
		// 禁止在计算属性中产生非响应数据
		'vue/no-side-effects-in-computed-properties': 0,
		// 禁用key属性on<template>
		'vue/no-template-key': 0,
		// 禁止在与v-for相同的元素上使用v-if
		'vue/no-use-v-if-with-v-for': [
			2, {
				'allowUsingIterationVar': true
			}
		],
		// 在标签的右括号之前要求或不允许换行
		'vue/html-closing-bracket-newline': [2, {
			'singleline': 'never',
			'multiline': 'always'
		}],
		// 缩进样式
		'vue/html-indent': [
			2,
			'tab',
			{
				'attribute': 1,
				'baseIndent': 1,
				'alignAttributesVertically': true,
				'ignores': []
			}
		],
		'vue/no-reserved-keys': 0,
		// 缩进样式
		'vue/script-indent': [
			2,
			'tab',
			{
				'baseIndent': 1,
				'switchCase': 1
			}
		],
		// HTML属性的引号样式 不能识别引号里是否还有引号
		'vue/html-quotes': 0,
		// 实施自我关闭风格
		'vue/html-self-closing': [
			2,
			{
				'html': {
					'void': 'always',
					'normal': 'never',
					'component': 'never'
				},
				'svg': 'never',
				'math': 'never'
			}
		],
		// 每行的最大属性数
		'vue/max-attributes-per-line': [
			2,
			{
				'singleline': 4,
				'multiline': {
					'max': 1,
					'allowFirstLine': false
				}
			}
		],
		// 在Vue组件中为name属性强制使用特定大小写
		'vue/name-property-casing': [
			2
		],
		// 在Vue组件中为Prop名称强制使用特定大小写使用驼峰命名
		'vue/prop-name-casing': [
			0, 'camelCase'
		],
		// props中需要类型定义
		'vue/require-prop-types': 2,
		// 设置props默认值
		'vue/require-default-prop': 0,
		// 强制执行属性顺序
		'vue/attributes-order': 0,
		// 强制组件中的属性顺序
		'vue/order-in-components': [
			1,
			{
				order: [
					'el',
					'name',
					'beforeRouteEnter',
					'beforeRouteUpdate',
					'beforeRouteLeave',
					'parent',
					'functional',
					['delimiters', 'comments'],
					'components',
					'directives',
					'extends',
					'mixins',
					'inheritAttrs',
					'model',
					['props', 'propsData'],
					'fetch',
					'asyncData',
					'data',
					'computed',
					'filters',
					'watch',
					'beforeCreate',
					'async',
					'created',
					'beforeMount',
					'mounted',
					'beforeUpdate',
					'updated',
					'activated',
					'deactivated',
					'beforeDestroy',
					'destroyed',
					'methods',
					'head',
					['template', 'render'],
					'renderError'
				]
			}
		],
		// 禁止使用v-html防止XSS攻击
		'vue/no-v-html': 0,
		// 在多行元素的内容之前和之后需要换行，样式不理想，使用默认
		'vue/multiline-html-element-content-newline': 0,
		// 在单行元素的内容之前和之后需要换行，样式不理想，使用默认
		'vue/singleline-html-element-content-newline': 0,
		
		// ---------------------------------------------------------------------------------------------------
		// 可能的错误，这些规则与 JavaScript 代码中可能的语法错误或逻辑错误有关
		//
		// 禁止 for 循环出现方向错误的循环，比如 for (i = 0; i < 10; i--)
		'for-direction': 2,
		// getter 必须有返回值，并且禁止返回空，比如 return;
		'getter-return': [
			2, {
				allowImplicit: false
			}
		],
		// 禁止条件表达式中出现赋值操作符
		'no-cond-assign': 2,
		// 禁止使用 console
		'no-console': 0,
		// 禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式
		'no-constant-condition': 2,
		// 禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\x1f/
		'no-control-regex': 2,
		// 禁止使用 debugger
		'no-debugger': 2,
		// 禁止在函数参数中出现重复名称的参数
		'no-dupe-args': 2,
		// 禁止在对象字面量中出现重复名称的键名
		'no-dupe-keys': 2,
		// 禁止在 switch 语句中出现重复测试表达式的 case
		'no-duplicate-case': 2,
		// 禁止出现空代码块，允许 catch 为空代码块
		'no-empty': [
			2,
			{
				allowEmptyCatch: true
			}
		],
		// 禁止在正则表达式中使用空的字符集 []
		'no-empty-character-class': 2,
		// 禁止将 catch 的第一个参数 error 重新赋值
		'no-ex-assign': 2,
		// @fixable 禁止不必要的布尔类型转换，比如 !! 或 Boolean
		'no-extra-boolean-cast': 2,
		// @fixable 禁止函数表达式中出现多余的括号，比如 let foo = (function () { return 1 })
		'no-extra-parens': [
			2,
			'functions'
		],
		// @fixable 禁止出现多余的分号
		'no-extra-semi': 2,
		// 禁止将一个函数声明重新赋值，如：
		// function foo() {}
		// foo = bar
		'no-func-assign': 2,
		// 禁止在 if 代码块内出现函数声明
		'no-inner-declarations': [
			2,
			'functions'
		],
		// 禁止在 RegExp 构造函数中出现非法的正则表达式
		'no-invalid-regexp': 2,
		// 禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中
		'no-irregular-whitespace': [
			2,
			{
				skipStrings: true,
				skipComments: false,
				skipRegExps: true,
				skipTemplates: true
			}
		],
		// 禁止将 Math, JSON 或 Reflect 直接作为函数调用
		'no-obj-calls': 2,
		// 禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
		'no-prototype-builtins': 0,
		// @fixable 禁止在正则表达式中出现连续的空格，必须使用 /foo {3}bar/ 代替
		'no-regex-spaces': 2,
		// 禁止在数组中出现连续的逗号，如 let foo = [,,]
		'no-sparse-arrays': 2,
		// 禁止出现难以理解的多行表达式，如：
		// let foo = bar
		// [1, 2, 3].forEach(baz);
		'no-unexpected-multiline': 2,
		// 禁止在 return, throw, break 或 continue 之后还有代码
		'no-unreachable': 2,
		// 禁止在 finally 中出现 return, throw, break 或 continue
		'no-unsafe-finally': 2,
		// 必须使用 isNaN(foo) 而不是 foo === NaN
		'use-isnan': 2,
		// 注释必须符合 jsdoc 的规范
		'valid-jsdoc': 0,
		// typeof 表达式比较的对象必须是 'undefined', 'object', 'boolean', 'number', 'string', 'function' 或 'symbol'
		'valid-typeof': 2,
		
		// ---------------------------------------------------------------------------------------------------
		// 最佳实践，这些规则通过一些最佳实践帮助你避免问题
		//
		// setter 必须有对应的 getter，getter 可以没有对应的 setter
		'accessor-pairs': [
			2,
			{
				setWithoutGet: true,
				getWithoutSet: false
			}
		],
		// 数组的方法除了 forEach 之外，回调函数必须有返回值
		'array-callback-return': 0,
		// 将 var 定义的变量视为块作用域，禁止在块外使用
		'block-scoped-var': 0,
		// 在类的非静态方法中，必须存在对 this 的引用
		'class-methods-use-this': 0,
		// 禁止函数的循环复杂度超过 20
		'complexity': [
			0,
			{
				max: 20
			}
		],
		// 禁止函数在不同分支返回不同类型的值
		'consistent-return': 0,
		// @fixable if 后面必须要有 {，除非是单行 if
		'curly': [
			2,
			'multi-line',
			'consistent'
		],
		// switch 语句必须有 default
		'default-case': 0,
		// @fixable 链式调用的时候，点号必须放在第二行开头处，禁止放在第一行结尾处
		'dot-location': [
			2,
			'property'
		],
		// @fixable 禁止出现 foo['bar']，必须写成 foo.bar
		'dot-notation': [
			2,
			{
				'allowKeywords': true
			}
		],
		// @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
		'eqeqeq': [
			2,
			'always',
			{
				null: 'ignore'
			}
		],
		// for in 内部必须有 hasOwnProperty
		'guard-for-in': 0,
		// 禁止使用 alert
		'no-alert': 0,
		// 禁止使用 caller 或 callee
		'no-caller': 2,
		// switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块
		'no-case-declarations': 2,
		// 禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/
		'no-div-regex': 2,
		// @fixable 禁止在 else 内使用 return，必须改为提前结束
		'no-else-return': 0,
		// 不允许有空函数，除非是将一个空函数设置为某个项的默认值
		'no-empty-function': [
			2,
			{
				allow: [
					'functions',
					'methods',
					'arrowFunctions'
				]
			}
		],
		// 禁止解构中出现空 {} 或 []
		'no-empty-pattern': 2,
		// 禁止使用 foo == null 或 foo != null，必须使用 foo === null 或 foo !== null
		'no-eq-null': 0,
		// 禁止使用 eval
		'no-eval': 2,
		// 禁止修改原生对象
		'no-extend-native': 2,
		// @fixable 禁止出现没必要的 bind
		'no-extra-bind': 2,
		// @fixable 禁止出现没必要的 label
		'no-extra-label': 0,
		// switch 的 case 内必须有 break, return 或 throw
		'no-fallthrough': 2,
		// @fixable 表示小数时，禁止省略 0，比如 .5
		'no-floating-decimal': 2,
		// 禁止对全局变量赋值
		'no-global-assign': 2,
		// @fixable 禁止使用 !! ~ 等难以理解的运算符
		'no-implicit-coercion': 0,
		// 禁止在全局作用域下定义变量或申明函数
		'no-implicit-globals': 2,
		// 禁止在 setTimeout 或 setInterval 中传入字符串，如 setTimeout('alert("Hi!")', 100);
		'no-implied-eval': 2,
		// 禁止在类之外的地方使用 this
		'no-invalid-this': 0,
		// 禁止使用 __iterator__
		'no-iterator': 2,
		// 禁止使用 label
		'no-labels': 2,
		// 禁止使用没必要的 {} 作为代码块
		'no-lone-blocks': 2,
		// 禁止在循环内的函数中出现循环体条件语句中定义的变量，比如：
		// for (var i = 0; i < 10; i++) {
		//     (function () { return i })();
		// }
		'no-loop-func': 2,
		// 禁止使用 magic numbers
		'no-magic-numbers': 0,
		// @fixable 禁止出现连续的多个空格，除非是注释前，或对齐对象的属性、变量定义、import 等
		'no-multi-spaces': [
			2,
			{
				// ignoreEOLComments: true,
				exceptions: {
					Property: true,
					BinaryExpression: false,
					VariableDeclarator: true,
					ImportDeclaration: true
				}
			}
		],
		// 禁止使用 \ 来换行字符串
		'no-multi-str': 2,
		// 禁止直接 new 一个类而不赋值
		'no-new': 0,
		// 禁止使用 new Function，比如 let x = new Function("a", "b", "return a + b");
		'no-new-func': 0,
		// 禁止使用 0 开头的数字表示八进制数
		'no-octal': 2,
		// 禁止使用八进制的转义符
		'no-octal-escape': 2,
		// 禁止对函数的参数重新赋值
		'no-param-reassign': 0,
		// 禁止使用 __proto__
		'no-proto': 2,
		// 禁止重复定义变量
		'no-redeclare': 1,
		// 禁止在 return 语句里赋值
		'no-return-assign': [
			2,
			'always'
		],
		// 禁止在 return 语句里使用 await
		'no-return-await': 2,
		// 禁止出现 location.href = 'javascript:void(0)';
		'no-script-url': 0,
		// 禁止将自己赋值给自己
		'no-self-assign': 2,
		// 禁止将自己与自己比较
		'no-self-compare': 2,
		// 禁止使用逗号操作符
		'no-sequences': 2,
		// 禁止 throw 字面量，必须 throw 一个 Error 对象
		'no-throw-literal': 2,
		// 循环内必须对循环条件的变量有修改
		'no-unmodified-loop-condition': 2,
		// 禁止无用的表达式
		'no-unused-expressions': [
			2,
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true
			}
		],
		// @fixable 禁止出现没用的 label
		'no-unused-labels': 2,
		// 禁止出现没必要的 call 或 apply
		'no-useless-call': 2,
		// 禁止出现没必要的字符串连接
		'no-useless-concat': 0,
		// 禁止出现没必要的转义
		'no-useless-escape': 0,
		// @fixable 禁止没必要的 return
		'no-useless-return': 0,
		// 禁止使用 void
		'no-void': 2,
		// 禁止注释中出现 TODO 和 FIXME
		'no-warning-comments': 0,
		// 禁止使用 with
		'no-with': 2,
		// Promise 的 reject 中必须传入 Error 对象，而不是字面量
		'prefer-promise-reject-errors': 2,
		// parseInt 必须传入第二个参数
		'radix': 0,
		// async 函数中必须存在 await 语句
		'require-await': 0,
		// var 必须在作用域的最前面
		'vars-on-top': 0,
		// @fixable 立即执行的函数必须符合如下格式 (function () { alert('Hello') })()
		'wrap-iife': [
			2,
			'inside',
			{
				functionPrototypeMethods: true
			}
		],
		// @fixable 必须使用 if (foo === 5) 而不是 if (5 === foo)
		'yoda': [
			2,
			'never',
			{
				onlyEquality: true
			}
		],
		
		// ---------------------------------------------------------------------------------------------------
		// 严格模式，这些规则与严格模式指令有关
		//
		// @fixable 禁止使用 'strict';
		'strict': [
			2,
			'never'
		],
		
		// ---------------------------------------------------------------------------------------------------
		// 变量，这些规则与变量申明有关
		//
		// 变量必须在定义的时候赋值
		'init-declarations': 0,
		// 禁止 catch 的参数名与定义过的变量重复
		'no-catch-shadow': 0,
		// 禁止使用 delete
		'no-delete-var': 2,
		// 禁止 label 名称与定义过的变量重复
		'no-label-var': 2,
		// 禁止使用指定的全局变量
		'no-restricted-globals': 0,
		// 禁止变量名与上层作用域内的定义过的变量重复
		'no-shadow': 0,
		// 禁止使用保留字作为变量名
		'no-shadow-restricted-names': 2,
		// 禁止使用未定义的变量
		'no-undef': [
			0,
			{
				typeof: false
			}
		],
		// @fixable 禁止将 undefined 赋值给变量
		'no-undef-init': 2,
		// 禁止对 undefined 重新赋值
		'no-undefined': 0,
		// 定义过的变量必须使用
		'no-unused-vars': [
			1,
			{
				vars: 'all',
				args: 'none',
				caughtErrors: 'none',
				ignoreRestSiblings: true
			}
		],
		// 变量必须先定义后使用
		'no-use-before-define': 0,
		
		// ---------------------------------------------------------------------------------------------------
		// Node.js 和 CommonJS，这些规则与在 Node.js 中运行的代码或浏览器中使用的 CommonJS 有关
		//
		// callback 之后必须立即 return
		'callback-return': 0,
		// require 必须在全局作用域下
		'global-require': 0,
		// callback 中的 error 必须被处理
		'handle-callback-err': 0,
		// 禁止直接使用 Buffer
		'no-buffer-constructor': 2,
		// 相同类型的 require 必须放在一起
		'no-mixed-requires': 0,
		// 禁止直接 new require('foo')
		'no-new-require': 2,
		// 禁止对 __dirname 或 __filename 使用字符串连接
		'no-path-concat': 0,
		// 禁止使用 process.env.NODE_ENV
		'no-process-env': 0,
		// 禁止使用 process.exit(0)
		'no-process-exit': 0,
		// 禁止使用指定的模块
		'no-restricted-modules': 0,
		// 禁止使用 node 中的同步的方法，比如 fs.readFileSync
		'no-sync': 0,
		
		// ---------------------------------------------------------------------------------------------------
		// 风格问题,这些规则与代码风格有关，所以是非常主观的
		//
		// @fixable 配置数组的中括号内前后的换行格式
		'array-bracket-newline': 0,
		// @fixable 数组的括号内的前后禁止有空格
		'array-bracket-spacing': [
			2,
			'never'
		],
		// @fixable 配置数组的元素之间的换行格式
		'array-element-newline': 0,
		// @fixable 代码块如果在一行内，那么大括号内的首尾必须有空格，比如 function () { alert('Hello') }
		'block-spacing': [
			2,
			'always'
		],
		// @fixable if 与 else 的大括号风格必须一致
		'brace-style': [
			2,
			'1tbs',
			{
				allowSingleLine: true
			}
		],
		// 变量名必须是 camelcase 风格的
		'camelcase': 0,
		// @fixable 注释的首字母必须大写
		'capitalized-comments': 0,
		// @fixable 对象的最后一个属性末尾必须有逗号
		'comma-dangle': [
			2,
			'never'
		],
		// @fixable 逗号前禁止有空格，逗号后必须要有空格
		'comma-spacing': [
			2,
			{
				'before': false,
				'after': true
			}
		],
		// @fixable 禁止在行首写逗号
		'comma-style': [
			2,
			'last'
		],
		// @fixable 用作对象的计算属性时，中括号内的首尾禁止有空格
		'computed-property-spacing': [
			2,
			'never'
		],
		// 限制 this 的别名
		'consistent-this': [
			0,
			'_this'
		],
		// @fixable 文件最后一行必须有一个空行
		'eol-last': 2,
		// @fixable 函数名和执行它的括号之间禁止有空格
		'func-call-spacing': [
			2,
			'never'
		],
		// 函数必须有名字
		'func-names': 0,
		// 必须只使用函数声明或只使用函数表达式
		'func-style': 0,
		// 禁止使用指定的标识符
		'id-blacklist': 0,
		// 限制变量名长度
		'id-length': 0,
		// 限制变量名必须匹配指定的正则表达式
		'id-match': 0,
		// @fixable 一个缩进必须用四个空格替代
		'indent': [
			0,
			'tab',
			{
				SwitchCase: 2,
				flatTernaryExpressions: true
			}
		],
		// @fixable jsx 中的属性必须用双引号
		'jsx-quotes': [
			2,
			'prefer-double'
		],
		// @fixable 对象字面量中冒号前面禁止有空格，后面必须有空格
		'key-spacing': [
			2,
			{
				beforeColon: false,
				afterColon: true,
				mode: 'strict'
			}
		],
		// @fixable 关键字前后必须有空格
		'keyword-spacing': [
			2,
			{
				before: true,
				after: true
			}
		],
		// 单行注释必须写在上一行
		'line-comment-position': 0,
		// @fixable 限制换行符为 LF 或 CRLF
		'linebreak-style': 0,
		// @fixable 注释前后必须有空行
		'lines-around-comment': [1,
			{
				'beforeBlockComment': false
			}
		],
		// 代码块嵌套的深度
		'max-depth': 0,
		// 限制一行的长度
		'max-len': 0,
		// 限制一个文件最多的行数
		'max-lines': 0,
		// 回调函数嵌套禁止超过 5 层，多了请用 async await 替代
		'max-nested-callbacks': [
			2,
			5
		],
		// 函数的参数禁止超过 8 个
		'max-params': [
			2,
			8
		],
		// 限制函数块中的语句数量
		'max-statements': 0,
		// 限制一行中的语句数量
		'max-statements-per-line': 0,
		// 三元表达式必须得换行
		'multiline-ternary': 0,
		// new 后面的类名必须首字母大写
		'new-cap': [
			2,
			{
				newIsCap: true,
				capIsNew: false,
				properties: true
			}
		],
		// @fixable new 后面的类必须有小括号
		'new-parens': 2,
		// 链式调用必须换行
		'newline-per-chained-call': 1,
		// 禁止使用 Array 构造函数
		'no-array-constructor': 2,
		// 禁止使用位运算
		'no-bitwise': 0,
		// 禁止使用 continue
		'no-continue': 0,
		// 禁止在代码后添加内联注释
		'no-inline-comments': 0,
		// @fixable 禁止 else 中只有一个单独的 if
		'no-lonely-if': 0,
		// 禁止混用不同的操作符，比如 let foo = a && b < 0 || c > 0 || d + 1 === 0
		'no-mixed-operators': 0,
		// 禁止混用空格和缩进
		'no-mixed-spaces-and-tabs': 0,
		// 禁止连续赋值，比如 a = b = c = 5
		'no-multi-assign': 0,
		// @fixable 禁止出现超过两行的连续空行
		'no-multiple-empty-lines': [
			2,
			{
				max: 2,
				maxEOF: 1,
				maxBOF: 1
			}
		],
		// 禁止 if 里面有否定的表达式，比如：
		// if (a !== b) {
		//     doSomething();
		// } else {
		//     doSomethingElse();
		// }
		'no-negated-condition': 0,
		// 禁止使用嵌套的三元表达式，比如 a ? b : c ? d : e
		'no-nested-ternary': 0,
		// 禁止直接 new Object
		'no-new-object': 2,
		// 禁止使用 ++ 或 --
		'no-plusplus': 0,
		// 禁止使用特定的语法
		'no-restricted-syntax': 0,
		// 禁止使用 tabs
		'no-tabs': 0,
		// 禁止使用三元表达式
		'no-ternary': 0,
		// @fixable 禁止行尾有空格
		'no-trailing-spaces': [
			2,
			{
				'skipBlankLines': true
			}
		],
		// 禁止变量名出现下划线
		'no-underscore-dangle': 0,
		// @fixable 必须使用 !a 替代 a ? false : true
		'no-unneeded-ternary': 2,
		// @fixable 禁止属性前有空格，比如 foo. bar()
		'no-whitespace-before-property': 2,
		// @fixable 禁止 if 后面不加大括号而写两行代码
		'nonblock-statement-body-position': [
			2,
			'beside',
			{
				overrides: {
					while: 'below'
				}
			}
		],
		// @fixable 大括号内的首尾必须有换行
		'object-curly-newline': [
			2,
			{
				multiline: true,
				consistent: true
			}
		],
		// @fixable 对象字面量只有一行时，大括号内的首尾必须有空格
		'object-curly-spacing': [
			2,
			'always',
			{
				arraysInObjects: true,
				objectsInObjects: false
			}
		],
		// @fixable 对象字面量内的属性每行必须只有一个
		'object-property-newline': 0,
		// 禁止变量申明时用逗号一次申明多个
		'one-var': [
			2,
			'never'
		],
		// @fixable 变量申明必须每行一个
		'one-var-declaration-per-line': [
			2,
			'always'
		],
		// @fixable 必须使用 x = x + y 而不是 x += y
		'operator-assignment': 0,
		// @fixable 需要换行的时候，操作符必须放在行末，比如：
		// let foo = 1 +
		//     2
		'operator-linebreak': 0,
		// @fixable 代码块首尾必须要空行
		'padded-blocks': 0,
		// @fixable 限制语句之间的空行规则，比如变量定义完之后必须要空行
		'padding-line-between-statements': 0,
		// @fixable 对象字面量的键名禁止用引号括起来
		'quote-props': 0,
		// @fixable 必须使用单引号，禁止使用双引号
		'quotes': 0,
		// 必须使用 jsdoc 风格的注释
		'require-jsdoc': 0,
		// @fixable 结尾必须有分号
		'semi': [
			2,
			'always',
			{
				omitLastInOneLineBlock: true
			}
		],
		// @fixable 一行有多个语句时，分号前面禁止有空格，分号后面必须有空格
		'semi-spacing': [
			2,
			{
				before: false,
				after: true
			}
		],
		// @fixable 分号必须写在行尾，禁止在行首出现
		'semi-style': [
			2,
			'last'
		],
		// 对象字面量的键名必须排好序
		'sort-keys': 0,
		// 变量申明必须排好序
		'sort-vars': 0,
		// @fixable if, function 等的大括号之前必须要有空格，比如 if (a) {
		'space-before-blocks': [
			2,
			'always'
		],
		// @fixable function 的小括号之前必须要有空格
		'space-before-function-paren': [
			2,
			{
				anonymous: 'ignore',
				named: 'never',
				asyncArrow: 'always'
			}
		],
		// @fixable 小括号内的首尾禁止有空格
		'space-in-parens': [
			2,
			'never'
		],
		// @fixable 操作符左右必须有空格，比如 let sum = 1 + 2;
		'space-infix-ops': 2,
		// @fixable new, typeof 等后面必须有空格，++, -- 等禁止有空格，比如：
		// let foo = new Person();
		// bar = bar++;
		'space-unary-ops': [
			2,
			{
				words: true,
				nonwords: false
			}
		],
		// @fixable 注释的斜线或 * 后必须有空格
		'spaced-comment': [
			2,
			'always',
			{
				block: {
					exceptions: ['*'],
					balanced: true
				}
			}
		],
		// @fixable case 的冒号前禁止有空格，冒号后必须有空格
		'switch-colon-spacing': [
			2,
			{
				after: true,
				before: false
			}
		],
		// @fixable 模版字符串的 tag 之后禁止有空格，比如 tag`Hello World`
		'template-tag-spacing': [
			2,
			'never'
		],
		// @fixable 文件开头禁止有 BOM
		'unicode-bom': 0,
		// @fixable 正则表达式必须有括号包起来
		'wrap-regex': 0,
		
		// ---------------------------------------------------------------------------------------------------
		// ECMAScript 6，这些规则与 ES6（即通常所说的 ES2015）有关
		//
		// @fixable 箭头函数能够省略 return 的时候，必须省略，比如必须写成 () => 0，禁止写成 () => { return 0 }
		'arrow-body-style': 2,
		// @fixable 箭头函数只有一个参数的时候，必须加括号
		'arrow-parens': [
			2,
			'as-needed',
			{
				'requireForBlockBody': false
			}
		],
		// @fixable 箭头函数的箭头前后必须有空格
		'arrow-spacing': [
			2,
			{
				before: true,
				after: true
			}
		],
		// constructor 中必须有 super
		'constructor-super': 2,
		// @fixable generator 的 * 前面禁止有空格，后面必须有空格
		'generator-star-spacing': [
			2,
			{
				before: false,
				after: true
			}
		],
		// 禁止对定义过的 class 重新赋值
		'no-class-assign': 2,
		// @fixable 禁止出现难以理解的箭头函数，比如 let x = a => 1 ? 2 : 3
		'no-confusing-arrow': [
			2,
			{
				allowParens: true
			}
		],
		// 禁止对使用 const 定义的常量重新赋值
		'no-const-assign': 2,
		// 禁止重复定义类
		'no-dupe-class-members': 2,
		// 禁止重复 import 模块
		'no-duplicate-imports': 2,
		// 禁止使用 new 来生成 Symbol
		'no-new-symbol': 2,
		// 杜绝使用String，Number以及Boolean与new操作
		'no-new-wrappers': 0,
		// 禁止 import 指定的模块
		'no-restricted-imports': 0,
		// 禁止在 super 被调用之前使用 this 或 super
		'no-this-before-super': 2,
		// @fixable 禁止出现没必要的计算键名，比如 let a = { ['0']: 0 };
		'no-useless-computed-key': 2,
		// 禁止出现没必要的 constructor，比如 constructor(value) { super(value) }
		'no-useless-constructor': 2,
		// @fixable 禁止解构时出现同样名字的的重命名，比如 let { foo: foo } = bar;
		'no-useless-rename': 2,
		// @fixable 禁止使用 var
		'no-var': 0,
		// @fixable 必须使用 a = {b} 而不是 a = {b: b}
		'object-shorthand': 0,
		// @fixable 必须使用箭头函数作为回调
		'prefer-arrow-callback': 0,
		// @fixable 申明后不再被修改的变量必须使用 const 来申明
		'prefer-const': 0,
		// 必须使用解构
		'prefer-destructuring': 0,
		// @fixable 必须使用 0b11111011 而不是 parseInt('111110111', 2)
		'prefer-numeric-literals': 0,
		// 必须使用 ...args 而不是 arguments
		'prefer-rest-params': 0,
		// @fixable 必须使用 ... 而不是 apply，比如 foo(...args)
		'prefer-spread': 0,
		// @fixable 必须使用模版字符串而不是字符串连接
		'prefer-template': 0,
		// generator 函数内必须有 yield
		'require-yield': 0,
		// @fixable ... 的后面禁止有空格
		'rest-spread-spacing': [
			2,
			'never'
		],
		// @fixable import 必须按规则排序
		'sort-imports': 0,
		// 创建 Symbol 时必须传入参数
		'symbol-description': 2,
		// @fixable ${name} 内的首尾禁止有空格
		'template-curly-spacing': [
			2,
			'never'
		],
		// @fixable yield* 后面必须要有空格
		'yield-star-spacing': [
			2,
			'after'
		],
		// 去除standard，在花括号内强制保持一致的间距
		'standard/object-curly-even-spacing': 0
	}
};
