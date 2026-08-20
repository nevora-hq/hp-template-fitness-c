# fitness-c（フィットネステンプレートサンプルサイト C）

顧客にデザインを選んでもらうための、地域密着型フィットネスジム向けサンプルサイトです。
制作基盤（`nevora-corporate` のNext.jsテンプレート）をコピーして作っています。

- コンセプト：**気軽さ・継続しやすさ**（初心者歓迎／コミュニティ感／明るく開放的）
- 屋号（架空）：AOZORA FITNESS（アオゾラフィットネス）つつじヶ丘店
- 掲載する施設情報は**架空のもの**を使います（実在施設の情報は入れない）
- 想定リポジトリ名：`hp-template-fitness-c`（本体サイトとは別リポジトリ・別ドメイン）

デザインの詳細は [`docs/デザイン方針.md`](docs/デザイン方針.md) を参照。

方針の詳細は [`docs/テンプレートサンプルサイト方針.md`](docs/テンプレートサンプルサイト方針.md) を参照。

## 技術スタック

- Next.js (Pages Router) + React
- プレーンCSS（CSSフレームワークは使わない）
- ホスティング：Vercel（Gitへのpushで自動デプロイ）

## 収録ページ

制作会社固有のページ（`/services` `/templates` `/works`）は削除済みです。

| パス | 内容 |
|---|---|
| `/` | トップ（ヒーロー・はじめての方の不安・強み・雰囲気・プログラム・料金・体験の流れ・FAQ・CTA） |
| `/price` | プログラム・料金プラン・都度利用・お受けできないこと |
| `/facility` | 施設案内（設備・雰囲気・持ち物・施設情報） |
| `/flow` | 見学・体験の流れ |
| `/faq` | よくあるご質問 |
| `/contact` | お問い合わせ |
| `/privacy-policy` | プライバシーポリシー |
| `/terms` | 利用規約 |
| `/404` | 404ページ（noindex） |
| `/sitemap.xml` `/robots.txt` | ビルド時に生成（`scripts/generate-seo-files.js`） |

## 使い方

```bash
# 1. 依存パッケージをインストール
npm install

# 2. 環境変数を用意
# NEXT_PUBLIC_SITE_URL=... を書いた .env.local を用意する（雛形は .env.local を参照）

# 3. 開発サーバーを起動
npm run dev

# 4. 本番ビルド（NEXT_PUBLIC_SITE_URL が必要）
npm run build
```

## サンプルサイト化のために必ず行うこと

### 1. `lib/siteConfig.js` を書き換える

サイト名・店舗情報・ナビ・ヒーローの文言・料金・FAQ・フォーム送信先が
すべてこのファイルに集約されています。**まずここだけを書き換えれば一通りのサイトが完成します。**
現在の中身は、架空のフィットネスジム「AOZORA FITNESS」の内容で一通り書き終えています。
別業種へ転用する場合は、このファイルを丸ごと差し替えてください。

このサンプルでは、次の2点を文言のルールとしています。

- **健康・医学的効果の断定表現は使わない**（「痩せます」「健康になります」等）
- **利用者の声・体験談は架空でも掲載しない**（コミュニティ感は場の説明だけで表現する）

### 2. 配色を変える

`styles/globals.css` の `:root` にある4変数だけを差し替えます。
個別のクラスにカラーコードを直書きしないでください。

```css
--color-primary          /* ボタン・リンク・見出しのアクセント */
--color-primary-dark     /* ホバー時など一段暗い色 */
--color-primary-light    /* 枠線・淡い塗り */
--color-primary-surface  /* 最も淡い背景色 */
```

**`--color-primary` は白背景に対してコントラスト比4.5:1以上**を満たすものを選びます（文字色として使われるため）。

### 3. 画像を用意する

**現在リポジトリに画像がありません。**（レイアウトは画像なしで完成させてあります。後日追加する前提です）
コンセプトに合う画像（明るいマシンエリア・スタジオ・ラウンジなど。特定の個人が判別できる写真は避ける）を用意してください。

| パス | 用途 |
|---|---|
| `public/images/hero/home-hero{,-640,-1024,-1600}.webp` | ファーストビュー |
| `public/images/band/band-01{,-640,-1024,-1600}.webp` | セクション区切りの帯 |
| `public/images/logo.png` | 構造化データ用ロゴ（正方形・112px以上） |
| `public/images/ogp.png` | OGP（1200×630・PNGのまま） |
| `public/favicon.ico` `favicon-16/32/48.png` `apple-touch-icon.png` `images/favicon.svg` | ファビコン |

ヒーロー画像を差し替えたら、`components/HeroBanner.js` の `srcSet` と
`pages/index.js` の `<link rel="preload">` の `imageSrcSet` を**同じ内容に保ってください**
（不一致だと同じ画像を2回ダウンロードして表示が遅くなります）。

