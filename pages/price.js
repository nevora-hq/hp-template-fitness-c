import Link from "next/link";
import Layout from "../components/Layout";
import Cta from "../components/Cta";
import SectionBand from "../components/SectionBand";
import {
  SITE,
  PROGRAMS,
  PROGRAM_NOTE,
  PLANS,
  PLAN_NOTE,
  PLAN_NOTES,
  DROP_IN,
  OUT_OF_SCOPE,
  OUT_OF_SCOPE_NOTE,
} from "../lib/siteConfig";
import { buildBreadcrumbJsonLd } from "../lib/structuredData";

export async function getStaticProps() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    props: {
      jsonLd: [
        buildBreadcrumbJsonLd(siteUrl, [
          { name: "トップ", url: `${siteUrl}/` },
          { name: "プログラム・料金", url: `${siteUrl}/price/` },
        ]),
      ].filter(Boolean),
    },
  };
}

export default function Price({ jsonLd }) {
  return (
    <Layout
      title={`プログラム・料金｜${SITE.name}`}
      description="AOZORA FITNESS のプログラムと料金です。レギュラー会員 月額8,800円、デイタイム会員 月額6,600円、ライト会員 月額5,500円（すべて税込）。スタジオプログラムは月会費に含まれます。"
      canonicalPath="/price/"
      wide
      jsonLd={jsonLd}
      /* ページ見出しの全幅バンド（装飾）。文字は重ねないため暗幕は出さない。
         幅は scripts/optimize-images.py の WEBP_JOBS と揃えること。 */
      hero={
        <SectionBand
          base="/images/band/page-price"
          widths={[640, 1024, 1600]}
          objectPosition="50% 45%"
        />
      }
    >
      <h1 className="page-title">プログラム・料金</h1>
      <p className="page-lead">{PLAN_NOTE}</p>

      <section aria-labelledby="plans-title">
        <h2 id="plans-title" className="section-title">
          月会費プラン
        </h2>
        <div className="card-grid card-grid--3">
          {PLANS.map((plan) => (
            <div
              key={plan.slug}
              className={`price-card${plan.recommended ? " price-card--recommended" : ""}`}
            >
              {plan.recommended && <span className="price-badge">いちばん多いプラン</span>}
              <h3 className="price-card-name">{plan.name}</h3>
              <p className="price-card-price">{plan.price}</p>
              <p className="price-card-target">{plan.target}</p>
              <ul className="price-card-items">
                {plan.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="price-section" id="programs">
        <h2 className="section-title">プログラム</h2>
        <p className="section-lead">{PROGRAM_NOTE}</p>
        {PROGRAMS.map((program) => (
          <section key={program.slug} className="service-section" id={program.slug}>
            <h3 className="service-section-title">{program.name}</h3>
            <p className="program-card-meta">
              <span>{program.duration}</span>
              <span>{program.capacity}</span>
            </p>
            <p className="service-section-summary">{program.target}</p>
            <p className="program-card-body">{program.body}</p>
          </section>
        ))}
      </section>

      <section className="price-section" id="drop-in">
        <h2 className="section-title">都度のご利用・オプション</h2>
        <table className="price-table">
          <thead>
            <tr>
              <th scope="col">内容</th>
              <th scope="col">料金</th>
              <th scope="col">備考</th>
            </tr>
          </thead>
          <tbody>
            {DROP_IN.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td className="price-table-price">{item.price}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="note-box">
        <h2 className="note-box-title">お支払い・退会について</h2>
        <ul className="check-list">
          {PLAN_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="note-box">
        <h2 className="note-box-title">お受けできないこと</h2>
        <ul className="cross-list">
          {OUT_OF_SCOPE.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="note-box-supplement">{OUT_OF_SCOPE_NOTE}</p>
      </section>

      <p className="section-more">
        <Link href="/flow">見学・体験の流れを見る →</Link>
      </p>

      <Cta
        title="まずは見学からどうぞ"
        lead="見学は15分ほど、体験は60分ほど。どちらも無料で、その日にお決めいただく必要はありません。"
      />
    </Layout>
  );
}
