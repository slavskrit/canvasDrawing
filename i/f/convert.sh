for f in *.jpeg; 
do 
echo "Processing $f file.."; 
convert -define jpeg:size=200x200 $f  -thumbnail 100x100^ \
          -gravity center -extent 200x200 ../$f
done

