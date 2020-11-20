
// 根据环境返回mock数据还是真实数据
// 这里必须使用process.env.FRONT_ENV（webpack打包自动识别），避免mock数据打包进入生产环境
import { getDeviceType } from '@/common/modules/utils.js';
export default (function () {
    let deviceType = getDeviceType();
	if (deviceType === 'pocket' || deviceType === "thirdParty") {
		return require('./device.js').default;
	} else {
		return require('./device-mock.js').default;
	}
})();
