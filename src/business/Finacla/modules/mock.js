import Apis from './apis';

// 在这定义业务mock接口
// 每个接口为一个数组,
// 数组里的
// 第一个参数为接口url,
// 第二个可选,请求类型,默认为get,
// 第三个为返回值
const mock = [
	[
		Apis.subBranchId,
		'post',
		{
			data: {
				"subBranchId": "0331"
			}
		}
	]
];

export default mock;
