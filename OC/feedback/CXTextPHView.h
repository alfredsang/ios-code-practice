//
//  CXTextView.h
//  CaiXin
//
//  Created by alfred sang on 12-6-14.
//  Copyright (c) 2012年 iTotemStudio. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface CXTextPHView : UITextView
/**
 The string that is displayed when there is no other text in the text view.
 
 The default value is `nil`.
 */
@property (nonatomic, retain) NSString *placeholder;

/**
 The color of the placeholder.
 
 The default is `[UIColor lightGrayColor]`.
 */
@property (nonatomic, retain) UIColor *placeholderColor;

@end
