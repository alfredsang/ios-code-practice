我自定义的类怎么读取 xib

答案：
cell = (SearchCell *)[[[NSBundle mainBundle] loadNibNamed:@"SearchCell" owner:self options:nil] objectAtIndex:0];



