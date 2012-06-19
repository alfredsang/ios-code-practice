dispatch_async 与 NSThread 创建一个任务(更新界面)

dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{  
      
    // Show the HUD in the main tread  
    dispatch_async(dispatch_get_main_queue(), ^{  
          
        // No need to hod onto (retain)  
        MBProgressHUD *mbp = [MBProgressHUD showHUDAddedTo:self animated:YES];  
        mbp.labelText = @"   解压中,请等待...   ";  
    });  
    //解压代码  
      
    //  
      
    dispatch_async(dispatch_get_main_queue(), ^{  
          
        [MBProgressHUD hideHUDForView:self animated:YES];  
    });  
      
});



- (void)alertView:(UIAlertView *)alertView didDismissWithButtonIndex:(NSInteger)buttonIndex {  
      
    if (buttonIndex == 0) {  
          
        // No need to hod onto (retain)  
        MBProgressHUD *hud = [MBProgressHUD showHUDAddedTo:self animated:YES];  
        hud.labelText = kDelTipsLabelForMBProgressHUD;  
        [NSThread detachNewThreadSelector:@selector(delTargetBook) toTarget:self withObject:nil];  
  
    }  
}  
  
-(void)delTargetBook  
{  
    NSAutoreleasePool *pool =[[NSAutoreleasePool alloc] init];  
        //代码部分  
  
        //代码部分  
        //回主线程执行  
    [self performSelectorOnMainThread:@selector(didDelTargetBook) withObject:nil waitUntilDone:NO];  
    [pool release];  
}  
  
-(void)didDelTargetBook  
{  
    [MBProgressHUD hideHUDForView:self animated:YES];  
      
    if ([delegate_ respondsToSelector:@selector(btnOfLibraryBookWasDelete:)]) {  
          
        [delegate_ btnOfLibraryBookWasDelete:self];   
}  
}