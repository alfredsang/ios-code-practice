
http://blog.jerodsanto.net/2009/06/sniff-your-iphones-network-traffic/


是不是曾经想查看一下自己iphone的网络流量？你所需要的就是无线局域网和跨平台的代理软件:Paros.当然我们也可以使用其它的代理服务器软件，但是Paros基于网页安全评估，hook了HTTP请求/响应流程。

1下载并且安装Paros

    下载地址http://www.parosproxy.org/download.shtml，安装帮助http://www.parosproxy.org/install.shtml。需要 Java Runtime Environment 1.4 or above

2 配置Paros

    安装完后，打开Paros并找到配置选项（on OS X   Tools -> Options）。Paros的缺省配置只监听localhost，但是我们需要通过Paros查看iphone的流量。因此我们需要设置Paros去监听处于同一无线局域网的iphone.


图片1
 
局域网IP地址段是我们唯一需要填写的设置。Paros会监听所有的8080端口。下面我们需要配置Iphone使其发送自己的流量到我们的代理。
 
 
 
3 Iphone的配置
打开Iphone的设置选项，选择WiFi网络项。点击下图所示的按钮打开你所连接的无线网络配置项进行编辑


图片1
滑动到设置项的底部，选择Http Proxy为"Manual",并填写Proxy代理服务器的IP地址和端口。这样设置后，iphone所有进出流量都会映射到Paros代理软件。

图片1
4 Paros软件的使用
Paros的主要使用项是"Request/Response/Trap".当Iphone经过Paros访问互联网时，Paros将记录下iphone发起的请求和服务器的应答。
"Trap"陷阱功能允许你停止请求和应答，以及人为修改这些信息。这个功能十分的酷，它也是Paros被用来进行安全监听的原因。但是目前我们的目的主要是监听Iphone的流量，就不具体解释如何修改，伪装等功能啦。
下面我们用iphone访问一下"App Store"，下面的截图显示了本次访问的请求和应答的记录。从图中我们可以看到一共发起了4次请求（3个GETS类型和1个POST类型）

图片1
当高亮选择第一条GET类型的请求时，可以看到如下图所示的HTTP请求报头的细节信息。
值得一提的是Iphone发送了一条定制报头(X-Apple-Connection-Type)告诉服务器它当前是通过WiFi进行的连接。

图片1
在Paros的Response中我们可以看到服务器返回的报头和数据，以xml plist的方式陈现。

嗅探这些流量记录能帮你很好的了解具体某个iphone app在幕后到底做了些什么。同时它也能够帮助进行iphone网络客户端程序开发时的调试。到此为止，希望Paros能够很好的帮助到你。



图片1





\w$ pwd
/Users/shiren1118/Downloads/psd/paros-1
\w$ ls
db/		filter/		libjdic.so*	libtray.so*	log/		paros.jar*	paros_logo.ico*	plugin/		session/	startserver.sh*	xml/
\w$ ./startserver.sh
file:/Users/shiren1118/Downloads/psd/paros-1/paros.jar
file:/Users/shiren1118/Downloads/psd/paros-1/paros.jar


