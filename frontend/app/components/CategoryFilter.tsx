interface Props {
  categories: string[];
  value?: string;
  onChange: (v: string) => void;
}

export default function CategoryFilter({ categories, value = "All", onChange }: Props) {
  return (
    <div aria-label="Categories" className="flex flex-wrap gap-2">
      {["All", ...categories].map((c) => {
        const active = value === c;
        return (
          <button
            key={c}
            type="button"
            onClick={() => onChange(c)}
            className={`inline-flex items-center rounded-full border bg-white/70 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300 ${
              active
                ? "border-blue-300 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                : "border-gray-200 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800/70"
            }`}
            aria-pressed={active}
          >
            {c}
          </button>
        );
      })}
    </div>
  );
}
