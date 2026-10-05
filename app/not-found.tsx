import Link from "next/link";
import { PageBand } from "@/components/PageBand";

export default function NotFound() {
  return (
    <>
      <PageBand title="Page not found">
        <p>That page is not on this site.</p>
      </PageBand>
      <main className="mx-auto w-full max-w-3xl px-4 py-6">
        <Link href="/" className="btn btn-primary">
          Back to home
        </Link>
      </main>
    </>
  );
}
