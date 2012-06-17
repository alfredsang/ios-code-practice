Objective-C中单例模式的实现


单例模式在Cocoa和Cocoa Touch中非常常见。比如这两个，[UIApplication sharedApplication]和[NSApplication sharedApplication]，大家应该都见过。但是我们应该如何在代码中实现一个单例模式呢？

如果你对苹果的文档很熟悉的话，你一定知道，在Cocoa Foundamentals Guide中有一段实现单例模式的示例代码。大致如下：


/* Singleton.h */
#import &lt;Foundation/Foundation.h&gt;

@interface Singleton : NSObject
+ (Singleton *)instance;
@end

/* Singleton.m */
#import "Singleton.h"
static Singleton *instance = nil;

@implementation Singleton

+ (Singleton *)instance {
    if (!instance) {
        instance = [[super allocWithZone:NULL] init];
    }
    return instance;
}

+ (id)allocWithZone:(NSZone *)zone {
    return [self instance];
}

- (id)copyWithZone:(NSZone *)zone {
    return self;
}

- (id)init {
    if (instance) {
        return instance;
    }
    self = [super init];
    return self;
}

- (id)retain {
    return self;
}

- (oneway void)release {
    // Do nothing
}

- (id)autorelease {
    return self;
}

- (NSUInteger)retainCount {
    return NSUIntegerMax;
}

@end
这是一种很标准的Singleton实现，中规中矩。不过这种实现并不是线程安全的。所以各路大神都各显神威，给出了多种单例模式的实现。

Matt Gallagher在博客中放出了一个Macro，用来实现单例模式。虽然是一个宏定义的代码，但是具体实现还是很清楚的。代码如下：

//
//  SynthesizeSingleton.h
//  CocoaWithLove
//
//  Created by Matt Gallagher on 20/10/08.
//  Copyright 2009 Matt Gallagher. All rights reserved.
//
//  Permission is given to use this source code file without charge in any
//  project, commercial or otherwise, entirely at your risk, with the condition
//  that any redistribution (in part or whole) of source code must retain
//  this copyright and permission notice. Attribution in compiled projects is
//  appreciated but not required.
//

#define SYNTHESIZE_SINGLETON_FOR_CLASS(classname) \
 \
static classname *shared##classname = nil; \
 \
