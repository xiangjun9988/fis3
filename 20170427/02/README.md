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