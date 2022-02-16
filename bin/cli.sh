#!/bin/sh

function egress {
  echo "Cleaning out the mess ..."
  rm -rf ./.tmp
}
trap egress EXIT

PATH_ZX=$(which zx)
if [ ! -n "$PATH_ZX" ]
then
  echo "@google/zx not found. Installing ..."
  npm i -g zx
fi

echo "Type the name of the project project:"
printf "> "
read PROJECTPATH


CWD=$(pwd)
git clone https://github.com/bitIO/create-typescript-project.git ./.tmp > /dev/null 2>&1
cd ./.tmp && npm install --no-package-lock &>/dev/null && cd ..
ZXPROJECTPATH=$CWD/.tmp

echo $PROJECTPATH | npx typescript-starter

zx $ZXPROJECTPATH/index.mjs --starter $ZXPROJECTPATH --project $CWD/$PROJECTPATH