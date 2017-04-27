// 7 对js模块化，基于commonjs规范
fis.hook('commonjs')
// 1 压缩css
fis.match('**.css', {
	optimizer: 'clean-css',
	// 5 所有css打包在一起
	packTo: 'static/css/all.css'
})
// 2 压缩js
fis.match('**.js', {
	optimizer: 'uglify-js'
})
// 3 压缩所有png图片
fis.match('**.png', {
	optimizer: 'png-compressor'
})
// 4 静态资源要添加指纹
fis.match('**.{css,js}', {
	useHash: true
})
// 6 所有的js打包在一起
// 	库文件打包在一起
fis.match('lib/*.js', {
	packTo: 'static/js/lib.js'
})
// 	模块文件打包在一起
fis.match('js/**.js', {
	packTo: 'static/js/modules.js',
	// 模块化
	isMod: true
})
// 打包
fis.match('::package', {
	// 默认是以字母顺序打包的
	postpackager: 'loader'
})
// 8 将静态文件放在static目录下