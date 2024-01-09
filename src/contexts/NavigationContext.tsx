import {
  Calculator,
  Car,
  Celo,
  ExportSquare,
  Home2,
  ImportSquare,
  NotificationBing,
  Routing2,
  Setting3,
  Shop,
  Wallet3,
} from "iconsax-react";
import { useRouter } from "next/router";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { type NAV_TITLES } from "~/constants";

export type NavContextType = {
  activeNav: NavTitleType;
  previousRoute: string | null;
  handleActiveNavChange: (navTitle: NavTitleType) => void;
};

export const NavContext = createContext<NavContextType>({} as NavContextType);

export const useNavContext = () => useContext(NavContext);

export type NavTitleType = (typeof NAV_TITLES)[number];

export type NavItemType = {
  src: JSX.Element;
  title: NavTitleType;
  href: string;
};

export const topNavItems: NavItemType[] = [
  {
    src: <Shop className="text-gray-400" />,
    title: "Shop For Me",
    href: "/shop",
  },
  {
    src: <ExportSquare className="text-gray-400" />,
    title: "Export",
    href: "/export",
  },
  {
    src: <ImportSquare className="text-gray-400" />,
    title: "Import",
    href: "/import",
  },
  {
    src: <Car className="text-gray-400" />,
    title: "Auto Import",
    href: "/auto-import",
  },
  {
    src: <Routing2 className="text-gray-400" />,
    title: "Tracking",
    href: "/tracking",
  },
];

export const bottomNavItems: NavItemType[] = [
  {
    src: <Calculator className="text-gray-400" />,
    title: "Get a Quote",
    href: "/quote",
  },
  { src: <Celo className="text-gray-400" />, title: "Help", href: "/help" },
  {
    src: <Setting3 className="text-gray-400" />,
    title: "Settings",
    href: "/settings",
  },
];

export const navItems: NavItemType[] = [
  { src: <Home2 className="text-gray-400" />, title: "Home", href: "/" },
  {
    src: <Wallet3 className="text-gray-400" />,
    title: "Payment History",
    href: "/billing",
  },
  {
    src: <NotificationBing />,
    title: "Notifications",
    href: "/notifications",
  },
  ...topNavItems,
  ...bottomNavItems,
];

const NavContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const previousRouteRef = useRef<string | null>(null);
  const [activeNav, setActiveNav] =
    useState<NavItemType["title"]>("Shop For Me");

  const handleActiveNavChange = (navTitle: NavTitleType) => {
    setActiveNav(navTitle);
  };

  const redirectTo = (path: string) => {
    void router.replace(path).catch((e) => console.log(e));
  };

  useEffect(() => {
    const matchedNavItem = navItems.find(
      (navItem) => router.asPath === navItem.href,
    );

    if (matchedNavItem) {
      handleActiveNavChange(matchedNavItem.title);
      redirectTo(router.asPath);
    }

    router.events?.on("routeChangeStart", () => {
      previousRouteRef.current = router.asPath;
    });
  }, [router.asPath]);

  const value: NavContextType = {
    activeNav,
    previousRoute: previousRouteRef.current,
    handleActiveNavChange,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
