convert -define jpeg:size=100x100 $1.jpeg  -thumbnail 100x100^ \
          -gravity center -extent 100x100 $1s.jpeg
