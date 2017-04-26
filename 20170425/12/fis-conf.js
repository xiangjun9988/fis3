//为所有的js文件，css文件加戳
fis.match('*.{js,css}',{
  useHash:true
})
//app.js不需要加戳
fis.match('app.js',{
  useHash: false
})