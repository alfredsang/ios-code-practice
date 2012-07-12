# Caching and Purgeable Memory

Contents
	Caching and Purgeable Memory 
	Overview of Caching 
		-Why Use Caching? 
		-Problems Caching Can Cause 
		-Solutions 
	Using Purgeable Memory 
		Advantages of Using Purgeable Memory
		How to Implement Purgeable Memory 
		Purgeable Memory and NSCache 
		Some Warnings About Purgeable Memory 
	When to Use Purgeable Memory 


Caching and purgeable memory can be vital assets to developers who are dealing with large objects that require significant memory or computation time, or developers whose code is getting bogged down as the computer writes data to disk because the RAM is full.

This document discusses the benefits of caching, and how to avoid some of the problems that can arise from implementing caches. It also details the advantages of implementing purgeable memory into a caching system, and how to successfully implement this beneficial technology.

## Overview of Caching 缓存概述

A cache is a collection of objects or data that can greatly increase the performance of applications.

### Why Use Caching 为什么要使用缓存? 
Developers use caches to store frequently accessed objects with transient data that can be expensive to compute. Reusing these objects can provide performance benefits, because their values do not have to be recalculated. However, the objects are not critical to the application and can be discarded if memory is tight. If discarded, their values will have to be recomputed again when needed.

### Problems Caching Can Cause 缓存可能引发的问题
Although caching can provide enormous benefits in terms of performance, there are also some possible drawbacks that caching presents. Most importantly, caching can use very large amounts of memory. When caching many large data objects, it is possible to cache so many objects that there is no RAM left for other applications, and the computer will grind to a halt as it writes all of this data to disk in order to free up RAM.

### Solutions 解决方案
Cocoa provides an NSCache object as a convenient storage container for items you want to cache, while at the same time addressing the memory management issues discussed above. The NSCache class is very similar to the NSDictionary class, in that they both hold key-value pairs. However, an NSCache object is a “reactive cache.” That is, when memory is available, it aggressively caches any data it is given. Yet, when memory is low, it will automatically discard some of its elements in order to free up memory for other applications. Later, if these discarded items are needed, their values will have to be recalculated.

NSCache provides two other useful "limit" features: limiting the number of cached elements and limiting the total cost of all elements in the cache. To limit the number of elements that the cache is allowed to have, call the method setCountLimit:. For example, if you try to add 11 items to a cache whose countLimit is set to 10, the cache could automatically discard one of the elements.

When adding items to a cache, you can specify a cost value to be associated with each key-value pair. Call the setTotalCostLimit: method to set the maximum value for the sum of all the cached objects’ costs. Thus, when an object is added that pushes the totalCost above the totalCostLimit, the cache could automatically evict some of its objects in order to get back below the threshold. This eviction process is not guaranteed, so trying to manipulate the cost values to achieve specific behavior could be detrimental to the performance of the cache. Pass in 0 for the cost if you have nothing useful, or use the setObject:forKey: method, which does not require a cost to be passed in.

	Note: The count limit and the total-cost limit are not strictly enforced. That is, when the cache goes over one of its limits, some of its objects might get evicted immediately, later, or never, all depending on the implementation details of the cache.
	
## Using Purgeable Memory 使用可回收的内存

The Cocoa framework also provides the NSPurgeableData class to help ensure that your applications do not use up too much memory. The NSPurgeableData class adopts the NSDiscardableContent protocol, which any class can implement to allow memory to be discarded when clients of the class's instances are finished accessing those objects. You should implement NSDiscardableContent when creating objects that have disposable subcomponents. In addition, the NSPurgeableData class does not have to be used in conjunction with NSCache; you may use it independently to get purging behavior.

### Advantages of Using Purgeable Memory 使用可回收的内存的优点
By using purgeable memory, you allow the system to quickly recover memory if it needs to, thereby increasing performance. Memory that is marked as purgeable is not paged to disk when it is reclaimed by the virtual memory system because paging is a time-consuming process. Instead, the data is discarded, and if needed later, it will have to be recomputed.

