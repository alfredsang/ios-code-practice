#!/bin/bash

for((i=1;i<=6;i++));
do 
	cat y.data.txt | awk '{
		gsub(/[[:blank:]]*/,"",$i);print "/" $i "/";
	}'> $i.data.text.copy
done
