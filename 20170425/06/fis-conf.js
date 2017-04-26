//json文件不要发布，css文件，以及js文件，都在static目录下 
//static/js/index.js static/css/index.css
//发布css文件到static目录下
fis.match('*.css',{
  release: 'static/$0'
})
// 发布js到static目录下
fis.match('*.js',{
  release:'static/$0'
})
//不发布json
fis.match('*.json',{
  release:false
})