convert -define jpeg:size=200x200 $1.jpeg  -thumbnail 100x100^ \
          -gravity center -extent 100x100 $1s.jpeg
