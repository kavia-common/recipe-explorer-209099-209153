import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Recipe Explorer" },
    { name: "description", content: "Browse, search, and explore recipes." },
  ];
};

export default function Index() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:flex lg:items-center lg:gap-12 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:max-w-xl lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 text-sm text-blue-700 dark:text-blue-300">
            Ocean Professional
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Find your next favorite recipe
          </h1>
          <p className="mt-4 text-lg leading-7 text-gray-600 dark:text-gray-300">
            Search thousands of curated recipes with ratings, cook time, and step-by-step instructions.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
            <Link
              to="/recipes"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
            >
              Explore recipes
            </Link>
            <a
              href="#learn-more"
              className="inline-flex items-center rounded-lg bg-amber-500/10 px-5 py-3 font-medium text-amber-700 hover:bg-amber-500/20 dark:text-amber-300"
            >
              Learn more
            </a>
          </div>
        </div>
        <div className="mt-12 flex-1 lg:mt-0">
          <div className="relative mx-auto h-64 w-full max-w-xl overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-lg dark:border-gray-700 dark:from-gray-900 dark:to-gray-950">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(59,130,246,.2),transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,.2),transparent_50%)]" />
            <div className="absolute inset-6 rounded-xl border border-dashed border-blue-300/40 dark:border-gray-700/80" />
          </div>
        </div>
      </div>
      <div id="learn-more" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { title: "Smart Filters", desc: "Filter by category, rating, time, and more." },
            { title: "URL-driven UI", desc: "Share searches, filters, and sorting via the URL." },
            { title: "Accessible", desc: "Keyboard-friendly and screen-reader accessible." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
