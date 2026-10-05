import Image from "next/image";
import Link from "next/link";
import { SectionBand } from "@/components/PageBand";
import { stories } from "@/lib/stories";

export function Stories() {
  return (
    <section aria-labelledby="stories-heading" className="bg-paper">
      <SectionBand
        id="stories-heading"
        title="Stories"
        lede="Illustrative notes on fuel, food and rewards. Not Engen media releases."
      />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <ul className="grid gap-4 md:grid-cols-3">
          {stories.map((story) => (
            <li key={story.href} className="photo-card flex flex-col">
              <Image
                src={story.image}
                alt={story.alt}
                width={1200}
                height={800}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="h-44 w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-4">
                <p className="text-sm text-mute">{story.date}</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug text-blue">{story.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mute">{story.summary}</p>
                <Link href={story.href} className="mt-3 inline-flex min-h-11 items-center font-semibold text-blue underline">
                  {story.action}
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-mute">
          Photographs are stock images under the Unsplash License, not Engen forecourts.
        </p>
      </div>
    </section>
  );
}
