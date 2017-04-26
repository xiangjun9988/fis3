//压缩png图片
fis.match('*.png',{
  //key表示阶段
  //value表示插件
  optimizer: 'png-compressor'
})