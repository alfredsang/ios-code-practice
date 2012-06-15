//
//  CXFeedbackViewControllerViewController.h
//  CaiXin
//
//  Created by alfred sang on 12-6-14.
//  Copyright (c) 2012年 iTotemStudio. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "CXTextPHView.h"
#import "ITTLoadingView.h"

@interface CXFeedbackViewControllerViewController : UIViewController
<UITextViewDelegate,UITextFieldDelegate,DataRequestDelegate> 
{
	UILabel* m_wordCountLabel;
    NSString* m_nsLastText;
    ITTLoadingView *loadingView;
    
}

@property(nonatomic,retain,readonly) IBOutlet UITextField *m_labelView;
@property(nonatomic,retain,readonly) IBOutlet CXTextPHView *m_textView;

@property(nonatomic,retain,readonly) IBOutlet UIButton *l_buttonView;
@property(nonatomic,retain,readonly) IBOutlet UIButton *r_buttonView;


//根据上级页面标题设置返回按钮的标题
- (IBAction)tapOnBackBtn:(id)sender;
- (IBAction)tapOnCommentBtn:(id)sender;
- (IBAction)backToRootView:(id)sender;


@end
