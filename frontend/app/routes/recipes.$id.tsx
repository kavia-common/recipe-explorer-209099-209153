import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getRecipeById } from "~/lib/api";
import Rating from "~/components/Rating";
import { cls } from "~/lib/theme";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data && "recipe" in data && data.recipe?.title ? `${data.recipe.title} - Recipe` : "Recipe - Not found";
  return [{ title }];
};

// PUBLIC_INTERFACE
export async function loader({ params }: LoaderFunctionArgs) {
  const id = params.id!;
  try {
    const recipe = await getRecipeById(id);
    if (!recipe) {
      return json({ error: "Recipe not found" }, { status: 404 });
    }
    return json({ recipe });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "Failed to load recipe";
    return json({ error: message }, { status: 500 });
  }
}

export default function RecipeDetail() {
  const data = useLoaderData<typeof loader>();

  if (!("recipe" in data)) {
    return (
      <main className={`${cls.container} py-8`}>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300">
          {(data as { error?: string })?.error || "Error"}
        </div>
        <div className="mt-4">
          <Link to="/recipes" className="text-blue-700 hover:underline dark:text-blue-300">
            Back to recipes
          </Link>
        </div>
      </main>
    );
  }

  const r = data.recipe;

  return (
    <main className={`${cls.container} py-8`}>
      <Link to="/recipes" className="text-sm text-blue-700 hover:underline dark:text-blue-300">
        ← Back to recipes
      </Link>

      <article className="mt-4 grid gap-6 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 overflow-hidden">
          <div className="aspect-[16/9] w-full bg-gray-100 dark:bg-gray-800">
            <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
          </div>
          <div className="space-y-3 p-6">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">{r.title}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <Rating value={r.rating} count={r.reviews} />
              <span className="rounded-md bg-blue-500/10 px-2 py-1 text-sm text-blue-700 dark:text-blue-300">
                {r.category}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{r.difficulty}</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{r.timeMinutes} minutes</span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{r.servings} servings</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{r.description}</p>

            <section className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Ingredients</h2>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-gray-700 dark:text-gray-300">
                  {r.ingredients.map((ing, idx) => (
                    <li key={`${ing.name}-${idx}`}>
                      {ing.quantity ? `${ing.quantity} ` : ""}
                      {ing.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">Instructions</h2>
                <ol className="mt-2 space-y-2 pl-6">
                  {r.instructions.map((ins) => (
                    <li key={ins.step} className="list-decimal text-gray-700 dark:text-gray-300 marker:text-gray-400">
                      {ins.text}
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            {r.tags && r.tags.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2">
                {r.tags.map((t) => (
                  <span key={t} className="rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    #{t}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h3 className="text-lg font-semibold">Quick facts</h3>
          <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
            <dt className="text-gray-500">Author</dt>
            <dd className="text-gray-900 dark:text-gray-100">{r.author ?? "Unknown"}</dd>
            <dt className="text-gray-500">Added</dt>
            <dd className="text-gray-900 dark:text-gray-100">{r.createdAt?.slice(0, 10) ?? "—"}</dd>
            <dt className="text-gray-500">Reviews</dt>
            <dd className="text-gray-900 dark:text-gray-100">{r.reviews}</dd>
          </dl>
          <div className="mt-6 rounded-lg bg-blue-50 p-4 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">
            Pro tip: Use the filters on the recipes page to find meals that match your time and taste.
          </div>
        </aside>
      </article>
    </main>
  );
}
