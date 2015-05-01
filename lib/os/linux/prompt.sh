#!/bin/sh
# yes I know it's not this simple.
(sleep 1 && wmctrl -F -a "$1" -b add,above) &
(zenity --info --title="$1" --text="$2")

if [ "$?" -eq "0" ]
then
  echo 6
else
  echo 7
fi

