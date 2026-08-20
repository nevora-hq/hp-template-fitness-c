// サイト全体で使う構造化データ(JSON-LD)の共通組み立て関数。
// 各ページ(pages/*.js)には呼び出しだけを残し、スキーマの組み立てはここに一本化する。
// サイト名・事業者情報の定義元は lib/siteConfig.js。
//
// 【このサンプルサイトでは事業者スキーマを出力しない】
// 掲載しているジム名・住所・電話番号は架空のため、LocalBusiness / HealthClub 等で
// マークアップすると、検索結果に存在しない施設の情報が出る恐れがある。
// そのため、この種のスキーマを組み立てる関数はテンプレートに置かない。
// 実店舗の案件では siteConfig の company を実際の情報に更新したうえで、
// 案件側で HealthClub スキーマを追加すること。

import { SITE } from "./siteConfig";

export const SITE_NAME = SITE.name;

// ロゴ画像。案件ごとに public/images/logo.png を差し替える
// (Googleの推奨最小サイズは112×112px。正方形のPNGを用意する)。
export const LOGO_PATH = "/images/logo.png";

// サイト全体で常に出す構造化データ(WebSite)。
// サイト内検索を持たないテンプレートのため SearchAction は含めない。
export function buildWebsiteJsonLd(siteUrl) {
  if (!siteUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
    description: SITE.description,
  };
}

// パンくずリスト。items: [{name, url}] を先頭から順に並べる。
export function buildBreadcrumbJsonLd(siteUrl, items) {
  if (!siteUrl || !Array.isArray(items) || items.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// FAQPage。faqs: [{question, answer}]。
export function buildFaqJsonLd(faqs) {
  if (!Array.isArray(faqs) || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
