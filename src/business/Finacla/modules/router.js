import index from '../pages/index.vue';
const routerList = [
	{
		path: '/index',
		name: 'Home',
		component: index,
		meta: {
			hideNav: true,
			nav: {
				title: '',
			},
			pageTitle: "h5-远程风测认证-入口判断",
			pageId: "NR-h5-YCFCRZ-RKPD"
		}
	},
];

export default {
	routerList,
	navList: []
};
