第一种方法：

最近下载的IPA里面的图片都不能打开，查了一下原因是因为xCode使用了pngcrush来对图片进行优化压缩处理，那如何对图片进行反编译呢?

方法如下:

1.取得IPA将.ipa改为.zip, 解压zip从里面把图片拷贝出来, 存储到一个指定路径

2.打开命令行，进入到指定路径，输入如下命令:

/Developer/Platforms/iPhoneOS.platform/Developer/usr/bin/pngcrush \ -q -revert-iphone-optimizations -d  指定的路径下的文件名/*.png

3.之后反编译的图片就存储在当前新生成的名为_d的文件夹中了.

--------------------------------------

第二种方法：

1、将ipa文件后缀改为zip，然后解压缩。
2、新建一个文件夹，将解压后的包里的png文件拷贝到新建文件夹里。
3、到http://www.axelbrz.com.ar/?mod=iphone-png-images-normalizer下载ipin.zip文件并解压到第二步新建的文件夹里。

4、命令行切换路径到第二步创建的文件夹并执行python ipin.py。

