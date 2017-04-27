# 混合 为样式复用而生
```
body{
  margin: 0;
  padding: 0;
  list-style: none;
}
li{
  list-style: none;
}

.link-1{
  overflow: hidden;
  li{
    padding-right: 20px;
    height: 25px;
    line-height: 25px;
    float: left;

    a{
      text-decoration: none;
       color:#666;
    }
    &:hover{
      a{
        color:blue;
      }
    }
  }
}
// 继承样式1过来
.link-2{
  .link-1;
}
.link-3{
  .link-1;
  //修正
  li{
    a{
      font-size:18px;
      color:#000;
      text-decoration: underline;
    }
  }
}
```

![](img/show.jpg)