#!/bin/sh
# yes I know it's not this simple.
zenity --question --title "$1" --text "$2"

if [ "$?" -eq "0" ]
then
  echo 6
else
  echo 7
fi

