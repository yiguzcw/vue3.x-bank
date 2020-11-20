let _this;
export default {
	beforeRouteLeave(to, from, next) {
		if (this.$route && this.$route.meta && this.$route.meta.pageId && this.$el && /tracePage/.test(this.$el.className)) {
			this.throttle(() => {
				window._tag && window._tag.sendEndTime && window._tag.sendEndTime();
				const pageBroseTime = Date.now() - window.fbTraceStartTime;
				console.log('埋点-页面停留时长>>>>>>>>', this.$route.meta.pageTitle, pageBroseTime);
				this.traceBehavior(`time-页面停留时长-${pageBroseTime / 1000}s`, '', {
					duration: pageBroseTime / 1000
				});
			}, 250, [], 'traceEndTime');
		}
		next();
	},
	directives: {
		// 自定义埋点指令，设置埋点信息
		'trace': {
			bind(el, binding) {
				let eventList = ['click', 'blur', 'focus'];
				let option = {};
				if (Core.typeof(binding.value, 'String')) {
					option = Object.assign({
						action: 'click',
						fbTitle: '',
						fbLabel: '',
						fbOpts: {}
					}, {
						fbTitle: binding.value
					});
				} else {
					option = Object.assign({
						action: 'click',
						fbTitle: '',
						fbLabel: '',
						fbOpts: {}
					}, binding.value);
				}

				if (eventList.indexOf(option.action) >= 0) {
					el.addEventListener(option.action, () => {
						_this.traceBehavior(`${option.action}-${option.fbTitle || el.innerText}`, option.fbLabel, option.fbOpts);
					});
				}
			}
		}
	},
	data() {
		return {
			// 用于记录节流throttle时间点, traceStartTime, tracePageTime为于埋点专用
			throttleTimes: {
				commonStartTime: 0,
				traceStartTime: 0,
				traceEndTime: 0,
				tracePageTime: 0,
				traceEventTime: 0
			}
		};
	},
	created() {
		let pageId = this.$route && this.$route.meta && this.$route.meta.pageId;
		Vue.config.errorHandler = function (err, vm, info) {
			console.error('Vue.config.errorHandler', err, vm, info);
			window._tag && _tag.traceException({
				pageId: pageId, // 页面pageID
				label: "Vue全局错误捕获",
				name: "Vue全局错误捕获",
				msg: "", // 具体报错或提示信息，如：工资理财签约卡未加挂
				param: { err, vm, info } // 自定义，业务方可根据需要自己增加，json格式
			});
		}
		window.onerror =
			function (message, source, lineno, colno, error) {
				console.error('window.onerror', message, source, lineno, colno, error);
				window._tag && _tag.traceException({
					pageId: pageId, // 页面pageID
					label: "全局错误捕获",
					name: "全局错误捕获",
					msg: "", // 具体报错或提示信息，如：工资理财签约卡未加挂
					param: { message, source, lineno, colno, error } // 自定义，业务方可根据需要自己增加，json格式
				});
			}
	},
	mounted() {
		this.traceNodeInfo();
		this.traceStartHandle();
	},
	activated() {
		this.traceStartHandle();
	},
	methods: {
		getTraceInfo() {
			return new Promise(async resolve => {
				let orderJnlNo = localStorage.getItem('fb_trace_orderJnlNo') || '';
				let deviceId = localStorage.getItem('fb_trace_deviceId') || '';
				if (!deviceId) {
					const deviceInfo = await Device.getNativeDeviceInfo();
					console.log('设备信息==============', deviceInfo);
					deviceId = deviceInfo && deviceInfo.deviceId;
					localStorage.setItem('fb_trace_deviceId', deviceId);
				}
				resolve({
					orderJnlNo,
					deviceId
				});
			});
		},
		/**
		 * 埋点开始执行
		 */
		traceStartHandle() {
			_this = this;
			if (this.$route && this.$route.meta && this.$route.meta.pageId && /tracePage/.test(this.$el.className)) {
				this.throttle(() => {
					this.tracePageBrowse();

					window._tag && window._tag.ready(() => {
						window._tag && window._tag.sendStartTime && window._tag.sendStartTime();
					});
					window.fbTraceStartTime = Date.now();
					console.log('埋点-页面开始时间>>>>>>>>', this.$route.meta.pageTitle, window.fbTraceStartTime);

					// 计算含有营销模块的业务从点击步营销页下一步到结果页的时间
					/* if (window.fbSaleSeriveStartTime && this.$route.meta.traceRecordEndFlag) {
						console.log('Store.state.idCardInfoTrace-=-=', Store.state.idCardInfoTrace);
						const saleServiceAfterTime = window.fbTraceStartTime - window.fbSaleSeriveStartTime;
						console.log('营销页下一步到结果页时间>>>>>>>>>>>', saleServiceAfterTime / 1000);
						this.traceBehavior(`time-${getDeviceType() === 'aladdin' ? 'aladdin' : 'FB'}-${Store.state.idCardInfoTrace && Store.state.idCardInfoTrace.idNo || 'null'}-营销页下一步到结果页时间-${saleServiceAfterTime / 1000}`, saleServiceAfterTime / 1000, 'saleNextToResultTime');
					} */

				}, 250, [], 'traceStartTime');
			}
		},

		/**
		 * 埋点页面浏览信息
		 */
		async tracePageBrowse() {
			const meta = this.$route.meta;
			console.log('埋点-页面信息>>>>>>>>', meta.pageId, meta.pageTitle);

			if (meta && meta.pageId && Env !== 'dev') {
				const { orderJnlNo, deviceId } = await this.getTraceInfo();
				let traceId = localStorage.getItem('fb_trace_Id') || '';
				let channelNo = Store.state.chParams && Store.state.chParams.channelNo;
				window.WTjson = window.WTjson || {};
				WTjson['WT.pageID'] = meta.pageId;
				WTjson['WT.pagetitle'] = meta.pageTitle;
				WTjson['WT.olabel'] = orderJnlNo || deviceId || '';
				WTjson['WT.orderId'] =  orderNo;    // 流水号
				WTjson['WT.traceId'] =  traceId;    // 流水号
				WTjson['WT.innerId'] =  channelNo;    // innerId
				WTjson['WT.channel'] = JSON.stringify({
					'channelNo': channelNo,//子渠道编号（必填)
					'channelType': 'ON_LINE'
				});

				console.log('埋点-参数:WTjson>>>>>>>>', WTjson);
				this.traceInitBehaviorUrl();
				this.traceBehavior(`浏览页面-${meta.pageTitle}`);
			}
		},

		/**
		 * 埋点接口初始化
		 */
		traceInitBehaviorUrl() {
			let behaviorUrl = Env === 'prod' ? 'https://rsb2.pingan.com.cn/brcp/log/cust/behavior/fb/h5.do' : 'https://rsb-stg.pingan.com.cn/brcp/log/cust/behavior/fb/h5.do';
			console.log('埋点-设置行为接口>>>>>>>>', behaviorUrl);
			window._tag && window._tag.ready(() => {
				window._tag && window._tag.init({
					behaviorUrl // 设置行为日志发送接口
				});
			});
		},

		/**
		 * 设置埋点信息
		 * @param behaviorId {String} 必填 -- 行为id,埋点名称,对应WT.ti参数
		 * @param fbLabel {String} 选填 -- 埋点类别名,对应WT.olabel参数
		 * @param fbOpts {Object} 选填 -- 其他参数
		 */
		async traceBehavior(behaviorId, fbLabel = '', fbOpts = {}, tiAction = '') {
			try {
				// 增加额外参数
				const { orderJnlNo, deviceId } = await this.getTraceInfo();
				// const orderNo = localStorage.getItem('fb_trace_orderJnlNo') || '';
				let traceId = localStorage.getItem('fb_trace_Id') || '';
				const channelInfo = Store.getters.getChannelAuthInfo;
				const meta = window.Vm && Vm.$route && Vm.$route.meta || {};
				let channelNo = Store.state.chParams && Store.state.chParams.channelNo;
				let newFbOpts = {
					'WT.pageID': meta.pageId,
					'WT.pageName': meta.pageTitle,
					'WT.olabel': fbLabel,
					'WT.innerid': channelNo,
					'WT.business': JSON.stringify({
						'businessType': Store.state.businessType,//业务类型（必填),
						'businessName': document.head.querySelector('title').innerText,//业务名称（必填)
						'orderJnlNo': orderJnlNo,//业务流水（必填)
						'traceJnlNo': traceId//页面跟踪流水（必填)
					}),
					'WT.channel': JSON.stringify({
						'channelNo': channelNo,//子渠道编号（必填)
						'channelType': 'ON_LINE'
					}),
					'WT.tiAction': tiAction || '',
					'WT.branch': JSON.stringify({
						subBranchId: channelInfo.subBranch && channelInfo.subBranch.subBranchId
					}),
					'WT.client': JSON.stringify({
						um: channelInfo.userId
					})
				};
				for (let key in fbOpts) {
					Object.assign(newFbOpts, {
						[`WT.${key}`]: fbOpts[key]
					});
				}
				console.log('埋点-行为信息>>>>>>>>', {
					behaviorId,
					fbLabel,
					fbOpts: newFbOpts
				});
				Env !== 'dev' && window._tag && window._tag.trackEvent && window._tag.trackEvent(
					behaviorId,
					fbLabel,
					newFbOpts
				);
			} catch (e) {
				console.warn('埋点异常', e)
			}
		},

		/**
		 * 统一设置节点埋点信息
		 */
		traceNodeInfo() {
			// 所有按钮增加点击埋点
			this.setTraceNodeInfo('.poppy-button', 'click', item => {
				this.traceBehavior(`click-btn-${item.innerText}`);
			});

			// checkbox埋点
			this.setTraceNodeInfo('.fb-checkbox', 'click', item => {
				this.traceBehavior(`click-checkbox-${item.innerText}`, '', {
					fb_checked: item.querySelector('input').checked
				});
			});
			this.setTraceNodeInfo('.poppy-checkbox', 'click', item => {
				this.traceBehavior(`click-checkbox-${item.innerText}`, '', {
					fb_checked: item.querySelector('input').checked
				});
			});

			// radio埋点
			this.setTraceNodeInfo('.poppy-radio', 'click', item => {
				this.traceBehavior(`click-radio-${item.innerText}`, '', {
					fb_checked: item.querySelector('input').checked
				});
			});

			// gridselect按钮埋点
			this.setTraceNodeInfo('.poppy-gridselect-item', 'click', item => {
				this.traceBehavior(`click-gridselect-${item.innerText}`);
			});

			// input变化埋点
			this.setTraceNodeInfo('.poppy-input__inner', 'change', item => {
				// todo 暂时无法监听picker-input选择之类的变化
				this.traceBehavior(`change-input-${item.value}`);
			});
		},

		/**
		 * 全局注册DOM事件
		 * @param selected {String} 选择器
		 * @param action {String} 事件名
		 * @param callBack {Function} 回调
		 */
		setTraceNodeInfo(selected, action, callBack) {
			document.querySelectorAll(selected).forEach(item => {
				// 控制全局混入时，每次组件渲染都会注册事件的问题
				if (Store.state.traceNodeList && Store.state.traceNodeList.indexOf(item) < 0) {
					Store.state.traceNodeList.push(item);
					item.addEventListener(action, () => {
						callBack(item);
					});
				}
			});
		},

		/**
		 * 函数节流，用于防止重复点击
		 * @param  func {Function} desc: 需要限制点击频率的方法
		 * @param  delay {Number} desc: 限制点击的频率(毫秒)。默认1000豪秒
		 * @param  args {Array} desc: 传给回调函数的参数
		 * @param  key {String} desc: 自定义计时器key
		 */
		throttle(func, delay = 1000, args, key = 'commonStartTime') {
			console.log('throttle ----- 时间统计', Date.now(), this.throttleTimes[key]);
			if (Date.now() - this.throttleTimes[key] > delay) {
				this.throttleTimes[key] = Date.now();
				console.log('throttle ----- 触发函数');
				if (Core.typeof(args, 'Array')) {
					func && func(...args);
				} else {
					func && func();
				}
			}
		}
	}
};
