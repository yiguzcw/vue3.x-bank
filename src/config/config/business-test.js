module.exports = {
	// 开发打包业务
	businessArray: [
		// {chunk: 'acctOpen', chunkName: '平安银行开户预填单'},
		// {chunk: 'infoComplement', chunkName: '平安银行开户预约信息补全'},
		{ chunk: 'acctOpen', chunkName: '在家办开户', chunkId: 'FBAPP-h5-KKSQ' },
		{ chunk: 'acctOpenStandard', chunkName: '在家办开户', chunkId: 'FBAPP-h5-XXTX'},
		{ chunk: 'riskAssess', chunkName: '远程风测' },
		{ chunk: 'riskAssessStandard', chunkName: '远程风测' },
	],
	// 埋点监控appid
	h5AppId: 'AB41E6D12E1FF03B79E4EAC86E70DEDC',
	// 外部资源依赖
	libList: {
		css: [], // 外部依赖css
		js: [

		] // 外部依赖js
	},
	externals: { // 用cdn方式引入, 不进行打包
		'vue': 'Vue',
		// 'vuex': 'Vuex',// 'vue-router': 'VueRouter',
		// 'axios': 'axios',

		poppy: 'poppy',
		keyboard: 'keyboard',
		vericode: 'vericode'
	},
	cdnList: {
		css: [

			'https://cdn.sdb.com.cn/poppy/1.0.1/poppy.rem.min.css',
			'https://cdn.sdb.com.cn/poppy/1.0.1/keyboard/keyboard.rem.min.css',
			'https://cdn.sdb.com.cn/poppy/1.0.1/vericode/vericode.rem.min.css'

		],
		js: [
			'https://test-cdn-fat.pingan.com.cn/app_com/webtrends/h5/2.0.0/banksdc_m.js',
			// 'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
			// 'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
			// 'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
			// 'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
			// 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js'

			'../../libs/vue.js',
			'https://cdn.sdb.com.cn/poppy/1.0.1/poppy.rem.min.js',
			'https://cdn.sdb.com.cn/poppy/1.0.1/keyboard/keyboard.min.js',
			'https://cdn.sdb.com.cn/poppy/1.0.1/vericode/vericode.min.js',
			// 'https://cdn.sdb.com.cn/aladdin/1.0.20/aladdin.min.js',
			// 'https://test-cdn-fat.pingan.com.cn/app_com/webtrends/h5/2.0.0/banksdc_m.js',
			// 'https://cdn.sdb.com.cn/aladdin/1.0.20/aladdin.ibank.min.js',
			'https://test-b-fat.pingan.com.cn/aladdin/1.0.20/aladdin.ibank.min.js',
			'https://test-b-fat.pingan.com.cn/platform/kzgtNotice/index.js',
            'https://test-cdn-fat.pingan.com.cn/app_com/authsdk/1.0.0/auth-sdk.js',
            'https://test-b-fat.pingan.com.cn/platform/aladdinfix/1.0.0/aladdinfix.min.js'
		]
	}
};
