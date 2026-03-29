interface HeaderProps {
  onMenuToggle: () => void
}

const Header = ({ onMenuToggle }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex h-16 items-center justify-between bg-gray-900 px-4 sm:px-6 text-white">
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden -ml-1 p-1.5 rounded-md hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
          </svg>
        </button>

        <svg
          className="h-6 w-6 text-indigo-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
        <span className="text-lg font-bold tracking-tight">Starhunter</span>
        <span className="hidden sm:inline text-gray-500">|</span>
        <span className="hidden sm:inline text-sm text-gray-300">Dashboard</span>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold">
        SH
      </div>
    </header>
  );
};

export default Header;
