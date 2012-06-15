//
//  CXFeedbackViewControllerViewController.m
//  CaiXin
//
//  Created by alfred sang on 12-6-14.
//  Copyright (c) 2012年 iTotemStudio. All rights reserved.
//

#import "CXFeedbackViewControllerViewController.h"
#import "No320TAlertView.h"


#define TABLECELLLEFTMARGIN 10
#define TABLECELLRIGHTMARGIN 5
#define COLLABELWIDTH  50
#define COLLABELWIDTHLONG  80
#define TEXTFIELDWIDTH   (screenRect.size.width - TEXTFIELDLEFTMARGIN * 2)
#define TEXTFIELDLEFTMARGIN 10
#define TEXTFIELDTOPMARGIN 40 +40
#define TEXTFIELDHEIGHT 158
#define TEXTVIEWCONTENTINSETTOP 6
#define TEXTVIEWCONTENTINSETBOTTOM 6


@interface CXFeedbackViewControllerViewController ()

@end

@implementation CXFeedbackViewControllerViewController
@synthesize l_buttonView = _l_buttonView;
@synthesize r_buttonView = _r_buttonView;
@synthesize m_textView;
@synthesize m_labelView;


- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
        
       
        
        [self initTextView];

    }
    return self;
}


-(void) updateWordCount:(int)wordCount {
    m_wordCountLabel.text = [NSString stringWithFormat:@"%d", wordCount];
}
- (void)textViewDidChange:(UITextView *)textView {
	int words = [textView.text length];
	[self updateWordCount:words];
}

- (BOOL)textView:(UITextView *)textView shouldChangeTextInRange:(NSRange)range replacementText:(NSString *)text {
    //	if ([text isEqualToString:@"\n"]) {
    //			[self.navigationController popViewControllerAnimated:YES];
    //		return NO;
    //	}
	return YES;
}

- (void)textViewDidEndEditing:(UITextView *)textView{
    [textView resignFirstResponder];
}

-(void)viewWillDisappear:(BOOL)animated {
	[super viewWillDisappear:animated];
}

-(void)initTextView{
    
    CGRect screenRect = [UIScreen mainScreen].bounds;
	CGRect descriptionRect = CGRectMake(TEXTFIELDLEFTMARGIN, TEXTFIELDTOPMARGIN, TEXTFIELDWIDTH, TEXTFIELDHEIGHT);
    
   
    m_labelView = [[UITextField alloc] init];
    m_labelView.layer.borderColor = [UIColor darkGrayColor];
    m_labelView.layer.borderWidth = 1;
    m_labelView.placeholder = @"请输入您的email地址"; 
    m_labelView.frame = CGRectMake(TEXTFIELDLEFTMARGIN, 45, TEXTFIELDWIDTH, 30);
    m_labelView.borderStyle = UITextBorderStyleLine;
    m_labelView.delegate = self;
    
    [self.view addSubview:m_labelView];
    m_textView = [[[CXTextPHView alloc]initWithFrame:descriptionRect] autorelease];
    //	m_textView.borderStyle = UITextBorderStyleRoundedRect;
	m_textView.layer.cornerRadius = 0.0;
    m_textView.layer.borderWidth = 1;
    m_textView.layer.backgroundColor = [UIColor darkGrayColor];
	m_textView.clipsToBounds = YES;
    m_textView.placeholder = @"请写下您的意见或建议";
	m_textView.font = [UIFont systemFontOfSize:16];
	m_textView.textAlignment = UITextAlignmentLeft;
	descriptionRect.size.height = m_textView.contentSize.height;
	m_textView.frame = descriptionRect;
	m_textView.contentOffset = CGPointMake(0, 10);
	m_textView.autocapitalizationType = UITextAutocapitalizationTypeNone;
	m_textView.autocorrectionType = UITextAutocorrectionTypeYes;
	m_textView.scrollEnabled = YES;
	m_textView.scrollsToTop = YES;
	m_textView.showsHorizontalScrollIndicator = YES;
	m_textView.enablesReturnKeyAutomatically = NO; 	
	
	UIEdgeInsets edgeInset = UIEdgeInsetsMake(-TEXTVIEWCONTENTINSETTOP,0,-TEXTVIEWCONTENTINSETBOTTOM,0);
	UIEdgeInsets edgeInsetIndicator = UIEdgeInsetsMake(-TEXTVIEWCONTENTINSETTOP,0,-TEXTVIEWCONTENTINSETBOTTOM,0);
	m_textView.contentInset = edgeInset;
	m_textView.scrollIndicatorInsets = edgeInsetIndicator;
	[m_textView setReturnKeyType: UIReturnKeyDone];
	m_textView.delegate = self;
    
	[self.view addSubview:m_textView];
	[m_textView becomeFirstResponder];
	
	CGRect wordCountRect = CGRectMake(descriptionRect.origin.x+descriptionRect.size.width-70, descriptionRect.origin.y+descriptionRect.size.height-32, 64, 32);
	m_wordCountLabel = [[[UILabel alloc] initWithFrame:wordCountRect] autorelease];
	m_wordCountLabel.backgroundColor = [UIColor clearColor];
	m_wordCountLabel.textAlignment = UITextAlignmentRight;
	[self.view addSubview:m_wordCountLabel];
	[self textViewDidChange:m_textView];
    
    
    [self.view bringSubviewToFront:_l_buttonView];
    [self.view bringSubviewToFront:_r_buttonView];
   
}

