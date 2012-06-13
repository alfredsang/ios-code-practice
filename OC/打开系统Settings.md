打开系统Settings（iOS5）：
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"prefs:root=LOCATION_SERVICES"]];  
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"prefs:root=TWITTER"]];  
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"prefs:root=General&path=Bluetooth"]];  
[[UIApplication sharedApplication] openURL:[NSURL URLWithString:@"prefs:root=Apps&path=Your+App+Display+Name"]];

NSURL*url=[NSURL URLWithString:@"prefs:root=WIFI"];

[[UIApplication sharedApplication] openURL:url];

-------------------------------------

<key>UIRequiresPersistentWiFi</key>

<true/>

<key>SBUsesNetwork</key>

<string>3</string>