+ (classname *)shared##classname \
{ \
    @synchronized(self) \
    { \
        if (shared##classname == nil) \
        { \
            shared##classname = [[self alloc] init]; \
        } \
    } \
     \
    return shared##classname; \
} \
 \
+ (id)allocWithZone:(NSZone *)zone \
{ \
    @synchronized(self) \
    { \
        if (shared##classname == nil) \
        { \
            shared##classname = [super allocWithZone:zone]; \
            return shared##classname; \
        } \
    } \
     \
    return nil; \
} \
 \
- (id)copyWithZone:(NSZone *)zone \
{ \
    return self; \
} \
 \
- (id)retain \
{ \
    return self; \
} \
 \
- (NSUInteger)retainCount \
{ \
    return NSUIntegerMax; \
} \
 \
- (void)release \
{ \
} \
 \
- (id)autorelease \
{ \
    return self; \
}
然而，eschaton则觉得这些实现都太繁琐了，他给出的实现如下：

@interface SomeManager : NSObject
+ (id)sharedManager;
@end

/* 非线程安全的实现 */
@implementation SomeManager

+ (id)sharedManager {
    static id sharedManager = nil;

    if (sharedManager == nil) {
        sharedManager = [[self alloc] init];
    }

    return sharedManager;
}
@end

/* 线程安全的实现 */
@implementation SomeManager

static id sharedManager = nil;

+ (void)initialize {
    if (self == [SomeManager class]) {
        sharedManager = [[self alloc] init];
    }
}

+ (id)sharedManager {
    return sharedManager;
}
@end
关于为什么上述代码就能实现单例模式，以及关于线程安全问题的考量，请参考他的博客。

最后介绍一个比较现代的单例模式实现。为什么说现代呢？因为这种实现利用了GCD（Grand Central Dispatch）和ARC（Automatic Reference Counting）。核心代码如下：


+ (id)sharedInstance
{
  static dispatch_once_t pred = 0;
  __strong static id _sharedObject = nil;
  dispatch_once(&pred, ^{
    _sharedObject = [[self alloc] init]; // or some other init method
  });
  return _sharedObject;
}
作者还写了一个宏（gist）来方便使用，大家可以阅读作者的博文A note on Objective-C singletons了解详情。

大多数情况下，Apple官方文档里的单例模式的示例代码实现已经够用了。虽然它最繁琐，但是也是本文介绍的几种单例模式中最容易理解的一个。至于其他的实现就留给读者们根据需要选择和应用了。





http://iphone.galloway.me.uk/iphone-sdktutorials/singleton-classes/

One of my most used design patterns when developing for iOS is the singleton pattern. It’s an extremely powerful way to share data between different parts of code without having to pass the data around manually. More about the singleton pattern and other patterns can be found in this excellent book:

Singleton classes are an important concept to understand because they exhibit an extremely useful design pattern. This idea is used throughout the iPhone SDK, for example, UIApplication has a method called sharedApplication which when called from anywhere will return the UIApplication instance which relates to the currently running application.

可以用如下代码实现一个单例类：

MyManager.h
 
#import <foundation/Foundation.h>
 
@interface MyManager : NSObject {
    NSString *someProperty;
}
 
@property (nonatomic, retain) NSString *someProperty;
 
+ (id)sharedManager;
 
@end


MyManager.m

#import "MyManager.h"
 
static MyManager *sharedMyManager = nil;
 
@implementation MyManager
 
@synthesize someProperty;
 
#pragma mark Singleton Methods
 
+ (id)sharedManager {
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{
        if (sharedMyManager == nil) {
            sharedMyManager = [[self alloc] init];
        }
    });
    return sharedMyManager;
}
 
- (id)init {
    if (self = [super init]) {
        someProperty = [[NSString alloc] initWithString:@"Default Property Value"];
    }
    return self;
}
 
- (void)dealloc {
    // Should never be called, but just here for clarity really.
}
 
@end

What this does is it defines a static variable (but only global to this translation unit) called sharedMyManager which is then initialised once and only once in sharedManager. The way we ensure that it’s only created once is by using the dispatch_once method from Grand Central Dispatch (GCD). This is thread safe and handled entirely by the OS for you so that you don’t have to worry about it at all.


However, if you would rather not use GCD then you should use the following code for sharedManager:

然而，如果你不稀罕用GCD,你可以使用如下代码来实现：
 
+ (id)sharedManager {
    @synchronized(self) {
        if (sharedMyManager == nil)
            sharedMyManager = [[self alloc] init];
    }
    return sharedMyManager;
}

If you are not using Automatic Reference Counting (ARC), then you should use the following code:

如果你不用Automatic Reference Counting (ARC)，你可以用如下代码实现：

MyManager.m

#import "MyManager.h"
 
static MyManager *sharedMyManager = nil;
 
@implementation MyManager
 
@synthesize someProperty;
 
#pragma mark Singleton Methods
+ (id)sharedManager {
    @synchronized(self) {
        if(sharedMyManager == nil)
            sharedMyManager = [[super allocWithZone:NULL] init];
    }
    return sharedMyManager;
}
+ (id)allocWithZone:(NSZone *)zone {
    return [[self sharedManager] retain];
}
- (id)copyWithZone:(NSZone *)zone {
    return self;
}
- (id)retain {
    return self;
}
- (unsigned)retainCount {
    return UINT_MAX; //denotes an object that cannot be released
}
- (oneway void)release {
    // never release
}
- (id)autorelease {
    return self;
}
- (id)init {
    if (self = [super init]) {
        someProperty = [[NSString alloc] initWithString:@"Default Property Value"];
    }
    return self;
}
- (void)dealloc {
    // Should never be called, but just here for clarity really.
    [someProperty release];
    [super dealloc];
}
 
@end

调用单例可以用如下函数来实现：
Then you can reference the singleton from anywhere by calling the following function:

	MyManager *sharedManager = [MyManager sharedManager];
	
I’ve used this extensively throughout my code for things such as creating a singleton to handle CoreLocation or CoreData functions.

EDIT: Added property to MyManager.
EDIT: Updated as per Apple’s guidelines to pass static analysis.
EDIT: Updated to support ARC.
EDIT: Switched to use the more common GCD approach.


／／关于现场安全的思考
Singletons in Cocoa/Objective-C

I’ll preface this post with the standard advice: Don’t create singletons if you don’t absolutely have to. In general, if you’re creating a global “manager” object of some sort, you’re doing something wrong.


That said, there’s still occasionally a reason to have such a global singleton, such as a “default something.” The sample code in the Cocoa Fundamentals Guide goes to a lot more trouble than it needs to in order to ensure that a class is a singleton.

This is almost never what you want.

First off, you probably want your class to be testable in a variety of configurations. In your unit tests, instead of getting your shared singleton instance in your -setUp method and “resetting” its state in -tearDown, you’d be better off just instantiating a new instance in -setUp and releasing it in -tearDown.

Also, the example in the Cocoa Fundamentals Guide does a lot of work that it simply doesn’t need to. This is all you really need to do to create a singleton in Cocoa:

@interface SomeManager : NSObject
+ (id)sharedManager;
@end

@implementation SomeManager

+ (id)sharedManager {
    static id sharedManager = nil;

    if (sharedManager == nil) {
        sharedManager = [[self alloc] init];
    }

    return sharedManager;
}

@end

That’s it! The astute reader will notice, of course, that this isn’t thread-safe. I got rid of the @synchronized (self) because it won’t do the right thing; depending on what actual class is sent +sharedManager, the value of self will be different!

For the sake of argument, though, let’s say that you do want a singleton with which you can interact from multiple threads at once. One way to do this would be to create your singleton instance in +initialize since it will always be run, on a single thread, before any other methods in your class:

@implementation SomeManager

static id sharedManager = nil;

+ (void)initialize {
    if (self == [SomeManager class]) {
        sharedManager = [[self alloc] init];
    }
}

+ (id)sharedManager {
    return sharedManager;
}

@end
By doing this, you avoid the performance bottleneck of @synchronized taking a recursive lock every time +sharedManager is invoked.

If you want to get fancier, and it’s OK to temporarily have more than one instance of your singleton created, you could even use objc_atomicCompareAndSwapGlobalBarrier to assign the value to return from +sharedManager, though this is probably also more work than it’s worth; after all, +initialize will only be invoked once for your class. (Though it can be re-invoked as a side-effect of initializing subclasses, hence the if (self == [SomeManager class]) { } idiom.)

In all of the above cases, you’ve done a whole lot less work than the example in the Cocoa Fundamentals Guide, and your code is a lot more likely to be correct as a result.

