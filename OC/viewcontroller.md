浅论ViewController的加载
分类： iPhone开发 2012-05-12 16:36 367人阅读 评论(8) 收藏 举报
一个ViewController，一般通过init或initWithNibName来加载。二者没有什么不同，init最终还是要调用initWithNibName方法（除非这个ViewController没有nib文件）。

我们经常在initWithNibName方法中初始化视图，变量或者其他成员。这是最常见的initWithNibName方法写法：

- (id)initWithNibName:(NSString *)nibNameOrNilbundle:(NSBundle *)nibBundleOrNil

{

    self = [superinitWithNibName:nibNameOrNil bundle:nibBundleOrNil];

    if (self) {

        label=[[UILabelalloc]initWithFrame:

                  CGRectMake(0,0,160,160)];

        [self.viewaddSubview:label];

...

    }

    returnself;

}

在if语句中，包含了最常见的成员初始化代码。

在这段代码中，如果你向ViewController的视图树中加入一些新的UIView子类，比如上面的代码：

[self.viewaddSubview:label];

这不会有什么问题。但是这会导致另一个方法的调用，即viewDidLoad方法。

viewDidLoad方法一般情况下只会在nib文件已载入内存（即视图树构建完成）之后调用。

但还有另一种情况，如果ViewController的view属性被引用时，view=nil，也会导致nib的加载行为，从而也导致viewDidLoad方法的调用。如果你在initWithNibName方法一直不引用view属性，则直至initWithNibName方法结束，viewDidLoad方法也不会触发。

你也许奇怪，如果在代码中你一直不引用这个ViewController的view属性怎么办？那么是不是viewDidLoad方法一直都不会调用了？

它会在ViewController对象第1次present时调用，比如你使用presentModalViewController或pushViewController方法弹出它。这两个方法同时还会调用ViewController的appear方法（即viewWillAppear方法和viewDidAppear方法）。

viewDidLoad方法会比appear方法要早执行（appear方法会导致一个弹出动画产生）。而且如果在present之前已经执行过viewDidLoad方法，则present方法不会触发viewDidLoad方法。

这就是为什么我们会奇怪viewDidLoad方法中的代码有时执行有时似乎不被执行的原因。其实根源还是在initWithNibName方法的if语句中。

如果你在initWithNibName时，引用了ViewController的view属性，由于此时view为nil，将触发nib文件的加载行为，导致viewDidLoad方法不等present就提前调用了。由于initWithNibName方法中ViewController成员还未初始化，导致任何对这些成员的引用都是无效的。

比如在viewDidLoad方法中，由于该方法提前执行，导致数据访问对象还是nil（initWithNibName仍然未执行完）。如果此时在viewDidLoad方法想通过数据访问对象获取表格数据，将得到空。这样从表面上看，viewDidLoad方法似乎未被执行。

这个情况可以通过两种方法来改进：

一、initWithNibName方法中，不要有任何成员初始化的代码。把这些代码移到viewDidLoad方法开始进行。

二、由于initWithNibName方法保证是在present方法中进行，我们也可以在initWithNibName方法中保留成员初始化代码。但把原来viewDidLoad方法中的代码移到appear方法中。也就是，最好不要在viewDidLoad方法中进行和成员初始化无关的事情。这样还有一个好处，每次presentViewController，都会执行appear方法中的代码（如果是viewDidLoad方法，则只会在加载nib时执行）。