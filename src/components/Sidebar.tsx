const navItems = [
  { label: "Dashboard", active: true },
  { label: "Candidates", active: false },
  { label: "Jobs", active: false },
  { label: "Analytics", active: false },
  { label: "Settings", active: false },
];

interface SidebarProps {
  open: boolean
  onClose: () => void
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  return (
    <>
      {/* Backdrop — mobile only */}
      {open && (
        <div
          className="fixed inset-0 z-20 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-16 z-30 flex w-64 flex-col bg-gray-800 text-gray-300 transition-transform duration-200 lg:z-10 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href="#"
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-gray-700 text-white"
                      : "hover:bg-gray-700/50 hover:text-white"
                  }`}
                >
                  <svg
                    className="h-4 w-4 shrink-0"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                  >
                    <rect x="1" y="1" width="14" height="14" rx="2" />
                  </svg>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Version */}
        <div className="px-6 py-4 text-xs text-gray-500">v1.0.0</div>
      </aside>
    </>
  );
};

export default Sidebar;
