# 序言：论述webapp和native app之争 #

# web开发，js,html5,css3
全文贯穿原生js和jQuery解释。只提供要点，具体细节请读者自己探索

## 关于div+css概述 
此处需要讲浏览器兼容性
## 基本元素 
## 多页跳转 
## 表单 
## js和html交互（dom操作） 
## 关于事件模型 
## post和get 
## ajax使用 
## json和jsonp,xml举例 
## 如何使用css修改显示样式 
## 理解css盒子模型 
## 理解css sprite 
## 开发与调试工具 
## js测试与压缩 
## js oo 
## 关于雅虎36条军规 


# web进行本地化，phonegap插件实例 
把上一章的例子放到此处打包，让读者直接可以看到效果
## 纯web版,用safari直接打开
## 用phonegap打包


# 整站包装 
## jQuery mobile 
## sencha touch2 


# phonegap原理解析 
## pg历史说明 
## oc调用js实例 
## 如何在应用内部打开其他应用 
## js如何访问oc类 
## pg架构流程 
## 现有插件说明 

## requerJS说明 
### AMD规范 
### SeaJS 

## 开发详解，主要讲插件原理 
## 高级开发：js类机制 

## jQuery插件机制 
### CityUI 
### Ext-core 


# ios native app 说明 
## xcode用法说明 
## 原生应用概括 
## 原生有略分析 
## icon及尺寸常识 
## 来个hello world 
### xib开发方式 
### 纯手写代码

## 常用控件 
### UITableViewController 
### UINavagationViewController 

## MVC说明  
###包分类 
###物理分类 

## 原生扩展（向友盟学习），插件化
## 延时处理（接口回调与通知）
## 条件编译 
## 内部类（block）

## 与其他语言集成
### c/c++ 
### perl 
### lua
### NodeJS


# oc基础 和各种实例 
## gh-unit
## ui test(1:ui automation 2:taobao) 
## 推送通知 
## 分享：思路（sdk,server方式） 

## http和json,xml解析
## 多线程开发
## 缓存处理 
## 看一个实例：egoPhotoViewController

## 存储：(1:归档 2：db 3：NsUserDefault 4:XML) 
## 自定义UI 
## egoRefreshHeadView 
## 消息提示 
## 无网略视图 
## 首次介绍 
## 复选框 
## 分享按钮 
## 应用推荐界面 
## 自定义tabbar 
## 关于view和事件模型 
### view生命周期 
### 响应者链

### 观察者模式 

## 例子

[日志打印]
指定服务器

- [No320LogService log:@"%d,%@",1,3];


服务器端指定日期，可以修改应用所在手机的时间


[应用推荐]

- 应用推荐 v1(按钮)
- 应用推荐 v2(table)
- 应用推荐 v3(table + 按钮)
- 应用推荐 v4(table + 按钮 + scroll)
- 应用推荐 v5(table + 按钮 + scroll + 手势打开webview)  打开地址需要 1)appstrore打开  2）自己内置webview打开

[本机启动记录]

记录启动时间

[推荐提醒]

- 连续3天应用推荐提醒
使用数据库做提醒
打成bundle,指定db,表名，字段名称

	[No320Notification initDb:(NSString *)db tb:(NSString *)dbname field:(NSString *)fieldName ];
	if([No320Notification isSucces]){
		alert(...);
	}
	
- 




## 关于广告 
## 关于newStands新闻杂志 
## iap应用内支付 

## 正则表达式 
## 动画 
## 手势 
## 数据分析：报表 
## 内存使用和泄露查看 
## 内存跟踪与调试 

# UI automation 测试
这部分还需要处理一下，目前了解甚少



# 打包,构建工具 
构建
## 如何构建 
### .app 
### .framework 
### .a 
### 作业依赖 
## 如何发布 

## 更多高级构建场景 
### 测试环境 
### 共存 
### 条件编译 

## 已有构建工具 
## 构建原理 
## 如何自己写一个构建工具 
## 生成api文档 
### doxygen 
### appledoc 

## 如何用git打包，管理分支Merge等操作 


# 关于App store 
## 关于AppleID和DeveloperID 
## 申请DeveloperID 
## 证书和授权文件管理（p12） 
## 同一一应用共存原理 
## 推送配置 

## 应用上线发布等 
### xcode share distrubiltion 
### Application loader 

## 其他
	
ios-code-practice
=================

关于 ios 开发 web app 与 native app 知识梳理
一、序言
1、webapp 与 native app 介绍、目前发展 
2、Webapp 与 nativeapp 的区别 优势
3、Webapp 与 nativeapp 的开发技术介绍 

二、webapp 开发知识梳理 
1、开发环境的搭建与使用
2、
3、

三、Native app 开发知识梳理 
1、开发环境的搭建与使用
2、UIKit 与 NSFoundation 框架介绍 
3、代理的使用介绍
4、Objective-c 的内部消息机制 kvc 与 kvo 的介绍 
5、Objective-c 面向对象特性的继承与拓展 
6、内存管理介绍
7、常见控件的拓展使用
8、Objective-c 语言架构(高级部分) 

四、Native app 中与 web 交互用到的常见框架 
1、Phonegap
2、spidermonkey

五、Objective-c 开发中应用功能专题介绍
1、解析(xml、json) 2、归档(本地存储、db) 3、动画
4、正则
5、多线程 
6、代码块(block) 
7、runloop 
8、网络通信(上传、下载) 
9、定位、拍照、邮件、短信 
10、二次付费
11、静态库 
12、ads 
13、推送 
14、晃动 
15、二维码扫描 
16、app 评价 
17、
18、
19
20、

六、C++、C、objective-c 等多语言混合编程梳理 

七、、ios 高效开发、调试经验总结
1、代码编写规范 
2、条件编译 
3、辅助工具 leaks 等 

八、常见框架介绍 
1、Three20
2、asi
3、tapku
4、 九、关于应用打包上线流程梳理 1、证书的申请与使用
2、
3、
4、

十、附件
1、ios 开发常用 icon 尺寸表 
2、Ios 控件基本大小表
3、 4、 5、 6、


