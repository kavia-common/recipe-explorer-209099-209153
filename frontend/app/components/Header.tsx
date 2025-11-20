import { Link, useLocation } from "@remix-run/react";

export default function Header() {
  const loc = useLocation();
  const isActive = (to: string) =>
    loc.pathname === to || (to !== "/" && loc.pathname.startsWith(to));

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200/70 bg-white/90 backdrop-blur dark:border-gray-800/70 dark:bg-gray-950/80">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Recipe Explorer home">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-500 to-amber-400" />
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Recipe Explorer
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-2">
          <NavLink to="/" active={isActive("/")} label="Home" />
          <NavLink to="/recipes" active={isActive("/recipes")} label="Recipes" />
          <a
            className="sr-only focus:not-sr-only focus:outline-none"
            href="#main"
          >
            Skip to content
          </a>
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, label, active }: { to: string; label: string; active: boolean }) {
  return (
    <Link
      to={to}
      className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/80"
      }`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
