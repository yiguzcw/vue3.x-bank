/**
 * 解决1像素问题的vue指令
 *
 * 食用方法：
 * 在对应的dom上加上对应指令即可。
 * v-onepx: 四边框，兼容圆角
 * v-onepx-t: 单边，上部
 * v-onepx-b: 单边，下部
 * v-onepx-l: 单边：左部
 * v-onepx-r: 单边，右部
 * data-border-color="#d9d9d9" 给边框加上自定义颜色
 * data-border-outset="true" 使用boxshadow来实现边框，是往外发散的，有些特殊情况也许有用（仅适用于v-onepx）
 * 传参：如果参数为falsy。则不渲染border。不传也渲染
 *
 * 自定义颜色：
 * 自定义颜色规则：先读取标签属性data-border-color => 再读取css的border-color属性 => 最后用默认颜色
 *
 * 注意：
 * 1、绑定的标签必须生命其position为relative、fixed、absolute之一。
 * 2、务必给对应标签清除掉border；
 * 3、因为项目现在全局的box-sizing是border-box；所以默认时，border的宽度是往内部扩散的。
 * 如果要改成通用版，应该用boxshadow：inset来实现向扩散版、用border实现向外扩散版。
 * 当然也可以自己设置box-sizing来控制阴影是向内扩散还是向外扩散。border向内扩散和向外扩散在某些时候是有用处的。
 *
 * 其他问题：
 * 1、不能用于<input type="text"/>标签等内部不能插入元素的标签
 * */
const dpr = devicePixelRatio;
const DEFAULT_BORDER_COLOR = '#d9d9d9';
export default {
	// 四边的1像素，自动支持圆角
	// 原理和css相同，生成一个比原元素宽高大两倍，border为1像素的div，然后缩放两倍
	// js的形式可以自动获取原元素的圆角，自动换算、颜色的修改更为灵活、没有css伪元素两个的限制
	'onepx': {
		inserted(el, binding) {
			onepx(el, binding);
		},
		update(el, binding) {
			onepx(el, binding);
		}
	},
	// 1像素顶边
	'onepx-t': {
		inserted(el, binding) {
			if (binding.value !== undefined && !binding.value) return;
			let onepx = document.createElement('div');
			const cssBorderColor = getComputedStyle(el).borderBottomColor;
			const borderColor = el.getAttribute('data-border-color') || cssBorderColor || DEFAULT_BORDER_COLOR;
			const onepxStyle = `
                position: absolute;
                width: 100%;
                height: 1px;
                top: 0;left: 0;z-index: 1;
                transform: scaleY(${1 / dpr});
                border-top: 1px solid ${borderColor};
            `;
			onepx.setAttribute('style', onepxStyle);
			onepx.classList.add('onepx');
			el.appendChild(onepx);
		}
	},
	// 1像素底边
	'onepx-b': {
		inserted(el, binding) {
			if (binding.value !== undefined && !binding.value) return;
			let onepx = document.createElement('div');
			const cssBorderColor = getComputedStyle(el).borderBottomColor;
			const borderColor = el.getAttribute('data-border-color') || cssBorderColor || DEFAULT_BORDER_COLOR;
			const onepxStyle = `
                position: absolute;
                width: 100%;
                height: 1px;
                bottom: 0;left: 0;z-index: 1;
                transform: scaleY(${1 / dpr});
                border-bottom: 1px solid ${borderColor};
            `;
			onepx.setAttribute('style', onepxStyle);
			onepx.classList.add('onepx');
			el.appendChild(onepx);
		}
	},
	// 1像素左边
	'onepx-l': {
		inserted(el, binding) {
			if (binding.value !== undefined && !binding.value) return;
			let onepx = document.createElement('div');
			const cssBorderColor = getComputedStyle(el).borderBottomColor;
			const borderColor = el.getAttribute('data-border-color') || cssBorderColor || DEFAULT_BORDER_COLOR;
			const onepxStyle = `
                position: absolute;
                width: 1px;
                height: 100%;
                top: 0;left: 0;z-index: 1;
                transform: scaleX(${1 / dpr});
                border-left: 1px solid ${borderColor};
            `;
			onepx.setAttribute('style', onepxStyle);
			onepx.classList.add('onepx');
			el.appendChild(onepx);
		}
	},
	// 1像素右边
	'onepx-r': {
		inserted(el, binding) {
			if (binding.value !== undefined && !binding.value) return;
			let onepx = document.createElement('div');
			const cssBorderColor = getComputedStyle(el).borderBottomColor;
			const borderColor = el.getAttribute('data-border-color') || cssBorderColor || DEFAULT_BORDER_COLOR;
			const onepxStyle = `
                position: absolute;
                width: 1px;
                height: 100%;
                top: 0;right: 0;z-index: 1;
                transform: scaleX(${1 / dpr});
                border-right: 1px solid ${borderColor};
            `;
			onepx.setAttribute('style', onepxStyle);
			onepx.classList.add('onepx');
			el.appendChild(onepx);
		}
	}
};

