# 方法 为了复用样式而生
>> index.less
```
.module(@w:800px,@h:100px){
  width:@w;
  height:@h;
  background:red;
  margin:20px auto;
}

.section-1{
  .module();
}
.section-2{
  .module(400px);
}
.section-3{
  .module(800px,200px);
}
```
![](img/show.jpg)