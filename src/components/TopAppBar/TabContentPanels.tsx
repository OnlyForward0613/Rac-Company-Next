import { useRouter } from "next/router";
import { navItems, useNavContext } from "~/contexts/NavigationContext";
import { tabs, useTabContext } from "~/contexts/TabContext";

const TabContentPanels = () => {
  const router = useRouter();
  const { activeTab } = useTabContext();
  const { activeNav } = useNavContext();

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {navItems.map(({ href }) => {
        return tabs.map(({ tabs: navTabs, nav: navTitle }) => {
          if (router.asPath !== href) return null;
          if (navTitle !== activeNav) return null;

          return navTabs.map(({ id, content }, i) => {
            return (
              <div
                key={`${href.slice(1)}-panel-${i}`}
                id={`${href.slice(1)}-panel-${id}`}
                role="tabpanel"
                className={`duration-400 hidden w-full transition ease-in-out [&.active]:block ${
                  id === activeTab && "active"
                }`}
              >
                {content}
              </div>
            );
          });
        });
      })}
    </div>
  );
};

export default TabContentPanels;
