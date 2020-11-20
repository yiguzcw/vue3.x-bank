/**
 * 路由缓存方案
 * 如果路由配置keepAlive：true。则页面永久缓存。如果meta.keepAlive： false，则永久不缓存
 * 否则，路由有引用的话，缓存，否则不缓存
 * 永久不缓存的页面，不会产生引用
 * @param router
 * @param store
 */
export default function (router, store) {
	let routeStack = new Stack('routeStack');
	let aliveRouteStack = new Stack('aliveRouteStack');
	let deadRouteStack = new Stack('deadRouteStack');

	router.beforeEach((to, from, next) => {

		// routeStack.print();
		// aliveRouteStack.print();
		// deadRouteStack.print();

		if (to.matched.length <= 0) {
			next();
			return;
		}
		console.log('to', to);
		console.log('from', from);
		/*// 解决从Home点击返回回到entry空白页面的问题
		if (from.name === 'Home' && to.name === 'Entry') {
			Router.go(-1);
		}*/
		let toName = to.matched[0].name;
		let fromName = from.matched.length > 0 && from.matched[0].name;

		// 永不缓存栈
		if (toName && to.meta.keepAlive === false) {
			if (!deadRouteStack.has(toName)) {
				deadRouteStack.push(toName);
			}
			next();
			return;
		}
		// 永久缓存栈
		if (toName && to.meta.keepAlive === true) {
			if (!aliveRouteStack.has(toName)) {
				aliveRouteStack.push(toName);
				store.commit('updateAliveRouterList', getKeepAliveInclude());
				next();
				return;
			}
		}

		if (!toName) {
			next();
			return;
		}

		// 普通缓存
		// 栈中是否存在（是否构成循环）
		if (routeStack.has(toName)) {
			routeStack.cleanTo(toName);
		} else if (aliveRouteStack.has(toName)) {
			// 跳转到长久缓存页面的情况
			if (routeStack.getTop() === fromName) {
				// 如果to是长久缓存页面, 且from是普通缓存的栈顶元素，则移除栈顶缓存
				routeStack.pop();
			}
		} else {
			routeStack.push(toName);
		}
		store.commit('updateAliveRouterList', getKeepAliveInclude());
		next();
	});

	// 获取keepAlive组件的缓存组件列表数组
	function getKeepAliveInclude() {
		return [].concat(aliveRouteStack.toArray()).concat(routeStack.toArray());
	}
};

// 实现一个栈结构
class Stack {
	constructor(name) {
		this._data = [];
		this.name = name;
	}

	push(val) {
		return this._data.push(val);
	}

	pop() {
		if (!this.isEmpty()) {
			return this._data.pop();
		}
		return false;
	}

	getTop() {
		return this._data[this._data.length - 1];
	}

	print() {
		console.log('---------');
		console.log(`Stack ${this.name} value: `, this._data);
		console.log(`Stack ${this.name} length: `, this._data.length);
		console.log('----------');
	}

	isEmpty() {
		return this._data.length <= 0;
	}

	has(val) {
		return this._data.includes(val);
	}

	// 清除到指定value，从栈顶找到的第一个指定value（但不包含value）
	cleanTo(val) {
		const index = this._data.lastIndexOf(val);
		if (index !== -1) {
			this._data = this._data.slice(0, index + 1);
			return this._data;
		}
		return false;
	}

	toArray() {
		return this._data.slice();
	}
}
