import Link from "next/link";
import Layout from "../components/Layout";
import Cta from "../components/Cta";
import SectionBand from "../components/SectionBand";
import FaqAccordion from "../components/FaqAccordion";
import { SITE, FAQS, OUT_OF_SCOPE, OUT_OF_SCOPE_NOTE } from "../lib/siteConfig";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "../lib/structuredData";

export async function getStaticProps() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    props: {
      jsonLd: [
        buildBreadcrumbJsonLd(siteUrl, [
          { name: "トップ", url: `${siteUrl}/` },
          { name: "よくあるご質問", url: `${siteUrl}/faq/` },
        ]),
        buildFaqJsonLd(FAQS),
      ].filter(Boolean),
    },
  };
}

export default function Faq({ jsonLd }) {
  return (
    <Layout
      title={`よくあるご質問｜${SITE.name}`}
      description="AOZORA FITNESS によくいただくご質問をまとめました。運動がはじめての方の通い方、見学・体験のお申し込み、契約期間や退会、駐輪場についてご案内します。"
      canonicalPath="/faq/"
      panel
      jsonLd={jsonLd}
      /* ページ見出しの全幅バンド（装飾）。文字は重ねないため暗幕は出さない。
         幅は scripts/optimize-images.py の WEBP_JOBS と揃えること。 */
      hero={
        <SectionBand
          base="/images/band/page-faq"
          widths={[640, 1024, 1600]}
          objectPosition="50% 45%"
        />
      }
    >
      <h1 className="page-title">よくあるご質問</h1>
      <p className="page-lead">
        見学の際によくいただくご質問です。ここに載っていないことは、お電話またはフロントでお尋ねください。
      </p>

      <FaqAccordion items={FAQS} />

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
        title="解決しないことがあれば"
        lead="お電話でお答えします。見学のときに、フロアを見ながらご説明することもできます。"
      />
    </Layout>
  );
}
