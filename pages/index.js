import Head from "next/head";
import Link from "next/link";
import Layout from "../components/Layout";
import HeroBanner from "../components/HeroBanner";
import SectionBand from "../components/SectionBand";
import FaqAccordion from "../components/FaqAccordion";
import Cta from "../components/Cta";
import {
  SITE,
  ISSUES,
  STRENGTHS,
  COMMUNITY,
  PROGRAMS,
  PROGRAM_NOTE,
  PLANS,
  PLAN_NOTE,
  FLOW_STEPS,
  FAQS,
} from "../lib/siteConfig";
import { buildFaqJsonLd } from "../lib/structuredData";

export async function getStaticProps() {
  return {
    props: {
      // 架空の施設のため、LocalBusiness(HealthClub)の構造化データは出力しない。
      // 理由は lib/structuredData.js の冒頭コメントを参照。
      jsonLd: [buildFaqJsonLd(FAQS.slice(0, 4))].filter(Boolean),
    },
  };
}

export default function Home({ jsonLd }) {
  // トップではプログラムを4つ、FAQを4件だけ見せ、全体は下層ページに置く
  const programPreview = PROGRAMS.slice(0, 4);
  const faqPreview = FAQS.slice(0, 4);
  const flowPreview = FLOW_STEPS.slice(0, 3);

  return (
    <Layout
      /* トップのtitleはキーワードを前に置き、施設名(logoText)を後ろに付ける。
         SITE.name(施設名＋説明)を前置きすると全角40文字を超えて検索結果で見切れるため。 */
      title={`つつじヶ丘のフィットネスジム｜${SITE.logoText}`}
      description={SITE.description}
      canonicalPath="/"
      fullWidth
      jsonLd={jsonLd}
      hero={<HeroBanner />}
    >
      <Head>
        {/* ヒーロー画像はLCP要素。imageSrcSet/imageSizesは components/HeroBanner.js の
            srcSet/sizes と必ず同じ内容に保つこと(不一致だと同じ画像を2回取得してしまう) */}
        <link
          rel="preload"
          as="image"
          href="/images/hero/home-hero.webp"
          imageSrcSet="/images/hero/home-hero-640.webp 640w, /images/hero/home-hero-1024.webp 1024w, /images/hero/home-hero-1600.webp 1600w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
      </Head>

      <div className="home-page">
        {/* ---- はじめての方の不安 ---- */}
        <section className="home-stripe">
          <div className="container container--wide">
            <h2 className="section-title">はじめての方から、よくお聞きすること</h2>
            <p className="section-lead">
              運動から離れていた方のご入会が多いジムです。気がかりな点は、見学のときに何でもお尋ねください。
            </p>
            <div className="card-grid card-grid--3">
              {ISSUES.map((issue, i) => (
                <div key={issue.title} className="issue-card">
                  <span className="issue-card-no" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="issue-card-title">{issue.title}</h3>
                  <p className="issue-card-body">{issue.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 画像バンド。public/images/band/band-01*.webp を差し替える */}
        <SectionBand
          base="/images/band/band-01"
          widths={[640, 1024, 1600]}
          objectPosition="50% 40%"
        >
          <h2 id="strengths-title" className="section-band-title">
            AOZORA FITNESS について
          </h2>
          <p className="section-band-lead">
            つつじヶ丘駅から徒歩5分。朝と夜に開いている、ご近所のためのジムです。
          </p>
        </SectionBand>

        {/* ---- 選ばれる理由 ---- */}
        <section className="home-stripe" aria-labelledby="strengths-title">
          <div className="container container--wide">
            <div className="card-grid card-grid--3">
              {STRENGTHS.map((item) => (
                <div key={item.title} className="strength-card">
                  <h3 className="strength-card-title">{item.title}</h3>
                  <p className="strength-card-body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- 雰囲気（コミュニティ） ---- */}
        <section className="home-stripe home-stripe--tint">
          <div className="container container--wide">
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
          </div>
        </section>

        {/* ---- プログラム(抜粋) ---- */}
        <section className="home-stripe">
          <div className="container container--wide">
            <h2 className="section-title">プログラム</h2>
            <p className="section-lead">{PROGRAM_NOTE}</p>
            <div className="card-grid card-grid--2">
              {programPreview.map((program) => (
                <div key={program.slug} className="program-card">
                  <h3 className="program-card-name">{program.name}</h3>
                  <p className="program-card-meta">
                    <span>{program.duration}</span>
                    <span>{program.capacity}</span>
                  </p>
                  <p className="program-card-target">{program.target}</p>
                  <p className="program-card-body">{program.body}</p>
                </div>
              ))}
            </div>
            <p className="section-more">
              <Link href="/price">プログラムをすべて見る →</Link>
            </p>
          </div>
        </section>

        {/* ---- 料金プラン(概要) ---- */}
        <section className="home-stripe home-stripe--tint">
          <div className="container container--wide">
            <h2 className="section-title">料金プラン</h2>
            <p className="section-lead">{PLAN_NOTE}</p>
            <div className="card-grid card-grid--3">
              {PLANS.map((plan) => (
                <div
                  key={plan.slug}
                  className={`price-card${
                    plan.recommended ? " price-card--recommended" : ""
                  }`}
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
            <p className="section-more">
              <Link href="/price">料金の詳細・都度利用を見る →</Link>
            </p>
          </div>
        </section>

        {/* ---- 見学・体験の流れ(抜粋) ---- */}
        <section className="home-stripe">
          <div className="container container--wide">
            <h2 className="section-title">見学・体験の流れ</h2>
            <p className="section-lead">
              見学は15分ほど、体験は60分ほどです。どちらも無料で、その日にご入会いただく必要はありません。
            </p>
            <div className="narrow-block">
              <ol className="flow-list">
                {flowPreview.map((step, i) => (
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
            <p className="section-more">
              <Link href="/flow">当日の流れをすべて見る →</Link>
            </p>
          </div>
        </section>

        {/* ---- よくあるご質問 ---- */}
        <section className="home-stripe home-stripe--tint">
          <div className="container container--wide">
            <h2 className="section-title">よくあるご質問</h2>
            <div className="narrow-block">
              <FaqAccordion items={faqPreview} />
              <p className="section-more">
                <Link href="/faq">よくあるご質問をすべて見る →</Link>
              </p>
            </div>
          </div>
        </section>

        <Cta />
      </div>
    </Layout>
  );
}
