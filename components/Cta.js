import Link from "next/link";
import { SITE } from "../lib/siteConfig";

// 各ページの末尾に置く共通のお問い合わせ誘導ブロック。
// lib/siteConfig.js の company.tel を空にすると、電話導線がサイト全体から消える。
export default function Cta({
  title = "見学・体験は無料です",
  lead = "運動がはじめての方も、久しぶりの方も。まずはフロアをご覧いただき、通えそうかどうかを確かめてください。その日にお決めいただく必要はありません。",
}) {
  const { tel, businessHours } = SITE.company;

  return (
    <section className="cta">
      <div className="container container--wide cta-inner">
        <h2 className="cta-title">{title}</h2>
        <p className="cta-lead">{lead}</p>
        <div className="cta-actions">
          <Link href="/contact" className="btn btn--primary btn--lg">
            お問い合わせ
          </Link>
          {tel && (
            <a href={`tel:${tel.replace(/-/g, "")}`} className="btn btn--ghost btn--lg">
              電話でお問い合わせ（{tel}）
            </a>
          )}
        </div>
        {businessHours && <p className="cta-note">受付時間：{businessHours}</p>}
      </div>
    </section>
  );
}
