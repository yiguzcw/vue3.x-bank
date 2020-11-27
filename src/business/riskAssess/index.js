import router from './modules/router';
import mock from './modules/mock';
import apis from './modules/apis';
import store from './modules/store';
import main from '@common/main.js';
// import mixin from './modules/mixin';

// 业务module传入main
main({
    router,
    store,
    mock,
    apis,
    // mixin
});
