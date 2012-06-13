在iPhone开发中实现解压缩gzip是本文要介绍的内容，最近做的一个东西中，需要从网络获取xml文件，但是该文件用了gzip压缩的。搜索一下有人说gzip压缩的用urlrequest可以自己解压，但是这必须从服务器返回的header中有accept－Encoding说明是gzip 的。也就是用这句就可以实现自解压：

[urlRequest addValue:@"gzip" forHTTPHeaderField:@"Accept-Encoding"];  
这个在我的项目中没有作用，因为服务器返回的header中没有Accept－Encoding的说明。这就需要手动解压了！解压需要导入libz.1.2.3.dylib库，导入#import "zlib.h"

下面是解压的代码：

-(NSData *)uncompressZippedData:(NSData *)compressedData    
{    
 
    if ([compressedData length] == 0) return compressedData;    
 
    unsigned full_length = [compressedData length];    
 
    unsigned half_length = [compressedData length] / 2;    
    NSMutableData *decompressed = [NSMutableData dataWithLength: full_length + half_length];    
    BOOL done = NO;    
    int status;    
    z_stream strm;    
    strm.next_in = (Bytef *)[compressedData bytes];    
    strm.avail_in = [compressedData length];    
    strm.total_out = 0;    
    strm.zalloc = Z_NULL;    
    strm.zfree = Z_NULL;    
    if (inflateInit2(&strm, (15+32)) != Z_OK) return nil;    
    while (!done) {    
        // Make sure we have enough room and reset the lengths.    
        if (strm.total_out >= [decompressed length]) {    
            [decompressed increaseLengthBy: half_length];    
        }    
        strm.next_out = [decompressed mutableBytes] + strm.total_out;    
        strm.avail_out = [decompressed length] - strm.total_out;    
        // Inflate another chunk.    
        status = inflate (&strm, Z_SYNC_FLUSH);    
        if (status == Z_STREAM_END) {    
            done = YES;    
        } else if (status != Z_OK) {    
            break;    
        }    
 
    }    
    if (inflateEnd (&strm) != Z_OK) return nil;    
    // Set real length.    
    if (done) {    
        [decompressed setLength: strm.total_out];    
        return [NSData dataWithData: decompressed];    
    } else {    
        return nil;    
    }    
}
http://xueqi.iteye.com/blog/1238727