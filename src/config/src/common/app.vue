<template>
	<div class="layout" v-show="show">
		<pa-header v-show="showHeader"></pa-header>
		<div class="app-layout" :style="style">
			<pa-navigator v-show="showNav"></pa-navigator>
			<keep-alive :include="aliveRouterList">
				<router-view class="layout-content-main"></router-view>
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import { getDeviceType } from "@/common/modules/utils.js";

	export default {
		name: "app",
		data() {
			return {
				show: true,
				showHeader: true,
				showNav: true,
				style: {
					paddingTop: "0.88rem"
				}
			};
		},
		computed: {
			aliveRouterList() {
				return this.$store.getters.getAliveRouterList;
			}
		},
		watch: {
			$route: {
				// 监听是否需要隐藏页面标题和导航
				handler: function(newVal, oldVal) {
					this.showHeader = !this.$route.meta.hideHeader;
					// 口袋，阿拉丁平台隐藏头部
					let deviceType = getDeviceType();
					if (deviceType === "pocket" || deviceType === "thirdParty") {
						this.showHeader = false;
					}
					this.showNav = !this.$route.meta.hideNav;
					this.style.paddingTop = this.showHeader ? "0.88rem" : 0;
				},
				immediate: true
			}
		},
		created() {
			// 初始化Ui中poppy组件功能
			window.Ui.init(this);
			window.appTitle = this.getRef("appTitle", this); // 导航组件vue实例对象
		},
		mounted() {
			// 关闭橡皮筋
			Device.pageBounce(false);
		}
	};
</script>

<style lang="less">
	@import "../assets/styles/app.less";
	.service-png {
		position: fixed;
		top: 0.2rem;
		right: 0.2rem;
		z-index: 99;
		width: 0.5rem;
	}
</style>
