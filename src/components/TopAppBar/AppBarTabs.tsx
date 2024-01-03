import { useRouter } from "next/router";
import { useEffect } from "react";
import { navItems, useNavContext } from "~/contexts/NavigationContext";
import { tabs, useTabContext } from "~/contexts/TabContext";
import tailmater from "~/js/tailmater";
import TabContentPanels from "./TabContentPanels";

const AppBarTabs = () => {
  const router = useRouter();
  const { activeTab, tabsRef, handleTabChange } = useTabContext();
  const { activeNav } = useNavContext();

  const handleRef = (el: HTMLButtonElement) => {
    if (!el) return;
    if (tabsRef.current.length >= 3) tabsRef.current.shift();
    tabsRef.current.push(el);
  };

  useEffect(() => {
    if (router.asPath === "/login") return;
    if (router.asPath === "/register") return;
    if (router.asPath === "/home") return;

    tailmater();
  }, [activeNav]);

  return (
    <div className="tabs flex flex-col">
      <div className="relative flex flex-row items-center">
        {navItems.map(({ href }) => {
          return tabs.map(({ tabs: navTabs, nav: navTitle }) => {
            if (router.asPath !== href) return null;
            if (navTitle !== activeNav) return null;

            return navTabs.map(({ id, title: tabTitle }) => {
              return (
                <button
                  ref={handleRef}
                  key={`${href.slice(1)}-tab-${id}`}
                  data-type="tabs"
                  data-target={`#${href.slice(1)}-panel-${id}`}
                  className={`flex h-[49px] w-1/3 flex-col items-center justify-end gap-1 px-4 py-2 md:w-[120px] ${
                    activeTab === id && "active text-primary-600"
                  }`}
                  onClick={() => handleTabChange(id)}
                >
                  <p className="text-sm font-medium tracking-[.00714em]">
                    {tabTitle}
                  </p>
                </button>
              );
            });
          });
        })}

        <div
          role="indicator"
          className="absolute bottom-0 left-0 ml-[12%] h-0.5 w-[40px] rounded-t-full bg-primary-600 transition-all duration-200 ease-in-out sm:ml-[14%] md:ml-[40px]"
        ></div>
      </div>
      <div className="relative flex min-h-[calc(100vh-201px)] bg-neutral-50 md:min-h-[calc(100vh-170px)]">
        <TabContentPanels />
      </div>
    </div>
  );
};

export default AppBarTabs;
