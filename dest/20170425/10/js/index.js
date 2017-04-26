// 定义一些工具方法
var Util = {
	/**
	 * 获取模板内容
	 * @id  	元素的id
	 * return 	模板内容
	 **/ 
	tpl: function (id) {
		return document.getElementById(id).innerHTML
	},
	/**
	 * 获取异步数据的方法
	 * @url 	请求地址
	 * @fn 		成功时候的回调函数
	 ***/
	ajax: function (url, fn) {
		// 创建xhr对象
		var xhr = new XMLHttpRequest();
		// 监听事件
		xhr.onreadystatechange = function () {
			// 监听readystate
			if(xhr.readyState === 4) {
				// 监听 status
				if (xhr.status === 200) {
					// console.log(xhr)
					// 将解析 的数据传递给fn
					fn && fn(JSON.parse(xhr.responseText))
				}
			}
		}
		// 打开请求
		xhr.open('GET', url, true)
		// 发送数据
		xhr.send(null)
	}
}

// 定义过滤器
// 价格过滤器
Vue.filter('itemPrice', function (str) {
	return str + '元';
})
// 原价过滤器
Vue.filter('itemOrigin', function (str) {
	return '门市价：' + str + '元';
})
// 销售数量过滤器
Vue.filter('itemSale', function (str) {
	return '已售' + str;
})

// 第二步 定义组件
// 首页组件
var Home = Vue.extend({
	template: Util.tpl('tpl_home'),
	// 数据绑定在data属性中
	data: function () {
		// 返回值才是绑定的数据
		return {
			types: [
				{id: 1, title: '美食', url: '01.png'},
				{id: 2, title: '电影', url: '02.png'},
				{id: 3, title: '酒店', url: '03.png'},
				{id: 4, title: '休闲娱乐', url: '04.png'},
				{id: 5, title: '外卖', url: '05.png'},
				{id: 6, title: 'KTV', url: '06.png'},
				{id: 7, title: '周边游', url: '07.png'},
				{id: 8, title: '丽人', url: '08.png'},
				{id: 9, title: '小吃快餐', url: '09.png'},
				{id: 10, title: '火车票', url: '10.png'}
			],
			// 定义广告数据
			ad: [],
			// 定义商品数据
			list: []
		}
	},
	// 商品以及广告的数据，应该在组件创建完成之后，才请求
	// init: function () {
	// 	console.log(111)
	// },
	// beforeCreate: function () {
	// 	console.log(1)
	// },
	created: function () {
		// 通知父组件显示搜索框
		this.$dispatch('showSeach', true);
		var that = this;
		// console.log(this, arguments)
		// console.log(222)
		// 请求数据
		Util.ajax('data/home.json', function (res) {
			// console.log(this)
			// console.log(res)
			// 判断请求成功
			if (res && res.data) {
				// 更新广告数据
				that.ad = res.data.ad;
				// 更新列表数据
				that.list = res.data.list;
				// that.$set('list', res.data.list)
				// console.log(that)
			}
		})
	},
	// beforeCompile: function () {
	// 	console.log(333)
	// },
	// beforeMount: function () {
	// 	console.log(3)
	// },
	// compiled: function () {
	// 	console.log(444)
	// },
	// mounted: function () {
	// 	console.log(4)
	// },
	// ready: function () {
	// 	console.log(555)
	// }
})
// 列表页组件
var List = Vue.extend({
	// props捕获属性数据
	// props: ['query'],
	// 定义props，将搜索的字段注册到组件数据中
	props: ['compSearch'],
	template: Util.tpl('tpl_list'),
	// 绑定数据
	data: function () {
		return {
			// 排序渲染的数据
			orders: [
				{id: 'price', text: '价格排序'},
				{id: 'sales', text: '销量排序'},
				{id: 'evaluate', text: '好评排序'},
				{id: 'cutPrice', text: '优惠排序'}
			],
			// 商品数据需要异步请求获取
			list: [],
			// 定义剩余产品
			other: []
		}
	},
	// 异步请求写在生命周期created方法中
	created: function () {
		// 通知父组件显示搜索框
		this.$dispatch('showSeach', true);
		var that = this;
		// console.log(this.query)
		// console.log(this.$parent.query)
		var key = this.$parent.query[0];
		var id = this.$parent.query[1]
		// console.log(this)
		// 发送请求获取数据,携带商品的类别信息
		Util.ajax('data/list.json?' + key + '=' + id, function (res) {
			// console.log(res)
			if (res && res.errno === 0) {
				// 存储数据
				// 最开始只渲染三个数据，所以要截取前三个
				that.list = res.data.slice(0, 3);
				// 存储剩余的产品数据
				that.other = res.data.slice(3);
			}
		})
	},
	// 定义方法
	methods: {
		loadMore: function () {console.log(this)
			// 显示所有的产品
			this.list = [].concat(this.list, this.other)
			// 清空other
			this.other = [];
		},
		// 点击排序按钮，对产品排序
		productSortBy: function (e) {
			// 优惠的排序是 根据： 原价-现价
			if (e === 'cutPrice') {
				this.list.sort(function (a, b) {
					// 原价减去现价，再排序
					var aCutPrice = a.orignPrice - a.price;
					var bCutPrice = b.orignPrice - b.price;
					// 升序
					// return aCutPrice - bCutPrice
					// 降序
					return bCutPrice - aCutPrice
				})
				// return ;
			} else {
				// 对list数组排序
				this.list.sort(function (a, b) {
					// 对e变量对应的字段排序  升序
					return a[e] - b[e]
					// 降序
					// return b[e] - a[e]
				})
			}
			// console.log(e)
			// console.log(e.currentTarget.getAttribute('data-id'))
		}
	}
})
// 详情页组件
var Detail = Vue.extend({
	template: Util.tpl('tpl_detail'),
	data: function () {
		return {
			data: {}
		}
	},
	// 在生命周期create方法中请求数据
	created: function () {
		// 通知父组件显示搜索框
		this.$dispatch('showSeach', false);
		// 缓存this
		var that = this;
		// 发送请求
		Util.ajax('data/product.json?id' + that.$parent.query[0], function (res) {
			// console.log(res)
			if (res && res.errno === 0) {
				that.data = res.data;
				// for (var i in res.data) {
				// 	that[i] = res.data[i]
				// }
				// console.log(that)
			}
		})
	}
})

