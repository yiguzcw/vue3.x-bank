export default {
	// 登录模式：
	loginMode_CTM: 'ctm', //   老柜台式   // 小黑外设
	loginMode_ICM: 'icm', // icm 模式   // 白色新外设
	loginMode_HCM: 'hcm', // 新柜台式   // 白色新外设
	loginMode_HHM: 'hhm', //  厅堂模式// 小黑外设
	loginMode_PCM: 'pcm', //  移动式// 小黑外设

	CARD_READ_AUTO: 'O', //自动读取
	CARD_READ_PUT: '1', //放置读取  （非接读取卡  身份 证）
	CARD_READ_INSERT: '2', //插入读取读取（插卡  或者是吸入式读身份 证一次返回）
	CARD_READ_SWIPE: '3', //卡折磁条读取
	CARD_READ_INSERT_4: '4', //吸入式身份证影像读取(分步)

	BLUETYPE_MODE_OLD: 'blueOld', // 老外设 小黑外设
	BLUETYPE_MODE_NEW: 'blueNew', // 新外设- 白色可身份证影像的外设

	/** 通用的返回码成功*/
	CODE_SUCCESS: '000000',

	/** 刷身份证  刷卡时 表示已放置卡 证*/
	BLCARD_LAYED: '999200',
	/** 刷身份证  刷卡时 表示已放置卡 证*/
	BLCARD_READED: '999201',
	/** 刷身份证  刷卡时 表示已放置卡 证 取走*/
	BLCARD_TAKED: '999202',
	/** 插入读身份证时的，身份信息读取成功的回调*/
	BLCARD_IMGREADED: '999203',
	/** 刷身份证  刷卡时 影像处理成功*/
	BLCARD_IMAGE: '999204',
	/** 写卡信息成功*/
	BLCARD_WRITED: '999205',
	/** 身份证锁定*/
	BLCARD_BLOCK: '999206',
	/** 卡箱预读卡成功*/
	BLCARDBOX_PREREADED: '999207',
	/** 卡箱出卡成功*/
	BLCARDBOX_SENDOUTED: '999208',
	/** 卡箱出卡成功，取走成功*/
	BLCARDBOX_TAKEED: '999209',
	/** 卡箱回收卡*/
	BLCARDBOX_PETRIEVEED: '999210',

	/** 密码输入成功*/
	PWD_SUCCESS: '999058',
	/** 指纹输入成功*/
	FINGER_SUCCESS: '999211',

	/** 业务处理成功 、关闭视频后处理*/
	AUTH_SUCCESS: 'P0000',
	/** 审核通过 ， 用户点击确认，调用 js 进行业务办理*/
	AUTH_BUSSINESS: 'P0001',
	/** // 审核失败 ，关闭后，跳转失败页面*/
	AUTH_FAIL: 'P0002',
	/** 柜台式审核撤销*/
	AUTH_CANCEL: 'P0003',
	/** 视频连接提示*/
	AUTH_EXCEPTION_NOTE: 'PH000',
	/** 视频排队等候 信息提示*/
	AUTH_WAITING_NOTE: 'PH001',


	/* Callback回调的code=999400 表示PDF确认OK*/
	PDF_CONFIRM: '999400',
	/*  Callback回调的code=999401 表示PDF取消了*/
	PDF_CANCEL: '999401',
// 结果页面的办理失败提示
	RESULT_ERROR: '抱歉，业务办理失败，请收好您的证件与卡片到我行柜台办理！',
	RESULT_FAIL: '抱歉，业务状态未明，请联系银行工作人员核实！',
	RESULT_success: '恭喜业务办理成功，请收好您的证件与卡片！',


	// 后台服务器返回的卡密码错误：
	HTTP_RES_PWDERROR: 'COMMON_ACCT_PASSWORD_WRONG',
	// 密码强度不够
	HTTP_RES_PWDERROR_STRONG: 'COMMON_ACCT_PASSWORD_NOT_STRONG_ENOUGH',
	// 余额不足
	COMMON_ACCT_BALANCE_INSUFFICIENT: 'COMMON_ACCT_BALANCE_INSUFFICIENT',
	// 需要图形验证码
	COMMON_UM_NEED_RANDOM_CODE: 'COMMON_UM_NEED_RANDOM_CODE',
	//调submit接口前余额不足
	COMMON_ACCT_BALANCE_SHORTAGE: 'GE0001',
	// 图形验证码错误
	COMMON_UM_WRONG_IMAGE_CODE: 'COMMON_UM_WRONG_IMAGE_CODE',
	CAREMACODEFACE: 'CMR_PORTRAIT', //拍照人脸识别-拍照类型
	CAREMACODEIDBACK: 'CMR_IDFACE', // CMR_IDFACE 身份证人像面-拍照类型
	CAREMACODEIDFRONT: 'CMR_EMBLEM', // 身份证国徽面-拍照类型
	CAREMACODEOTHER: 'CMR_EVIDENCE', //CMR_EVIDENCE 辅助资料-拍照类型
	CHANNELJWT_OUTDATE: 'CE0002',

	MOBILE_MULTI_USER_USED: 'MOBILE_MULTI_USER_USED', // 多人使用手机号的异常errorcode码
};


