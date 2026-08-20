# fitness-c｜フィットネステンプレートサンプルサイト C

顧客にデザインを選んでもらうための、地域密着型フィットネスジム向けサンプルサイトです。飲食店サンプル
（restaurant-c）をコピーして作りました。**このリポジトリ直下がサイト本体です。**

- コンセプト：**気軽さ・継続しやすさ**（初心者歓迎／コミュニティ感／明るく開放的）
- 屋号（架空）：AOZORA FITNESS（アオゾラフィットネス）つつじヶ丘店
- 想定リポジトリ名：`hp-template-fitness-c`（本体サイト `nevora-corporate` とは別リポジトリ・別ドメイン）
- デザイン方針：`docs/デザイン方針.md`
- 制作方針：`docs/テンプレートサンプルサイト方針.md`
- 技術詳細・画像の変換手順：`README.md`
- 公開手順（GitHub登録〜Vercelデプロイ）：`docs/デプロイ手順.md`

**美容室サンプル（beauty-a/b/c）・飲食店サンプル（restaurant-a/b/c）・工務店サンプル（construction-a）とは
別サイトです。** 同じ土台から作りますが、配色・レイアウト・屋号・文言は重複させません。

## 技術スタック

Next.js (Pages Router) + React / プレーンCSS / Vercelホスティング（`output: "export"` の静的書き出し）

## 現在の状態

実装・公開前検査まで完了しています。**残りは画像の追加と、GitHub登録〜Vercelデプロイのみです。**

| 項目 | 状態 |
|---|---|
| ページ | `/` `/price` `/facility` `/flow` `/faq` `/contact` `/privacy-policy` `/terms` `/404` |
| 文言（`lib/siteConfig.js`） | 完了。架空のジム「AOZORA FITNESS」に全面差し替え済み |
| 配色（`styles/globals.css`） | 完了。ブルー×白（`--color-primary: #1467a5`） |
| レイアウト | 完了。画像なしでも成立する構成 |
| 画像 | **未着手。hero / band / logo / ogp / favicon が存在しない**（参照だけがある状態） |
| デプロイ | 未設定。`.vercel/` は存在しない（他サンプルのプロジェクトへ上書きしないため） |

## 制作ワークフロー

| 工程 | 担当エージェント | 成果物 |
|---|---|---|
| 1. デザイン方針の策定 | `web-designer` | `docs/デザイン方針.md` |
| 2. 実装 | `site-engineer` | サイト本体 |
| 3. SEO・計測設定 | `seo-setup` | `docs/SEO設定.md` |
| 4. 公開前検査 | `qa-checker` | 合否判定 |
| 5. 公開 | `deployer` | `docs/公開記録.md` |
| 6. 障害対応 | `incident-responder` | `docs/障害対応メモ/` |

**前工程の成果物が確定してから次工程へ進みます。**

## 制作上のルール

- **実在しない架空の施設名・住所・電話番号を使う。** 実在の事業者の情報を入れると、検索結果で本物のサイトと誤認される
- **架空の事業者のため、LocalBusiness / HealthClub 系の構造化データは出力しない。** 出力してよいのは WebSite・BreadcrumbList・FAQPage まで
- **健康・医学的効果の断定表現を使わない。**「痩せます」「健康になります」「改善します」等は書かない
- **利用者の声・体験談は架空でも掲載しない。** コミュニティ感は、場（掲示板・ラウンジ・少人数スタジオ）の説明で表現する
- **他業種サンプル（beauty-a/b/c・restaurant-a/b/c・construction-a）と同じ屋号・写真・キャッチコピーを使わない**
- **グローバルナビに本体サイトへのリンクを置かない。** 本体サイトへの導線は画面下部の固定バー1本だけにする。リンク先は本体サイトの `/contact/?from=fitness-c` のみ
- **文言・料金・FAQなどのデータは `lib/siteConfig.js` に集約する。** JSXへ直接書かない
- **配色の変更は `styles/globals.css` の `:root` にある4変数だけで行う。** 個別クラスにカラーコードを直書きしない。`--color-primary` は白背景に対してコントラスト比4.5:1以上を満たすものを選ぶ
- ページを追加したら `lib/siteConfig.js` の `NAV_ITEMS` と `scripts/generate-seo-files.js` の `STATIC_PATHS` の両方に追記する
- `npm run build` は環境変数 `NEXT_PUBLIC_SITE_URL` が未設定だとエラーになる。ローカル確認時は `.env.local` を用意する
- **他業種サンプルのデプロイ先へ上書きしない。** `.vercel/` は存在しない。新規のVercelプロジェクトとして紐付ける
- **`qa-checker` の検査で不合格項目がある状態で公開しない**
- 検索避け（noindex）はしない。固定バーでサンプルであることを常時明示する

## 出力ルール

- 応答・ドキュメントはすべて日本語で書く
- 数値や成果を報告する際は、根拠となるデータを添える
