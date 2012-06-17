
关于可变参数说明

- (void) logwithLevelformat: (NSString *) format, ...; {
        va_list ap;
        
        NSString *print;
        
        va_start(ap, format);
        
        print = [[NSString alloc] initWithFormat:format arguments: ap];
        
        va_end(ap);
     
        
        [print release];
        [file  release];
 
}













获取项目的名称及版本号

NSString *appName = [[[NSBundle mainBundle] infoDictionary] objectForKey:(NSString *)kCFBundleExecutableKey];

NSString *appVersion = [[[NSBundle mainBundle] infoDictionary] objectForKey:(NSString *)kCFBundleVersionKey];
 
还有其它很多信息可由infoDictionary获得,以下是官方文档里的说明：
information Property List Keys
Standard keys found in a bundle’s information property list file.

const CFStringRef kCFBundleInfoDictionaryVersionKey;
const CFStringRef kCFBundleExecutableKey;
const CFStringRef kCFBundleIdentifierKey;
const CFStringRef kCFBundleVersionKey;
const CFStringRef kCFBundleDevelopmentRegionKey;
const CFStringRef kCFBundleNameKey;
const CFStringRef kCFBundleLocalizationsKey;


如何发送一个请求

方式一
模拟表单提交


方式2：
ajax







