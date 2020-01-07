for f in *.jpeg; 
do 
echo "Processing $f file.."; 
convert -define jpeg:size=100x100 $f  -thumbnail 200x200^ \
          -gravity center -extent 100x100 ../$f
done