#### 画像の変換（WebP・サイズ違い・ファビコン）

元画像（PNG/JPEG）を下記の名前で `public/images/` に置き、変換スクリプトを実行します。

```bash
python scripts/optimize-images.py          # 未変換のものだけ処理
python scripts/optimize-images.py --force  # 変換済みも作り直す
```

| 置くファイル | 書き出されるもの |
|---|---|
| `images/hero/home-hero.png` | `home-hero.webp` ＋ `-640/-1024/-1600` |
| `images/band/band-01.png` | 同上 |
| `images/logo.png` | 512×512に調整＋ファビコン一式（`favicon.ico` / `favicon-16,32,48.png` / `apple-touch-icon.png` / `images/favicon.svg`） |
| `images/ogp.png` | 1200×630に切り抜き（PNGのまま。WebP非対応のSNSクローラがあるため） |

変換元のPNG/JPEGは `image-src/` へ自動で移動します（Gitの追跡対象外・本番には配信されません）。
縮小のみ行い、引き伸ばしはしません。

### 4. 環境変数を設定する

| 変数 | 用途 | 必須 |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical・OGP・構造化データの絶対URL生成 | **本番ビルドで必須** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4の測定ID | 任意 |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Search Console の所有権確認 | 任意 |

`NEXT_PUBLIC_SITE_URL` が未設定だと `npm run build` はエラーになります
（canonical・OGPが黙って欠落するのを防ぐため、`next.config.js` で意図的にエラーにしています）。

### 5. ページを追加したとき

以下の2箇所への追記を忘れないでください（漏れると検査で差し戻しになります）。

- `lib/siteConfig.js` の `NAV_ITEMS`（ナビゲーション）
- `scripts/generate-seo-files.js` の `STATIC_PATHS`（サイトマップ）

## ディレクトリ構成

```
lib/
  siteConfig.js      サイトのデータ集約先（文言を書き換える唯一のファイル）
  structuredData.js  JSON-LD の組み立て
  gtag.js            GA4計測
components/
  Layout.js          共通レイアウト・head・JSON-LD出力
  Header.js          ヘッダー（NAV_ITEMSから生成）
  Footer.js          フッター
  HeroBanner.js      ファーストビュー
  SampleBar.js       サンプルであることを示す固定バー
  SectionBand.js     全幅の画像バンド
  FaqAccordion.js    FAQ（details/summary）
  Cta.js             問い合わせ誘導ブロック
pages/               各ページ
styles/globals.css   全スタイル
```

## 本体サイトへの導線（サンプルサイト固有の実装）

グローバルナビに本体サイト（NEVORA）へのリンクは**置きません**。代わりに、常時表示の
細い固定バーを1本だけ置き、そこを本体サイトへの唯一の出口にします。

```
これはテンプレートサンプルです ｜ このデザインで相談する →
```

- リンク先は本体サイトの `/contact/?from=fitness-c` のみ（`target="_blank"` `rel="noopener"`）
- 高さ44px前後・半透明のダーク背景。サイト本体のデザインより前に出さない
- `position: fixed` ＋ `body` 側に同じ高さの余白。`z-index` はstickyヘッダーより上
- リンク先URLは定数として1箇所にまとめる（ドメイン変更時の直し漏れを防ぐ）

検索避け（noindex）は不要です。固定バーでサンプルであることを常時明示します。
詳細は [`docs/テンプレートサンプルサイト方針.md`](docs/テンプレートサンプルサイト方針.md) を参照。

## URL の形式（`trailingSlash: true`）

`next.config.js` で `trailingSlash: true` を指定しているため、書き出し結果は
`out/price/index.html` の形になり、URLは `/price/` になります。

拡張子なしのURL（`/price`）は、Apache系の静的ホスティングではサーバー設定次第で404になります。
末尾スラッシュ形式にしておくと、Vercelのプレビューと静的ホスティング（ConoHa WING等）に
アップロードした実ファイルの両方で同じURLが使えます。

ページを追加・リンクを書くときは、以下を末尾スラッシュ付きで揃えてください。

- `Layout` の `canonicalPath`（例：`/price/`）
- 構造化データのURL（パンくず）
- `scripts/generate-seo-files.js` の `STATIC_PATHS`

`next/link` の `href` は末尾スラッシュを書かなくても自動で付与されます。
素の `<a href="...">` を書くときだけ、手で末尾スラッシュを付けてください。

## Vercelへのデプロイ

1. GitHubにリポジトリ（`hp-template-fitness-c`）を作成してpush
2. Vercelでリポジトリをインポート
3. Vercelの環境変数に `NEXT_PUBLIC_SITE_URL`（本番ドメイン）を設定
4. デプロイ後、独自ドメインを設定（DNS反映に数分〜48時間かかります）
