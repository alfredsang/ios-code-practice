#!/bin/bash

for((i=1;i<=6;i++));
do 
	cat y.data.txt | awk '{
		gsub(/[[:blank:]]*/,"",$i);print "/" $i "/";
	}'> $i.data.text.copy
done


桑世龙
  

电话：  13391739279 || 13943023987
E-mail ： shiren1118@126.com 
工作经验3年+，目前住在 北京  霍营
教 育 背 景
    长春工业大学   信息管理与信息系统专业    本科    CET-4
自我简介：
目前供职于财新传媒，ios高级开发工程师，主要做iOS客户端的设计与研发工作，1年obj-c开发经验＋2年javaEE电信行业经验，非常了解企业应用，数据仓库理论和iOS产品开发，可以很好的把握设计与实现的平衡。曾开发出广电行业第一套数据分析与科学决策系统，获广电总局2010科技创新奖1等奖。
工作经历：  
毕业前在深圳实习做webgis，毕业后2年在神州数码思特奇做电信BI，2011年4月末开始做移动开发，在北京安卓时代信息技术有限公司，从2012年2月至今，供职财新传媒
个人经历：  
	2008年参与翻译满江红开源组织《Grails中文文档(2008年)》
	2009年初做半年webGis
	2009年—2011年，2年电信，神州数码思特奇，主要做ETL需求开发，报表研发与设计方面工作，曾带队开发出广电行业第一套数据分析与科学决策系统，获广电总局2010科技创新奖1等奖
	写过perletl.pm，针对db2的ETL调度
	写有《ETL小组技术文档》和《ETL调度原理浅析》
	封装过flexigrid，以子查询和SQL报表思想为主，形成并开发了一套完整的可视化报表生成系统。
	自动化部署想法演进过程
	1)最开始每台机器登录，拷贝，编写shell脚本，烦。
	2)采用ssh和scp，去掉sshkey，以一主机为主，向其他机器scp安装文件，ssh远程执行命令完成启动安装，问题是去掉sshkey密码是一个苦力活，需要改进。
	3)采用apache Ant，利用sshexec和scp这2个task，密码可以动态传入，也可以写到配置文件中，日志规范，部署简洁，问题是需要依赖java和ant。
	4)最后用c封装了ssh2，实现配置化，不依赖java即可完成安装部署。
	2010年11月，开始买mbp做iOS开发
	2011年初，用Cappuccino开发一个markdown编辑器
	4月－8月，形成100页文档《凌云志.doc》，给项目组做了一次linux培训
	8月20日－8月21日，参加IBM AIX培训，学习了AN10和AN12课程
	2012年4月，完成appledoc，markdown和文档输出转换，目前重构中
	目前是泰然翻译小组成员，负责翻译和review与cocos2D相关的文档和书籍。 
专业技能&&英语技能
	•熟悉Balsamiq Mockups做界面原形设计
	•熟悉Cocoa Touch，Xcode开发环境，MVC开发模式；
	•熟悉推送通知
	•熟悉友盟统计分析，反馈等
	•熟悉各种分享，比如各种微博，人人，微信等
	•熟悉各种自定义UI及常用开源控件，如EGORefreshTableHeaderView等
	•熟悉FMDB，sqlite，SQL基础还相当不错
	•熟悉gh-unit
	•熟悉asi，http协议，json解析
	•扩展了iscroll.js，增加生命周期处理
	•熟悉ajax，自己开发了一个No320.ajax.js库
	•熟悉javascript（尤其是jQuery），写过很多js组件或jQuery插件，对cicyUI底层oo部分的实现比较熟悉，封装过flexigrid
	•熟悉sencha touch2和jquery mobile
	•熟悉phonegap插件开发,从0.9.6开始用的。熟悉1.6.1之后加的requirejs相关实现
	•熟悉缓存处理和instrument调优
	•熟悉appledoc和markdown
	•熟悉Cappuccino 和 Objective-J, 用Cappuccino开发一个markdown编辑器
	•熟悉javaEE开发，熟练使用Struts1，spring，hibernate，ibatis，nutz
	•熟悉java里的model1和model2
	•熟悉java设计模式，封装过很多组件，尤其喜欢用template模式。
	•熟悉java server部署应用，如tomcat，weblogic，jboss等
	•熟悉aix和mac，独立部署weblogic 8没问题
	•熟悉hsqldb，mysql和db2
	•熟练使用DB2 9.5，和IBM工程师接触很多，有SQL优化经验
	•熟悉ant，写过ant扩展
	•熟悉unix命令，perl和shell，写过perl模块perletl.pm, 翻译过一些文档，比如perl的DBI：DBD文档，给公司做过linux培训，scp和ssh等非常熟悉，曾以ftp方式部署过8台google的服务器
	•写过makefile，解析markdown并生成html和pdf
	•熟悉ETL流程，了解NCR的ETL Automation，作业调度管理软件。还有一个公司内部的proc写的oracle版的作业调度管理软件。写过《ETL调度原理浅析及最佳实践》
	•了解BO水晶报表，用的不太多，大多数时间都是用我们自己写的报表，主要包括3种：普通的SQL报表，无限级钻取型报表和多维分析报表。对其实现原理了如指掌。
	•熟练使用toad 4.0.1.921，perl 5.10和ErWin7.5。对perl的DBI相关技术非常熟悉（自己翻译过这部分文档，未公开，收在《ETL小组技术文档》里）公司用的perl模板是我自己封装的，相当好用，性能也非常不错。
	•熟练使用各种文本编辑器，Notepad++，UltraEdit，Vim等，快捷键，宏，列编辑，Notepad++ v5.5以上版本尤工。
	•熟练使用VSS进行文档的版本管理，用svn做过大型项目，自学git
	•具有良好的英文文档阅读能力,是满江红开源组织《Grails中文文档》的译者之一
	•喜欢写文档，熟悉office等办公软件
