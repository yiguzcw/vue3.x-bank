let videoMsgSeqNo = '';
import { getDeviceType } from '@/common/modules/utils.js';
const commonErrorHandle = err => {
	console.log('aladdin native调用', JSON.stringify(err));
	err !== null && Ui.popBox({
		type: "confirm",
		title: "",
		content: JSON.stringify(err),
		confirmBtn: "确定",
		cancelBtn: "结束办理",
		confirmCB: () => { },
		cancelCB: () => { }
	});
};

const audioVideoCb = (params, cbFunc) => {
	return (err, res) => {
		Ui.loading(false);
		console.log('视频返回：', JSON.stringify(err), JSON.stringify(res));
		Core.commonTraceInfo(`视频返回-${JSON.stringify(err)}-${JSON.stringify(res)}`, '视频返回');
		if (res) {
			let data;
			if (res.data && typeof res.data === 'string') {
				data = JSON.parse(res.data);
			} else {
				data = res.data;
			}
			if (res.code === '2153') {   // 坐席端发出的指令
				videoMsgSeqNo = data.msgSeqNo;
				const msgType = data.msgType;
				if (msgType === 'faceRecognition') {  // 触发拍照
					const photoParams = {
						method: 'takePhoto',
						data: {}
					};
					aladdin.AudioVideo.messageInteractive(photoParams, (err, photoRes) => {
						console.log('拍照回调：', JSON.stringify(err), JSON.stringify(photoRes));
					});
				} else if (msgType === 'getBussinessInfo') { // 传入业务流水号和业务类型
					const sendMsgToFB = {
						msgDir: 'RSP',
						msgStatus: 'S',
						msgType: 'getBussinessInfo',
						msgSeqNo: videoMsgSeqNo,
						msg: {
							businessJnlNo: params.businessJnlNo,
							prdId: params.prdId

						}
					};
					const sendMsgParams = {
						method: 'sendMessage',
						data: {
							value: sendMsgToFB
						}
					};
					aladdin.AudioVideo.messageInteractive(sendMsgParams, (err) => {
						if (err !== null) {
							commonErrorHandle(err);
						}
					})
				} else if (msgType === 'notifyAuthResult') {  // 返回具体通过拒绝信息
					// todo
				}
			} else if (res.code === '599' || res.code === '2201') { // 599 客服挂断 2201 用户挂断
				cbFunc();
			} else if (res.code === '2202') {
				// cbFunc(data);
			}
		}
	}
};

const signHandleCb = cbFunc => {
	return (err, res = {}) => {
		console.log('签名回调======', err, res);
		Core.commonTraceInfo(`签名返回-${JSON.stringify(err)}-${JSON.stringify(res)}`, '签名返回');
		if (err === null && res.code === keyCode.CODE_SUCCESS) {
			Ui.loading(false);
			let data = null;
			// 这里android跟IOS返回数据结构不一样，需要区分
			if (/android/i.test(navigator.userAgent)) {
				if (res.data && typeof res.data === 'string') {
					data = JSON.parse(res.data);
				} else {
					data = res.data;
				}
				let resBody = null;
				if (data.body && typeof data.body === 'string') {
					resBody = JSON.parse(data.body);
				} else {
					resBody = data.body;
				}
				if (resBody.code && resBody.code === keyCode.CODE_SUCCESS) {
					// {
					// 	code: '',
					// 	msg: '',
					// 	sign: '',
					// 	url: ''
					// }
					cbFunc(resBody);
				} else {
					commonErrorHandle(`获取签名数据异常${resBody.msg ? ':' + resBody.msg : ''}`);
				}
			} else {
				data = res.data || {};
				if (data.code && data.code === keyCode.CODE_SUCCESS) {
					cbFunc(data)
				} else {
					commonErrorHandle(`获取签名数据异常${data.msg ? ':' + data.msg : ''}`);
				}
			}
		} else {
			!err && (err = {});
			!res && (res = {});
			if (res.code === '30002') {
				Ui.loading(false);
			}
			// IOS 会抛出30200041异常，
			if (err.code !== '30200041' && res.code !== '30002' && res.code !== '30000' && res.code !== '30003') {
				commonErrorHandle(err);
			}
		}
	};
};

