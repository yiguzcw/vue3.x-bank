module.exports = {
	// 开发打包业务
	businessArray: [
		// { chunk: 'acctOpen', chunkName: '平安银行开户预填单'},
		// { chunk: 'infoComplement', chunkName: '平安银行开户预约信息补全'},
		{ chunk: 'acctOpen', chunkName: '在家办开户', chunkId: 'NR-h5-XSKHRZ' },
		{ chunk: 'acctOpenStandard', chunkName: '在家办开户', chunkId: 'NR-h5-XSKHXXTX'},
		{ chunk: 'riskAssess', chunkName: '远程风测', chunkId: 'NR-h5-YCFCRZ'  },
		{ chunk: 'riskAssessStandard', chunkName: '远程风测', chunkId: 'NR-h5-YCFCXXTX'  }
	],
	// 埋点监控appid
	h5AppId: '908E5DC348C4FF411B0A438766036E6A',
	//外部资源依赖
	libList: {
		css: [], // 外部依赖css
		js: [] // 外部依赖js
	},
	externals: { // 用cdn方式引入, 不进行打包
		'vue': 'Vue',
		// 'vuex': 'Vuex',
		// 'vue-router': 'VueRouter',
		// 'axios': 'axios',
		// 'lodash':'lodash'

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
			'https://bank-static.pingan.com.cn/app_com/webtrends/h5/2.0.0/banksdc_m.js',
			// 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
			// 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.runtime.min.js',
			// 'https://cdn.jsdelivr.net/npm/vue-router@3.0.7/dist/vue-router.min.js',
			// 'https://cdn.jsdelivr.net/npm/vuex@3.1.1/dist/vuex.min.js',
			// 'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',

			// 'https://cdn.jsdelivr.net/npm/lodash@4.17.15/lodash.min.js'

			'../../libs/vue.js',
			'https://cdn.sdb.com.cn/poppy/1.0.1/poppy.rem.min.js',
			'https://cdn.sdb.com.cn/poppy/1.0.1/keyboard/keyboard.min.js',
			'https://cdn.sdb.com.cn/poppy/1.0.1/vericode/vericode.min.js',
			// 'https://cdn.sdb.com.cn/aladdin/1.0.20/aladdin.min.js',
			'https://cdn.sdb.com.cn/aladdin/1.0.20/aladdin.ibank.min.js',
			'https://cdn.sdb.com.cn/platform/kzgtNotice/index.js',
			'https://cdn.sdb.com.cn/app_com/authsdk/1.0.0/auth-sdk.js'
		]
	}
};
