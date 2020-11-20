export default {
    unionPayDeviceInfoUpload({ cbFunc }) {
        cbFunc('1');
    },
    getLocation({ cbFunc }) {
        cbFunc({
            Latitude: '',
            Longitude: '',
            City: '上饶市',
            District: '鄱阳县',
            Country: '中国',
            Addr: '中国江西省上饶市鄱阳县',
        })
    },
    encrypt({ params, cbFunc }) {
        cbFunc(null, '123131231');
    },
    pageBounce(enable) {

    },
    setHeaderConfig() { },
    copyToClipboard() {

    },
    launchLogin(cbFunc) {
        cbFunc();
    },
    getVideoNotice(cbFunc) {
        cbFunc();
    },
    getNativeDeviceInfo() {
        return new Promise(resolve => {
			resolve();
		});
    }
};
