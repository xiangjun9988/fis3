//第二步 获取所有需要处理的css文件
fis.match('*.css',{
  useSprite: true
})

//第三步 打包阶段，引入精力图插件
fis.match('::package',{
  spriter: 'csssprites'
})