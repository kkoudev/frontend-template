# Envrionment frontend-template.

This template is frontend project template.

## Directory structures.

### Root directory

```
.
├── app                   # ソースファイルディレクトリ。このディレクトリ内にあるファイルを編集する
├── test                  # ユニットテストのソースファイルディレクトリ
├── node_scripts          # Nodeタスクスクリプト格納ディレクトリ
├── .editorconfig         # エディタ設定情報
├── .eslintrc.yml         # ESLintのルール設定
├── .gitignore            # Gitのバージョン管理除外設定
├── .node-version         # 使用するNodeJSのバージョンが記載されたテキストファイル
├── .stylelintrc.yml      # stylelintのルール設定
├── package.json          # npmパッケージ設定ファイル
├── setup.sh              # ローカル環境構築用スクリプト
├── yarn.lock             # 開発時点での依存関係ファイル
└── README.md
```

### `app` directory

```
app
├── images                # 画像格納ディレクトリ
├── materials             # その他ファイル格納ディレクトリ
├── scripts               # TypeScriptファイル(*.ts)格納ディレクトリ
├── styles                # SugarSSファイル(*.sss)格納ディレクトリ
└── views                 # Pugファイル(*.pug)格納ディレクトリ
```

### `app/styles` directory

```
app/styles
├── pages                 # 各機能単位で利用するCSS格納ディレクトリ。画面ではここで定義された必要なCSSを読み込む
├── parts                 # パーツ関連のCSS格納ディレクトリ
├── vars                  # 変数を定義したCSS格納ディレクトリ
├── _default.sss          # 要素型セレクタのデフォルトスタイルを定義したファイル
├── _mixins.sss           # 全体的によく利用する mixin を定義したファイル
└── _styleguide.sss       # スタイルガイド用に使用するスタイルを定義したファイル
```

### `app/styles/parts` directory

```
app/styles/parts
├── atoms                 # 原子(Atoms)パーツに関するCSS格納ディレクトリ
├── molecules             # 分子(Molecules)パーツに関するCSS格納ディレクトリ
└── organisms             # 有機体(Organisms)パーツに関するCSS格納ディレクトリ
```

## Installation

```bash
./setup.sh
```

## Launch

```bash
yarn run start
```

## Build

```bash
yarn run product
```

## Creates sprite image file

スプライト画像生成は特別なコマンドを実行する必要はなく、<br>
**`app/images/_sprites/` ディレクトリ配下の画像を `background-image` で指定するだけ** で自動的に作成されます。

＜例＞

＜SugarSSコンパイル前＞
```sass
.textbox
  &__searchButton
    background-image: url('../../images/_sprites/icons/search@2x.png')
```

＜SugarSSコンパイル後＞
```css
.textbox__searchButton {
  width: 18px;
  height: 18px;
  background-image: url('../images/sprite.@2x.png?15d472c0ec0');
  background-position: 0 0;
  background-size: 46px 46px;
}
```

## Creates styleguide

スタイルガイドは `postcss-style-guide` にて作成しており、<br>
各パーツの `*.sss` ファイルの上部にコメントを記述することで生成します。<br>
**パーツを追加するたびに、必ずスタイルガイドを作成するようにしてください**。<br>
コメントの記述方法については以下の postcss-style-guide のgithubページを参照してください。<br>
[https://github.com/morishitter/postcss-style-guide](https://github.com/morishitter/postcss-style-guide)
<br>
<br>
スタイルガイドは `http://localhost:8000/styleguide/` をブラウザで開くことで閲覧できます。

## Design of css

本プロジェクトにおいてはAtomic Designを採用しています。<br>

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
