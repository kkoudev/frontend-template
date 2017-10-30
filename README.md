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

## Creates icon font files

アイコンフォントの作成は `app/styles/_iconfonts.sss` ファイルに以下の例のように `@font-face` 指定を記述するだけで利用可能です。<br>
`@font-face` の `src` プロパティに指定されたディレクトリ内のSVGファイルからアイコンフォントファイルを自動生成します。<br>
作成されるルールセットは以下の規則で命名されます。<br>

```
iconfont-(@font-faceで指定されたfont-family名)-(拡張子を除いたSVGファイル名)
```

上書きするスタイルについては `@font-face` のルールセットの後に記述してください。<br>
(以下の例では、`add.svg`、`anchor_link.svg`、`apartment.svg` ファイルがiconfontsディレクトリに格納されている場合になります)<br>

＜SugarSSコンパイル前＞
```sass
@font-face
  font-family: 'example'
  src: url('../../iconfonts/*.svg')
  font-weight: normal
  font-style: normal

[class^='iconfont-example-'], [class*=' iconfont-example-']
  font-family: inherit

[class^='iconfont-example-']::before, [class*=' iconfont-example-']::before
  font-family: 'example'
  vertical-align: middle
```

＜SugarSSコンパイル後＞
```css
@font-face {
  font-family: 'example';
  src: url('../fonts/example.eot?15f306853f8');
  src: url('../fonts/example.eot?15f306853f8#iefix') format('embedded-opentype'), url('../fonts/example.woff?15f306853f8') format('woff'), url('../fonts/example.ttf?15f306853f8') format('truetype');
  font-weight: normal;
  font-style: normal;
}
[class^='iconfont-example-'], [class*=' iconfont-example-'] {
  font-family: 'example';
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont-example-add::before {
  content: '\EA01';
}
.iconfont-example-anchor_link::before {
  content: '\EA02';
}
.iconfont-example-apartment::before {
  content: '\EA03';
}

[class^='iconfont-example-'], [class*=' iconfont-example-'] {
  font-family: inherit;
}

[class^='iconfont-example-']::before, [class*=' iconfont-example-']::before {
  font-family: 'example';
  vertical-align: middle;
}
```

あとは、アイコンフォントを利用する要素に生成された `iconfont-example-XXX` の名称のルールセットをクラス属性に指定するだけで適用できます。

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
