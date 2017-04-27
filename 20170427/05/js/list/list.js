// 1 修改集合文件，暴漏接口，2 index.html删除图片，3 route.js 实例化集合，赋值给视图
	// 定义列表页视图
	var List = Backbone.View.extend({
		// 绑定事件
		events: {
			// 1 绑定事件
			'tap .list .search span': 'goSearch',
			// 1 为类别绑定事件
			'tap .nav li': 'showTypeResult',
			// 点击返回按钮
			'tap .go-top': 'goTop'
		},
		// 定义图片模板
		tpl: _.template('<a href="<%=href%>"><img src="<%=src%>" alt="" style="<%=style%>" /></a>'),
		// 定义变量，存储左右容器的高度
		leftHeight: 0,
		rightHeight: 0,
		// 构造函数
		initialize: function () {
			var me = this;
			// 初始化dom元素，方便后面的访问
			this.initDOM();
			// 监听集合添加数据的事件
			// this.collection.on('add', function () {})
			this.listenTo(this.collection, 'add', function (model, collection) {
				// 这里的作用域是视图实例化对象，因此使用这种方式
				// console.log(model.toJSON())
				// 拿数据去渲染视图了
				this.render(model)
			})
			// 拉去数据，渲染视图
			this.getData();

			// 定义节流函数
			var getDataFn = _.throttle(function () {
				me.getData()
			}, 400);
			// 订阅window事件
			$(window).on('scroll', function () {
				// Body的高度 < 窗口距页面顶部的高度 + 窗口的高度 + 200px
				if ($('body').height() < $(window).scrollTop() + $(window).height()+ 200) {
					// console.log(123)
					// 拉去数据
					// me.getData();
					getDataFn();
				}
				// 是否显示返回顶部
				me.toggleGoTop();
			})
		},
		// 切换返回顶部按钮的显隐
		toggleGoTop: function () {
			if ($(window).scrollTop() > 300) {
				this.$el.find('.go-top').show()
			} else {
				this.$el.find('.go-top').hide();
			}
		},
		// 返回顶部
		goTop: function () {
			window.scrollTo(0, 0);
		},
		// 初始化dom元素
		initDOM: function () {
			this.leftDOM = this.$el.find('.image-left-container');
			this.rightDOM = this.$el.find('.image-right-container');
		},
		// 获取图片数据
		getData: function () {
			this.collection.fetchData();
		},
		// 定义渲染方法
		render: function (model) {
			var height = model.get('realHeight');
			// 1 获取容器元素
			// 2 获取数据
			var data = {
				href: '#layer/' + model.get('id'),	// #layer/4
				src: model.get('url'),
				style: 'width: ' + model.get('realWidth') + 'px; height: ' + height + 'px;'
			}
			// 3 获取模板
			// 4 格式化
			var html = this.tpl(data)
			// 5 渲染  我们应该向哪个容器渲染呢
			// 左容器高度小于等于右容器高度，向左容器添加
			if (this.leftHeight <= this.rightHeight) {
				this.renderLeft(html, height)
			} else {
				this.renderRight(html, height)
			}
			// route.js中不要忘记注释render()方法
		},
		/**
		 * 向左容器渲染
		 * @html 	渲染的内容
		 * @height 	渲染的高度
		 **/
		renderLeft: function(html, height) {
			// 渲染元素
			this.leftDOM.append(html);
			// 更新高度 注意：底边的边距是6像素
			this.leftHeight += height + 6;
		},
		/**
		 * 向右容器渲染内容
		 * @html 	渲染的内容
		 * @height 	渲染的高度
		 **/
		renderRight: function (html, height) {
			// 渲染高度
			this.rightDOM.append(html);
			// 更新高度
			this.rightHeight += height + 6;
		},
		/*=============*/
		/**
		 * 获取搜索内容
		 * return 	搜索的内容
		 **/
		getSearchInputVal: function () {
			return this.$el.find('.search input').val();
		},
		/**
		 * 检测输入的内容是否合法
		 * @val 	输入的内容
		 * return 是否合法 true：不合法，false：合法
		 **/
		checkInputValError: function (val) {
			// 什么时候不合法？没有值，或者一堆空白符
			if (/^\s*$/.test(val)) {
				return true;
			}
			// 合法
			return false;
		},
		/**
		 * 去除首尾空白符
		 **/
		trim: function (val) {
			return val.replace(/^\s+|\s+$/g, '')
		},
		/**
		 * 过滤集合
		 * @val 	过滤的字段
		 * @key 	过滤的字段名称
		 * return 符合条件的模型实例化对象组成的数组
		 **/
		collectionFilter: function (val, key) {
			return this.collection.filter(function (model, index, models) {
				// 过滤type要判断是否相等
				if (key === 'type') {
					return model.get('type') == val;
				}
				// 条件：title属性包含val
				return model.get('title').indexOf(val) >= 0;
			})
		},
		/**
		 * 清空视图
		 ***/
		clearView: function () {
			// 清空内容
			this.leftDOM.html('');
			this.rightDOM.html('');
			// 清空高度
			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		/**
		 * 渲染视图
		 * @result 	是由模型实例化对象组成的数组
		 **/
		renderResult: function (result) {
			var me = this;
			// 遍历
			result.forEach(function (model, index, arr) {
				// 渲染
				me.render(model)
			})
		},
		/**
		 * 清空输入框的值
		 **/
		clearInput: function () {
			this.$el.find('.search input').val('')
		},
		// 搜索功能
		goSearch: function() {
			// 2 获取用户输入的数据
			var val = this.getSearchInputVal();
			// 3 输入校验
			if (this.checkInputValError(val)) {
				// 提示用户，
				alert('请您输入内容！')
				// 终止执行
				return;
			}
			// 4 拿数据过滤集合
			// 去除首尾空白符
			var newVal = this.trim(val);
			var result = this.collectionFilter(newVal)
			// 5 清空视图
			this.clearView();
			// 6 渲染结果
			this.renderResult(result);
			// 7 清空input的值
			this.clearInput();
		},
		/**
		 * 通过事件对象获取元素的data-type数据
		 * @e 		事件对象
		 * return 	类型数据
		 **/ 
		getNavTypeId: function(e) {
			// 获取data-type属性数据
			// return $(e.target).attr('data-type')
			// data方法获取元素的data-数据
			return $(e.target).data('type');
		},
		/**
		 * 点击分类按钮
		 **/
		showTypeResult: function (e) {
			// 2 获取绑定的数据
			var id = this.getNavTypeId(e)
			// console.log(id)
			// 3 用数据去过滤集合
			var result = this.collectionFilter(id, 'type')
			// 4 清空视图
			this.clearView();
			// 5 渲染
			this.renderResult(result);
		}
	})
	// 暴漏接口就是返回这个类
	module.exports = List;