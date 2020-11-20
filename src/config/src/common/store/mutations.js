export default {
	updateFireData(state, data) {
		state.fireData = data;
	},
	// 获取登录信息
	setLoginInfo(state, loginInfo) {
		state.loginInfo = loginInfo;
	},

	// 获取位置信息
	setLocationInfo(state, locationInfo) {
		state.locationInfo = locationInfo;
	},
	// 获取设备信息
	setDeviceInfo(state, deviceInfo) {
		state.deviceInfo = deviceInfo;
	},
	// 获取订单认证信息
	setOrderAuthInfo(state, orderAuthInfo) {
		state.orderAuthInfo = orderAuthInfo;
	},

	// 获取渠道认证信息
	setChannelAuthInfo(state, channelAuthInfo) {
		state.channelAuthInfo = channelAuthInfo;
	},

	// 获取业务认证信息
	setBusinessAuthInfo(state, businessAuthInfo) {
		return (state.businessAuthInfo = businessAuthInfo);
	},
	// 获取UM认证信息
	setUserAuthInfo(state, userAuthInfo) {
		state.userAuthInfo = userAuthInfo;
	},
	setNoCard(state, data) {
		state.noCard = data;
	},
	setAuthorizationMode(state, data) {
		state.authorizationMode = data;
	},
	setIdCardInfo(state, data) {
		state.idCardInfo = data;
	},
	setAuthorizationToken(state, data) {
		state.authorizationToken = data;
	},
	/**
	 * @function 设置state中的值
	 * @param state store中的值
	 * @param stateKey state中的key值
	 * */
	setState: (state,obj)  => {
		state[obj.key] = obj.value;
	},

	setChParams(state, data) {
		state.chParams = data;
	},
	setFbParams(state, data) {
		state.fbParams = data;
	},
};
