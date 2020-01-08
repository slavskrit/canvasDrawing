for f in f/*.jpeg; 
do 
echo "Processing `basename $f` file.."; 
convert -define jpeg:size=100x100 $f  -thumbnail 200x200^ \
          -gravity center -extent 100x100 p/`basename $f`
convert $f -resize 1000x1000 m/`basename $f`
done

