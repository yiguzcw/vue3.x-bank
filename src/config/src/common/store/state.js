export default {
	authorizationToken: '', //和后台api 请求的认证信息
	authorizationMode: '',
	loginInfo: {
		// 登录信息
		umId: '', // umid
		LocCode: '', // 网点号
		LocName: '', //网点名称
		locType: '', // ，判断模式 是移动式还是柜员式   0||“”:移动式  1:柜面 2: 不下班模式  3 双录模式
		loginMode: '', // 登录模式(drm)
		blueType: '', // 判断读卡读证的类型, keycode BLUETYPE_MODE_OLD  :  老外设 ，  BLUETYPE_MODE_NEW  新外设   empty.页面根据业务模式
		//设备编号
		deviceId: '', ////设备编号  login.deviceId,
		deviceJwt: '',
		mobile: '',
		terminalId: '',
		terminalType: '',
		userId: ''
	},
	// locationInfo: {
	// 	latitude: '', // 登录经纬度
	// 	longitude: '', // 登录经纬度
	// 	location: '', // 定位信息
	// 	locTime: '', // 定位信息
	// 	checkFlag: '',
	// 	locProvince: '', // 定位省市区 encodeURI(login.locProvince || ''),
	// 	locCity: '', // 定位省市区 encodeURI(login.locCity || ''),
	// 	locArea: '', // 定位省市区encodeURI(login.locArea || ''),

	// 	locProvinceCode: '', // 定位省码
	// 	locCityCode: '', // 定位省市区 码
	// 	locAreaCode: '' // 定位省市区 码
	// },
	deviceInfo: {
		// 设备信息
		deviceId: '', // //设备编号  login.deviceId,
		appName: '', // 应用
		appVersion: '', // 应用版本
		deviceName: '', // 设备名称
		deviceVersion: '', // 设备版本
		deviceModel: '', //品牌
		deviceType: '', // 设备类型 ios、  android   、 win  、mac
		ip: '', // //设备当前IP
		macAdd: '' //设备当前IP  MAC 地址
	},
	/*渠道订单认证信息*/
	orderAuthInfo: {
		orderJwt: '' // 订单Jwt
	},
	/*um认证信息*/
	userAuthInfo: {
		faceCompareImage: '',
		mobile: '',
		subBranchId: '',
		userId: '',
		userJwt: ''
	},
	/*业务认证信息*/
	businessAuthInfo: {
		businessJwt: '' // 业务jwt
	},
	/*渠道认证信息*/
	channelAuthInfo: {
		userId: '', // 用户信息
		channelJwt: '', // 渠道Jwt
		wsToken: {
			// /*连接参数*/
			// para: {
			//    jid: '',
			//    utype: '',
			//    version: ''
			// },
			// token: '', // 签名
			// ts: '', // 时间戳
			// url: '' // 连接地址
		},
		subBranch: {
			// 网点
			subBranchId: '',
			subBranchName: ''
		}
	},
	
	
	idCardInfo: {},

	chParams:{},
	fbParams:{},


};
