/*
 * =====================================================================================
 *       Filename:  myHead.h
 *    Description:  This file include my head file for the Semplest Blowser
 *
 * =====================================================================================
 *        Version:  1.0
 *        Created:  2011年10月09日 13时38分36秒
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  CodeVampire (Yang Wenhan), yangwenhan.1008@gmail.com
 *        Company:  Personal
 * =====================================================================================
 */
#include<stdlib.h>
#include<pthread.h>
#include<sys/socket.h>
#include<arpa/inet.h>
#include<netdb.h>
#include<sys/stat.h>
#include<unistd.h>
#include<signal.h>
#include<syslog.h>
#include<fcntl.h>
#include<sys/resource.h>
#include<errno.h>
#include<stdio.h>
#include<string.h>


/*
 * =====================================================================================
 *       Filename:  Connector.c
 *    Description:  This file include the function needed for a TCP Connector
 *
 * =====================================================================================
 *        Version:  1.0
 *        Created:  2011年10月09日 21时40分29秒
 *       Revision:  none
 *       Compiler:  gcc
 *
 *         Author:  CodeVampire (Yang Wenhan), yangwenhan.1008@gmail.com
 *        Company:  Personal
 * =====================================================================================
 */
// #include"myHead.h"

#define MAXOUTBUFSIZE 1024
#define MAXINBUFSIZE  102400

void *get_in_addr(struct sockaddr *sa)
{
    if(sa->sa_family == AF_INET)
    {
        return &(((struct sockaddr_in*)sa)->sin_addr);
    }
    return &(((struct sockaddr_in6*)sa)->sin6_addr);
}

int main(int argc,char *argv[])
{
    int sockfd,    // socket fd
        numbytes;    // nbytes in send and recv

    char outbuf[MAXOUTBUFSIZE];    // buffer for send
    char inbuf[MAXINBUFSIZE];    // buffer for recv
    struct addrinfo hints,    // address info fliter
                    *servinfo,    // head of linked list
                    *p;    // current point

    int rv;    // error return
    int ch;    // return from fgetc
    int rv2;    // used to make outbuf

    char s[INET6_ADDRSTRLEN];    // address string

    if(argc != 3)    // wrong use of program
    {
        fprintf(stderr,"usage : connector hostname port\n");
        exit(1);
    }

    memset(&hints,0,sizeof(hints));
    hints.ai_family = AF_UNSPEC;    // both ipv4 and ipv6
    hints.ai_socktype = SOCK_STREAM;    // TCP

    if((rv = getaddrinfo(argv[1],argv[2],&hints,&servinfo)) != 0)
    {
        fprintf(stderr,"getaddrinfo : %s\n",gai_strerror(rv));
        exit(1);
    }

    // here we deal with the input from stdin
    // the thing you should know is that when input Enter what was in
    // I make \n to \r\n

    fprintf(stdout,"Input the info want to trans and EOF end.\n");
    rv = 0;
    rv2 = 0;
    memset(outbuf,0,MAXOUTBUFSIZE);
    while(rv < MAXOUTBUFSIZE-2)
    {
        ch = fgetc(stdin);
        if(ch == EOF)
            break;
        if(ch == '\n')
        {
            outbuf[rv2++] = '\r';
            outbuf[rv2++] = '\n';
            rv++;
            continue;
        }
        // In UNIX the Enter is just \n
        // While in Windows the Enter maybe \r\n
        outbuf[rv2++] = (char)ch;
        rv++;
    }
    outbuf[MAXOUTBUFSIZE-1] = '\0';

    for(p = servinfo;p != NULL;p = p->ai_next)
    {
        if((sockfd = socket(p->ai_family,p->ai_socktype,p->ai_protocol)) == -1)
        {
            fprintf(stderr,"client : socket\n");
            continue;
        }

        if(connect(sockfd,p->ai_addr,p->ai_addrlen) == -1)
        {
            close(sockfd);
            fprintf(stderr,"client : connect\n");
            continue;
        }

        break;
    }

    if(p == NULL)
    {
        fprintf(stderr,"client : failed to connect\n");
        exit(2);
    }

    inet_ntop(p->ai_family,get_in_addr((struct sockaddr*)p->ai_addr),s,sizeof(s));
    fprintf(stderr,"client : connect to %s .\n",s);

    freeaddrinfo(servinfo);

    rv = strlen(outbuf);
    send(sockfd,outbuf,rv,0);

    if((numbytes = recv(sockfd,inbuf,MAXINBUFSIZE-1,MSG_WAITALL)) == -1)
    {
        fprintf(stderr,"client : recv\n");
        close(sockfd);
        exit(2);
    }

    fprintf(stderr,"client : %d bytes from server .\n",numbytes);
    printf("%s",inbuf);

    printf("\n");    // there should not be . but for man read easily I add a new line
    close(sockfd);
    exit(0);
}
