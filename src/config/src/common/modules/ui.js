// import Vue from 'vue';

// import PaLoading from '@/components/base-ui/loading';


// 保存vue组件实例
let _this;

let Ui = {
	// 初始化Ui中poppy组件功能
	init(self) {
		_this = self;
	},
	
	loading(isShow, text, gif) {
		// PaLoading.loadingFun(isShow, text, gif);
	},
	/*// loading框
	 loading2(param = {
	 lock: true,
	 text: '',
	 background: 'rgba(0, 0, 0, 0.7)'
	 }) {
	 let loading;
	 if (typeof param === 'object') {
	 loading = _this.$createLoading(param).show();
	 } else {
	 loading = _this.$createLoading({
	 lock: true,
	 text: param,
	 background: 'rgba(0, 0, 0, 0.7)'
	 }).show();
	 }
	 return loading;
	 },
	 
	 // loading框
	 loading2Hide() {
	 _this.$createLoading({}).hide();
	 },*/
	
	// 吐司
	toasted(param = {
		text: 'Toast',
		time: 2000,
		zIndex: 2000
	}) {
		let toast;
		if (typeof param === 'object') {
			toast = _this.$createToast(param).show();
		} else {
			toast = _this.$createToast({
				text: param,
				time: 2000,
				zIndex: 2000
			}).show();
		}
		return toast;
	},
	
	/**
	 * toastedShow  一直显示
	 * **/
	toastedALong(param = {
		text: 'Toast',
		time: 0,
		zIndex: 2000
	}) {
		let toast;
		if (typeof param === 'object') {
			toast = _this.$createToast(param).show();
		} else {
			toast = _this.$createToast({
				text: param,
				time: 0,
				zIndex: 2000
			}).show();
		}
		return toast;
	},
	
	// 隐藏吐司
	toastedHide() {
		_this.$createToast({}).hide();
	},
	
	
	// 成功的对话框
	success(text, callbackFunc) {
		Vue.prototype.$popsuccess(text, callbackFunc);
	},
	
	// 错误的对话框
	error(text, callbackFunc) {
		Vue.prototype.$poperror(text, callbackFunc);
	},
	
	// 失败的对话框s
	fail(text, callbackFunc) {
		Vue.prototype.$popfail(text, callbackFunc);
	},
	
	// 超时的对话框
	timeout(text, callbackFunc) {
		Vue.prototype.$poptimeout(text, callbackFunc);
	},
	
	// 警告的对话框
	confirm(text, confirmCB, cancelCB) {
		Vue.prototype.$popconfirm(text, () => {
			// 右侧按钮回调（确认）
			if (confirmCB) {
				confirmCB();
			}
		}, () => {
			// 左侧按钮回调(取消)
			if (cancelCB) {
				cancelCB();
			}
		});
	},
	
	// 对话框
	popConfirm(title, content, confirmText, confirmCB, cancelText, cancelCB) { // 使用详见 popUps 组件
		Vue.prototype.$popUps({
			type: 'confirm',
			title: title,
			content: content || '',
			confirmBtn: confirmText || '确认',
			cancelBtn: cancelText || '取消',
			cancelCB: () => {
				cancelCB && cancelCB();
			},
			confirmCB: () => {
				confirmCB && confirmCB();
			}
		});
	},
	
	// 对话框
	popError(title, content, confirmText, confirmCB) { // 使用详见 popUps 组件
		Vue.prototype.$popUps({
			type: 'error',
			title: title,
			content: content || '',
			confirmBtn: confirmText || '确认',
			confirmCB: () => {
				confirmCB && confirmCB();
			}
		});
	},
	
	// 对话框
	popErrorPlus(title, content, confirmText, confirmCB, cancelText, cancelCB) { // 使用详见 popUps 组件
		Vue.prototype.$popUps({
			type: 'error-confirm',
			title: title,
			content: content || '',
			confirmBtn: confirmText || '确认',
			cancelBtn: cancelText || '取消',
			cancelCB: () => {
				cancelCB && cancelCB();
			},
			confirmCB: () => {
				confirmCB && confirmCB();
			}
		});
	},
	
	// 对话框
	popSuccess(title, content, confirmText, confirmCB) { // 使用详见 popUps 组件
		Vue.prototype.$popUps({
			type: 'success',
			title: title,
			content: content || '',
			confirmBtn: confirmText || '确认',
			confirmCB: () => {
				confirmCB && confirmCB();
			}
		});
	},
	
	// 对话框
	popFail(title, content, confirmText, confirmCB) { // 使用详见 popUps 组件
		Vue.prototype.$popUps({
			type: 'fail',
			title: title,
			content: content || '',
			confirmBtn: confirmText || '确认',
			confirmCB: () => {
				confirmCB && confirmCB();
			}
		});
	},
	
	// 对话框
	popTimeout(title, content, confirmText, confirmCB) { // 使用详见 popUps 组件
		Vue.prototype.$popUps({
			type: 'timeout',
			title: title,
			content: content || '',
			confirmBtn: confirmText || '确认',
			confirmCB: () => {
				confirmCB && confirmCB();
			}
		});
	},
	
	// 对话框
	popBox(options) { // 使用详见 popUps 组件
		Vue.prototype.$popUps(options);
	},
	
	// 对话框
	popBoxPlus(type, title, content, confirmText, confirmCB, cancelText, cancelCB) { // 使用详见 popUps 组件
		Vue.prototype.$popUps({
			type: type || 'confirm',
			title: title,
			content: content || '',
			confirmBtn: confirmText || '确认',
			cancelBtn: cancelText || '取消',
			cancelCB: () => {
				cancelCB && cancelCB();
			},
			confirmCB: () => {
				confirmCB && confirmCB();
			}
		});
	}
};

export default Ui;