- (void)OnDone {
    
}

- (void)OnBack {
    
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor whiteColor];
    
    [_l_buttonView addTarget:self action:@selector(OnBack) forControlEvents:UIControlEventTouchUpInside];
    [_r_buttonView addTarget:self action:@selector(OnDone) forControlEvents:UIControlEventTouchUpInside];
    
//    LOG_EXPR(_l_buttonView);
    
    if ([USER_DEFAULT objectForKey:@"feedback_email_addr"]) {
        m_labelView.text = [NSString stringWithFormat:@"%@",[USER_DEFAULT objectForKey:@"feedback_email_addr"]];
    }
    
}




- (BOOL)shouldAutorotateToInterfaceOrientation:(UIInterfaceOrientation)interfaceOrientation
{
    return (interfaceOrientation == UIInterfaceOrientationPortrait);
}



#pragma mark - Public Methods Implemetion
- (IBAction)tapOnBackBtn:(id)sender {
    [self becomeFirstResponder];
    [self.navigationController popViewControllerAnimated:YES];
    
    //alfred
    //    if ([[[TabBarController sharedTabBarController] getShowingViewController] isKindOfClass:[TopicNewsViewController class]]) {
    //        [(TopicNewsViewController *)[[TabBarController sharedTabBarController] getShowingViewController] resetTableCellColor];
    //    } 
}

