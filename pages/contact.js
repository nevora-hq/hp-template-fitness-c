import Layout from "../components/Layout";
import {
  SITE,
  BOOKING_NOTE,
  PLANS,
  CONTACT_FORM_ENDPOINT,
} from "../lib/siteConfig";
import { buildBreadcrumbJsonLd } from "../lib/structuredData";

export async function getStaticProps() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  return {
    props: {
      jsonLd: [
        buildBreadcrumbJsonLd(siteUrl, [
          { name: "トップ", url: `${siteUrl}/` },
          { name: "お問い合わせ", url: `${siteUrl}/contact/` },
        ]),
      ].filter(Boolean),
    },
  };
}

export default function Contact({ jsonLd }) {
  const { company } = SITE;
  // CONTACT_FORM_ENDPOINT(lib/siteConfig.js)が未設定のうちは、
  // 送信できないフォームを置かず、電話・メールのご案内だけを表示する。
  const hasForm = Boolean(CONTACT_FORM_ENDPOINT);

  // 件名と本文の雛形を入れたmailtoリンク。
  // 何を書けばよいか分からないまま離脱されるのを防ぐため、項目を先に埋めておく。
  const mailtoHref = company.email
    ? `mailto:${company.email}?subject=${encodeURIComponent(
        "見学・体験のお申し込み"
      )}&body=${encodeURIComponent(
        [
          "お名前：",
          "お電話番号：",
          "ご用件（見学／体験／料金のご相談／その他）：",
          "ご希望日時（第1希望）：",
          "ご希望日時（第2希望）：",
          "気になっているプラン（レギュラー／デイタイム／ライト／未定）：",
          "ご質問：",
          "",
        ].join("\n")
      )}`
    : "";

  return (
    <Layout
      title={`お問い合わせ｜${SITE.name}`}
      description="つつじヶ丘のフィットネスジム AOZORA FITNESS のお問い合わせ窓口です。見学・体験のお申し込み、プログラムのご予約、料金プランのご相談をお電話またはメールでお受けしています。"
      canonicalPath="/contact/"
      panel
      jsonLd={jsonLd}
    >
      <h1 className="page-title">お問い合わせ</h1>
      <p className="page-lead">{BOOKING_NOTE}</p>

      {/* サンプルサイトのため、実際のお問い合わせは受け付けていないことを最初に明示する */}
      <section className="note-box">
        <p>
          <strong>
            このサイトはテンプレートのサンプルです。掲載の施設は架空のもので、お問い合わせはお受けしていません。
          </strong>
          <br />
          実際の施設では、この位置に電話・メール・SNSアカウントへの導線を設置します。
        </p>
      </section>

      <section className="contact-direct">
        <h2 className="section-title">お電話・メールでのお問い合わせ</h2>
        <ul className="contact-list">
          {company.tel && (
            <li>
              <span className="contact-list-label">電話</span>
              <a href={`tel:${company.tel.replace(/-/g, "")}`}>{company.tel}</a>
              {company.businessHours && (
                <span className="contact-list-note">（受付：{company.businessHours}）</span>
              )}
            </li>
          )}
          {company.email && (
            <li>
              <span className="contact-list-label">メール</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
              <span className="contact-list-note">（24時間受付・翌営業日までにご返信）</span>
            </li>
          )}
          {company.closedDays && (
            <li>
              <span className="contact-list-label">休館日</span>
              {company.closedDays}
            </li>
          )}
        </ul>
        {mailtoHref && (
          <>
            <p className="contact-mail-lead">
              下記のボタンから、必要な項目を入れたメールを作成できます。ご希望日時を2つお知らせいただくと、
              最初のご返信でご案内できる時間をお伝えできます。
            </p>
            <p className="contact-mail-action">
              <a href={mailtoHref} className="btn btn--primary btn--lg">
                メールを作成する
              </a>
            </p>
          </>
        )}
      </section>

      {hasForm ? (
        <section>
          <h2 className="section-title">フォームからのお問い合わせ</h2>
          <form className="contact-form" action={CONTACT_FORM_ENDPOINT} method="POST">
            <div className="form-row">
              <label htmlFor="name">
                お名前<span className="form-required">必須</span>
              </label>
              <input id="name" name="name" type="text" required autoComplete="name" />
            </div>

            <div className="form-row">
              <label htmlFor="tel">
                電話番号<span className="form-required">必須</span>
              </label>
              <input id="tel" name="tel" type="tel" required autoComplete="tel" />
            </div>

            <div className="form-row">
              <label htmlFor="email">メールアドレス</label>
              <input id="email" name="email" type="email" autoComplete="email" />
            </div>

            <div className="form-row">
              <label htmlFor="purpose">ご用件</label>
              <select id="purpose" name="purpose" defaultValue="">
                <option value="">選択してください</option>
                <option value="tour">見学（15分ほど）</option>
                <option value="trial">体験（60分ほど）</option>
                <option value="program">プログラムのご予約</option>
                <option value="other">その他</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="plan">気になっているプラン</label>
              <select id="plan" name="plan" defaultValue="">
                <option value="">未定・相談したい</option>
                {PLANS.map((plan) => (
                  <option key={plan.slug} value={plan.slug}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="date1">ご希望日時（第1希望）</label>
              <input id="date1" name="date1" type="text" placeholder="例：3月10日 10:00ごろ" />
            </div>

            <div className="form-row">
              <label htmlFor="date2">ご希望日時（第2希望）</label>
              <input id="date2" name="date2" type="text" placeholder="例：3月12日 19:00ごろ" />
            </div>

            <div className="form-row">
              <label htmlFor="message">ご質問・ご要望</label>
              <textarea id="message" name="message" rows={8} />
            </div>

            <p className="form-note">
              送信いただいた内容は、お問い合わせへのご返信のみに使用します。詳細は
              <a href="/privacy-policy/">プライバシーポリシー</a>をご確認ください。
            </p>

            <button type="submit" className="btn btn--primary btn--lg">
              送信する
            </button>
          </form>
        </section>
      ) : (
        <section className="note-box">
          <p>
            現在フォームは準備中です。お問い合わせは上記のお電話またはメールにてお願いいたします。
          </p>
          {/* 制作担当者向けメモ:
              lib/siteConfig.js の CONTACT_FORM_ENDPOINT に
              フォームサービス(Googleフォーム/Formspree等)のPOST先URLを設定すると、
              このページにお問い合わせフォームが表示される。 */}
        </section>
      )}
    </Layout>
  );
}
