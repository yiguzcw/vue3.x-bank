<template>
	<div class="layout-content-main"></div>
</template>

<script>
	import { getDeviceType } from "@/common/modules/utils.js";
	export default {
		name: "Entry",
		components: {},
		data() {
			return {};
		},
		created() {
			this.initUrlParams();
			// 不在口袋环境，直达口袋 生成工具：https://test-cdn-fat.pingan.com.cn/platform/zhida/url-tool-creditcard.html
			console.log("不在口袋环境，直达口袋");
			let deviceType = getDeviceType();
			if (deviceType !== "pocket" && deviceType !== "thirdParty") {
				let url = "";
				// 这时候location.href已经encode过
				if (window.Env == "prod") {
					location.replace(
						`https://b.pingan.com/koudai/zhida.html?paesuperbank=${encodeURIComponent(
							`{"url":"${location.href}"}`
						)}`
					);
					// location.replace(
					//     "https://b.pingan.com/koudai/zhida.html?paesuperbank=%7B%22url%22%3A%22https%3A%2F%2Fb.pingan.com.cn%2FbranchOperation%2Ffacebank%2Fh5%2FonlineAcctOpen%2Fbusiness%2FacctOpen%2Findex.html%3Fchparams%3D%257B%2522channelNo%2522%3A%2522KZGT%2522%257D%26fbparams%3D%257B%2522businessType%2522%3A%2522OnlineAcctOpen%2522%257D%22%7D"
					// );
					return;
				} else if (window.Env != "dev") {
					location.replace(
						`https://test-cdn-fat.pingan.com.cn/platform/zhida/zhida.html?paesuperbank=${encodeURIComponent(
							`{"url":"${location.href}"}`
						)}`
					);
					// location.replace(
					//     "https://test-cdn-fat.pingan.com.cn/platform/zhida/zhida.html?paesuperbank=%7B%22url%22%3A%22https%3A%2F%2Ftest-b-fat.pingan.com.cn%2FbranchOperation%2Ffacebank%2Fh5%2FonlineAcctOpen%2Fbusiness%2FacctOpen%2Findex.html%3Fchparams%3D%257B%2522channelNo%2522%3A%2522KZGT%2522%257D%26fbparams%3D%257B%2522businessType%2522%3A%2522OnlineAcctOpen%2522%257D%22%7D"
					// );
					return;
				}
			}

			// 非口袋登录，走h5登录方式
			if (deviceType === "pocket") {
				Device.launchLogin(() => {
					this.go();
				});
			} else if (deviceType === "thirdParty") {
				this.h5Login();
			} else {
				this.go();
			}
		},
		mounted() {},

		methods: {
			// 初始化url 传递的参数
			initUrlParams() {
				console.log(
					`width:${window.screen.width};height:${window.screen.height}`
				);

				let urlParams = {}; // 存储从url上获取的信息
				let paramsStr = decodeURIComponent(window.location.search); // 获取url信息
				console.warn(
					"url传入参数window.location.search：",
					window.location.search,
					paramsStr
				);
				if (typeof paramsStr !== "undefined" && paramsStr) {
					// 如果当时url有传值 没有传值则默认是第一次进入页面
					urlParams = Filter.getUrlKey(paramsStr);
				}
				if (urlParams.fbparams) {
					//参数： fbparams={"authorization":"test"}     fbparams 后面跟JSON 对象字符串 ， 表示url 传的的对象数组
					console.info("fbparams", JSON.parse(urlParams.fbparams));
					let fbParams = JSON.parse(urlParams.fbparams);

					if (fbParams.authorization) {
						Store.commit(
							"setAuthorizationToken",
							"Bearer " + fbParams.authorization
						); // 存储认证信息
					}
					console.log(
						"Store 认证信息 Authorization ==：",
						Store.getters.getAuthorizationToken
					);

					Store.commit("setFbParams", fbParams);
					console.warn("Store FB参数：", Store.getters.getFbParams);
				}
				if (urlParams.chparams) {
					// 参数：chparams={"channelNo":"","branchNo":""}
					console.info("chparams", JSON.parse(urlParams.chparams));
					let chParams = JSON.parse(urlParams.chparams);

					Store.commit("setChParams", chParams);
					console.warn("Store 渠道参数：", Store.getters.getChParams);
				}
			},
			// 跳转到第一个业务页
			go() {
				// this.$router.replace({name: 'Home'});
				// winApp.coreVue.toPage('Home');
				winApp.coreVue.replacePage("Home");
			},
			h5Login() {
				// 检查登录态
				AuthCore.checkLogin((data = {}) => {
					console.log("h5登录校验0318-3", data);
					// alert(JSON.stringify(data));
					// data = {
					// isLogin: false, // true 有登录态；false 没有登录态；loginStatus为3、4时，isLogin为false；
					// loginStatus: '' // 有登录态时，登录状态 0-强登 1-弱登 2-无效 3-微信、BBC共享 4-BBC隔离
					// }
					if (
						data.loginStatus == 0 ||
						data.loginStatus == 3 ||
						data.loginStatus == 4
					) {
						this.go();
					} else {
						AuthCore.launchLogin({
							// target: Env === 'prod' ? 'https://b.pingan.com.cn/branchOperation/facebank/greyEntry/index.html?businessType=OnlineRiskAssessment' :
							// 	'https://test-b-fat.pingan.com.cn/branchOperation/facebank/greyEntry/index.html?businessType=OnlineRiskAssessment'
						});
					}
				});
			}
		}
	};
</script>
<style lang="less" scoped>
</style>

