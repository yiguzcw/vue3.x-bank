import Mock from 'mockjs';
import { Apis } from './apis';


Mock.setup({
	timeout: '800 - 1000'
});

// 在这定义mock接口
// 每个接口为一个数组,
// 数组里的
// 第一个参数为接口url,
// 第二个可选,请求类型,默认为get,
// 第三个为返回值
const mockData = [
	[
		Apis.getChannelAuthInfo, // 接口
		'post',
		// 返回值
		{
			data: {
				channelJwt: 'channelJwt-mock',
				subBranch: {
					subBranchId: 'string',
					subBranchName: 'string'
				},
				userId: 'string',
				wsToken: {
					para: {
						jid: 'string',
						utype: 0,
						version: 0
					},
					token: 'string',
					ts: 0,
					url: 'string'
				}
			}
		}
	],


	[
		Apis.acctcertificate, // 接口
		// 返回值
		{
			data: {
				businessJnlNo: '',
				businessJwt: 'businessJwt2345454545', // 渠道订单Jwt
				wsToken: {
					para: {
						jid: '',
						utype: 0,
						version: 0
					},
					token: '', // 签名
					ts: '', // 时间戳
					url: '' // 连接地址
				}
			}
		}
	],
	[
		Apis.acctcredentials,
		{
			data: {
				businessJnlNo: '',
				businessJwt: 'businessJwt2345454545', // 渠道订单Jwt
				wsToken: {
					para: {
						jid: '',
						utype: 0,
						version: 0
					},
					token: '', // 签名
					ts: '', // 时间戳
					url: '' // 连接地址
				}
			}
		}
	],
	//	 idcertificateUrl
	[
		Apis.idcertificate, // 接口
		// 返回值
		{
			data: {}
		}
	],
	[
		Apis.getCardListUrl,
		{
			data: {
				// 信用卡列表
				creditAcctList: [
					{
						acctCertificateType: 'DPTE', // 账户类型
						acctName: '周杰伦', // 姓名
						acctOpenDate: '2016-07-21', // 开户时间
						barcode: 'string', // 条形码
						cardLevel: '金卡', // 卡等级
						cardLevelDesc: 'string', // 卡类型描述
						cardOrAcctNo: '*{"cipherText":"hjsdfkjs","displayText":"64545*************7889"}',
						cardType: '01', // 卡类型
						cardTypeDesc: 'string', // 卡类型描述
						expiryDate: '2022-09-21', // 有效期
						mobile: 'string', // 手机号码
						pbcAcctType: '一类户', // 人行分类
						isActive: 'N'
					},
					{
						acctCertificateType: 'DPTE', // 账户类型
						acctName: '骆凡河', // 姓名
						acctOpenDate: '2016-07-21', // 开户时间
						barcode: 'string', // 条形码
						cardLevel: 'IC普通卡', // 卡等级
						cardLevelDesc: 'string', // 卡类型描述
						cardOrAcctNo: '54654645623543453453453',
						cardType: '02', // 卡类型
						cardTypeDesc: 'string', // 卡类型描述
						expiryDate: '2027-12-02', // 有效期
						mobile: 'string', // 手机号码
						pbcAcctType: '二类户', // 人行分类
						isActive: 'N'
					},
					{
						acctCertificateType: 'DPTE', // 账户类型
						acctName: '子云', // 姓名
						acctOpenDate: '2016-07-21', // 开户时间
						barcode: 'string', // 条形码
						cardLevel: '银卡', // 卡等级
						cardLevelDesc: 'string', // 卡类型描述
						cardOrAcctNo: '65756765756765765765765765', // 卡号
						cardType: '01', // 卡类型
						cardTypeDesc: 'string', // 卡类型描述
						expiryDate: '2020-02-05', // 有效期
						mobile: 'string', // 手机号码
						pbcAcctType: '一类户', // 人行分类
						isActive: 'Y'
					}
				],
				// 借记卡列表
				debitAcctList: [
					{
						acctCertificateType: 'DPTE',
						acctName: '子忧',
						acctOpenDate: '2019-07-21',
						barcode: 'string',
						cardLevel: 'string',
						cardLevelDesc: 'string',
						cardOrAcctNo: '456546546546546546546',
						cardType: '01',
						cardTypeDesc: 'string',
						expiryDate: '2026-07-21',
						mobile: '13677777777',
						pbcAcctType: '一类户',
						isActive: 'Y'
					}
				]
			}
		}
	],
	[
		Apis.uploadImage, // 上传影像平台
		{
			data: {
				imageId: '15156'
			}
		}
	],
	// [
	// 	Apis.getPasswordCaptchas,
	// 	{
	// 		data: {
	// 			requestId: 'C4CEAAEE3FBE482396683DCC2B550471',
	// 			validCode: 'data:image/jpg;base64,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'
	// 		}
	// 	}
	// ],
	[
		Apis.otps,
		'post',
		{
			data: { msg: '成功' }
		}
	],

	[
		Apis.mobileAuthentications, // 手机OTP验证
		'post',
		{
			data: {
				'mobile': '*{"cipherText":"1JNV1GjFNQRFrDCqUyjwcg==","displayText":"156****6666"}',
				_token: {
					_expiration: 1574752320872,
					_id: 'e923ef97aad94292a17b0e94495656b3',
					_issuedAt: 1574748720872,
					_signature: 'mndfUPSLgbVjAILcAM+EcUIjP2/uPeV6rRxTgVEfqWqop2x9NrdRh0KZVSqrVIZQ3lAjVfh6vH+7OfRTy6c95w=='
				},
				msg: '成功'
			}
		}
	],
	[
		Apis.riskAssessmentTrial,
		'post',
		{
			data: {
				'riskEndDate': '20190913', // 20180913
				'riskLevel': '2', // 1、2、3、4、5
				'riskTypeDesc': '您对风险有着客理性的认知，投资时能够在“风险最小化”和“收益最大化”之间录求平衡您对风险有着客理性的认知，投资时能够在“风险最小化”和“收益最大化”之间录求平衡您对风险有着客理性的认知，投资时能够在“风险最小化”和“收益最大化”之间录求平衡您对风险有着客理性的认知，投资时能够在“风险最小化”和“收益最大化”之间录求平衡您对风险有着客理性的认知，投资时能够在“风险最小化”和“收益最大化”之间录求平衡您对风险有着客理性的认知，投资时能够在“风险最小化”和“收益最大化”之间录求平衡', // 描述
				'riskTypeName': '平衡型' //  类型：进取型
			}
		}
	],
	[
		Apis.startConfirm,
		'post',
		{
			data: {
			
			}
		}
	],
	[
		Apis.getEvaluateQuestion, // 查询风险评估题目
		'post',
		{
			data: {
				newRiskFlag: 'Y', //新风险评估标识 [ Y, N ]
				oldRiskAnswer: 'A,B,B,A,B,B,A,B,B,A,A,B,B,A,AC', //上一次风险评估答案
				riskQuestionList: [
					//风险评估题目数组
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '18-25' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '26-50' //内容
							},
							{
								content: '51-64',
								choiceNo: 'C'
							},
							{
								content: '高于65岁',
								choiceNo: 'D'
							},
							{
								content: '小于18岁',
								choiceNo: 'E'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content: '您的年龄是？', //内容
						questionNo: '1' //题目编号
					},
					{
						answerCrossLevelFlag: 'Y', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: '', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								content: '初中及以下',
								choiceNo: 'A'
							},
							{
								content: '高中或同等学历',
								choiceNo: 'B'
							},
							{
								content: '大专',
								choiceNo: 'C'
							},
							{
								content: '本科',
								choiceNo: 'D'
							},
							{
								content: '硕士及以上',
								choiceNo: 'E'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content: '您的最高学历是？', //内容
						questionNo: '2' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								content: '5万元以下',
								choiceNo: 'A'
							},
							{
								content: '5-20万元',
								choiceNo: 'B'
							},
							{
								content: '21-50万元',
								choiceNo: 'C'
							},
							{
								content: '51-100万元',
								choiceNo: 'D'
							},
							{
								content: '100万元以上',
								choiceNo: 'E'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content: '您的家庭年收入为（折合人民币）？', //内容
						questionNo: '3' //题目编号
					},
					{
						answerCrossLevelFlag: 'Y', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'C', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '小于10%' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '10%至25%' //内容
							},
							{
								content: '25%至50%',
								choiceNo: 'C'
							},
							{
								content: '大于50%',
								choiceNo: 'D'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'您的家庭净资产中（家庭总资产减去家庭总负债），可用于金融投资（储蓄存款除外）的比例是多少？', //内容
						questionNo: '4' //题目编号
					},
					{
						answerCrossLevelFlag: 'Y', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'C', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '没有' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '有，房贷、车贷等长期债务' //内容
							},
							{
								content: '有，信用卡分期、消费信贷等短期信用债务',
								choiceNo: 'C'
							},
							{
								content: '有，个人之间等其他借款',
								choiceNo: 'D'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'您是否有尚未清偿的数额较大的债务？', //内容
						questionNo: '5' //题目编号
					},
					{
						answerCrossLevelFlag: 'Y', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'C', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '没有经验' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '少于2年' //内容
							},
							{
								content: '2-5年',
								choiceNo: 'C'
							},
							{
								content: '5-8年',
								choiceNo: 'D'
							},
							{
								content: '8年以上',
								choiceNo: 'E'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'您有多少年投资股票、基金、外汇、金融衍生产品等风险投资品的经验？', //内容
						questionNo: '6' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content:
									'除存款、国债外，我几乎不投资其他金融产品' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content:
									'大部分投资于存款、国债等，较少投资于股票、基金等风险产品' //内容
							},
							{
								content:
									'资产均衡地分布于存款、国债、银行理财产品、信托产品、股票、基金等',
								choiceNo: 'C'
							},
							{
								content:
									'大部分投资于股票、基金、外汇等高风险产品，较少投资于存款、国债',
								choiceNo: 'D'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content: '以下哪项最能说明您的投资经验？', //内容
						questionNo: '7' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '基本没有' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '一般' //内容
							},
							{
								content: '丰富',
								choiceNo: 'C'
							},
							{
								content: '专业',
								choiceNo: 'D'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'您的投资可以描述为？', //内容
						questionNo: '8' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '有100%的机会赢取1000元现金' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '有50%的机会赢取5万元现金' //内容
							},
							{
								content: '有25%的机会赢取50万元现金',
								choiceNo: 'C'
							},
							{
								content: '有10%的机会赢取100万元现金',
								choiceNo: 'D'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'以下情况，您会选择哪一种？', //内容
						questionNo: '9' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '我完全无法承受任何投资风险' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '风险厌恶，尽可能保证本金安全，不在乎收益率比较低' //内容
							},
							{
								content: '保守投资，愿意承担有限的本金损失和一定幅度的收益波动',
								choiceNo: 'C'
							},
							{
								content: '寻求资金的较高收益和成长性，愿意为此承担一定本金损失',
								choiceNo: 'D'
							},
							{
								content: '希望赚取高回报，愿意为此承担较大本金损失',
								choiceNo: 'E'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'以下哪项描述最符合您的投资态度？', //内容
						questionNo: '10' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '1年以下' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '1-3年' //内容
							},
							{
								content: '3-5年',
								choiceNo: 'C'
							},
							{
								content: '5-8年',
								choiceNo: 'D'
							},
							{
								content: '8年以上',
								choiceNo: 'E'
							},
							{
								content: '无特别要求',
								choiceNo: 'F'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'投资于理财、股票、基金等金融投资品（不含存款和国债）时，您可接受的最长投资期限是多久？', //内容
						questionNo: '11' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '资产保值' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '资产稳健增长' //内容
							},
							{
								content: '资产迅速增长',
								choiceNo: 'C'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'您的投资目的是？', //内容
						questionNo: '12' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '全部投资于方案一 ' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '同时投资于方案一和方案二，但方案一的比例更高' //内容
							},
							{
								content: '同时投资于方案一和方案二，但方案二的比例更高',
								choiceNo: 'C'
							},
							{
								content: '全部投资于方案二',
								choiceNo: 'D'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'综合收益和风险，如果您有100万资金您最愿意如何安排您的投资。', //内容
						questionNo: '13' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '本金无损失，但收益未达预期 ' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '出现轻微本金损失' //内容
							},
							{
								content: '本金10%以内的损失',
								choiceNo: 'C'
							},
							{
								content: '本金20-50%的损失',
								choiceNo: 'D'
							},
							{
								content: '本金50%以上的损失',
								choiceNo: 'E'
							}
						],
						choiceType: 'C0', //选项类型：C0-单选,C1-多选
						content:
							'您的投资出现何种程度的波动时，您会呈现明显的焦虑？',//内容
						questionNo: '14' //题目编号
					},
					{
						answerCrossLevelFlag: 'N', //是否控制答案跨级标识[ Y, N ]
						answerInThreeMonth: 'A', //三个月内的答案
						choiceDataList: [
							// 选项数组
							{
								choiceNo: 'A', //选项编号
								content: '货基、债基等投向固定收益类资产的产品（参考监管合并货基、债基）' //内容
							},
							{
								choiceNo: 'B', //选项编号
								content: '股基、混合型基金等有投向股票、股权、大宗商品等资产的产品' //内容
							},
							{
								content: '其他产品或服务',
								choiceNo: 'C'
							}
						],
						choiceType: 'C1', //选项类型：C0-单选,C1-多选
						content:
							'您打算投资于哪些金融产品及服务？（可多选）',//内容
						questionNo: '15' //题目编号
					}
				]
			}
		}
	]
];

export default function (businessMock) {
	// 在这统一执行Mock.js


	console.log('%c mocksss', 'background:#222;color:#bada55', mockData.concat(businessMock), businessMock);
	mockData.concat(businessMock).forEach(v => {
		v[0] = RegExp(v[0] + '.*');
		Mock.mock(...v);
	});
	console.log('mockData', mockData);
}
