#!/bin/bash

#==============================================
# Entry point of this script
#==============================================

if [[ $(uname -s) != 'Darwin' ]]; then

  echo 'This script support macOS only.'
  exit 1

fi

which brew > /dev/null 2>&1
if [[ $? -ne 0 ]]; then

  echo "Installing Homebrew..."
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  echo "Complete installing Homebrew."

fi

which ndw > /dev/null 2>&1
if [[ $? -ne 0 ]]; then

  echo "Installing ndw..."
  bash <(curl -s https://raw.githubusercontent.com/kkoudev/ndw/master/install.sh)
  echo "Complete installing ndw."

fi

ndw install $(ndw current | tr -d '\n')
ndw install-yarn
yarnw

echo '======================================================================='
echo 'Complete setup.'
echo '======================================================================='

