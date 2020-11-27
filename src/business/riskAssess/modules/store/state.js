// 保存状态
export default {
	_aliveRouterList: [],
	businessType: 'OnlineRiskAssessment', // 业务类型，后台确定
	/** 业务模式3种：'empty','channel','order'
	 *   默认empty或者不填,空载页面什么都不走
	 *   channel,获取channelJwt,不获取orderjwt
	 *   order,获取channelJwt,获取orderjwt
	 */
	// businessMode: 'channel',
	/** 业务登录模式(businessMode为order时有效)2种：'empty','um'
	 *   默认empty或者不填,不需要获取userJwt
	 *   um,um登录
	 */
	businessLoginMode: 'empty',
};
