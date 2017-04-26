// 可能会操作谁
// 在页面中渲染01.png图片
var img = new Image();
// 插入页面中
document.body.appendChild(img);
// 加载图片
img.src = "img/01.png";
// img.src = __inline("../img/01.png");

// 让body背景色变成橘黄色
// var cssStr = '* {margin: 0;padding: 0;list-style: none;}body, html {background: orange;}'
// 我们在js中写css太痛苦了，如果可以将css嵌入就好了
var cssStr = "* {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n\tlist-style: none;\r\n}\r\nbody, html {\r\n\tbackground: pink;\r\n}"
// 创建css标签
var style = document.createElement('style');
// 设置类型
style.type = 'text/css';
// 插入到页面中
document.head.appendChild(style);
// 设置内容
style.innerHTML = cssStr;

// 引入app.js
// 创建script标签
var script = document.createElement('script');
// 插入页面中
document.body.appendChild(script);
// 加载js
// script.src = 'js/hello.js'
// 合并js请求
script.innerHTML = console.log(234)

// 将模板渲染到页面中
var html = "<h1>爱创课堂</h1>";
// var html = '<h1>专业前端培训学校</h1>'
// 写入app元素中
var app = document.getElementById('app');
app.innerHTML = html;
