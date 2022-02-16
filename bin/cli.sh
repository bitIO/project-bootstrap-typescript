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

CWD=$(pwd)
git clone https://github.com/bitIO/create-typescript-project.git ./.tmp > /dev/null 2>&1
cd ./.tmp && npm install --no-package-lock &>/dev/null && cd ..
ZXPROJECTPATH=$CWD/.tmp

npx typescript-starter
echo "Type the relative path of the created project:"
printf "> "
read PROJECTPATH

zx $ZXPROJECTPATH/index.mjs --starter $ZXPROJECTPATH --project $CWD/$PROJECTPATH