// 第三步 注册组件
Vue.component('home', Home)
Vue.component('list', List)
Vue.component('detail', Detail)

// 实例化vue
var app = new Vue({
	// 定义容器元素
	el: '#app',
	// 绑定数据
	data: {
		// msg: '爱创课堂'
		// 定义切换组件的变量
		view: '',
		// 路由参数
		query: [],
		// 搜索输入框输入的字段
		search: '',
		// 要传递给组件搜索的字段
		sendSeach: '',
		// 是否显示搜索框
		isShowSeach: false
	},
	// 定义事件回调函数
	methods: {
		goSeach: function () {
			// 更新sendSeach数据
			this.sendSeach = this.seach;
			// location.hash = '#/list/seach/' + this.search
		},
		// 返回逻辑
		goBack: function () {
			history.go(-1)
		}
	},
	// 订阅消息
	events: {
		'showSeach': function (value) {
			// 根据value值决定是否显示搜索框
			this.isShowSeach = value;
		}
	}
})

// 定义路由方法
function route () {
	// 获取hash 
	var hash = location.hash;	// #/list/type/1
	// 删除#  #/list/type/1 => /list/type/1
	hash = hash.slice(1)
	// 删除可能存在	/list/type/1 => list/type/1
	hash = hash.replace(/^\//, '')	
	// 切割hash字段 list/type/1 => ['list', 'type', '1']
	hash = hash.split('/')
	// var hash1 = location.hash.slice(1).replace(/^\//, '').split('/')
	// console.log(hash1)
	// 定义组件名称映射表
	var map = {
		home: true,
		list: true,
		detail: true
	}
	// 根据hash[0]决定渲染哪个组件，就是切换app.view值
	// 要判断hash[0]是否可以切换
	if (map[hash[0]]) {
		app.view = hash[0]
	// 否则进入默认路由，首页
	} else {
		app.view = 'home'
	}
	// 将路由参数保存在参数中, 后面要根据路由参数，请求数据
	app.query = hash.slice(1);

}

// 绑定hashchange事件
window.addEventListener('hashchange', route)
// 页面加载后会触发load事件，此时也要检测路由
window.addEventListener('load', route)