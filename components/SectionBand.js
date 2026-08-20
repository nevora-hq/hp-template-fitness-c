// セクションの区切りに挟むfull-bleed(画面幅いっぱい)の画像バンド。
// main直下に置かれるため、幅の指定なしでそのまま画面幅いっぱいになる。
//
// base   … /images/band/band-01 のような拡張子・幅サフィックスなしのパス
//          (案件ごとに public/images/band/ の画像を差し替える)
// widths … srcsetに載せる幅。実ファイルと必ず一致させること
// children … 渡すとスクリム+オーバーレイを描画し、その中に見出し等を置ける。
//            テキストは .container--wide に入るため、1180pxグリッドの左端に揃う。
//            渡さない場合は写真だけの装飾バンドになる。
export default function SectionBand({
  base,
  widths,
  objectPosition,
  className = "",
  children,
}) {
  const srcSet = widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");

  return (
    <div className={`section-band${className ? ` ${className}` : ""}`}>
      <img
        src={`${base}.webp`}
        srcSet={srcSet}
        sizes="100vw"
        alt=""
        loading="lazy"
        decoding="async"
        className="section-band-img"
        style={objectPosition ? { objectPosition } : undefined}
      />
      {children ? (
        <>
          <div className="section-band-scrim" aria-hidden="true" />
          <div className="section-band-overlay">
            <div className="container container--wide">{children}</div>
          </div>
        </>
      ) : null}
    </div>
  );
}