A caveat when using purgeable memory is that the block of memory must be locked before being accessed. This locking mechanism is necessary to ensure that no auto-removal policies try to dispose of the data while you are accessing it. Similarly, the locking mechanism will ensure that the virtual memory system has not already discarded the data. The NSPurgeableData class implements a very simple locking mechanism to ensure that the data is safe while it is being read.

### How to Implement Purgeable Memory 如何实现内存可回收
The NSPurgeableData class is very simple to use, because the class simply implements the NSDiscardableContent protocol. Then notion of a “counter” variable is central to the life cycle of NSDiscardableContent objects. When the memory being used by this object is being read, or is still needed, its counter variable will be greater than or equal to 1. When it is not being used, and can be discarded, the counter variable is equal to 0.

When the counter is equal to 0, the block of memory may be discarded if memory is tight. To discard the content, call discardContentIfPossible on the object, which frees the associated memory if the counter variable equals 0.

By default, when an NSPurgeableData object is initialized, it is created with the counter variable equal to 1 and can safely be accessed. To access purgeable memory, simply call the beginContentAccess method. This method will first check to make sure the object’s data has not been discarded. If the data is still there, it will increment the counter variable in order to protect the memory while it is being read, and return YES. If the data has been discarded, this method will return NO. When you are done accessing the data, call endContentAccess, which decrements the counter and allows the memory to be discarded if the system desires to do so. You must keep track of the counter variable’s state and access memory only if the beginContentAccess method returns YES.

The system or client objects call the discardContentIfPossible method to discard the purgeable data if the system’s available memory is running low. This method will only discard the data if its counter variable is 0, and otherwise does nothing. Lastly, the isContentDiscarded method returns YES if the memory has been discarded.

Below is an example of a life cycle for an NSPurgeableData object:

	NSPurgeableData * data = [[NSPurgeableData alloc] init];
	[data endContentAccess]; //Don't necessarily need data right now, so mark as discardable.
	//Maybe put data into a cache if you anticipate you will need it later.
 
	...
 
	if([data beginContentAccess]) { //YES if data has not been discarded and counter variable has been incremented
	     ...Some operation on the data...
	     [data endContentAccess] //done with the data, so mark as discardable
	} else {
	     //data has been discarded, so recreate data and complete operation
	     data = ...
	     [data endContentAccess]; //done with data
	}
 
	//data is able to be discarded at this point if memory is tight
	
### Purgeable Memory and NSCache 可回收内存和NSCache
When objects that implement the NSDiscardableContent protocol are put in NSCache objects, the cache keeps a strong reference to the object. However, if an object’s content has been discarded and the cache’s evictsObjectsWithDiscardedContent value is set to YES, the object is automatically removed from the cache and is not found by a lookup call.

### Some Warnings About Purgeable Memory 关于可回收内存的一些警告
A caveat to using purgeable memory is that only large objects or chunks of memory can use it directly. The purgeable memory API acts on multi page virtual memory objects, which makes it hard to mark a single small cache element as purgeable. The caching API will do the required bookkeeping to allow small cache elements to use purgeable memory. Likewise, there will be cases where it is awkward to allocate the memory for cache elements through the API directly, such as when a convenience method is used to allocate an object or when an object is allocated in a different layer than the layer doing the caching. In such cases, it is not possible to use purgeable memory.

## When to Use Purgeable Memory 使用可回收内存场景

It makes sense to use purgeable memory when the expected cost of purging is less than the expected cost of paging — when the cost of paging is greater than the cost of recomputing the particular data value times the probability that that data item is reused. Many caches fall into this category because their speculative nature makes it likely that the items will not be used again. Similarly, cache items that are easily recomputed are prime candidates for purgeable memory, because the application will not take a huge performance hit if their values have to be recalculated.
 

© 2009 Apple Inc. All Rights Reserved. (Last updated: 2009-08-13)
http://developer.apple.com/library/mac/technotes/CachingPurgeableMemory/CachingPurgeableMemory.pdf

Purgeable Memory 使用可回收的内存


======
purgeable  [医]可清除的，可净化的，可泻下的

