<template>
	<div class="layout-content-main tracePage">sdfasdfasdfads</div>
</template>

<script>
	import { createUuid } from "@/common/modules/utils.js";

	function resetWebtrendsInfo() {
		// 业务流程开始重置埋点信息，多种开始入口
		localStorage.setItem("fb_trace_orderJnlNo", "");
		localStorage.setItem("fb_trace_Id", createUuid());
	}
	export default {
		name: "index",
		data() {
			return {};
		},
		beforeRouteEnter(to, from, next) {
			//这里做各种入口的判断
			// channelNo,branchNo
			let chInfo = Store.getters.getChParams;
			// authorization,fromRouter:'OCR' // 'OCR','FACE',faceJnlNo
			let fbInfo = Store.getters.getFbParams;
			if (fbInfo.apiUrl) {
				window.winApp.apiUrl = fbInfo.apiUrl;
			}
			if (fbInfo.businessType) {
				Store.state.businessType = fbInfo.businessType;
			}
			// 没有验证信息，进入开卡说明
			if (!fbInfo.authorization) {
				resetWebtrendsInfo();
				winApp.coreVue.replacePage(routerNames.RiskExplainPage);
			}

			// 已经验证过手机号跳转到我们页面
			if (fbInfo.fromRouter === "MOBILE" && fbInfo.authorization) {
				resetWebtrendsInfo();
				Store.state.orderAuthInfo.orderJwt = fbInfo.authorization;
				Core.setSessionData("fb-authorization", fbInfo.authorization);
				winApp.coreVue.replacePage(routerNames.IdentityVerificationPage);
			}
			// 从OCR跳转到我们页面
			if (fbInfo.fromRouter == "OCR" && fbInfo.authorization) {
				Store.state.orderAuthInfo.orderJwt = fbInfo.authorization;
				Core.setSessionData("fb-authorization", fbInfo.authorization);
				winApp.coreVue.replacePage(routerNames.IdBusinessPage);
			}
			// 从人脸跳转到我们页面
			if (fbInfo.fromRouter == "FACE" && fbInfo.authorization) {
				Store.state.orderAuthInfo.orderJwt = fbInfo.authorization;
				Core.setSessionData("fb-authorization", fbInfo.authorization);
				winApp.coreVue.replacePage(routerNames.FaceVerificationPage);
			}
		},
		created() {},
		methods: {}
	};
</script>

<style scoped lang="less" type="text/less">
</style>
