我自定义的类怎么读取 xib

答案：
cell = (SearchCell *)[[[NSBundle mainBundle] loadNibNamed:@"SearchCell" owner:self options:nil] objectAtIndex:0];




下面的区别？
NSMutableArray *ret_array = [NSMutableArray array];
NSMutableArray *ret_array1 = [[[NSMutableArray alloc]  init] autorelease];

明林清  15:47:41
完全一样 
桑世龙  15:47:52
？
明林清  15:48:31
效果是一样的 只是后者写起来麻烦

