seachBar=[[UISearchBar alloc] init];

//修改搜索框背景

seachBar.backgroundColor=[UIColor clearColor];

//去掉搜索框背景

//1.

[[searchbar.subviews objectAtIndex:0]removeFromSuperview];

//2.

for (UIView *subview in seachBar.subviews) 

{  

if ([subview isKindOfClass:NSClassFromString(@"UISearchBarBackground")])

{  

[subview removeFromSuperview];  

break;  

}  

} 

//3自定义背景

UIImageView *imageView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"40-di.png"]];

    [mySearchBar insertSubview:imageView atIndex:1];

    [imageView release];

//4输入搜索文字时隐藏搜索按钮，清空时显示

- (BOOL)searchBarShouldBeginEditing:(UISearchBar *)searchBar {  

searchBar.showsScopeBar = YES;  

[searchBar sizeToFit];  

[searchBar setShowsCancelButton:YES animated:YES];  

return YES;  

}  

- (BOOL)searchBarShouldEndEditing:(UISearchBar *)searchBar {  

searchBar.showsScopeBar = NO;  

[searchBar sizeToFit];  

[searchBar setShowsCancelButton:NO animated:YES];  

return YES;  

}  

//改变搜索按钮文字

//改变UISearchBar取消按钮字体

for(id cc in [searchBar subviews])

    {

if([cc isKindOfClass:[UIButton class]])

        {

            UIButton *btn = (UIButton *)cc;

            [btn setTitle:@"搜索"  forState:UIControlStateNormal];

        }

    }

http://www.cnblogs.com/luobiwuyan/archive/2011/07/11/2103247.html