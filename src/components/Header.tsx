const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 flex h-16 items-center justify-between bg-gray-900 px-6 text-white">
      <div className="flex items-center gap-3">
        <svg
          className="h-6 w-6 text-indigo-400"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
        <span className="text-lg font-bold tracking-tight">Starhunter</span>
        <span className="text-gray-500">|</span>
        <span className="text-sm text-gray-300">Dashboard</span>
      </div>

      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold">
        SH
      </div>
    </header>
  );
};

export default Header;
