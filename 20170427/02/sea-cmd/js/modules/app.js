var Dom = require('../lib/Dom');
// 为按钮绑定事件
Event.on('btn', 'click', function () {
	// 显示弹层
	Dom.css('layer', {display: 'block'})
})

// 点击关闭按钮
Event.on('close', 'click', function () {
	// 隐藏弹层
	Dom.css('layer', 'display', 'none')
})
