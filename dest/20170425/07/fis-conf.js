// 将css文件，js文件放在static目录下
// Data、img以及index.html文件直接移动
//App.js不要发布
//发布js和css
fis.match('*.{css,js}',{
  release:'static/$0'
})
//  Data、img以及index.html文件直接移动
fis.match('*.{json,gif,png,jpg,jpeg,html}',{
  release: true //默认值为true，所以不需要配置
})
//不发布app.js
fis.match('app.js',{
  release:false
})