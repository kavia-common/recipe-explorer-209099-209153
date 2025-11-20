import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigation } from "@remix-run/react";
import { getRecipes } from "~/lib/api";
import type { QueryParams } from "~/lib/api";
import { useQueryState } from "~/lib/store";
import SearchBar from "~/components/SearchBar";
import CategoryFilter from "~/components/CategoryFilter";
import RecipeCard from "~/components/RecipeCard";
import { cls } from "~/lib/theme";

export const meta: MetaFunction = () => [
  { title: "Recipes - Recipe Explorer" },
  { name: "description", content: "Browse and search recipes." },
];

// PUBLIC_INTERFACE
export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || undefined;
  const category = url.searchParams.get("category") || undefined;
  const minRating = url.searchParams.get("minRating")
    ? Number(url.searchParams.get("minRating"))
    : undefined;
  const maxTime = url.searchParams.get("maxTime")
    ? Number(url.searchParams.get("maxTime"))
    : undefined;
  const sort = (url.searchParams.get("sort") as QueryParams["sort"]) || "relevance";
  const page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;
  const pageSize = url.searchParams.get("pageSize")
    ? Number(url.searchParams.get("pageSize"))
    : 12;
  const tag = url.searchParams.get("tag") || undefined;

  try {
    const data = await getRecipes({
      q,
      category,
      minRating,
      maxTime,
      sort,
      page,
      pageSize,
      tag,
    });
    return json({ data });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load recipes";
    return json({ error: message }, { status: 500 });
  }
}

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Beverage",
  "Vegetarian",
  "Vegan",
];

export default function RecipesPage() {
  const loaderData = useLoaderData<typeof loader>();
  const [query, setQuery] = useQueryState();
  const navigating = useNavigation();
  const busy = navigating.state !== "idle";

  const items = loaderData && "data" in loaderData ? loaderData.data.items : [];
  const total = loaderData && "data" in loaderData ? loaderData.data.total : 0;
  const page = loaderData && "data" in loaderData ? loaderData.data.page : 1;
  const totalPages = loaderData && "data" in loaderData ? loaderData.data.totalPages : 1;
  const pageSize =
    loaderData && "data" in loaderData ? loaderData.data.pageSize : query.pageSize ?? 12;

  return (
    <main className={`${cls.container} py-8`}>
      <h1 className={cls.h1}>Recipes</h1>
      <section className="mt-4 grid gap-6 lg:grid-cols-[1fr,3fr]">
        <aside className={`${cls.surface} p-4`} aria-label="Filters">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Search</h2>
            <SearchBar
              value={query.q || ""}
              onChange={(v) => setQuery({ q: v })}
              onSubmit={(v) => setQuery({ q: v })}
            />
          </div>
          <div className="mt-6 space-y-3">
            <h2 className="text-lg font-semibold">Category</h2>
            <CategoryFilter
              categories={CATEGORIES}
              value={query.category || "All"}
              onChange={(c) => setQuery({ category: c })}
            />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300" htmlFor="minRating">
                Min rating
              </label>
              <select
                id="minRating"
                className={cls.select}
                value={query.minRating ?? ""}
                onChange={(e) =>
                  setQuery({
                    minRating: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              >
                <option value="">Any</option>
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r}+
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300" htmlFor="maxTime">
                Max time
              </label>
              <select
                id="maxTime"
                className={cls.select}
                value={query.maxTime ?? ""}
                onChange={(e) =>
                  setQuery({
                    maxTime: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              >
                <option value="">Any</option>
                {[15, 30, 45, 60].map((t) => (
                  <option key={t} value={t}>
                    {t} min
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm text-gray-700 dark:text-gray-300" htmlFor="sort">
              Sort by
            </label>
            <select
              id="sort"
              className={cls.select}
              value={query.sort}
              onChange={(e) => setQuery({ sort: e.target.value as QueryParams["sort"] })}
            >
              <option value="relevance">Relevance</option>
              <option value="rating_desc">Rating (high to low)</option>
              <option value="rating_asc">Rating (low to high)</option>
              <option value="time_asc">Time (short to long)</option>
              <option value="time_desc">Time (long to short)</option>
              <option value="title_asc">Title (A–Z)</option>
              <option value="title_desc">Title (Z–A)</option>
            </select>
          </div>
          <div className="mt-6">
            <label className="block text-sm text-gray-700 dark:text-gray-300" htmlFor="pageSize">
              Per page
            </label>
            <select
              id="pageSize"
              className={cls.select}
              value={pageSize}
              onChange={(e) => setQuery({ pageSize: Number(e.target.value) })}
            >
              {[6, 12, 18, 24].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
        </aside>

        <section aria-live="polite" className="space-y-4">
          {"error" in (loaderData as Record<string, unknown>) ? (
            <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
              {(loaderData as { error?: string }).error}
            </div>
          ) : null}
          {busy ? (
            <div className="flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
              Updating results...
            </div>
          ) : null}
          {items.length === 0 ? (
            <div className={`${cls.surface} p-8`}>
              <p className={cls.subtle}>
                No recipes found. Try adjusting your search or filters.
              </p>
              <button
                type="button"
                className="mt-4 rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                onClick={() =>
                  setQuery({
                    q: "",
                    category: undefined,
                    minRating: undefined,
                    maxTime: undefined,
                    sort: "relevance",
                    page: 1,
                    tag: undefined,
                  })
                }
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing <strong>{items.length}</strong> of <strong>{total}</strong> results
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r) => (
                  <RecipeCard key={r.id} recipe={r} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={(p) => setQuery({ page: p })}
              />
            </>
          )}
        </section>
      </section>
    </main>
  );
}

function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (p: number) => void;
}) {
  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pages = Array.from({ length: totalPages }).map((_, i) => i + 1).slice(0, 7);

  return (
    <nav className="mt-4 flex items-center justify-between" aria-label="Pagination">
      <button
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-50 dark:border-gray-700"
        onClick={() => onChange(page - 1)}
        disabled={!canPrev}
      >
        Previous
      </button>
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`rounded-md px-3 py-1.5 text-sm ${
              p === page
                ? "bg-blue-600 text-white"
                : "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            }`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        ))}
        {totalPages > pages.length ? (
          <span className="px-2 text-gray-500">… {totalPages}</span>
        ) : null}
      </div>
      <button
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:opacity-50 dark:border-gray-700"
        onClick={() => onChange(page + 1)}
        disabled={!canNext}
      >
        Next
      </button>
    </nav>
  );
}
