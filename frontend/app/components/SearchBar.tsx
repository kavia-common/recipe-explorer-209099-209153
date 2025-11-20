import { useEffect, useId, useRef, useState } from "react";

interface Props {
  value?: string;
  onChange: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  initialFocus?: boolean;
}

export default function SearchBar({
  value = "",
  onChange,
  onSubmit,
  placeholder = "Search recipes, ingredients, or tags...",
  initialFocus = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [q, setQ] = useState(value);
  const id = useId();

  useEffect(() => {
    setQ(value);
  }, [value]);

  useEffect(() => {
    if (initialFocus) {
      inputRef.current?.focus();
    }
  }, [initialFocus]);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    onSubmit?.(q.trim());
  }

  return (
    <form onSubmit={submit} role="search" aria-label="Recipe search" className="w-full">
      <label htmlFor={id} className="sr-only">
        Search recipes
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/60 pl-10 pr-10"
          type="search"
          name="q"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          aria-describedby={`${id}-desc`}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <span aria-hidden>🔎</span>
        </div>
        {q ? (
          <button
            type="button"
            onClick={() => {
              setQ("");
              onChange("");
              onSubmit?.("");
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            ✕
          </button>
        ) : null}
      </div>
      <p id={`${id}-desc`} className="sr-only">
        Type your search and press enter.
      </p>
    </form>
  );
}
