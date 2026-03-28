import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main className="ml-64 min-h-screen bg-gray-50 p-6 pt-16">
        <div className="pt-6">{children}</div>
      </main>
    </>
  );
};

export default Layout;
