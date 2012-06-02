## 关于NSUserDefault


### 常用宏定义
	#define USER_DEFAULT [NSUserDefaults standardUserDefaults]

### 什么时候会重置：
1）不同版本安装
2）删除之后再安装

### 流程定义说明



### 被搞死了，setBool，取的时候却用objectFor

#### 1) define

	[USER_DEFAULT setBool:NO forKey:@"isPingfen"];

#### 2) use
	if (![USER_DEFAULT boolForKey:@"marked"])
       
	}


	if (![USER_DEFAULT objectForKey:@"marked"])
	{
		
	}


