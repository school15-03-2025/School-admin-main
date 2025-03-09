import Sidebar from './sidebar';
import Navbar from './navbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow overflow-y-scroll h-screen">
        <Navbar />
        <main className="flex-grow p-6 bg-[#CCCCFF]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
