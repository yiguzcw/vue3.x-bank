module.exports = {

	// 开发打包业务
	businessArray: [
        { chunk: 'riskAssess', chunkName: '在线风测' },
	],
	// 外部资源依赖
	libList: {
		css: [], // 外部依赖css
		js: [

		] // 外部依赖js
	},
	externals: { // 用cdn方式引入, 不进行打包
		// 左侧vue是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
		'vue': 'Vue',
		// 'vuex': 'Vuex',
		// 'vue-router': 'VueRouter',
		// 'axios': 'axios'

		poppy: 'poppy',
		keyboard: 'keyboard',
		vericode: 'vericode'
	},
	cdnList: {
		css: [
			// 'https://cdn.sdb.com.cn/poppy/1.0.1/poppy.rem.min.css',
			// 'https://cdn.sdb.com.cn/poppy/1.0.1/keyboard/keyboard.rem.min.css',
			// 'https://cdn.sdb.com.cn/poppy/1.0.1/vericode/vericode.rem.min.css'
		],
		js: [
			'../../libs/vue.js',
			// 'https://cdn.sdb.com.cn/aladdin/1.0.20/aladdin.min.js',
			// 'https://cdn.sdb.com.cn/poppy/1.0.1/poppy.rem.min.js',
			// 'https://cdn.sdb.com.cn/poppy/1.0.1/keyboard/keyboard.min.js',
			// 'https://cdn.sdb.com.cn/poppy/1.0.1/vericode/vericode.min.js',
			// 'https://cdn.sdb.com.cn/aladdin/1.0.20/aladdin.ibank.min.js'
		]
	}

};
