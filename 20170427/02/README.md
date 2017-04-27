# 模块化开发工程化
>* 在fis中，也支持模块化开发，可以简化我们对模块的定义
>* 在fis中，支持cmd，amd，commonjs，system等等
>* 具体想使用什么规范，要安装相应的插件

>>* 在过去网速很慢，一次将全部的文件加载下来，很耗时，因此对于文件的加载都是按需加载，来节约流量Seajs，和requirejs就是在这个背景下设计出来的
>>* 随着技术的发展，现在网速非常快，多加载1kb和少加载1kb，现在加载主要耗时是在网络链接以及请求等待上，因此现在的技术更多的要求资源的合并，因此为模块化打包设计了一个框架叫mod.js

* no-cmd 是传统的模块化开发，直接管理JS依赖引入关系
* sea-cmd 是fis3+seajs的结合





* fis-cmd 是fis3+seajs的结合

# fis工程模块化开发
>> 确保已安装插件 fis3-hook-cmd
```
npm install -g fis3-hook-cmd
```

>## 第一步 引入规范插件
```
 fis.hook('cmd');
 ```

>## 第二步 捕获需要处理的文件
```
 fis.match('js/*.js',{
   isMod: true
 });
```