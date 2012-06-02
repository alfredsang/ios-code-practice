tableView:cellForRowAtIndexPath:

通常在创建完UITableViewController后，会看到UITableViewDataSource的一个实现函数如下

	- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath {
	  static NSString *CellIdentifier = [NSString stringWithFormat:@"Cell"];
	  UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:CellIdentifier];
	  if (cell == nil) {
	    cell = [[[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier] autorelease];
	  }
	  //config the cell
	  return cell;
	}

而这些代码又是什么意思呢？

每一个UITableView里都维护着一个cell队列，当UITableView刚加载的时候，cell队列里是没有任何数据的。dequeueResableCellWithIdentifier从字面上理解就是”出列可重用的cell",也就是根据一个标识identifier从cell队列里取出一个UITableViewCell，当然了，如果cell队列里没有此标识的cell，调用此方法的结果就是返回nil。因此，在UITableView刚加载的时候，cell队列里没有可用的cell，所以必须通过语句

	cell = [[[UITableViewCell alloc] initWithStyle:UITableViewCellStyleDefault reuseIdentifier:CellIdentifier] autorelease];

来创建对应CellIdentifier标识的UITableViewCell实例。


而当UITableView在滚动的时候导致UITableViewCell滚出手机屏幕视图的时候，程序会将这一个UITalbeViewCell实例放入此UITableView所维护的cell队列中。当UITableview中有新的UITableViewCell需要展现在手机屏幕视图上时，就会调用tableView:cellForRowAtIndexPath:方法了，因此我们可以知道以下几点：
1-重取出来的cell是有可能已经捆绑过数据或者加过子视图的，所以，如果有必要，要清除数据（比如textlabel的text）和remove掉add过的子视图（使用tag）。
2-这样设计的目的是为了避免频繁的 alloc和delloc cell对象而已,没有多复杂。
3-设计的关键是实现cell和数据的完全分离
如果不想重用UITableViewCell实例，如在一个每一行都显示不同内容的UITableView实例时，我们可以用如下的方法：
NSString *CellIdentifier = [NSString stringWithFormat:@"Cell%d%d", [indexPath section], [indexPath row]];
来重新定义标识。
这样每一行都有其对应的identifier,从cell队列里取出来只有两个结果：
1-cell队列里没有此identifier对应的UITableViewCell实例，返回nil
2-cell队列里有此identifier对应的UITableViewCell实例，而且不会有重用到其他不同行的cell的情况


不要把设置的地方放在这里，会重复执行多次。
- (UITableViewCell *)tableView:(UITableView *)tableView 
         cellForRowAtIndexPath:(NSIndexPath *)indexPath 
{
    static NSString *CellIdentifier = @"RecommendationCell";
    RecommendationCell *cell = (RecommendationCell *)[tableView dequeueReusableCellWithIdentifier:CellIdentifier];
    if (cell == nil) 
    {
         cell = (RecommendationCell *)[[[NSBundle mainBundle] loadNibNamed:@"RecommendationCell" owner:self options:nil] objectAtIndex:0];              
	 }
	
    if (indexPath.row == [_caixinappArrayList count]) {
		   [appTableView reloadData];
            [_appRecommandRangeView setAppSourceArrayAndDraw:_otherappArrayList];
        
            _appRecommandRangeView.backgroundColor = COLOR_WITH_RGB(221, 221, 221);
            _appRecommandRangeView.frame=CGRectMake(0, 0, 320, ([_otherappArrayList count]%4+1)*(57+30)+50);
	
	
        return _appRecommandRangeView;
	}
	return cell;
}


应该这样做：
	#pragma mark - DataRequestDelegate
	- (void)requestDidFinishLoad:(ITTBaseDataRequest*)request{
	    if([request isKindOfClass:[AppRecommandDataRequest class]]){
	        _isrequestSucssed = [request isSuccess];

	            [appTableView reloadData];
	            [_appRecommandRangeView setAppSourceArrayAndDraw:_otherappArrayList];
            
	            _appRecommandRangeView.backgroundColor = COLOR_WITH_RGB(221, 221, 221);
	            _appRecommandRangeView.frame=CGRectMake(0, 0, 320, ([_otherappArrayList count]%4+1)*(57+30)+50);
            
	        }
	    }
	}
	
	- (UITableViewCell *)tableView:(UITableView *)tableView 
	         cellForRowAtIndexPath:(NSIndexPath *)indexPath 
	{
	    static NSString *CellIdentifier = @"RecommendationCell";
	    RecommendationCell *cell = (RecommendationCell *)[tableView dequeueReusableCellWithIdentifier:CellIdentifier];
	    if (cell == nil) 
	    {
	         cell = (RecommendationCell *)[[[NSBundle mainBundle] loadNibNamed:@"RecommendationCell" owner:self options:nil] objectAtIndex:0];              
		 }

	    if (indexPath.row == [_caixinappArrayList count]) {
	        return _appRecommandRangeView;
		}
		return cell;
	}
	
