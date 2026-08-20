import Link from "next/link";
import { SITE, FOOTER_LINKS } from "../lib/siteConfig";

export default function Footer() {
  const { name, tel, address, businessHours, closedDays } = SITE.company;

  return (
    <footer className="site-footer">
      <div className="container container--wide">
        <p className="footer-name">{name}</p>
        {/* 施設情報は lib/siteConfig.js の company を唯一の定義元とする。
            空にした項目は行ごと出力しない（tel を空にすると電話導線が全ページから消える） */}
        <p className="footer-contact">
          {address && <span>{address}</span>}
          {tel && (
            <span>
              TEL <a href={`tel:${tel.replace(/-/g, "")}`}>{tel}</a>
            </span>
          )}
          {businessHours && <span>営業時間 {businessHours}</span>}
          {closedDays && <span>休館日 {closedDays}</span>}
        </p>
        <nav className="footer-nav">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <p>&copy; {new Date().getFullYear()} {name}</p>
        {/* サンプルサイトであることの明示。固定バー（SampleBar）と重複するが、
            フッターまで読んだ人にも架空の店舗であることが伝わるようにしておく */}
        <p className="footer-sample-note">
          このサイトはホームページ制作会社NEVORAが制作したテンプレートのサンプルです。
          掲載している施設名・所在地・電話番号・料金はすべて架空のもので、実在しません。
        </p>
      </div>
    </footer>
  );
}
