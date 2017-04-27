// 定义一些与dom操作的方法
var  Dom = {
	// 根据id获取元素
	$: function (id) {
		return document.getElementById(id)
	},
	// 设置样式的方法
	css: function (id, key, value) {
		// 如果有三个参数，直接进行样式赋值
		if (value !== undefined) {
			this.$(id).style[key] = value;
		} else {
			// 否则key是一个对象，要遍历赋值 css({color: red})
			for (var i in key) {
				// i color， key[i] red => css(id, i, key[i])
				this.css(id, i, key[i])
			}
		}
		// 链式调用
		return this;
	},
	// 设置或者获取内容
	html: function (id, html) {
		// 如果有html就是设置，否则就是获取
		if (html === undefined) {
			return this.$(id).innerHTML;
		} else {
			this.$(id).innerHTML = html;
			// 链式调用
			return this;
		}
	}
}

// 只需要暴露接口
module.exports = Dom;
