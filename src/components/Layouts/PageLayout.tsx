import { type ReactNode } from "react";
import { BottomNav, TopNav } from "../Navigation";
import SlideSheet from "../Navigation/SlideSheet";
import Welcome from "../Navigation/Welcome";

type PageLayoutProps = { children: ReactNode };

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="relative flex bg-neutral-50">
      <nav className="fixed hidden h-full min-h-screen w-[266px] flex-col overflow-y-auto bg-brand py-[40px] md:flex">
        <Welcome />
        <TopNav />
        <BottomNav />
      </nav>
      <SlideSheet />
      <main className="w-full md:ml-[266px]">{children}</main>
    </div>
  );
};

export default PageLayout;