// 画四边border的方法
function onepx(el, binding) {
	// 条件渲染border，如果传餐为false，则不渲染border
	if (binding.value !== undefined && !binding.value) return;
	// 生成一个唯一id，用于防止重复创建多个onepx
	let id;
	let elId = el.getAttribute('id');
	if (elId) {
		id = elId;
	} else {
		id = `onepx_${parseInt(Math.random() * 10000000, 10)}`;
		el.setAttribute('id', id);
	}

	let elStyle = getComputedStyle(el);
	// 偶尔会出现找不到宽、高、border的问题。如果找不到，不渲染。不然会渲染一个空的、导致原有border消失的问题
	if (!(elStyle.width && elStyle.height && elStyle.borderRadius)) return;

	// 获取父元素的相关数据，可以简化一下
	let cssBorderColor = elStyle.borderBottomColor;
	// 可以自定义颜色
	let borderColor = el.getAttribute('data-border-color') || cssBorderColor || DEFAULT_BORDER_COLOR;

	// 以下是为了兼容border: 10px 20px 30px 40px;这样的写法
	let computedBorder = '';
	elStyle.borderRadius.split(' ').map(v => {
		computedBorder += ' ' + (parseInt(v, 10) * dpr) + 'px';
	});
	// 构造模拟边框元素的样式
	// pointer-events是为了防止，模拟边框的div挡住事件，让事件穿透到其他兄弟元素
	let onepxStyle = `
                border-radius: ${computedBorder};
                width: ${parseInt(elStyle.width, 10) * dpr}px;
                height: ${parseInt(elStyle.height, 10) * dpr}px;
                position: absolute;
                left: 0;top: 0;
                transform: scale(${1 / dpr}, ${1 / dpr});
                transform-origin: 0 0;
                z-index: 1;
                pointer-events: none;
            `;

	// 边是往外扩展还是向内扩展，暂时没什么用处
	let inset = el.getAttribute('data-border-outset') === 'true';
	onepxStyle += inset ? `box-shadow: 0 0 0 1px ${borderColor};` : `border: 1px solid ${borderColor};`;

	// 生成一个div，模拟1像素边

	let onepx = el.querySelector(`.${id}`);
	if (onepx) {
		// 如果已经插入了
		// 设置参数
		onepx.setAttribute('style', onepxStyle);
	} else {
		// 如果第一次，新建
		onepx = document.createElement('div');
		onepx.setAttribute('class', id);
		// 设置参数
		onepx.setAttribute('style', onepxStyle);
		onepx.classList.add('onepx');
		el.appendChild(onepx);
	}
	// 清空变量
	// childList = inset = parentRadius = parentHeight = parentWidth = elStyle = cssBorderColor = onepxStyle = null;
}

// eslint-disable-next-line no-unused-vars
function debug(el) {
	return el.getAttribute('data-border-debug');
}