项 目 经 验
 
财新网iphone客户端 v3.1-v3.2
	2012年2月份至今，已上线，主要工作任务分配，性能优化，缓存处理。需求管理，bug跟踪，svn代码控制，发布等。

广东移动iPad互动演示系统
	2011年8月-2012年2月，
	会议演示系统，分主讲和听讲二种角色，演示同步，圈画，小纸条，笔记（手写板），标注，QA，提问，投票，ppt缩略图，ppt备份下载，会议进度，时间控制，ppt提示说明，听讲界面里有一个和QQ浏览器类似的资源管理器。
	后台以类似于comet的一直长链接实现polling机制。值得说明的是这是混合型项目，比如左侧的会议列表是html实现的，而大多是OC实现，所以改写了phonegap，让它支持局部webview方式，下载用ASI，
	loading采用DSActivityView，xml解析，fmdb存储，使用Core Graphics画图，采用贝赛尔曲线矫正，不是很完美。进度条用MBProgressHUD，
	用Objective-Zip压缩解压。引入闭包，无论alertview还是asi，避免实现deletage，代码精简很多。

联通3G报刊亭
2011年4月到8月，完成《联通3G报刊亭》iphone版本的手机杂志 开发，对iScroll进行封装，增加了生命周期等，原iscroll的版本是3.7.1,我给它打了一个patch，完美支持杂志类阅读功能，已提交到github上。这是一个纯web应用，主要是html5和css3,除了iscroll和jQuery外未使用其他框架。

OA系统中间件的phonegap插件开发
2011年4月到8月，针对公司OA系统中间件，开发iOS平台插件,下载，文件管理，上传，附件阅读预览，邮件，短消息，直接拨打电话，日期控件，自定义主题等。该项目主要是开发phonegap插件，js和oc之间互相调用
下载用ASI，loading采用DSActivityView，采用adhoc方式打包测试

广东联通做一体化网格营销系统
2010年10月到2011年4月，主要是报表开发，SQL报表和下钻报表（struts2＋jquery）， 界面导入，任务值导入，组件化 。另外，项目里的前端相关文档基本是我一手建立的，技术手册，设计文档，规划文档等，有200页以上，从实现原理、示例到常见错误等都有较好的阐述。 

山东青岛经分
2010年10月，时间1周，部署智能报表 ,weblogic 8.1平台，部署在aix系统上，一个人独立部署完成。

内蒙广电数据分析与科学决策系统  
2010年4月-2010年10月 前端：决策平台和报表生成器实现，后台：指标，阀值预警，收视率分析，决策流程，报表配置和ftp脚本，是该项目的第一完成人，兼设计与实现，首次带队。应该是广电总局科技创新奖1等，而且该项目是广电行业第一个经分落地项目，3月20日会在北京有发布会。

河北省移动经分系统(bass)之VGOP
项目描述：是河北省移动管理层人员使用的类决策支持系统(DSS)，是在数据仓库上做的应用，遵守中国移动省级NG1-BASS技术规范总册v1.0，主要模块包括精细化营销，数据业务监控，业务优化，业务稽核，sp欺诈监控，预警与分析等。
    架    构：liferay+SOA+数据仓库（ETL）+ 4A安全认证
    运行环境：weblogic10.3 + DB2 9.5 
    时    间：2009-04——2010-04
    项目职位：ETL工程师
    项目职责：独立开发精细化营销脚本、稽核任务下载脚本和手机电视脚本，参与开发数据业务监控手动部分脚本，套餐监控脚本和客户统一视图脚本.表的数据量特别大，用户多于3600万，处理起来非常爽。

My Link:
Perl封装db2脚本库-开源项目  http://code.google.com/p/perletl/
满江红开源组织的《Grails中文手册》-翻译  http://wiki.redsaga.com/confluence/pages/viewpage.action?pageId=2458
Cicy的面向对象基本教程  http://cicyui.com/bbs/viewthread.php?tid=247&extra=page%3D1《内蒙广电数据分析与科学系统》，获得国家广电总局"2010年度科技创新奖A类高新技术研究与开发一等奖" http://www.96066.com/zelin/News_View.asp?NewsID=139
iscroll3扩展https://github.com/shiren1118/iscroll3
泰然翻译构建工具https://github.com/shiren1118/ityran_article_build_tools
扩展ant的https://github.com/shiren1118/sant
未公开的文档：
ETL调度原理浅析.docx
ETL小组技术文档.docx
