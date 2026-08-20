import Link from "next/link";
import { HERO } from "../lib/siteConfig";

// トップページのファーストビュー(full-bleedヒーロー)。
// 画像はLayoutの外側(container外)に描画されるため、CSSを足さなくても画面幅いっぱいに広がる。
// LCP対策として pages/index.js 側で同じURLを rel="preload" しており、
// ここでは lazy を付けず fetchPriority="high" で即時読み込みさせる。
//
// 画像の差し替え: public/images/hero/home-hero{,-640,-1024,-1600}.webp
// srcSetの各幅は実ファイルと必ず一致させること(存在しない幅を書くと404になる)。
// 差し替え時は pages/index.js の <link rel="preload"> の imageSrcSet も同じ内容に保つ。
export default function HeroBanner() {
  return (
    <section className="hero-banner">
      <img
        src="/images/hero/home-hero.webp"
        srcSet="/images/hero/home-hero-640.webp 640w, /images/hero/home-hero-1024.webp 1024w, /images/hero/home-hero-1600.webp 1600w"
        sizes="100vw"
        alt=""
        className="hero-banner-img"
        fetchPriority="high"
        decoding="async"
      />
      {/* 写真の上に文字を乗せるためのスクリム(暗幕)。
          写真を差し替えてコントラストが不足する場合はCSSの
          .hero-banner-scrim の不透明度を上げて調整する。 */}
      <div className="hero-banner-scrim" aria-hidden="true" />
      <div className="hero-banner-overlay">
        <div className="hero-banner-inner">
          <div className="hero-banner-copy">
            {HERO.eyebrow && <p className="hero-banner-eyebrow">{HERO.eyebrow}</p>}
            {/* siteConfigのtitleは改行(\n)を含められる。<br>に変換して表示する */}
            <h1 className="hero-banner-title">
              {HERO.title.split("\n").map((line, i) => (
                <span key={i} className="hero-banner-title-line">
                  {line}
                </span>
              ))}
            </h1>
            <p className="hero-banner-lead">{HERO.lead}</p>
            <div className="hero-banner-actions">
              {HERO.primaryCta && (
                <Link href={HERO.primaryCta.href} className="btn btn--primary">
                  {HERO.primaryCta.label}
                </Link>
              )}
              {HERO.secondaryCta && (
                <Link href={HERO.secondaryCta.href} className="btn btn--ghost">
                  {HERO.secondaryCta.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
