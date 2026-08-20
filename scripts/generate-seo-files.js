// output: "export"(静的エクスポート)ではgetServerSidePropsが使えないため、
// robots.txt / sitemap.xml はビルド前にpublic/へ書き出す。
// package.jsonのprebuildスクリプトから自動実行される。
//
// ページを追加したら STATIC_PATHS にも追記すること。
const fs = require("fs");
const path = require("path");

// next.config.js の trailingSlash: true に合わせ、末尾スラッシュ付きで書き出す
// (sitemapのURLと実際に配信されるURLを一致させるため)。
const STATIC_PATHS = [
  "/",
  "/price/",
  "/facility/",
  "/flow/",
  "/faq/",
  "/contact/",
  "/privacy-policy/",
  "/terms/",
];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
if (!siteUrl) {
  throw new Error(
    "[generate-seo-files] NEXT_PUBLIC_SITE_URL が未設定です。robots.txt/sitemap.xml に正しい絶対URLを書き出せません。"
  );
}
// 末尾スラッシュがあると `${siteUrl}/` が `//` になるため取り除く
const base = siteUrl.replace(/\/+$/, "");

function escapeXml(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const publicDir = path.join(__dirname, "..", "public");

const robots = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${base}/sitemap.xml
`;

const entries = STATIC_PATHS.map(
  (p) => `<url><loc>${escapeXml(`${base}${p}`)}</loc></url>`
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join(
  ""
)}</urlset>`;

fs.writeFileSync(path.join(publicDir, "robots.txt"), robots, "utf8");
fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap, "utf8");

console.log(`[generate-seo-files] public/robots.txt と public/sitemap.xml を生成しました (base: ${base})`);
