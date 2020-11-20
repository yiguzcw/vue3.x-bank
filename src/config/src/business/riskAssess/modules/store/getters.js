// 定义getter；一般是需要利用到vuex的响应式数据时才需要
// 如果不需要响应式数据，可以直接在组件中this.$store.state获取想要的数据，而不用getter
export default {
	getAliveRouterList: state => state._aliveRouterList
};
