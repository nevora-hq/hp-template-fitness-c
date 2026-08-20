import Layout from "../components/Layout";
import Cta from "../components/Cta";
import SectionBand from "../components/SectionBand";
import { SITE, FACILITIES, COMMUNITY, WHAT_TO_BRING } from "../lib/siteConfig";
import { buildBreadcrumbJsonLd } from "../lib/structuredData";

export async function getStaticProps() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    props: {
      jsonLd: [
        buildBreadcrumbJsonLd(siteUrl, [
          { name: "トップ", url: `${siteUrl}/` },
          { name: "施設案内", url: `${siteUrl}/facility/` },
        ]),
      ].filter(Boolean),
    },
  };
}

export default function Facility({ jsonLd }) {
  const { company } = SITE;

  // 未記入の項目は行ごと出さない（テンプレートの初期値が公開されるのを防ぐ）
  const rows = [
    { label: "施設名", value: company.name },
    { label: "運営", value: company.representative },
    { label: "所在地", value: company.address },
    { label: "アクセス", value: company.access },
    { label: "電話番号", value: company.tel },
    { label: "営業時間", value: company.businessHours },
    { label: "休館日", value: company.closedDays },
    { label: "フロア", value: company.area },
    { label: "開業", value: company.established },
  ].filter((row) => row.value);

  return (
    <Layout
      title={`施設案内｜${SITE.name}`}
      description="つつじヶ丘のフィットネスジム AOZORA FITNESS の施設案内です。マシンエリア・フリーウエイトエリア・スタジオ・更衣室・ラウンジの設備と、アクセス・営業時間をご案内します。"
      canonicalPath="/facility/"
      wide
      jsonLd={jsonLd}
      /* ページ見出しの全幅バンド（装飾）。文字は重ねないため暗幕は出さない。
         幅は scripts/optimize-images.py の WEBP_JOBS と揃えること。 */
      hero={
        <SectionBand
          base="/images/band/page-facility"
          widths={[640, 1024, 1600]}
          objectPosition="50% 45%"
        />
      }
    >
      <h1 className="page-title">施設案内</h1>
      <p className="page-lead">
        2階のワンフロアに、マシンエリア・フリーウエイトエリア・スタジオ・更衣室・ラウンジを置いています。
        窓に面したフロアのため、日中は照明を落としても明るい場所です。
      </p>

      <section aria-labelledby="facility-list-title">
        <h2 id="facility-list-title" className="section-title">
          設備
        </h2>
        <div className="card-grid card-grid--2">
          {FACILITIES.map((item) => (
            <div key={item.slug} className="facility-card">
              {/* 画像は lib/siteConfig.js の FACILITIES[].image（拡張子なしのパス）から組み立てる。
                  srcSetの幅は scripts/optimize-images.py の WEBP_JOBS と必ず一致させること
                  （存在しない幅を書くと404になる）。
                  width/height は表示比率と同じ4:3を渡し、読み込み前の高さを確保する。 */}
              {item.image && (
                <img
                  src={`${item.image}.webp`}
                  srcSet={`${item.image}-640.webp 640w, ${item.image}-1200.webp 1200w`}
                  sizes="(min-width: 768px) 45vw, 100vw"
                  alt={`${item.name}の様子`}
                  className="facility-card-image"
                  width={1200}
                  height={900}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="facility-card-inner">
                <h3 className="program-card-name">{item.name}</h3>
                <p className="program-card-body">{item.body}</p>
                {item.note && <p className="program-card-target">{item.note}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="price-section">
        <h2 className="section-title">{COMMUNITY.title}</h2>
        <p className="section-lead">{COMMUNITY.lead}</p>
        <div className="card-grid card-grid--3">
          {COMMUNITY.points.map((point) => (
            <div key={point.title} className="strength-card">
              <h3 className="strength-card-title">{point.title}</h3>
              <p className="strength-card-body">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="price-section">
        <h2 className="section-title">ご利用時のお持ち物</h2>
        <div className="narrow-block">
          <ul className="check-list">
            {WHAT_TO_BRING.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="price-section">
        <h2 className="section-title">施設情報</h2>
        <table className="info-table">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* サンプルサイトであることの明示。
          固定バー（SampleBar）に加えて、施設情報の直後にも置いて誤認を防ぐ。 */}
      <section className="note-box">
        <h2 className="note-box-title">このサイトについて</h2>
        <p>
          このサイトは、ホームページ制作会社NEVORAが制作したフィットネス向けテンプレート（Cタイプ）の
          サンプルです。掲載している施設名・所在地・電話番号・料金はすべて架空のもので、
          実在する施設・事業者とは関係ありません。実際のお申し込み・お問い合わせはお受けしていません。
        </p>
      </section>

      <Cta
        title="ご都合のよいときにお立ち寄りください"
        lead="見学はご予約なしでもご案内できます。スタジオのプログラムをご覧になりたい場合のみ、開催時間をお電話でご確認ください。"
      />
    </Layout>
  );
}
