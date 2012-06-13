iPhone 路径大全
==========================


1、【/Applications】
常用软件的安装目录 
2. 【/private /var/ mobile/Media /iphone video Recorder】
iphone video Recorder录像文件存放目录
3、【/private /var/ mobile/Media /DCIM】
相机拍摄的照片文件存放目录
4、【/private/var/ mobile /Media/iTunes_Control/Music】
iTunes上传的多媒体文件（例如MP3、MP4等）存放目录，文件没有被修改，但是文件名字被修改了，直接下载到电脑即可读取。
5、【/private /var/root/Media/EBooks】
熊猫看书存放目录
6、【/Library/Ringtones】
系统自带的来电铃声存放目录（用iTunes将文件转换为ACC文件，把后缀名改成.m4r,用iPhone_PC_Suite传到/Library /Ringtones即可）
7、【/System/Library/Audio/UISounds】
短信记其它系统默认效果铃声（m4r铃声文件改扩展名为.caf）短信铃声文件名为sms-received开头的caf文件
8、【/private/var/ mobile /Library/AddressBook】
系统电话本的存放目录。
9、【/private /var/ mobile/Media /iphone Recorder】
iphone Recorder录音软件文件存放目录
10、【/Applications/Preferences.app/zh_CN.lproj】
软件Preferences.app的中文汉化文件存放目录
11、【/Library/Wallpaper】
系统墙纸的存放目录
12、【/System/Library/Audio/UISounds】
系统声音文件的存放目录
13、【/private/var/root/Media/PXL】
ibrickr上传安装程序建立的一个数据库，估计和windows的uninstall记录差不多。
14、【/bin】
和linux系统差不多，是系统执行指令的存放目录。
15、【/private/var/ mobile /Library/SMS】
系统短信的存放目录
16、【/private/var/run】
系统进程运行的临时目录？（查看这里可以看到系统启动的所有进程）
17、【/private/var/logs/CrashReporter】
系统错误记录报

18.这个电池图标存放
用winterboard的，在自用的主题目录下，/var/stash/Themes.xxxxx/自用主题目录/Bundles /com.apple.springboard/目录内上传BatteryBG_1-17.png图片即可，如无 com.apple.springboard目录，请自建。（Themes.xxxxx每个人都是不一样的，故用xxxxx表示）
不用的也可以直接替换/System/Library/CoreServices/SpringBoard.app
图标替换路径
WB相关主题
直接放在Library/Themes里面
注意修改权限

充电图标：
System/Library/CoreServices/SpringBoard.app/BatteryBG_1.png 一直到 BatteryBG_17.png ，Batteryfill.png 18个图标为充电图标

手机信号图标：
SystemLibraryCoreServicesSpringBoard.app下Default_0_Bars.png一直到 Default_5_Bars.png 和FSO_0_Bars.png--FSO_5_Bars.png 10个图标为信号图标

Wifi信号图标:
SystemLibraryCoreServicesSpringBoard.appDefault_0_AirPort.png--- Default_3_AirPort.png和FSO_0_AirPort.png---FSO_3_AirPort.png 8个图标为wifi信号图标

Edge信号图标:
SystemLibraryCoreServicesSpringBoard.app Default_EDGE_ON.png和FSO_EDGE_ON.png 2图标为Edge信号图标
日期美化图标：
SystemLibraryCoreServicesSpringBoard.app|FSO_LockIcon.png
待机播放器图标：
SystemLibraryCoreServicesSpringBoard.app|nexttrack.png , pause.png , play.png, prevtrack.png 4个图标为待机播放器图标

IPOD播放信号
SystemLibraryCoreServicesSpringBoard.appFSO_Play.png ,Default_Play.png
闹钟信号
SystemLibraryCoreServicesSpringBoard.appDefault_AlarmClock.png ,FSO_AlarmClock.png
震动图标
SystemLibraryCoreServicesSpringBoard.appsilent.png ,hud.png ,ring.png
滑块图标：
SystemLibraryPrivateFrameworksTelephonyUI.framework 目录下
Bottombarknobgray.png（待机解锁滑块图标）
bottombarknobgreen.png（待机状态下移动滑动来接听滑块图标)
Bottombarknobred.png(关机滑块图标）
待机时间字体：
/System/Library/Fonts/Cache/LockClock.ttf
待机时间背景：
system/library/Frameworks/UIKit.framework/Other.artwork
滑块文字变为闪光字:
SystemLibraryPrivateFrameworksTelephonyUI.framework/bottombarlocktextmask.png
解锁滑条路径:
SystemLibraryPrivateFrameworksTelephonyUI.framework/ opbarbkgnd.png ,bottombarbkgndlock.png
移动：改彩色的文件名为：Default_CARRIER_CHINAMOBILE.png
改黑白的文件名为：FSO_CARRIER_CHINAMOBILE.png
联通：改彩色的文件名为：Default_CARRIER_CHINAUNICOM.png
改黑白的文件名为：FSO_CARRIER_CHINAUNICOM.png
滑块文字路径
/System/Library/CoreServices/SpringBoard.app/zh_CN.lproj

1. /private/var/mobile 　新刷完的机器，要在这个文件夹下建一个Documents的目录。
2. /private/var/mobile/Applications 　通过AppStore和iTunes安装的程序都在里面。
3. /private/var/stash 　这个文件夹下的Applications目录里面是所有通过Cydia和app安装的程序，Ringtones目录里是所有的手机铃音，自制铃音直接拷在里面即可，Themes目录里是所有Winterboard主题，可以手工修改。
4. /var/mobile/Media/ROMs/GBA 　gpsPhone模拟器存放rom的目录。
5. /var/mobile/Media/textReader 　textReader看书软件读取的电子书的存放路径。
6. /System/Library/Fonts/Cache（系统字体目录，要替换的字体放在该目录下，权限644不变）
7. /private/var/mobile/Media/Maps（离线地图目录，把地图文件夹放到该目录下，文件夹赋予777权限）
8. /private/var/mobile/Library/Downloads （ipa文件存放目录，用Installous安装）
9. /private/var/mobile/Library/Keyboard （系统拼音字库文件位置）
10. /var/stash/Themes.XXXXXX （winterboard主题文件存放路径）
11. /private/var/mobile/Media/DCIM/999APPLE （系统自带截屏文件存放路径）

一些小技巧：

　　iPhone锁屏后，如何拒接来电：双击Power键

　　如何用iPhone看股票
　　沪市是股票编码+.SS
　　深市是股票编码+.SZ
　　股票的代码加上后面的编码就可以了。
　　个股如：
　　600177.SH
　　000547.SZ

联系人数据在：//var/mobile/Library/AddressBook
短信息数据在：//var/mobile/Library/SMS

iPhone无法连接iTunes
　　删除位于/var/mobile/Media目录下的iTunes_Control文件夹

iPhone忘记开机密码及锁屏密码
删除位于/private/var/keychains/keychain-2.db
然后重启iphone

删除PC Suit守护进程方法：
　　1.删除usr/bin下的文件TQServer
　　2.删除var/root/Media下的ndDaemon目录
　　3.删除/System/Library/LaunchDaemons/net.riverdark.iphone.TQdaemon.plist

　　4.重启iPhone

http://www.devdiv.com/iOS_iPhone-iPhone_%E8%B7%AF%E5%BE%84%E5%A4%A7%E5%85%A8-thread-31613-1-2.html