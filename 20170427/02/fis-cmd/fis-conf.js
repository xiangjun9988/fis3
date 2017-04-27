//第一步 引入规范插件
fis.hook('cmd');
// 捕获需要处理的文件
fis.match('js/**.js',{
  isMod: true
});