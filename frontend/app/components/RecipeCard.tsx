import { Link } from "@remix-run/react";
import type { Recipe } from "~/lib/types";
import Rating from "./Rating";

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <Link to={`/recipes/${recipe.id}`} aria-label={`Open recipe ${recipe.title}`}>
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-1 text-base font-semibold text-gray-900 dark:text-gray-100">
              {recipe.title}
            </h3>
            <span className="rounded-md bg-amber-500/10 px-2 py-1 text-xs text-amber-700 dark:text-amber-300">
              {recipe.timeMinutes}m
            </span>
          </div>
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-300">
            {recipe.description}
          </p>
          <div className="flex items-center justify-between">
            <Rating value={recipe.rating} count={recipe.reviews} size="sm" />
            <span className="text-xs text-gray-500 dark:text-gray-400">{recipe.difficulty}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-xs text-blue-700 dark:text-blue-300">
              {recipe.category}
            </span>
            {(recipe.tags ?? []).slice(0, 2).map((t) => (
              <span key={t} className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                #{t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
