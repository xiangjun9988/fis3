# 一个模块一个大括号的写法
>>* 定义变量
>>* 定义基本尺寸
>>* 一个模块一个大括号
>>* &可以访问到当前所在的选择器名
```
//定义变量
// 定义背景色
@bgColor:#3d95d5;
// 字体颜色
@color:#fff;
// 鼠标划入背景颜色
@hoverBgColor:rgba(255, 255, 255, .8);
// 鼠标划入字体颜色
@hoverColor:blue;
// 基本尺寸
@space: 20px;

body{
  margin: 0;
  padding: 0;
}
li{
  list-style: none;
}
//一个模块一个大括号
ul{
  margin: 5*@space auto;
  width:2*3*@space;
  padding: 5px 20px;
  background: @bgColor;
  overflow: hidden;
  li{
    float: left;
    width:2*@space;
    height: @space;
    line-height: @space;
    text-align: center;
    font-size:.7*@space;

    a{
      text-decoration: none;
      color:@color;
    }
    &:hover{
      background:@hoverBgColor;
      a{
        color:@hoverColor
      }
    }
    
  }
}
```