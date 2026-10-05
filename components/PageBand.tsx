import type { ReactNode } from "react";

export function PageBand({
  title,
  kicker,
  children,
  tone = "primary",
}: {
  title: string;
  kicker?: ReactNode;
  children?: ReactNode;
  tone?: "primary" | "bright";
}) {
  const background = tone === "bright" ? "bg-blue-bright" : "bg-blue";

  return (
    <div className={`${background} text-paper`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-5">
        {kicker ? <div className="mb-2 text-sm">{kicker}</div> : null}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {children ? <div className="mt-2 max-w-prose space-y-2 leading-snug">{children}</div> : null}
      </div>
    </div>
  );
}

export function SectionBand({
  id,
  title,
  lede,
  tone = "bright",
}: {
  id: string;
  title: string;
  lede?: string;
  tone?: "primary" | "bright";
}) {
  const background = tone === "bright" ? "bg-blue-bright" : "bg-blue";

  return (
    <div className={`${background} text-paper`}>
      <div className="mx-auto w-full max-w-6xl px-4 py-4">
        <h2 id={id} className="text-xl font-semibold">
          {title}
        </h2>
        {lede ? <p className="mt-1 max-w-prose text-sm leading-snug">{lede}</p> : null}
      </div>
    </div>
  );
}
