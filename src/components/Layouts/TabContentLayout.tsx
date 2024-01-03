import { type ReactNode } from "react";

type TabContentLayoutProps = { children: ReactNode };

const TabContentLayout = ({ children }: TabContentLayoutProps) => {
  return (
    <div className="flex h-full min-h-[calc(100vh-210px)] w-full flex-col overflow-y-auto p-[20px] md:min-h-[calc(100vh-170px)] md:max-w-[calc(100vw-286px)] md:px-[40px]">
      {children}
    </div>
  );
};

export default TabContentLayout;
