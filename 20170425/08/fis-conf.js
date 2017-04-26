//压缩js
fis.match('js/*.js',{
  //key表示作用
  //value表示插件名称
  optimizer:'uglify-js'
})
//app.js不需要压缩
// fis.match('app.js',{
//   release: false
// })