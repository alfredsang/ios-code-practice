if [ -f parosnew.zip ]; then
	rm -f -r /tmp/paros
	unzip -o -d /tmp parosnew.zip
	cp -r -f /tmp/paros/* ./
	rm -f -r /tmp/paros
	rm -f parosnew.zip
fi;java -jar paros.jar
