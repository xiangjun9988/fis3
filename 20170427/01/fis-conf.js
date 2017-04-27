//将所有的css打包成pack.css, 添加指纹，压缩，
fis.match('*.css',{//匹配所有的css
  //打包成pack.css
  packTo:'pack.css',
  //添加指纹
  useHash:true,
  // 压缩css
  optimizer: 'clean-css',
  //使用精灵图
  useSprite:true
})
//将所有的js打包成pack.js, 添加指纹，压缩
fis.match('*.js',{
  //打包成pack.js
  packTo:'pack.js',
  // 添加指纹
  useHash: true,
  // 压缩js
  optimizer: 'uglify-js'
})
//打包阶段   将图片制作精灵图
fis.match('::package',{
  //将图片制作精灵图 打包阶段制作精灵图：分三步 第一在css文件中图片后加?__sprite 第二步 启用在获取css文件中启用精灵,第三步 打包精灵图
  spriter:'csssprites',
  // 第二步 资源定位
  postpackager: 'loader'
})
//其他文件加上指纹
fis.match('*.{png,jpeg,jif,jpg}',{
  useHash:true
})
//html文件绝对不能添加指纹，模板文件可以