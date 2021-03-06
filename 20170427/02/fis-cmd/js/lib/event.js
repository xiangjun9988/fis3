var Dom = require('./dom');
// 封装事件库
var Event = {
	// 订阅事件
	on: function (id, type, fn) {
		// 为元素绑定事件
		Dom.$(id)['on' + type] = fn;
	}
}
// 暴露接口
module.exports = Event;