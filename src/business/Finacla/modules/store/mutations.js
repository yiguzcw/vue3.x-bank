// 对vuex state里的数据进行元操作。
// 不可以直接在组件中通过this.$store.state直接复制
export default {
	updateAliveRouterList(state, list) {
		state._aliveRouterList = list;
	}
};
