import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { SITE, NAV_ITEMS } from "../lib/siteConfig";

// ナビゲーション項目は lib/siteConfig.js の NAV_ITEMS を唯一の定義元とする。
// 「お問い合わせ」だけはCTAボタンとして右端に固定表示するため、
// 通常リンクの列からは除外している。
// 本体サイト（NEVORA）へのリンクはナビに置かない。サンプルであることの明示と
// 本体サイトへの導線は components/SampleBar.js の固定バーに集約する。
const CONTACT_HREF = "/contact";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const close = () => setOpen(false);
  const navLinks = NAV_ITEMS.filter((item) => item.href !== CONTACT_HREF);

  return (
    <header className="site-header">
      <div className="container container--wide header-inner">
        <Link href="/" className="logo" onClick={close}>
          {SITE.logoText}
        </Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
        </button>
        <nav className={`main-nav${open ? " open" : ""}`}>
          <Link
            href="/"
            className="main-nav-link"
            onClick={close}
            aria-current={router.pathname === "/" ? "page" : undefined}
          >
            トップ
          </Link>
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="main-nav-link"
              onClick={close}
              aria-current={router.pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Link href={CONTACT_HREF} className="header-cta" onClick={close}>
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  );
}
