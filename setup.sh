#!/bin/bash

#==============================================
# 関数定義
#==============================================

#-----------------------------
# brew でインストール可能な最新バージョンを取得する
#
# 1 : 対象モジュール
#-----------------------------
brew_remote_version() {

  # インストール可能な最新バージョンを返す
  brew info $1 2>/dev/null | head -n 1 | awk '{print $3}' | tr -d ',' | tr -d '\n'

}

#-----------------------------
# Homebrewでインストールまたはアップグレードを行う
#
# [Arguments]
# 1 : 対象モジュール
#-----------------------------
brew_install_or_upgrade() {

  # インストール済み最新バージョンを取得する
  INSTALLED_LATEST_VERSION=$(brew ls --versions $1 | awk '{print $NF}')
  REMOTE_LATEST_VERSION=$(brew_remote_version $1)

  # 取得出来ない場合
  if [[ -z ${INSTALLED_LATEST_VERSION} ]]; then

    # インストールする
    brew install $1

  # インストール可能な最新バージョンと異なる場合
  elif [[ ${REMOTE_LATEST_VERSION} != ${INSTALLED_LATEST_VERSION} ]]; then

    # アップグレードする
    brew upgrade $1

  fi

}

#-----------------------------
# アップグレードが必要な場合に
# brew upgrade を実行する
#
# [Arguments]
# 1 : 対象モジュール
#-----------------------------
brew_upgrade() {

  # インストール済み最新バージョンを取得する
  INSTALLED_LATEST_VERSION=$(brew ls $1 | awk '{print $NF}')

  # インストール可能な最新バージョンと異なる場合
  if [[ $(brew_remote_version) != ${INSTALLED_LATEST_VERSION} ]]; then

    # アップグレードする
    brew upgrade $1

  fi

}

#-----------------------------
# NodeJSのインストール処理
#
# [Arguments]
# 1 : インストールするNodeJSのバージョン
#-----------------------------
install_nodejs() {

  echo 'NodeJS のインストール中...'

  # 指定バージョンのバイナリをインストールする
  nodebrew install-binary $1

  # 指定バージョンを利用する
  nodebrew use $1

  echo 'NodeJS のインストールが完了しました'

}



#==============================================
# エントリーポイント (ここから処理の開始)
#==============================================

# macOS以外の場合
if [[ $(uname -s) != 'Darwin' ]]; then

  echo 'セットアップスクリプトはmacOSのみ対応しています'
  exit 1

fi

# 各種バージョン情報を取得する
NODE_VERSION=$(cat ${0%/*}/.node-version | tr -d '\n')

# Homebrew有無をチェックする
which brew > /dev/null 2>&1
if [[ $? -ne 0 ]]; then

  echo "Homebrewをインストールしています..."
  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
  echo "Homebrewをインストールしました"

fi

# nodebrewの有無をチェックする
# (nodeberw はバージョンアップを強制するために常にインストールさせる)
which nodebrew > /dev/null 2>&1
if [[ $? -ne 0 ]]; then

  # nodebrewをインストールする
  echo 'nodebrew のインストール中...'
  curl -L git.io/nodebrew | perl - setup
  echo 'nodebrew のインストールが完了しました'

fi

# パスに追加する
export PATH=$HOME/.nodebrew/current/bin:$PATH

# nodeの有無をチェックする
which node > /dev/null 2>&1
if [ $? -ne 0 ]; then

  # 指定バージョンのNodeJSをインストールする
  install_nodejs ${NODE_VERSION}

elif [[ $(node -v | tr -d '\n') != ${NODE_VERSION} ]]; then

  # 指定バージョンのNodeJSをインストールする
  install_nodejs ${NODE_VERSION}

fi

# yarnの有無をチェックする
which yarn > /dev/null 2>&1
if [[ $? -ne 0 ]]; then

  echo 'yarn のインストール中...'

  # yarnをインストール
  npm i -g yarn

  echo 'yarn のインストールが完了しました'

fi

# node modulesをインストールする
yarn

# 完了メッセージ
echo '======================================================================='
echo 'セットアップが完了しました。'
echo '使用しているシェルに合わせて以下のPATH情報を追加し、シェルを再起動してください。'
echo ''
echo '[bash] (~/.bash_profile)'
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH'
echo ''
echo '[zsh] (~/.zshrc)'
echo 'export PATH=$HOME/.nodebrew/current/bin:$PATH'
echo ''
echo '[fish] (~/.config/fish/config.fish)'
echo 'set -x PATH $HOME/.nodebrew/current/bin $PATH'
echo '======================================================================='

