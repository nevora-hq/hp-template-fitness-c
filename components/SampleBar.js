import { SAMPLE_NOTICE } from "../lib/siteConfig";

// テンプレートサンプルであることを常時明示する固定バー。
// docs/テンプレートサンプルサイト方針.md の「導線のルール」に基づく実装:
//  ・グローバルナビには本体サイトへのリンクを置かず、このバーだけを唯一の出口にする
//  ・本文が隠れないよう、body 側に同じ高さの余白を持たせる(styles/globals.css)
//  ・ヘッダーが position: sticky のため、z-index はヘッダー(20)より上にする
//  ・リンクは別タブで開き、サンプルを見ている流れを断ち切らない
// リンク先URLは lib/siteConfig.js の SAMPLE_NOTICE 1箇所で管理する
// (3リポジトリに散らばると、本体サイトのドメイン変更時に直し漏れるため)。
export default function SampleBar() {
  if (!SAMPLE_NOTICE || !SAMPLE_NOTICE.href) return null;

  return (
    <aside className="sample-bar" aria-label="サンプルサイトのご案内">
      <div className="sample-bar-inner">
        <span className="sample-bar-text">{SAMPLE_NOTICE.text}</span>
        <span className="sample-bar-sep" aria-hidden="true">
          ｜
        </span>
        <a
          className="sample-bar-link"
          href={SAMPLE_NOTICE.href}
          target="_blank"
          rel="noopener"
        >
          {SAMPLE_NOTICE.ctaLabel}
        </a>
      </div>
    </aside>
  );
}
