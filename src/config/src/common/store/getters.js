export default {
	// 获取登录信息
	getLoginInfo(state) {
		return state.loginInfo;
	},

	// 获取位置信息
	getLocationInfo(state) {
		return state.locationInfo;
	},
	// 获取设备信息
	getDeviceInfo(state) {
		return state.deviceInfo;
	},

	// 获取订单认证信息
	getOrderAuthInfo(state) {
		return state.orderAuthInfo;
	},
	// 获取业务认证信息
	getBusinessAuthInfo(state) {
		return state.businessAuthInfo;
	},
	// 获取渠道认证信息
	getChannelAuthInfo(state) {
		return state.channelAuthInfo;
	},
	// 获取UM认证信息
	getUserAuthInfo(state) {
		return state.userAuthInfo;
	},
	// 获取businessType，需在业务store配置
	getBusinessType(state) {
		return state.businessType;
	},
	getBusinessMode(state) {
		return state.businessMode;
	},
	getBusinessLoginMode(state) {
		return state.businessLoginMode;
	},
	getNoCard(state) {
		return state.noCard;
	},
	getAuthorizationMode(state) {
		return state.authorizationMode;
	},
	getAuthorizationToken(state) {
		return state.authorizationToken;
	},
	/**
	 * @function 获取state中的值
	 * @param state store中的值
	 * @param stateKey state中的key值
	 * */
	getState: state => stateKey => {
		return state[stateKey]; // 获取value
	},

	getChParams(state) {
		return state.chParams;
	},
	getFbParams(state) {
		return state.fbParams;
	},
};
