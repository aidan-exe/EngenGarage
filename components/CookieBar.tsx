"use client";

import { useState } from "react";
import { NOTICE_COOKIE } from "@/lib/site";

export function CookieBar({ dismissed }: { dismissed: boolean }) {
  const [hidden, setHidden] = useState(dismissed);

  if (hidden) return null;

  function dismiss() {
    document.cookie = `${NOTICE_COOKIE}=1; Path=/; Max-Age=31536000; SameSite=Lax`;
    setHidden(true);
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-blue bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
        <p className="min-w-0 flex-1 text-sm leading-snug">
          Saves your price region on this device.
        </p>
        <div className="flex gap-2">
          <button type="button" className="btn btn-primary px-3 text-sm" onClick={dismiss}>
            Accept
          </button>
          <button type="button" className="btn btn-secondary px-3 text-sm" onClick={dismiss}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
