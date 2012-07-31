/****************************
单链表直接选择排序
*******************************/
#include<stdio.h>
#include<stdlib.h>
struct node
{
    int num;
    struct node *next;
};

struct node *head=NULL;
cre_list() //初始化结点
{
    head = (struct node *)malloc(sizeof(struct node));
	head->num=0;
    head->next = NULL;
}

add_node(int num) //插入结点
{
    struct node *ptr = (struct node *)malloc(sizeof(struct node));
    ptr->num = num;
	ptr->next = head->next;
    head->next=ptr;
}

display_node() //遍历链表
{
    struct node *p = head->next;
    do
    {
        printf("%d\t",p->num);
        p = p->next;
    }while(p != NULL);
    printf("\n");
}

select_insert()
{
    int min=0;
	int tmp=0;
    struct node *p,*q,*M;
	p=q=M=head;
	while(p->next!=NULL)
	{
	    M=q=p->next;
		min=q->num;
		
		while(q!=NULL)
		{
		    if(q->num < min)
		    {
		        M=q;
				min=q->num;
		    }
			q=q->next;
		}
		if(p->next!=M)
		{
		    tmp=p->next->num;
			p->next->num=M->num;
			M->num=tmp;
		}
		p=p->next;
	}
}
	
int main()
{
    int i;
    int a[10]={23,41,77,12,98,25,6,97,55,38};
    cre_list();
    for(i=0;i<10;i++)
    {
        add_node(a[i]);
    }
    display_node();
	select_insert();
    display_node();
	
    return 0;
}
