import Link from "next/link";
import Layout from "../components/Layout";
import Cta from "../components/Cta";
import {
  SITE,
  FLOW_LEAD,
  FLOW_STEPS,
  FLOW_NOTE,
  WHAT_TO_BRING,
  DROP_IN,
} from "../lib/siteConfig";
import { buildBreadcrumbJsonLd } from "../lib/structuredData";

export async function getStaticProps() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    props: {
      jsonLd: [
        buildBreadcrumbJsonLd(siteUrl, [
          { name: "トップ", url: `${siteUrl}/` },
          { name: "見学・体験の流れ", url: `${siteUrl}/flow/` },
        ]),
      ].filter(Boolean),
    },
  };
}

export default function Flow({ jsonLd }) {
  // 見学・体験の料金だけを抜き出して先に見せる（DROP_IN の定義元は lib/siteConfig.js）
  const trialRows = DROP_IN.filter((item) => item.price === "無料");

  return (
    <Layout
      title={`見学・体験の流れ｜${SITE.name}`}
      description="AOZORA FITNESS の見学・体験の流れをご案内します。見学は15分、体験は60分ほど。どちらも無料で、当日のご入会は必要ありません。お持ち物と当日の進み方をご確認ください。"
      canonicalPath="/flow/"
      wide
      jsonLd={jsonLd}
    >
      <h1 className="page-title">見学・体験の流れ</h1>
      <p className="page-lead">{FLOW_LEAD}</p>

      <section className="note-box">
        <h2 className="note-box-title">見学・体験の費用</h2>
        <table className="price-table">
          <thead>
            <tr>
              <th scope="col">内容</th>
              <th scope="col">料金</th>
              <th scope="col">備考</th>
            </tr>
          </thead>
          <tbody>
            {trialRows.map((item) => (
              <tr key={item.name}>
                <th scope="row">{item.name}</th>
                <td className="price-table-price">{item.price}</td>
                <td>{item.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="price-section" aria-labelledby="flow-steps-title">
        <h2 id="flow-steps-title" className="section-title">
          当日の流れ
        </h2>
        <div className="narrow-block">
          <ol className="flow-list">
            {FLOW_STEPS.map((step, i) => (
              <li key={step.title} className="flow-item">
                <span className="flow-step" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flow-body">
                  <h3 className="flow-title">
                    {step.title}
                    <span className="flow-duration">{step.duration}</span>
                  </h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="note-box">
        <h2 className="note-box-title">体験の日のお持ち物</h2>
        <ul className="check-list">
          {WHAT_TO_BRING.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="note-box-supplement">{FLOW_NOTE}</p>
      </section>

      <p className="section-more">
        <Link href="/price">料金プランを見る →</Link>
      </p>

      <Cta
        title="見学のお申し込み"
        lead="お電話、またはフロントで直接お申し込みいただけます。ご希望の日時と、見学・体験のどちらをご希望かをお聞かせください。"
      />
    </Layout>
  );
}
