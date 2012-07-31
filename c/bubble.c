#include<stdio.h>
#include<stdlib.h>

void bubble(int *a,int n);

int main()
{
    int i;
    int *a={23,41,77,12,98,25,6,97,55,38};
     

	printf("---- %d\n",a);
	//bubble(&a[0],a);
	
	int l=0;
	// white(a++!='/0'){
	// 	printf("---- %d\n",*a);
	// 		l++;
	// }
	// 
    return 0;
}


void bubble(int *a,int n) /*定义两个参数：数组首地址与数组大小*/ 
{ 
	int i,j,temp; 

	for(i=0;i<n-1;i++) 
		for(j=i+1;j<n;j++) /*注意循环的上下限*/ 
			if(a[i]>a[j]) { 
				temp=a[i]; 
				a[i]=a[j]; 
				a[j]=temp; 
			} 
}

