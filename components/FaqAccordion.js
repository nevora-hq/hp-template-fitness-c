// よくあるご質問のアコーディオン。
// ネイティブ <details>/<summary> のみで開閉するため状態管理は持たない
// (JS無効環境でも中身が読める / 検索エンジンにも本文として読まれる)。
export default function FaqAccordion({ items }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div className="faq-list">
      {items.map((item, i) => (
        <details key={i} className="faq-item">
          <summary className="faq-question">{item.question}</summary>
          <div className="faq-answer">
            <p>{item.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
