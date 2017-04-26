// 压缩所有的css文件
fis.match('**.css', {
	// key阶段
	// value名称
	optimizer: 'clean-css'
})