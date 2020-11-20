class FBWebsocket {
	constructor({wsUrl, type, onopen, onmessage, onclose, onerror}) {
		this.timer = null;     // 定时请求ping接口以保持连接
		this.reConnectTimer = null;     // 重新连接定时器
		this.RE_CON_TIME = 2000;   // 重连间隔时间
		this.isConnected = false;   // websocket已连接标志
		this.wSocket = null;
		this.wsUrl = wsUrl;
		this.type = type;
		this.onopen = onopen;
		this.onmessage = onmessage;
		this.onerror = onerror;
		this.onclose = onclose;
		this.connect();
		// this.startReConTimer();
	}

	connect() {
		this.close();
		if (Env === 'dev' || Env === 'debugMock') {
			this.wSocket = {
				onmessage: () => {
					this.wsMsg({
						data: JSON.stringify({
							body: JSON.stringify({type: "test"}),
							type: 4
						})
					}, this.onmessage);
				}
			};
			this.wSocket.onmessage();
		} else {
			this.wSocket = new WebSocket(this.wsUrl);
			this.wSocket.onopen = () => this.wsOpen(this.onopen);
			this.wSocket.onmessage = (res) => this.wsMsg(res, this.onmessage);
			this.wSocket.onclose = () => this.wsClose(this.onclose);
			this.wSocket.onerror = () => this.wsErr(this.onerror);
		}
	}

	startReConTimer() {
		// 连接后定时重连
		this.reConnectTimer = window.setInterval(() => {
			if (this.isConnected) {
				window.clearInterval(this.reConnectTimer);
			} else {
				this.connect();
			}
		}, this.RE_CON_TIME);
	}

	wsOpen(externalFun) {
		if (!this.wSocket || !this.wsUrl) {
			console.warn('websocket对象不存在或wsUrl不存在');
			return;
		}
		console.log('websocket已连接===============');
		this.isConnected = true;
		externalFun && typeof externalFun === 'function' && externalFun();
		this.timer = window.setInterval(() => {
			if (this.wSocket.readyState === window.WebSocket.OPEN) {
				App.post.channel({
					params: {name: 'fb-ping'},
					url: UrlApi.ping,
					error: (code, msg) => {
						console.log('websocket-fb-ping 异常,' + msg);
						Ui.toasted('websocket-ping异常');
					}
				});
			}
		}, 30000);
	}

	wsMsg(res, externalFun) {
		if (!this.wSocket || !this.wsUrl) {
			return;
		}
		console.log('websocket收到消息===============', res.data);
		res.data && (res = JSON.parse(res.data));
		if (res.type === 4 && externalFun && typeof externalFun === 'function') {
			externalFun(JSON.parse(res.body));
		}
	}

	wsClose(externalFun) {
		if (!this.wSocket || !this.wsUrl) {
			return;
		}
		console.log('websocket连接关闭===============');
		externalFun && typeof externalFun === 'function' && externalFun();

	}

	wsErr(externalFun) {
		if (!this.wSocket || !this.wsUrl) {
			return;
		}
		console.log('websocket连接失败===============');
		externalFun && typeof externalFun === 'function' && externalFun();
		this.connect();
	}

	close() {
		this.wSocket && this.wSocket.close();
		this.wSocket = null;
		this.isConnected = false;
		this.reConnectTimer && window.clearInterval(this.reConnectTimer);
		this.timer && window.clearInterval(this.timer);
	}
}

export default FBWebsocket;
