Getting Started with iOS
========================

This guide describes how to set up your development environment for Cordova and run a sample application.
本指南讲述的是如何设置你的Cordova的开发环境，并运行示例应用。

## 视频教程: 

* [Cordova Installer - Xcode 4 Template][1]

## 1. Requirements 

* Intel-based computer with Mac OS X Lion (10.7)
* Necessary for Installing on [Device][2]:
	* An Apple iOS device (iPhone, iPad, iPod Touch)
	* iOS ceveloper certification

## 2. 安装SDK + Cordova 

* 从 [Mac App Store][3] 安装Xcode
* Donwload the latest copy of [Cordova][4] and extract its contents. We will be working with the lib/ios directory.
* 下载最新 [Cordova][4]版本，并解压出其内容。我们会使用lib/ios目录。？

## 3. 设置新工程 Setup New Project 

* 启动Xcode
* 选择 [File][5] 菜单
* 选择New, 然后新建工程...
*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          从模板列表选择Cordova-based Application

![choose a templates][1]

* Select the _Next_ button
* Fill in the "Product Name" & "Company Identifier" for your app

![config project][2]

* _IMPORTANT! DO NOT CHECK_ the "Use Automatic Reference Counting" checkbox

* Select the **Next** button
* **Choose a folder** to save your new app in
* Select the **Create** button, this will create your project
* Select the **Run** button in the top left corner. Your build should succeed and launch in the iOS Simulator
	a. You should see an error in the iOS Simulator informing you that **www/index.html** was not found
	b. To fix this, we need to add a folder reference to the **www** directory into the project.

![run failed][3]

* **Right-click** on the project icon in the Project Navigator (left sidebar) and select Show in Finder
* **In the Finder**, you should see the **www** directory beside your project

![about www dir][4]

* **IMPORTANT! Drag** the **www** folder into Xcode 4. **Don't** drag the www folder into your app's folder. **It needs to be dragged into Xcode 4**. For example, you would drag and drop it on the** highlighted red section **of the HelloWorld project shown below.

![www config][5]

* A window sheet should slide down with a few options, after the "**www**" folder has been dragged and dropped into the project.
* Select the radio-button **Create folder references for any added folders**.
* Select the **Finish** button

## 4. Hello World 

* Select the folder named **www** in your Project Navigator in Xcode
* Select the **index.html** file
* Type <h1>Hello World</h1> after the <body> tag
	
You can also add any associated JavaScript and CSS files there as well.

## 5A. Deploy to Simulator 

* Change the Active SDK in the Scheme drop-down menu on the toolbar to **iOS version# Simulator**.
* Select the **Run** button in your project window's toolbar

## 5B. Deploy to Device 

* Open [AppName]-Info.plist (where [AppName] is your application's name), under the "Supporting Files" group
* Change **BundleIdentifier** to the identifier provided by Apple, or your own bundle identifier. If you have a developer license, you can access and run the Assistant [here][6] and register your app.
* Change the Active SDK in the Scheme drop-down menu on the toolbar to [**DEVICENAME**] where [DEVICENAME] is the name of the device you want to deploy to.
* Select the **Run** button in your project window's toolbar

![success page][6]

## Done! 

Add more HTML, CSS and JavaScript to your **www** folder outside of Xcode, your file additions will be picked up automatically inside Xcode.


<!-- 资源 -->
[1]: style/images/XCode4-templates.png  ""
[2]: style/images/xcode4-name_your_app.png   ""
[3]: style/images/index-not-found.png     ""
[4]: style/images/www-folder.png   ""
[5]: style/images/project.jpg    ""
[6]: style/images/create-folder-reference.png    ""
[7]: style/images/HelloWorldiPhone4.png   ""


<!-- I get 10 times more traffic from [Google] [1] than from
[Yahoo] [2] or [MSN] [3]. -->
[1]: http://www.youtube.com/v/R9zktJUN7AI?autoplay=1  "Video Tutorials"
[2]: http://docs.phonegap.com/en/1.7.0/cordova_device_device.md.html#Device  "Device"
[3]: http://itunes.apple.com/us/app/xcode/id497799835?mt=12    "Mac App Store"
[4]: http://phonegap.com/download  "Cordova"
[5]: http://docs.phonegap.com/en/1.7.0/cordova_file_file.md.html#File  "File"
[6]: http://developer.apple.com/iphone/manage/overview/index.action  "here" 

<!-- ## 配置图片

7 HelloWorldiPhone4.png       
6 create-folder-reference.png 
5 project.jpg                 
2 xcode4-name_your_app.png
1 XCode4-templates.png 
3 index-not-found.png         
4 www-folder.png
 -->