- (IBAction)tapOnCommentBtn:(id)sender 
{
    if (!isReachability)
    {
        [APP_DELEGATE showNetworkConnectionFailedAlertViewWithMessage:@"无法查看及\n发表评论！"];
        return;
    }
    //    NSInteger articleIndex = self.pagedScrollView.contentOffset.x/self.pagedScrollView.bounds.size.width;
    
    NSString *emailAddr = m_labelView.text;
    NSString *mesg = m_textView.text;
    
    NSString *alertinfo = OC("");
    
    if (emailAddr == nil|| [emailAddr isEqualToString:@""]) {
        alertinfo = [alertinfo stringByAppendingFormat:@":%@",@"email不能为空"];
    }else {
      
        if(![self isEmail:emailAddr])
        {
            //Does contain the substring
            alertinfo = [alertinfo stringByAppendingFormat:@" %@",@"email地址不合法"]; 
        }
        [USER_DEFAULT setObject:emailAddr forKey:@"feedback_email_addr"];
    }
    
   
    
    if (mesg == nil || [mesg isEqualToString:@""]) {
        alertinfo = [alertinfo stringByAppendingFormat:@" %@",@"正文不能为空"];
    }
    
    if(![alertinfo isEqualToString:@""]){
        No320TAlertView *alertview = [[[No320TAlertView alloc] initWithTitle:@"信息提示" message:alertinfo] autorelease];
        
        [alertview addButtonWithAction:@"OK" callback:^{
            [m_textView becomeFirstResponder];
        }];
        
        [alertview show];
        
        return;
    }
  
    
//    [SearchArticleDataRequest requestWithDelegate:self 
//                                   withParameters:[NSDictionary dictionaryWithObjectsAndKeys:
//                                                   searchText,@"keywords", 
//                                                   @"0",@"page_number",
//                                                   [NSString stringWithFormat:@"%d",NUM_OF_PER_PAGE],@"page_size",nil]];    
//     [SavePushTokenDataRequest requestWithDelegate:nil withParameters:[NSDictionary dictionaryWithObjectsAndKeys:str,@"token", nil]];
    //#http://testapp.caixin.cn/api.php?m=api_user&a=guestbookadd&email=meimeidong@caixinmedia.com&message={xxxxx}&client={0,1}
//    [FeedbackDataRequest  requestWithDelegate:self withParameters:[NSDictionary dictionaryWithObjectsAndKeys:emailAddr,@"email",mesg,@"message", nil]];

    [m_textView resignFirstResponder];
    
//    [FeedbackDataRequest requestWithDelegate:nil 
//                                  withParameters:[NSDictionary dictionaryWithObjectsAndKeys:
//                                                  emailAddr,@"email",
//                                                  mesg,@"message",
//                                                  @"0",@"client",nil] 
//                               withIndicatorView:nil];
//    
 
  
    NSString *url =  [[NSString stringWithFormat:@"%@%@",DATA_ENV.urlRequestHost, @"?m=api_user&a=guestbookadd&"] stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    
    url = [url stringByAppendingFormat:@"email=%@&",emailAddr];
    url = [url stringByAppendingFormat:@"message=%@&",mesg];
    url = [url stringByAppendingFormat:@"client=%d",0];
    url = [url  stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    
    UIWebView *webView = [[[UIWebView alloc] initWithFrame:CGRectZero] autorelease];
    webView.delegate = nil;
    webView.scalesPageToFit = YES;
    [webView loadRequest:[NSURLRequest requestWithURL:[NSURL URLWithString:url]]];
    
    [self performSelector:@selector(dummyMessage) withObject:nil afterDelay:0.6];
}

-(void) dummyMessage{
 
    [[ITSActivityIndicator currentIndicator] displayMessage:@"发送意见反馈成功！\n"];
    m_labelView.enabled = NO;
    m_textView.editable = NO;
    _r_buttonView.enabled = NO;
    
    UILabel *_gxlabel = [[[UILabel alloc] init] autorelease];
    _gxlabel.frame = CGRectMake(10, 260, 300, 20);
    _gxlabel.text = [NSString stringWithFormat:@"%@",@"感谢您的反馈!"];
    [self.view addSubview:_gxlabel];
    
    UILabel *_timelabel = [[[UILabel alloc] init] autorelease];
    _timelabel.frame = CGRectMake(10, 280, 300, 20);
    _timelabel.text = [NSString stringWithFormat:@"反馈时间:%@",[NSDate date]];
    [self.view addSubview:_timelabel];
}

 
- (BOOL) isEmail: (NSString *) emailAddress {
    NSString *regex = @"[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}"; 
    NSPredicate *emailTest = [NSPredicate predicateWithFormat:@"SELF MATCHES %@", regex]; 
    
    return [emailTest evaluateWithObject:emailAddress];
}


#pragma mark - DataRequestDelegate
//- (void)requestDidFinishLoad:(ITTBaseDataRequest*)request{
//    if([request isKindOfClass:[FeedbackDataRequest class]]){
//        if ([request isSuccess]) {
//            int ret = [[[request.resultDic objectForKey:@"result"]objectForKey:@"code"] intValue];
//
//            if (ret == 1) {
//                 [[ITSActivityIndicator currentIndicator] displayMessage:@"发送意见反馈成功！\n"];
//            }else {
//                 [[ITSActivityIndicator currentIndicator] displayMessage:@"发送意见反馈失败！\n"];
//            }
//           
//        }
//        
//    }
//}

- (IBAction)backToRootView:(id)sender
{
    [TABBAR_CONTROLLER selectTab:0];
    [[TABBAR_CONTROLLER getShowingViewController] dismissModalViewControllerAnimated:NO];
    [self.navigationController popToRootViewControllerAnimated:NO];    
}


-(void)dealloc{
//    [_l_buttonView release];
//    [_r_buttonView release];
//    
//     
//    [m_labelView release];
//    [m_textView release];
   
    [super dealloc];
}


- (BOOL)textFieldShouldBeginEditing:(UITextField *)textField{
    return YES;
}        // return NO to disallow editing.
- (void)textFieldDidBeginEditing:(UITextField *)textField{

}           // became first responder
- (BOOL)textFieldShouldEndEditing:(UITextField *)textField{
    return YES;
}          // return YES to allow editing to stop and to resign first responder status. NO to disallow the editing session to end
- (void)textFieldDidEndEditing:(UITextField *)textField{
    [textField resignFirstResponder];
}          // may be called if forced even if shouldEndEditing returns NO (e.g. view removed from window) or endEditing:YES called

- (BOOL)textFieldShouldReturn:(UITextField *)textField{
    return YES;
}           // called when 'return' key pressed. return NO to ignore.


@end
