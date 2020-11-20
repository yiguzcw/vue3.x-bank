// 公共接口定义;
import httpBase from '@/common/modules/http/http-base.js';
let urlHostFun = httpBase.getBaseUrl; //定义方法，执行时再调用，避免取到空值
export const Apis = {

	getChannelAuthInfo: '/facebank/api/v3/authentications/channel/fb-financing-authentications',
	getOrderAuthInfo: '/facebank/api/v3/authentications/order/order-authentications',
	getUserAuthInfo: '/facebank/api/v3/authentications/user/password-authentications',
	getPasswordCaptchas: '/facebank/api/v3/authentications/user/password-captchas', // 获取图形验证码
	// 查询图片
	getImage: id => `${urlHostFun()}/facebank/api/v1/common/images/${id}`,
	getAppImage: id => `${urlHostFun()}/facebank/api/v1/app/common/images/${id}`,
	// 查询协议
	getFiles: id => `${urlHostFun()}/facebank/api/v1/common/files/${id}`,
	getAgreement: (agreementType, businessType, branchNum) =>
		// {agreementType}_{businessType}_{branchId}
		`${urlHostFun()}/facebank/api/v1/common/agreements/${agreementType}_${businessType}_${branchNum || ''}`,
	getAgreementOnWeFile: (agreementType, businessType, branchNum) => {
		return `${urlHostFun()}/facebank/api/v1/common/agreements/${agreementType}_${businessType}_${branchNum || ''}/url`;
	},
	// 上传影像平台
	uploadImage: '/facebank/api/v1/common/images',
	creditcredentials: '/facebank/api/v3/order/credit-businesses', // 获取businessJwt
	creditcertificate: '/facebank/api/v3/order/credit-businesses/acct-certificate-validations', // 信用卡卡核查
	acctcredentials: '/facebank/api/v3/order/debit-businesses',
	acctcertificate: '/facebank/api/v3/order/debit-businesses/acct-certificate-validations',
	idcredentials: '/facebank/api/v3/order/id-businesses',
	idcertificate: '/facebank/api/v3/order/id-certificate',
	statusQry: '/facebank/api/v1/order/authorization/status',  //查询审核结果
	startConfirm: '/facebank/api/v1/order/confirmation', // 开始确认
	// 获取卡列表
	getCardListUrl: '/facebank/api/v1/order/id-certificate/acct-options',
	// idcertificateUrl: '/facebank/api/v1/business/ClientIdMaintain/submission/id-certificate-validations',
	getTickets: '/facebank/api/v1/common/tickets', // 密码加密
	authorizations: '/facebank/api/v1/order/authorization', // 查询审核状态
	// 获取热门职业类型列表
	hotCareers: '/opt/getHotOptList',
	// 获取全部职业类型列表
	allCareers: '/opt/getAllOptList',
	// 关键字搜索职业类型列表
	searchCareers: '/opt/searchOptList',
	otps: '/facebank/api/v1/common/mobile-authentications/otps', // 发送OTP
	mobileAuthentications: '/facebank/api/v1/common/mobile-authentications', // 手机OTP验证

	riskAssessmentTrial: '/facebank/api/v1/business/preform/acctopen/risk-assessment-trial', // 风险测评试算
	getEvaluateQuestion: '/facebank/api/v1/business/RiskAssessment/order/question' // 查询风险评估题目
};
// 合并后export，如命名相同，公共会覆盖业务接口
export default function (businessApis) {
	return Object.assign({}, Apis, businessApis);
}