export default {
	// 坐席公告组件
	getVideoNotice(cbFunc) {
		notice.sdk.getVideoNotice(
			{
				channelId: 'FB-APPSVR',
				sceneId: 'FB_APPSVR_XSKH_VIDEO_TIME'
			},
			function (data) {
				Core.commonTraceInfo(`坐席公告组件-${JSON.stringify(data)}`, '坐席公告组件res');
				if (data.code === "000000") {
					cbFunc && cbFunc();
				}
			}
		);
	},
	// 复制到剪贴板
	copyToClipboard(text, cbFunc) {
		aladdin.alipborad.copy({
			copyStr: text
		}, function (err) {
			cbFunc && cbFunc(err)
		})
	},
	// webview拉伸
	pageBounce(enable) {
		aladdin.page.bounce(enable, function (err) {
			if (err) {
				aladdin.toast.show({ message: err.message });
			}
		});
	},
	// 加密
	encrypt({ params, cbFunc }) {
		aladdin.crypto.encrypt(params, cbFunc);
	},
	// 打开新webview
	openNewWebview(options) {
		aladdin.navigator.forward(options.params, function (err) {
			if (err) {
				aladdin.toast.show({ message: err.message });
			}
			options.cbFunc && options.cbFunc(err);
		});
	},
	// 打开新webview(协议)
	openAgreement({ url, title, cbFunc }) {
		aladdin.navigator.forward({
			url: url,
			title: title,
			header: {
				visible: true,
				config: {
					leftButtonVisible: true,
					rightButtonVisible: false
				}
			}
		}, function (err) {
			if (err) {
				aladdin.toast.show({ message: err.message });
			}
			cbFunc && cbFunc(err);
		});
	},
	// 银联鉴权上传
	unionPayDeviceInfoUpload({ cbFunc, errorCallBack }) {
		console.log('aladdin.unionPayDeviceInfo.upload Start');
		aladdin.unionPayDeviceInfo.upload({}, function (err, code) {
			console.log('aladdin.unionPayDeviceInfo.upload callback', err, code);
			Core.commonTraceInfo(`银联鉴权上传-${JSON.stringify(err)}-${JSON.stringify(code)}`, '银联鉴权上传res');
			// 因生产上会失败，阻碍使用；跟后台讨论，此功能非必须项，callback正常返回
			cbFunc(code);
			// if (code == 1) {
			// 	cbFunc(code);
			// } else {
			// 	if (errorCallBack) {
			// 		errorCallBack(err);
			// 	} else {
			// 		commonErrorHandle(err);
			// 	}
			// }
		});
	},
	// 获取设备信息
	getDeviceInfo({ cbFunc }) {
		aladdin.unionPayDeviceInfo.getInfo((err, res) => {
			console.log('获取设备信息=============', err, res);
			if (err === null) {
				cbFunc(res);
			} else {
				commonErrorHandle(err);
			}
		});
	},
	// 获取地理位置
	getLocation({ cbFunc, errorCallBack }) {
		aladdin.location.startLocation((err, res) => {
			Core.commonTraceInfo(`获取地理位置-${JSON.stringify(err)}-${JSON.stringify(res)}`, '获取地理位置res');
			if (res && res.City) {
				// {
				// Latitude: '',
				// Longitude: '',
				// City:'上饶市',
				// District: '鄱阳县',
				// Country: '中国’,
				// Addr: '中国江西省上饶市鄱阳县',
				// }
				console.log('aladdin.location.startLocation res:', res);
				cbFunc(res);
			} else {
				if (errorCallBack) {
					errorCallBack(err);
				} else {
					commonErrorHandle(err);
				}
			}
		});
	},
	// 开始音视频
	startVideo({ params = {}, cbFunc }) {
		console.log();
		audioVideoCb.keep = true;
		aladdin.device.getInfo((err, data) => {
			Core.commonTraceInfo(`开始音视频getInfo-${JSON.stringify(err)}-${JSON.stringify(data)}`, '开始音视频getInfo');
			if (data) {
				Ui.loading(true, '连接视频中');
				const configUrl = Env === 'prod' ? 'https://rsb.pingan.com.cn' : 'https://rsb-stg.pingan.com.cn';
				const videoParams = {
					userId: 'VIRTU',
					uiCustom: 'SplitScreenView',
					channelId: params.channelId, // 渠道ID
					channelScene: params.channelScene, // 渠道场景
					flowtype: '2',
					authKey: params.authKey, // 认证key
					queueId: params.queueId, // 队列ID
					areaId: params.areaId, // 营业厅ID
					getConfigUrl: configUrl,
				};
				Core.commonTraceInfo(`视频入参-${JSON.stringify(videoParams)}`, '视频入参');
				aladdin.AudioVideo.setConfig(videoParams, audioVideoCb(params, cbFunc));
			} else {
				commonErrorHandle(err);
			}
		});
	},
	// 唤起签名
	openSign({ params = {}, cbFunc }) {
		if (!params.userName || !params.fileId) {
			Ui.popBox({
				type: "error",
				title: "",
				content: '签名初始化中，请稍等',
				confirmBtn: "确定",
				confirmCB: () => { },
			});
			return;
		}
		const signParams = {
			SignScreenOrientation: 'false',
			// SignKey: '',
			// ContenType: '0',
			// ServerEncType: '1',
			// Orgdata: '小文',
			// Index: '0',
			UName: params.userName,
			// IDType: '0',
			// IDNumber: params.idNo,
			// RuleType: '0',
			KW: '客户签名',
			// Pageno: '1',
			// KWIndex: '1',
			KWOffset: '-80',
			// KWPos: '3',
			// Color: '黑色',
			// StrokeWidth: '8.0',
			ImageWidth: '200',
			ImageHeight: '100',
			// Scale: '3.0',
			// Pos: '2',
			// TimeFormat: 'yyyy-MM-dd HH:mm:ss',
			RemindTitle: `请签名人${params.userName}签字`,
			// SpanFromOffset: '4',
			SpanToOffset: '' + (3 + params.userName.length),
			// TemplateUrl: 'F852b83d6b7d046c8815e499aebc67a5d',
			TemplateUrl: params.fileId,
			// TemplateUrl: 'Fba43a605976645c49c158537a3e4147a',
			// Delay: '1000',
			// SDKChannelCode: '88888888',
			BusChannelCode: 'PAYH_FB_001',
			OCR: {
				IPAddress: Env === 'prod' ?
					'https://rmb.pingan.com.cn/brmsd/loan/cust/brmsd-loan/risk/eval/eleSign/Validate'
					: 'https://rmb-stg.pingan.com.cn/brmsd/loan/cust/brmsd-loan/risk/eval/eleSign/Validate',
				// AppID: '123',
				ServiceID: 'PAYH_FB_002',
				// Resolution: '80',
				// LanguageType: '1',
				// OCRCount: '5'
			}
		};
		console.log('签名入参', signParams);
		Core.commonTraceInfo(`签名入参-${JSON.stringify(signParams)}`, '签名入参');
		aladdin.sign.open(signParams, signHandleCb(cbFunc));
	},
	// 设置口袋头部
	setHeaderConfig({ params = {}, cbFunc }) {
		aladdin.header.config(params, cbFunc);
	},
	pageExit(url = '') {
		aladdin.navigator.back({
			url
		});
	},
	// 口袋登录态校验
	launchLogin(cbFunc) {
		aladdin.auth.launchLogin(function (err, data) {
			Core.commonTraceInfo(`口袋登录态校验-${JSON.stringify(err)}-${JSON.stringify(data)}`, '口袋登录态校验res');
			if (data.state === 0 || data.state === '0') {
				cbFunc();
			}
		});
	},
	// 原生设备信息
	getNativeDeviceInfo(cbFunc) {
		return new Promise(resolve => {
			aladdin.device.getInfo((err, res) => {
				if (err === null) {
					resolve(res);
				} else {
					commonErrorHandle(err);
				}
			});
		});
	}
};
