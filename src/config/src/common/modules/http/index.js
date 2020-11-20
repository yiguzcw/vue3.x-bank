import httpAxois from './http-fb';
import httpAladdin from './http-aladdin';

import { getDeviceType } from '@/common/modules/utils.js';

const typeMap = function () {
    let deviceType = getDeviceType();
    if (deviceType === 'pocket' || deviceType === "thirdParty") {
        return httpAladdin;
    } else {
        return httpAxois;
    }
};

export default typeMap();
